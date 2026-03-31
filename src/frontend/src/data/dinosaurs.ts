export type Era = "Triassic" | "Jurassic" | "Cretaceous";
export type Diet = "Carnivore" | "Herbivore" | "Omnivore";

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface Dinosaur {
  id: string;
  name: string;
  era: Era;
  diet: Diet;
  length: string;
  weight: string;
  funFact: string;
  image: string;
  quiz: QuizQuestion[];
}

export const dinosaurs: Dinosaur[] = [
  {
    id: "eoraptor",
    name: "Eoraptor",
    era: "Triassic",
    diet: "Omnivore",
    length: "1m",
    weight: "10kg",
    funFact: "One of the earliest known dinosaurs, 231 million years ago",
    image: "/assets/generated/eoraptor.dim_600x400.jpg",
    quiz: [
      {
        question: "What era did Eoraptor live in?",
        options: ["Triassic", "Jurassic", "Cretaceous", "Permian"],
        answer: "Triassic",
      },
      {
        question: "What was Eoraptor's diet?",
        options: ["Carnivore", "Herbivore", "Omnivore", "Insectivore"],
        answer: "Omnivore",
      },
      {
        question: "How long was Eoraptor?",
        options: ["1m", "3m", "5m", "10m"],
        answer: "1m",
      },
      {
        question: "How long ago did Eoraptor live?",
        options: [
          "65 million years ago",
          "150 million years ago",
          "231 million years ago",
          "300 million years ago",
        ],
        answer: "231 million years ago",
      },
    ],
  },
  {
    id: "coelophysis",
    name: "Coelophysis",
    era: "Triassic",
    diet: "Carnivore",
    length: "3m",
    weight: "25kg",
    funFact:
      "Traveled in large packs and was one of the most common early dinosaurs",
    image: "/assets/generated/coelophysis.dim_600x400.jpg",
    quiz: [
      {
        question: "What era did Coelophysis live in?",
        options: ["Triassic", "Jurassic", "Cretaceous", "Devonian"],
        answer: "Triassic",
      },
      {
        question: "What was Coelophysis's diet?",
        options: ["Herbivore", "Omnivore", "Carnivore", "Piscivore"],
        answer: "Carnivore",
      },
      {
        question: "How long was Coelophysis?",
        options: ["1m", "3m", "6m", "12m"],
        answer: "3m",
      },
      {
        question: "What was notable about Coelophysis's social behavior?",
        options: [
          "It was solitary",
          "It traveled in large packs",
          "It cared for its eggs alone",
          "It was nocturnal",
        ],
        answer: "It traveled in large packs",
      },
    ],
  },
  {
    id: "plateosaurus",
    name: "Plateosaurus",
    era: "Triassic",
    diet: "Herbivore",
    length: "10m",
    weight: "4000kg",
    funFact: "Could walk on two or four legs and had a flexible diet",
    image: "/assets/generated/plateosaurus.dim_600x400.jpg",
    quiz: [
      {
        question: "What era did Plateosaurus live in?",
        options: ["Triassic", "Jurassic", "Cretaceous", "Permian"],
        answer: "Triassic",
      },
      {
        question: "What was Plateosaurus's diet?",
        options: ["Carnivore", "Omnivore", "Herbivore", "Piscivore"],
        answer: "Herbivore",
      },
      {
        question: "How long was Plateosaurus?",
        options: ["3m", "5m", "10m", "20m"],
        answer: "10m",
      },
      {
        question: "What was unique about Plateosaurus's movement?",
        options: [
          "It could only walk on two legs",
          "It could only walk on four legs",
          "It could walk on two or four legs",
          "It crawled on its belly",
        ],
        answer: "It could walk on two or four legs",
      },
    ],
  },
  {
    id: "brachiosaurus",
    name: "Brachiosaurus",
    era: "Jurassic",
    diet: "Herbivore",
    length: "26m",
    weight: "56000kg",
    funFact: "Its nostrils were on top of its head like a snorkel",
    image: "/assets/generated/brachiosaurus.dim_600x400.jpg",
    quiz: [
      {
        question: "What era did Brachiosaurus live in?",
        options: ["Triassic", "Jurassic", "Cretaceous", "Tertiary"],
        answer: "Jurassic",
      },
      {
        question: "What was Brachiosaurus's diet?",
        options: ["Carnivore", "Omnivore", "Herbivore", "Insectivore"],
        answer: "Herbivore",
      },
      {
        question: "How long was Brachiosaurus?",
        options: ["10m", "15m", "20m", "26m"],
        answer: "26m",
      },
      {
        question: "What was unique about Brachiosaurus's nostrils?",
        options: [
          "They were at the tip of its snout",
          "They were on top of its head",
          "They were on its neck",
          "It breathed through its skin",
        ],
        answer: "They were on top of its head",
      },
    ],
  },
  {
    id: "stegosaurus",
    name: "Stegosaurus",
    era: "Jurassic",
    diet: "Herbivore",
    length: "9m",
    weight: "5000kg",
    funFact: "Its brain was the size of a walnut despite its enormous body",
    image: "/assets/generated/stegosaurus.dim_600x400.jpg",
    quiz: [
      {
        question: "What era did Stegosaurus live in?",
        options: ["Triassic", "Jurassic", "Cretaceous", "Permian"],
        answer: "Jurassic",
      },
      {
        question: "What was Stegosaurus's diet?",
        options: ["Carnivore", "Omnivore", "Herbivore", "Piscivore"],
        answer: "Herbivore",
      },
      {
        question: "What was famously tiny about the Stegosaurus?",
        options: ["Its feet", "Its teeth", "Its brain", "Its eyes"],
        answer: "Its brain",
      },
      {
        question: "How much did Stegosaurus weigh?",
        options: ["500kg", "2000kg", "5000kg", "15000kg"],
        answer: "5000kg",
      },
    ],
  },
  {
    id: "allosaurus",
    name: "Allosaurus",
    era: "Jurassic",
    diet: "Carnivore",
    length: "12m",
    weight: "2300kg",
    funFact: "The apex predator of the Jurassic, it hunted in packs",
    image: "/assets/generated/allosaurus.dim_600x400.jpg",
    quiz: [
      {
        question: "What era did Allosaurus live in?",
        options: ["Triassic", "Jurassic", "Cretaceous", "Paleogene"],
        answer: "Jurassic",
      },
      {
        question: "What was Allosaurus's diet?",
        options: ["Herbivore", "Omnivore", "Carnivore", "Insectivore"],
        answer: "Carnivore",
      },
      {
        question: "What role did Allosaurus play in the Jurassic ecosystem?",
        options: [
          "Prey animal",
          "Apex predator",
          "Scavenger only",
          "Filter feeder",
        ],
        answer: "Apex predator",
      },
      {
        question: "How long was Allosaurus?",
        options: ["6m", "9m", "12m", "18m"],
        answer: "12m",
      },
    ],
  },
  {
    id: "diplodocus",
    name: "Diplodocus",
    era: "Jurassic",
    diet: "Herbivore",
    length: "27m",
    weight: "16000kg",
    funFact: "Could crack its tail like a whip to make a sonic boom",
    image: "/assets/generated/diplodocus.dim_600x400.jpg",
    quiz: [
      {
        question: "What era did Diplodocus live in?",
        options: ["Triassic", "Jurassic", "Cretaceous", "Neogene"],
        answer: "Jurassic",
      },
      {
        question: "What was Diplodocus's diet?",
        options: ["Carnivore", "Omnivore", "Herbivore", "Piscivore"],
        answer: "Herbivore",
      },
      {
        question: "What could Diplodocus do with its tail?",
        options: [
          "Use it as a weapon against T-Rex",
          "Crack it like a whip making a sonic boom",
          "Swim using it as a rudder",
          "Store fat in it",
        ],
        answer: "Crack it like a whip making a sonic boom",
      },
      {
        question: "How long was Diplodocus?",
        options: ["15m", "20m", "27m", "35m"],
        answer: "27m",
      },
    ],
  },
  {
    id: "pterodactyl",
    name: "Pterodactyl",
    era: "Jurassic",
    diet: "Carnivore",
    length: "1.8m wingspan",
    weight: "5kg",
    funFact:
      "Technically a pterosaur, not a dinosaur, but lived alongside them",
    image: "/assets/generated/pterodactyl.dim_600x400.jpg",
    quiz: [
      {
        question: "What era did Pterodactyl live in?",
        options: ["Triassic", "Jurassic", "Cretaceous", "Permian"],
        answer: "Jurassic",
      },
      {
        question: "What was Pterodactyl's diet?",
        options: ["Herbivore", "Omnivore", "Carnivore", "Insectivore"],
        answer: "Carnivore",
      },
      {
        question: "What is Pterodactyl technically classified as?",
        options: [
          "A dinosaur",
          "A pterosaur",
          "A bird",
          "A reptile-bird hybrid",
        ],
        answer: "A pterosaur",
      },
      {
        question: "How much did Pterodactyl weigh?",
        options: ["1kg", "5kg", "20kg", "50kg"],
        answer: "5kg",
      },
    ],
  },
  {
    id: "ceratosaurus",
    name: "Ceratosaurus",
    era: "Jurassic",
    diet: "Carnivore",
    length: "6m",
    weight: "500kg",
    funFact: "Had a distinctive horn on its nose used for display",
    image: "/assets/generated/ceratosaurus.dim_600x400.jpg",
    quiz: [
      {
        question: "What era did Ceratosaurus live in?",
        options: ["Triassic", "Jurassic", "Cretaceous", "Eocene"],
        answer: "Jurassic",
      },
      {
        question: "What was Ceratosaurus's diet?",
        options: ["Herbivore", "Omnivore", "Carnivore", "Piscivore"],
        answer: "Carnivore",
      },
      {
        question: "What distinctive feature did Ceratosaurus have on its nose?",
        options: ["A crest", "A horn", "A beak", "Nostrils on top"],
        answer: "A horn",
      },
      {
        question: "What was the horn on Ceratosaurus used for?",
        options: ["Combat", "Digging", "Display", "Breathing"],
        answer: "Display",
      },
    ],
  },
  {
    id: "trex",
    name: "T-Rex",
    era: "Cretaceous",
    diet: "Carnivore",
    length: "12m",
    weight: "8000kg",
    funFact: "Had arms too short to reach its own mouth",
    image: "/assets/generated/trex.dim_600x400.jpg",
    quiz: [
      {
        question: "What era did T-Rex live in?",
        options: ["Triassic", "Jurassic", "Cretaceous", "Paleogene"],
        answer: "Cretaceous",
      },
      {
        question: "What was T-Rex's diet?",
        options: ["Herbivore", "Omnivore", "Carnivore", "Insectivore"],
        answer: "Carnivore",
      },
      {
        question: "What was famously unusual about T-Rex's arms?",
        options: [
          "They were extremely long",
          "They were too short to reach its mouth",
          "They had five fingers",
          "They were used for swimming",
        ],
        answer: "They were too short to reach its mouth",
      },
      {
        question: "How much did T-Rex weigh?",
        options: ["2000kg", "4000kg", "8000kg", "20000kg"],
        answer: "8000kg",
      },
    ],
  },
  {
    id: "triceratops",
    name: "Triceratops",
    era: "Cretaceous",
    diet: "Herbivore",
    length: "9m",
    weight: "12000kg",
    funFact:
      "Its frill may have changed color to communicate with other dinosaurs",
    image: "/assets/generated/triceratops.dim_600x400.jpg",
    quiz: [
      {
        question: "What era did Triceratops live in?",
        options: ["Triassic", "Jurassic", "Cretaceous", "Paleocene"],
        answer: "Cretaceous",
      },
      {
        question: "What was Triceratops's diet?",
        options: ["Carnivore", "Omnivore", "Herbivore", "Piscivore"],
        answer: "Herbivore",
      },
      {
        question: "What might Triceratops's frill have been used for?",
        options: [
          "Defense only",
          "Temperature regulation",
          "Communication via color change",
          "Camouflage",
        ],
        answer: "Communication via color change",
      },
      {
        question: "How many horns did Triceratops have?",
        options: ["1", "2", "3", "4"],
        answer: "3",
      },
    ],
  },
  {
    id: "velociraptor",
    name: "Velociraptor",
    era: "Cretaceous",
    diet: "Carnivore",
    length: "2m",
    weight: "15kg",
    funFact: "Was actually feathered and about the size of a turkey",
    image: "/assets/generated/velociraptor.dim_600x400.jpg",
    quiz: [
      {
        question: "What era did Velociraptor live in?",
        options: ["Triassic", "Jurassic", "Cretaceous", "Holocene"],
        answer: "Cretaceous",
      },
      {
        question: "What was Velociraptor's diet?",
        options: ["Herbivore", "Omnivore", "Carnivore", "Insectivore"],
        answer: "Carnivore",
      },
      {
        question: "What was Velociraptor actually covered in?",
        options: ["Scales", "Feathers", "Smooth skin", "Armor plates"],
        answer: "Feathers",
      },
      {
        question: "What common bird was Velociraptor roughly the same size as?",
        options: ["Eagle", "Ostrich", "Turkey", "Penguin"],
        answer: "Turkey",
      },
    ],
  },
  {
    id: "ankylosaurus",
    name: "Ankylosaurus",
    era: "Cretaceous",
    diet: "Herbivore",
    length: "10m",
    weight: "6000kg",
    funFact: "Its tail club could shatter bone and even T-Rex bones",
    image: "/assets/generated/ankylosaurus.dim_600x400.jpg",
    quiz: [
      {
        question: "What era did Ankylosaurus live in?",
        options: ["Triassic", "Jurassic", "Cretaceous", "Oligocene"],
        answer: "Cretaceous",
      },
      {
        question: "What was Ankylosaurus's diet?",
        options: ["Carnivore", "Omnivore", "Herbivore", "Piscivore"],
        answer: "Herbivore",
      },
      {
        question: "What could Ankylosaurus's tail club do?",
        options: [
          "Act as a sensor",
          "Shatter bone",
          "Dig burrows",
          "Produce sounds",
        ],
        answer: "Shatter bone",
      },
      {
        question: "How much did Ankylosaurus weigh?",
        options: ["1000kg", "3000kg", "6000kg", "12000kg"],
        answer: "6000kg",
      },
    ],
  },
  {
    id: "spinosaurus",
    name: "Spinosaurus",
    era: "Cretaceous",
    diet: "Carnivore",
    length: "15m",
    weight: "7000kg",
    funFact:
      "The largest carnivorous dinosaur ever discovered, larger than T-Rex",
    image: "/assets/generated/spinosaurus.dim_600x400.jpg",
    quiz: [
      {
        question: "What era did Spinosaurus live in?",
        options: ["Triassic", "Jurassic", "Cretaceous", "Eocene"],
        answer: "Cretaceous",
      },
      {
        question: "What was Spinosaurus's diet?",
        options: ["Herbivore", "Omnivore", "Carnivore", "Insectivore"],
        answer: "Carnivore",
      },
      {
        question: "What record does Spinosaurus hold?",
        options: [
          "Largest dinosaur ever",
          "Fastest dinosaur",
          "Largest carnivorous dinosaur ever discovered",
          "Most intelligent dinosaur",
        ],
        answer: "Largest carnivorous dinosaur ever discovered",
      },
      {
        question: "How long was Spinosaurus?",
        options: ["10m", "12m", "15m", "20m"],
        answer: "15m",
      },
    ],
  },
  {
    id: "parasaurolophus",
    name: "Parasaurolophus",
    era: "Cretaceous",
    diet: "Herbivore",
    length: "10m",
    weight: "2500kg",
    funFact:
      "Used its hollow crest to produce low, resonant sounds like a trombone",
    image: "/assets/generated/parasaurolophus.dim_600x400.jpg",
    quiz: [
      {
        question: "What era did Parasaurolophus live in?",
        options: ["Triassic", "Jurassic", "Cretaceous", "Miocene"],
        answer: "Cretaceous",
      },
      {
        question: "What was Parasaurolophus's diet?",
        options: ["Carnivore", "Omnivore", "Herbivore", "Piscivore"],
        answer: "Herbivore",
      },
      {
        question:
          "What instrument does Parasaurolophus's crest sound compare to?",
        options: ["Trumpet", "Drum", "Trombone", "Flute"],
        answer: "Trombone",
      },
      {
        question: "What was the crest of Parasaurolophus used for?",
        options: [
          "Combat",
          "Storing water",
          "Producing sounds",
          "Sensing predators",
        ],
        answer: "Producing sounds",
      },
    ],
  },
  {
    id: "pachycephalosaurus",
    name: "Pachycephalosaurus",
    era: "Cretaceous",
    diet: "Herbivore",
    length: "5m",
    weight: "450kg",
    funFact: "Its domed skull was 25cm thick and used for head-butting rivals",
    image: "/assets/generated/pachycephalosaurus.dim_600x400.jpg",
    quiz: [
      {
        question: "What era did Pachycephalosaurus live in?",
        options: ["Triassic", "Jurassic", "Cretaceous", "Pliocene"],
        answer: "Cretaceous",
      },
      {
        question: "What was Pachycephalosaurus's diet?",
        options: ["Carnivore", "Omnivore", "Herbivore", "Piscivore"],
        answer: "Herbivore",
      },
      {
        question: "How thick was Pachycephalosaurus's domed skull?",
        options: ["5cm", "10cm", "25cm", "50cm"],
        answer: "25cm",
      },
      {
        question: "What was Pachycephalosaurus's thick skull used for?",
        options: [
          "Protection from predators",
          "Head-butting rivals",
          "Digging for roots",
          "Attracting mates visually",
        ],
        answer: "Head-butting rivals",
      },
    ],
  },
  {
    id: "carnotaurus",
    name: "Carnotaurus",
    era: "Cretaceous",
    diet: "Carnivore",
    length: "8m",
    weight: "1500kg",
    funFact:
      "Had two bull-like horns and was one of the fastest large theropods",
    image: "/assets/generated/carnotaurus.dim_600x400.jpg",
    quiz: [
      {
        question: "What era did Carnotaurus live in?",
        options: ["Triassic", "Jurassic", "Cretaceous", "Quaternary"],
        answer: "Cretaceous",
      },
      {
        question: "What was Carnotaurus's diet?",
        options: ["Herbivore", "Omnivore", "Carnivore", "Insectivore"],
        answer: "Carnivore",
      },
      {
        question: "What distinctive feature did Carnotaurus have on its head?",
        options: ["A crest", "A sail", "Two bull-like horns", "A beak"],
        answer: "Two bull-like horns",
      },
      {
        question: "What was Carnotaurus known for among large theropods?",
        options: [
          "Being the largest",
          "Being one of the fastest",
          "Having the most powerful bite",
          "Being the most intelligent",
        ],
        answer: "Being one of the fastest",
      },
    ],
  },
  {
    id: "therizinosaurus",
    name: "Therizinosaurus",
    era: "Cretaceous",
    diet: "Herbivore",
    length: "10m",
    weight: "5000kg",
    funFact:
      "Had the longest claws of any land animal ever, up to 1 meter long",
    image: "/assets/generated/therizinosaurus.dim_600x400.jpg",
    quiz: [
      {
        question: "What era did Therizinosaurus live in?",
        options: ["Triassic", "Jurassic", "Cretaceous", "Paleogene"],
        answer: "Cretaceous",
      },
      {
        question: "What was Therizinosaurus's diet?",
        options: ["Carnivore", "Omnivore", "Herbivore", "Piscivore"],
        answer: "Herbivore",
      },
      {
        question: "How long were Therizinosaurus's claws?",
        options: ["20cm", "50cm", "1 meter", "2 meters"],
        answer: "1 meter",
      },
      {
        question: "What record did Therizinosaurus hold for its claws?",
        options: [
          "Strongest claws ever",
          "Longest claws of any land animal ever",
          "Fastest-growing claws",
          "Sharpest claws of any dinosaur",
        ],
        answer: "Longest claws of any land animal ever",
      },
    ],
  },
];
