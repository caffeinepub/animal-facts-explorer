import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Microscope,
  Search,
  Star,
  Trophy,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { type Dinosaur, type Era, dinosaurs } from "./data/dinosaurs";

type EraFilter = "All" | Era;

interface QuizResult {
  dinoId: string;
  score: number;
  total: number;
}

function loadResults(): Record<string, QuizResult> {
  try {
    const raw = localStorage.getItem("dino-quiz-results");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveResult(result: QuizResult) {
  const results = loadResults();
  results[result.dinoId] = result;
  localStorage.setItem("dino-quiz-results", JSON.stringify(results));
}

function EraBadge({ era }: { era: Era }) {
  const cls = {
    Triassic: "era-triassic",
    Jurassic: "era-jurassic",
    Cretaceous: "era-cretaceous",
  }[era];
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${cls}`}
    >
      {era}
    </span>
  );
}

function DinoCard({
  dino,
  quizResult,
  onQuiz,
  index,
}: {
  dino: Dinosaur;
  quizResult?: QuizResult;
  onQuiz: (dino: Dinosaur) => void;
  index: number;
}) {
  const isPerfect = quizResult?.score === quizResult?.total;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className={`group relative flex flex-col rounded-xl overflow-hidden border card-texture transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        isPerfect && quizResult
          ? "perfect-score border-yellow-600/40"
          : "border-border"
      }`}
      style={{ background: "oklch(22 0.05 40 / 0.95)" }}
      data-ocid={`dino.item.${index + 1}`}
    >
      {isPerfect && quizResult && (
        <div className="absolute top-2 right-2 z-10 text-yellow-400 text-lg">
          ⭐
        </div>
      )}
      <div className="relative overflow-hidden h-44">
        <img
          src={dino.image}
          alt={dino.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-2 left-3">
          <EraBadge era={dino.era} />
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4 gap-3">
        <h3 className="font-display text-xl font-bold text-foreground">
          {dino.name}
        </h3>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex flex-col gap-0.5">
            <span className="text-muted-foreground uppercase tracking-wider">
              Diet
            </span>
            <span className="text-foreground font-medium">{dino.diet}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-muted-foreground uppercase tracking-wider">
              Length
            </span>
            <span className="text-foreground font-medium">{dino.length}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-muted-foreground uppercase tracking-wider">
              Weight
            </span>
            <span className="text-foreground font-medium">{dino.weight}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
          {dino.funFact}
        </p>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/50">
          {quizResult ? (
            <span className="text-xs text-muted-foreground">
              Quiz:{" "}
              <span
                className={
                  quizResult.score === quizResult.total
                    ? "text-yellow-400 font-bold"
                    : "text-foreground"
                }
              >
                {quizResult.score}/{quizResult.total}
              </span>
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">Not attempted</span>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={() => onQuiz(dino)}
            className="text-xs border-primary/40 text-primary hover:bg-primary/10"
            data-ocid={`dino.open_modal_button.${index + 1}`}
          >
            Take Quiz 🧠
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function QuizModal({
  dino,
  open,
  onClose,
  onComplete,
}: {
  dino: Dinosaur | null;
  open: boolean;
  onClose: () => void;
  onComplete: (result: QuizResult) => void;
}) {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);

  // Reset when dino changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally reset on dino.id change
  useEffect(() => {
    if (open) {
      setQIndex(0);
      setSelected(null);
      setAnswers([]);
      setFinished(false);
    }
  }, [open, dino?.id]);

  if (!dino) return null;

  const question = dino.quiz[qIndex];
  const score = answers.filter(Boolean).length;
  const isAnswered = selected !== null;

  function handleSelect(opt: string) {
    if (isAnswered || !dino) return;
    setSelected(opt);
    const correct = opt === question.answer;
    const newAnswers = [...answers, correct];
    setAnswers(newAnswers);

    if (qIndex === dino.quiz.length - 1) {
      setTimeout(() => {
        setFinished(true);
        const result = {
          dinoId: dino!.id,
          score: newAnswers.filter(Boolean).length,
          total: dino!.quiz.length,
        };
        onComplete(result);
      }, 900);
    } else {
      setTimeout(() => {
        setQIndex((i) => i + 1);
        setSelected(null);
      }, 900);
    }
  }

  const totalQ = dino.quiz.length;
  const isPerfect = score === totalQ;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-lg border-border"
        style={{
          background: "oklch(18 0.05 40)",
          color: "oklch(var(--foreground))",
        }}
        data-ocid="quiz.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-foreground flex items-center gap-2">
            <span>{dino.name}</span>
            <span className="text-base font-normal">
              <EraBadge era={dino.era} />
            </span>
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              key={qIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Question {qIndex + 1} of {totalQ}
                </span>
                <div className="flex gap-1">
                  {dino.quiz.map((q, i) => (
                    <div
                      key={q.question.slice(0, 20)}
                      className={`w-5 h-1.5 rounded-full transition-colors ${
                        i < answers.length
                          ? answers[i]
                            ? "bg-green-500"
                            : "bg-red-500"
                          : i === qIndex
                            ? "bg-primary"
                            : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-lg font-semibold text-foreground leading-snug">
                {question.question}
              </p>

              <div className="grid grid-cols-1 gap-2">
                {question.options.map((opt) => {
                  let cls =
                    "w-full text-left px-4 py-3 rounded-lg border border-border/60 text-sm text-foreground transition-all cursor-pointer hover:border-primary/50 hover:bg-primary/5";
                  if (isAnswered) {
                    if (opt === question.answer) cls += " option-correct";
                    else if (opt === selected) cls += " option-wrong";
                    else cls += " opacity-50";
                  }
                  return (
                    <button
                      type="button"
                      key={opt}
                      className={cls}
                      onClick={() => handleSelect(opt)}
                      style={{ background: "oklch(25 0.04 40)" }}
                      data-ocid="quiz.toggle"
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center gap-5 py-4"
              data-ocid="quiz.success_state"
            >
              {isPerfect && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="text-6xl"
                >
                  🏆
                </motion.div>
              )}
              <div className="text-center">
                <div className="text-5xl font-display font-bold text-primary">
                  {score}/{totalQ}
                </div>
                <div className="text-muted-foreground mt-1">
                  {isPerfect
                    ? "Perfect score! Outstanding paleontologist!"
                    : score >= 3
                      ? "Great work! Almost there!"
                      : score >= 2
                        ? "Good effort! Keep learning!"
                        : "Keep studying — you'll get there!"}
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="border-border"
                  data-ocid="quiz.close_button"
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setQIndex(0);
                    setSelected(null);
                    setAnswers([]);
                    setFinished(false);
                  }}
                  className="bg-primary text-primary-foreground"
                  data-ocid="quiz.secondary_button"
                >
                  Retry
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

function FunFactsCarousel() {
  const facts = dinosaurs.map((d) => ({
    id: d.id,
    text: `🦕 ${d.name}: ${d.funFact}`,
  }));
  const doubled = [
    ...facts.map((f) => ({ ...f, key: `a-${f.id}` })),
    ...facts.map((f) => ({ ...f, key: `b-${f.id}` })),
  ];

  return (
    <section
      id="fun-facts"
      className="py-16 overflow-hidden"
      data-ocid="funfacts.section"
    >
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
          Fun Facts
        </h2>
        <p className="text-muted-foreground">
          Fascinating discoveries from the prehistoric world
        </p>
      </div>

      <div className="relative">
        <div
          className="flex gap-6 animate-marquee"
          style={{ width: "max-content" }}
        >
          {doubled.map((item) => (
            <div
              key={item.key}
              className="flex-shrink-0 w-72 rounded-xl p-5 border border-border card-texture"
              style={{ background: "oklch(22 0.06 50 / 0.9)" }}
            >
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Leaderboard({ results }: { results: Record<string, QuizResult> }) {
  const rows = dinosaurs
    .filter((d) => results[d.id])
    .map((d) => ({ dino: d, result: results[d.id] }));

  const isMaster = dinosaurs.every(
    (d) => results[d.id]?.score === results[d.id]?.total && results[d.id],
  );

  const attempted = rows.length;
  const perfect = rows.filter((r) => r.result.score === r.result.total).length;

  return (
    <section id="leaderboard" className="py-16" data-ocid="leaderboard.section">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
          Leaderboard
        </h2>
        <p className="text-muted-foreground mb-8">
          Your quiz progress across all dinosaurs
        </p>

        <AnimatePresence>
          {isMaster && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 rounded-2xl p-6 border border-yellow-600/40 perfect-score text-center"
              data-ocid="leaderboard.panel"
            >
              <div className="text-5xl mb-3">🦕</div>
              <div className="font-display text-2xl font-bold text-yellow-300">
                Master Paleontologist
              </div>
              <p className="text-muted-foreground mt-1">
                You've aced all 18 dinosaur quizzes! Extraordinary achievement!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Quizzes Attempted", value: attempted, icon: "📋" },
            { label: "Perfect Scores", value: perfect, icon: "⭐" },
            { label: "Total Quizzes", value: 18, icon: "🦴" },
          ].map(({ label, value, icon }) => (
            <div
              key={label}
              className="rounded-xl p-4 border border-border text-center card-texture"
              style={{ background: "oklch(22 0.05 40 / 0.9)" }}
            >
              <div className="text-2xl mb-1">{icon}</div>
              <div className="font-display text-3xl font-bold text-primary">
                {value}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {label}
              </div>
            </div>
          ))}
        </div>

        {rows.length === 0 ? (
          <div
            className="rounded-xl p-8 border border-border text-center text-muted-foreground"
            style={{ background: "oklch(22 0.05 40 / 0.6)" }}
            data-ocid="leaderboard.empty_state"
          >
            <div className="text-4xl mb-3">🦴</div>
            <p>No quizzes attempted yet. Go test your dinosaur knowledge!</p>
          </div>
        ) : (
          <div
            className="rounded-xl overflow-hidden border border-border"
            style={{ background: "oklch(22 0.05 40 / 0.9)" }}
            data-ocid="leaderboard.table"
          >
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">
                    Dinosaur
                  </TableHead>
                  <TableHead className="text-muted-foreground">Era</TableHead>
                  <TableHead className="text-muted-foreground">Diet</TableHead>
                  <TableHead className="text-muted-foreground text-right">
                    Score
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map(({ dino, result }, i) => {
                  const isPerfect = result.score === result.total;
                  return (
                    <TableRow
                      key={dino.id}
                      className={`border-border/50 transition-colors ${
                        isPerfect
                          ? "bg-yellow-900/10 hover:bg-yellow-900/20"
                          : "hover:bg-muted/20"
                      }`}
                      data-ocid={`leaderboard.row.${i + 1}`}
                    >
                      <TableCell className="font-semibold text-foreground">
                        <div className="flex items-center gap-2">
                          {isPerfect && (
                            <span className="text-yellow-400">⭐</span>
                          )}
                          {dino.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <EraBadge era={dino.era} />
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {dino.diet}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={`font-bold text-base ${
                            isPerfect ? "text-yellow-400" : "text-foreground"
                          }`}
                        >
                          {result.score}/{result.total}
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </section>
  );
}

export default function App() {
  const [era, setEra] = useState<EraFilter>("All");
  const [search, setSearch] = useState("");
  const [quizDino, setQuizDino] = useState<Dinosaur | null>(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [results, setResults] =
    useState<Record<string, QuizResult>>(loadResults);

  const filtered = dinosaurs.filter((d) => {
    const matchEra = era === "All" || d.era === era;
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    return matchEra && matchSearch;
  });

  function openQuiz(dino: Dinosaur) {
    setQuizDino(dino);
    setQuizOpen(true);
  }

  function handleQuizComplete(result: QuizResult) {
    saveResult(result);
    setResults((prev) => ({ ...prev, [result.dinoId]: result }));
  }

  const eras: EraFilter[] = ["All", "Triassic", "Jurassic", "Cretaceous"];
  const year = new Date().getFullYear();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "oklch(var(--background))" }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-40 border-b border-border/60 backdrop-blur-sm"
        style={{ background: "oklch(15 0.05 40 / 0.95)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🦕</span>
            <span className="font-display text-xl font-bold text-foreground">
              DinosaurFacts<span className="text-primary">.com</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a
              href="#dinosaurs"
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="nav.link"
            >
              Dinosaurs
            </a>
            <a
              href="#fun-facts"
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="nav.link"
            >
              Fun Facts
            </a>
            <a
              href="#leaderboard"
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="nav.link"
            >
              Leaderboard
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(18 0.06 40) 0%, oklch(20 0.08 120) 50%, oklch(18 0.06 40) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(50 0.15 55 / 0.4) 0%, transparent 60%), radial-gradient(circle at 80% 30%, oklch(45 0.12 140 / 0.3) 0%, transparent 50%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-4xl mx-auto px-6 text-center"
        >
          <div className="text-6xl md:text-8xl mb-6">🦖</div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
            Discover the Age of{" "}
            <span style={{ color: "oklch(var(--primary))" }}>Dinosaurs</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-8">
            Explore 18 prehistoric giants, test your knowledge, and earn the{" "}
            <strong className="text-foreground">Master Paleontologist</strong>{" "}
            badge.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#dinosaurs">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                data-ocid="hero.primary_button"
              >
                Explore Dinosaurs <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </a>
            <a href="#leaderboard">
              <Button
                size="lg"
                variant="outline"
                className="border-border"
                data-ocid="hero.secondary_button"
              >
                <Trophy className="mr-2 h-4 w-4" /> Leaderboard
              </Button>
            </a>
          </div>
        </motion.div>
      </section>

      <main className="flex-1">
        {/* Dinosaurs section */}
        <section id="dinosaurs" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  All Dinosaurs
                </h2>
                <p className="text-muted-foreground mt-1">
                  {filtered.length} of {dinosaurs.length} shown
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search dinosaurs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 w-52 bg-muted/40 border-border"
                    data-ocid="dino.search_input"
                  />
                </div>

                {/* Era filter */}
                <div
                  className="flex gap-1 p-1 rounded-lg border border-border"
                  style={{ background: "oklch(var(--muted))" }}
                  data-ocid="dino.tab"
                >
                  {eras.map((e) => (
                    <button
                      type="button"
                      key={e}
                      onClick={() => setEra(e)}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                        era === e
                          ? "bg-primary text-primary-foreground shadow"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      data-ocid="dino.filter.tab"
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-16 text-muted-foreground"
                  data-ocid="dino.empty_state"
                >
                  <div className="text-5xl mb-4">🦴</div>
                  <p>No dinosaurs found. Try a different search or filter.</p>
                </motion.div>
              ) : (
                <motion.div
                  key={`${era}-${search}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                  data-ocid="dino.list"
                >
                  {filtered.map((dino, i) => (
                    <DinoCard
                      key={dino.id}
                      dino={dino}
                      quizResult={results[dino.id]}
                      onQuiz={openQuiz}
                      index={i}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        <FunFactsCarousel />
        <Leaderboard results={results} />
      </main>

      {/* Quiz Modal */}
      <QuizModal
        dino={quizDino}
        open={quizOpen}
        onClose={() => setQuizOpen(false)}
        onComplete={handleQuizComplete}
      />

      {/* Footer */}
      <footer
        className="border-t border-border/50 py-8"
        style={{ background: "oklch(15 0.04 40)" }}
      >
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-muted-foreground">
          © {year}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
