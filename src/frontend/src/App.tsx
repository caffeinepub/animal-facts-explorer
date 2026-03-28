import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChevronRight, ExternalLink, Leaf, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import type { Animal } from "./backend.d";
import { useGetAllAnimals } from "./hooks/useQueries";

const queryClient = new QueryClient();

const SAMPLE_ANIMALS: Animal[] = [
  {
    id: BigInt(1),
    name: "Snow Leopard",
    category: "Rare Animals",
    conservationStatus: "Vulnerable",
    shortFact:
      "Can leap up to 50 feet horizontally, making it one of the most agile big cats on Earth.",
    facts: [
      "Snow leopards are found in 12 countries across Central Asia.",
      "Their thick, spotted coats provide perfect camouflage in rocky terrain.",
      "They cannot roar — instead they make a chuffing sound called a 'prusten'.",
      "Their long tails help with balance and can be wrapped around the body for warmth.",
      "Fewer than 4,000 individuals remain in the wild.",
    ],
  },
  {
    id: BigInt(2),
    name: "Okapi",
    category: "Rare Animals",
    conservationStatus: "Endangered",
    shortFact:
      "Often called the 'forest giraffe', the okapi is the only living relative of the giraffe.",
    facts: [
      "Okapis were completely unknown to science until 1901.",
      "Their prehensile tongues are long enough to clean their own ears.",
      "Okapis produce infrasound below human hearing to communicate.",
      "The striped hindquarters help camouflage them in the dense rainforest.",
      "Native only to the Democratic Republic of Congo.",
    ],
  },
  {
    id: BigInt(3),
    name: "Tyrannosaurus Rex",
    category: "Dinosaurs",
    conservationStatus: "Extinct",
    shortFact:
      "One of the largest land predators ever, with a bite force of 12,800 pounds — enough to crush bone.",
    facts: [
      "T. rex lived approximately 68–66 million years ago in the Late Cretaceous period.",
      "Its tiny arms were actually quite powerful and could lift around 400 pounds.",
      "T. rex likely had feathers, at least during its juvenile stage.",
      "They could smell prey from several miles away.",
      "A full-grown T. rex weighed about 8 metric tons.",
    ],
  },
  {
    id: BigInt(4),
    name: "Quetzalcoatlus",
    category: "Dinosaurs",
    conservationStatus: "Extinct",
    shortFact:
      "The largest flying animal ever known, with a wingspan wider than a school bus at up to 12 meters.",
    facts: [
      "Named after the Aztec feathered serpent god Quetzalcoatl.",
      "Quetzalcoatlus walked on four limbs when on the ground.",
      "It could travel 16,000 km without stopping, soaring on thermals.",
      "Stood as tall as a modern giraffe when on the ground.",
      "Likely ate fish, small animals, and carrion.",
    ],
  },
  {
    id: BigInt(5),
    name: "Mantis Shrimp",
    category: "Sea Creatures",
    conservationStatus: "Least Concern",
    shortFact:
      "Has 16 types of photoreceptors — humans have just 3 — and can punch with the force of a bullet.",
    facts: [
      "The mantis shrimp's punch accelerates faster than a .22 caliber bullet.",
      "They can see ultraviolet, infrared, and polarized light.",
      "Their clubs can withstand forces that would shatter glass.",
      "Each eye moves independently, allowing 360-degree vision.",
      "They can strike prey in under 8 milliseconds.",
    ],
  },
  {
    id: BigInt(6),
    name: "Blue Whale",
    category: "Sea Creatures",
    conservationStatus: "Endangered",
    shortFact:
      "The largest animal ever known to have existed — its heart alone is the size of a small car.",
    facts: [
      "Blue whales can reach lengths of up to 100 feet (30 meters).",
      "Their vocalizations can be heard up to 1,000 miles away underwater.",
      "A blue whale's tongue weighs as much as an elephant.",
      "They consume up to 40 million krill per day — about 3,600 kg.",
      "Blue whales can live up to 90 years.",
    ],
  },
  {
    id: BigInt(7),
    name: "African Elephant",
    category: "Land Animals",
    conservationStatus: "Vulnerable",
    shortFact:
      "The largest land animal on Earth, with a brain three times larger than a human's and remarkable memory.",
    facts: [
      "African elephants can recognize themselves in mirrors — a sign of self-awareness.",
      "Elephants grieve their dead and hold 'funerals'.",
      "They communicate through infrasound rumbles that travel miles.",
      "An elephant's trunk contains over 40,000 muscles.",
      "They can live up to 70 years in the wild.",
    ],
  },
  {
    id: BigInt(8),
    name: "Fennec Fox",
    category: "Land Animals",
    conservationStatus: "Least Concern",
    shortFact:
      "The world's smallest fox, with ears proportionally larger than any other canid — up to 6 inches long.",
    facts: [
      "Fennec foxes live in the Sahara Desert and can survive without free-standing water.",
      "Their large ears dissipate heat and help locate prey underground.",
      "Fennec foxes are the national animal of Algeria.",
      "They are highly social and live in groups of up to 10.",
      "Can run up to 25 mph despite their tiny size.",
    ],
  },
];

const CATEGORIES = [
  "Rare Animals",
  "Dinosaurs",
  "Sea Creatures",
  "Land Animals",
];

const CATEGORY_CONFIG: Record<
  string,
  { emoji: string; gradient: string; pill: string; desc: string }
> = {
  "Rare Animals": {
    emoji: "🦁",
    gradient:
      "linear-gradient(135deg, oklch(0.38 0.12 290) 0%, oklch(0.50 0.16 305) 100%)",
    pill: "bg-purple-100 text-purple-800",
    desc: "Elusive species on the edge of survival",
  },
  Dinosaurs: {
    emoji: "🦕",
    gradient:
      "linear-gradient(135deg, oklch(0.52 0.14 55) 0%, oklch(0.65 0.17 70) 100%)",
    pill: "bg-amber-100 text-amber-800",
    desc: "Prehistoric giants that ruled the Earth",
  },
  "Sea Creatures": {
    emoji: "🐙",
    gradient:
      "linear-gradient(135deg, oklch(0.35 0.12 230) 0%, oklch(0.50 0.15 200) 100%)",
    pill: "bg-cyan-100 text-cyan-800",
    desc: "Wonders of the deep ocean world",
  },
  "Land Animals": {
    emoji: "🐘",
    gradient:
      "linear-gradient(135deg, oklch(0.38 0.12 145) 0%, oklch(0.52 0.15 155) 100%)",
    pill: "bg-emerald-100 text-emerald-800",
    desc: "Remarkable creatures of land and forest",
  },
};

const ANIMAL_IMAGES: Record<string, string> = {
  "Snow Leopard": "/assets/generated/animal-snow-leopard.dim_600x400.jpg",
  Okapi: "/assets/generated/animal-okapi.dim_600x400.jpg",
  "Tyrannosaurus Rex": "/assets/generated/animal-trex.dim_600x400.jpg",
  Quetzalcoatlus: "/assets/generated/animal-quetzalcoatlus.dim_600x400.jpg",
  "Mantis Shrimp": "/assets/generated/animal-mantis-shrimp.dim_600x400.jpg",
  "Blue Whale": "/assets/generated/animal-blue-whale.dim_600x400.jpg",
  "African Elephant": "/assets/generated/animal-elephant.dim_600x400.jpg",
  "Fennec Fox": "/assets/generated/animal-fennec-fox.dim_600x400.jpg",
};

const STATUS_COLORS: Record<string, string> = {
  "Least Concern": "bg-green-100 text-green-800",
  Vulnerable: "bg-yellow-100 text-yellow-800",
  Endangered: "bg-orange-100 text-orange-800",
  "Critically Endangered": "bg-red-100 text-red-800",
  Extinct: "bg-gray-200 text-gray-700",
};

const SKELETON_KEYS = ["sk1", "sk2", "sk3", "sk4"];

function AnimalCard({
  animal,
  index,
  onLearnMore,
}: { animal: Animal; index: number; onLearnMore: (a: Animal) => void }) {
  const cfg =
    CATEGORY_CONFIG[animal.category] ?? CATEGORY_CONFIG["Rare Animals"];
  const img = ANIMAL_IMAGES[animal.name];
  const statusCls =
    STATUS_COLORS[animal.conservationStatus] ?? "bg-gray-100 text-gray-700";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="bg-white rounded-2xl overflow-hidden border flex flex-col shadow-card hover:shadow-lg transition-shadow duration-300"
      style={{ borderColor: "var(--card-border)" }}
      data-ocid={`animals.item.${index + 1}`}
    >
      <div className="relative h-44 overflow-hidden">
        {img ? (
          <img
            src={img}
            alt={animal.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-6xl"
            style={{ background: cfg.gradient }}
          >
            {cfg.emoji}
          </div>
        )}
        <span
          className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.pill}`}
        >
          {animal.category}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="font-bold text-base leading-tight"
            style={{ color: "var(--text-dark)" }}
          >
            {animal.name}
          </h3>
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${statusCls}`}
          >
            {animal.conservationStatus}
          </span>
        </div>
        <p
          className="text-sm leading-relaxed flex-1"
          style={{ color: "var(--text-muted)" }}
        >
          {animal.shortFact}
        </p>
        <button
          type="button"
          className="mt-2 flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-75"
          style={{ color: "var(--teal-accent)" }}
          onClick={() => onLearnMore(animal)}
          data-ocid={`animals.secondary_button.${index + 1}`}
        >
          Learn More <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

function CategoryCard({
  category,
  count,
  active,
  onClick,
}: { category: string; count: number; active: boolean; onClick: () => void }) {
  const cfg = CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG["Rare Animals"];
  return (
    <motion.button
      type="button"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`rounded-2xl overflow-hidden border text-left w-full transition-all duration-200 ${
        active ? "shadow-md" : "hover:shadow-card"
      }`}
      style={{
        borderColor: active ? "var(--teal-accent)" : "var(--card-border)",
        boxShadow: active ? "0 0 0 2px var(--teal-accent)" : undefined,
      }}
      data-ocid="categories.tab"
    >
      <div
        className="h-28 flex items-center justify-center text-5xl"
        style={{ background: cfg.gradient }}
      >
        {cfg.emoji}
      </div>
      <div className="p-4 bg-white">
        <p className="font-bold text-sm" style={{ color: "var(--text-dark)" }}>
          {category}
        </p>
        <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
          {cfg.desc}
        </p>
        <p
          className="text-xs font-semibold mt-2"
          style={{ color: "var(--teal-accent)" }}
        >
          {count} animals
        </p>
      </div>
    </motion.button>
  );
}

function AnimalModal({
  animal,
  onClose,
}: { animal: Animal | null; onClose: () => void }) {
  if (!animal) return null;
  const cfg =
    CATEGORY_CONFIG[animal.category] ?? CATEGORY_CONFIG["Rare Animals"];
  const img = ANIMAL_IMAGES[animal.name];
  const statusCls =
    STATUS_COLORS[animal.conservationStatus] ?? "bg-gray-100 text-gray-700";

  return (
    <Dialog open={!!animal} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-lg p-0 overflow-hidden rounded-2xl"
        data-ocid="animals.modal"
      >
        <div className="relative h-52">
          {img ? (
            <img
              src={img}
              alt={animal.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-7xl"
              style={{ background: cfg.gradient }}
            >
              {cfg.emoji}
            </div>
          )}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 bg-black/40 text-white rounded-full p-1 hover:bg-black/60 transition-colors"
            data-ocid="animals.close_button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6">
          <DialogHeader>
            <div className="flex items-start justify-between gap-3 mb-3">
              <DialogTitle
                className="text-xl font-bold"
                style={{ color: "var(--text-dark)" }}
              >
                {animal.name}
              </DialogTitle>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${statusCls}`}
              >
                {animal.conservationStatus}
              </span>
            </div>
            <span
              className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${cfg.pill}`}
            >
              {animal.category}
            </span>
          </DialogHeader>
          <div className="mt-4">
            <h4
              className="font-semibold text-sm mb-2"
              style={{ color: "var(--text-dark)" }}
            >
              Amazing Facts
            </h4>
            <ul className="space-y-2">
              {animal.facts.map((fact) => (
                <li
                  key={fact}
                  className="flex gap-2.5 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  <Leaf
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    style={{ color: "var(--teal-accent)" }}
                  />
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FaunaApp() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: backendAnimals, isLoading } = useGetAllAnimals();
  const animals: Animal[] =
    backendAnimals && backendAnimals.length > 0
      ? backendAnimals
      : SAMPLE_ANIMALS;

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of CATEGORIES) {
      counts[c] = 0;
    }
    for (const a of animals) {
      counts[a.category] = (counts[a.category] ?? 0) + 1;
    }
    return counts;
  }, [animals]);

  const filtered = useMemo(() => {
    let list = animals;
    if (activeCategory)
      list = list.filter((a) => a.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.shortFact.toLowerCase().includes(q),
      );
    }
    return list;
  }, [animals, activeCategory, searchQuery]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleNavClick = (category: string) => {
    setActiveCategory(category);
    scrollToSection("animals-section");
  };

  const totalFacts = animals.reduce((acc, a) => acc + a.facts.length, 0);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header
        className="fauna-header sticky top-0 z-40 shadow-header"
        data-ocid="nav.panel"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => {
              setActiveCategory(null);
              scrollToSection("hero");
            }}
            className="flex items-center gap-2 text-white font-bold text-lg whitespace-nowrap flex-shrink-0"
            data-ocid="nav.link"
          >
            <span className="text-2xl">🐾</span>
            <span className="hidden sm:inline">Fauna Facts</span>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleNavClick(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-white/20 text-white"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                data-ocid="nav.link"
              >
                {cat}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setActiveCategory(null);
                scrollToSection("animals-section");
              }}
              className="px-3 py-1.5 rounded-full text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              data-ocid="nav.link"
            >
              All Animals
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type="text"
                placeholder="Search animals…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-full pl-9 pr-3 py-1.5 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 w-48"
                data-ocid="nav.search_input"
              />
            </div>
            <button
              type="button"
              className="btn-teal text-xs hidden sm:inline-flex"
              onClick={() => scrollToSection("animals-section")}
              data-ocid="nav.primary_button"
            >
              Explore Facts
            </button>
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="lg:hidden text-white/80 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-ocid="nav.toggle"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <title>Menu</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden"
              style={{ background: "var(--teal-mid)" }}
            >
              <div className="px-4 py-3 flex flex-col gap-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleNavClick(cat)}
                    className="text-left px-3 py-2 text-white/90 hover:bg-white/10 rounded-lg text-sm"
                  >
                    {CATEGORY_CONFIG[cat].emoji} {cat}
                  </button>
                ))}
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                  <input
                    type="text"
                    placeholder="Search animals…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-full pl-9 pr-3 py-2 text-sm text-white placeholder-white/50 focus:outline-none"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section
          id="hero"
          className="relative min-h-[520px] flex items-center overflow-hidden"
          data-ocid="hero.section"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.20 0.05 210) 0%, oklch(0.25 0.06 195) 40%, oklch(0.30 0.08 205) 70%, oklch(0.22 0.07 185) 100%)",
            }}
          />
          <img
            src="/assets/generated/hero-animals.dim_1600x700.jpg"
            alt="Diverse wildlife collage"
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(11,43,54,0.85) 0%, rgba(11,43,54,0.4) 55%, transparent 100%)",
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-xl"
            >
              <span
                className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 text-white/80"
                style={{
                  background: "rgba(42,174,156,0.25)",
                  border: "1px solid rgba(42,174,156,0.4)",
                }}
              >
                🌿 Wildlife Encyclopedia
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold uppercase leading-tight text-white mb-4">
                Discover The World's Most Amazing Animals
              </h1>
              <p className="text-base text-white/75 mb-8 leading-relaxed">
                Explore fascinating facts about rare species, ancient dinosaurs,
                mysterious sea creatures, and iconic land animals from every
                corner of our planet.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="btn-orange"
                  onClick={() => scrollToSection("animals-section")}
                  data-ocid="hero.primary_button"
                >
                  Explore Animals
                </button>
                <button
                  type="button"
                  className="btn-teal"
                  onClick={() => scrollToSection("categories-section")}
                  data-ocid="hero.secondary_button"
                >
                  Browse Categories
                </button>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex flex-wrap gap-6 pb-6">
                {[
                  { label: "Animal Species", value: `${animals.length}+` },
                  { label: "Categories", value: "4" },
                  { label: "Unique Facts", value: `${totalFacts}+` },
                ].map((s) => (
                  <div key={s.label} className="text-white">
                    <p
                      className="text-2xl font-extrabold"
                      style={{ color: "var(--teal-accent)" }}
                    >
                      {s.value}
                    </p>
                    <p className="text-xs text-white/60 uppercase tracking-wide">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section
          id="categories-section"
          className="py-16 bg-white"
          data-ocid="categories.section"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <p
                className="text-xs font-bold tracking-widest uppercase mb-2"
                style={{ color: "var(--teal-accent)" }}
              >
                Explore
              </p>
              <h2
                className="text-2xl sm:text-3xl font-extrabold uppercase"
                style={{ color: "var(--text-dark)" }}
              >
                Discover Animals By Category
              </h2>
              <p
                className="mt-2 text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                Click a category to filter the animal collection below
              </p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {CATEGORIES.map((cat, i) => (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <CategoryCard
                    category={cat}
                    count={categoryCounts[cat] ?? 0}
                    active={activeCategory === cat}
                    onClick={() => {
                      setActiveCategory(activeCategory === cat ? null : cat);
                      scrollToSection("animals-section");
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Animals grid */}
        <section
          id="animals-section"
          className="py-16"
          style={{ background: "oklch(0.97 0.005 210)" }}
          data-ocid="animals.section"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <p
                className="text-xs font-bold tracking-widest uppercase mb-2"
                style={{ color: "var(--teal-accent)" }}
              >
                Facts
              </p>
              <h2
                className="text-2xl sm:text-3xl font-extrabold uppercase"
                style={{ color: "var(--text-dark)" }}
              >
                {activeCategory ?? "Featured Animal Facts"}
              </h2>
            </motion.div>

            <div className="flex flex-wrap items-center gap-2 mb-8 justify-center">
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                  !activeCategory
                    ? "text-white border-transparent"
                    : "border-gray-300 text-gray-600 hover:border-gray-400"
                }`}
                style={
                  !activeCategory
                    ? {
                        background: "var(--teal-accent)",
                        borderColor: "var(--teal-accent)",
                      }
                    : {}
                }
                data-ocid="animals.tab"
              >
                All Animals
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() =>
                    setActiveCategory(cat === activeCategory ? null : cat)
                  }
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                    activeCategory === cat
                      ? "text-white border-transparent"
                      : "border-gray-300 text-gray-600 hover:border-gray-400"
                  }`}
                  style={
                    activeCategory === cat
                      ? {
                          background: "var(--teal-accent)",
                          borderColor: "var(--teal-accent)",
                        }
                      : {}
                  }
                  data-ocid="animals.tab"
                >
                  {CATEGORY_CONFIG[cat].emoji} {cat}
                </button>
              ))}
            </div>

            {isLoading ? (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                data-ocid="animals.loading_state"
              >
                {SKELETON_KEYS.map((k) => (
                  <div
                    key={k}
                    className="bg-white rounded-2xl overflow-hidden border animate-pulse"
                    style={{ borderColor: "var(--card-border)" }}
                  >
                    <div className="h-44 bg-gray-200" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-100 rounded" />
                      <div className="h-3 bg-gray-100 rounded w-5/6" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div
                className="text-center py-16"
                data-ocid="animals.empty_state"
              >
                <p className="text-5xl mb-4">🔍</p>
                <p
                  className="font-bold text-lg"
                  style={{ color: "var(--text-dark)" }}
                >
                  No animals found
                </p>
                <p
                  className="text-sm mt-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  Try a different search or category
                </p>
                <button
                  type="button"
                  className="btn-teal mt-4"
                  onClick={() => {
                    setActiveCategory(null);
                    setSearchQuery("");
                  }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filtered.map((animal, i) => (
                  <AnimalCard
                    key={Number(animal.id)}
                    animal={animal}
                    index={i}
                    onLearnMore={setSelectedAnimal}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Updates strip */}
        <section className="fauna-strip py-14" data-ocid="updates.section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase mb-2 text-white/60">
                  Did You Know?
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-white leading-tight mb-4">
                  The Animal Kingdom Never Stops Surprising Us
                </h2>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  From the deepest ocean trenches to the highest mountain peaks,
                  life finds a way. Explore our full collection of remarkable
                  animal facts.
                </p>
                <button
                  type="button"
                  className="btn-teal"
                  onClick={() => scrollToSection("animals-section")}
                  data-ocid="updates.primary_button"
                >
                  <ExternalLink className="w-4 h-4" /> Explore All Animals
                </button>
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest uppercase mb-4 text-white/60">
                  Recently Added Facts
                </p>
                <div className="space-y-3">
                  {SAMPLE_ANIMALS.slice(0, 3).map((animal, i) => {
                    const cfg = CATEGORY_CONFIG[animal.category];
                    return (
                      <motion.button
                        key={Number(animal.id)}
                        type="button"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => setSelectedAnimal(animal)}
                        className="flex items-center gap-3 w-full p-3 rounded-xl text-left transition-colors hover:bg-white/10"
                        style={{ background: "rgba(255,255,255,0.05)" }}
                        data-ocid={`updates.item.${i + 1}`}
                      >
                        <div
                          className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center text-2xl"
                          style={{ background: cfg.gradient }}
                        >
                          {cfg.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold text-sm">
                            {animal.name}
                          </p>
                          <p className="text-white/60 text-xs truncate">
                            {animal.shortFact.slice(0, 60)}…
                          </p>
                        </div>
                        <span
                          className="text-xs font-semibold whitespace-nowrap"
                          style={{ color: "var(--teal-accent)" }}
                        >
                          Learn More
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="fauna-footer py-12" data-ocid="footer.section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🐾</span>
                <span className="text-white font-bold text-lg">
                  Fauna Facts
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Exploring the incredible diversity of life on Earth, from
                prehistoric giants to the ocean's deepest mysteries.
              </p>
            </div>
            <div>
              <p className="text-white font-semibold text-sm mb-3 uppercase tracking-wide">
                Quick Links
              </p>
              <ul className="space-y-2">
                {(["Hero", "Categories", "Animals"] as const).map((l) => (
                  <li key={l}>
                    <button
                      type="button"
                      onClick={() =>
                        scrollToSection(
                          l === "Hero"
                            ? "hero"
                            : l === "Categories"
                              ? "categories-section"
                              : "animals-section",
                        )
                      }
                      className="text-white/60 text-sm hover:text-white transition-colors"
                      data-ocid="footer.link"
                    >
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold text-sm mb-3 uppercase tracking-wide">
                Categories
              </p>
              <ul className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <button
                      type="button"
                      onClick={() => handleNavClick(cat)}
                      className="text-white/60 text-sm hover:text-white transition-colors flex items-center gap-1.5"
                      data-ocid="footer.link"
                    >
                      <span>{CATEGORY_CONFIG[cat].emoji}</span> {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold text-sm mb-3 uppercase tracking-wide">
                Conservation
              </p>
              <ul className="space-y-2">
                {Object.entries(STATUS_COLORS).map(([status, cls]) => (
                  <li key={status} className="flex items-center gap-2">
                    <Badge
                      className={`text-[10px] px-1.5 py-0 ${cls} border-0`}
                    >
                      {status}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-white/10 text-center">
            <p className="text-white/40 text-xs">
              © {new Date().getFullYear()}. Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white/70 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      <AnimalModal
        animal={selectedAnimal}
        onClose={() => setSelectedAnimal(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FaunaApp />
    </QueryClientProvider>
  );
}
