import Text "mo:core/Text";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";



actor {
  type Dinosaur = {
    id : Nat;
    name : Text;
    era : Text;
    diet : Text;
    period : Text;
    length : Text;
    description : Text;
    interestingFact : Text;
  };

  public type DinosaurInput = {
    name : Text;
    era : Text;
    diet : Text;
    period : Text;
    length : Text;
    description : Text;
    interestingFact : Text;
  };

  module Dinosaur {
    public func compare(d1 : Dinosaur, d2 : Dinosaur) : Order.Order {
      Nat.compare(d1.id, d2.id);
    };
  };

  var nextId = 13;
  let dinosaurs = List.empty<Dinosaur>();

  let quickFunFacts = [
    "The heaviest dinosaur was Argentinosaurus weighing 77 tons.",
    "Stegosaurus had a brain the size of a walnut.",
    "Allosaurus fossils have been found with broken bones that healed.",
    "The closest living relative to dinosaurs is the bird.",
    "Some dinosaurs could run up to 40mph.",
    "Triceratops means 'three-horned face'.",
    "Dinosaurs lived on all continents.",
    "The Smartest dinosaur was Troodon.",
  ];

  func seedDinosaurs() {
    let seededDinosaurs = [
      {
        id = 1;
        name = "Tyrannosaurus Rex";
        era = "Cretaceous";
        diet = "Carnivore";
        period = "68-66 million years ago";
        length = "40 feet";
        description = "T-Rex was one of the largest meat-eating dinosaurs that ever lived.";
        interestingFact = "It had one of the strongest bites of any animal ever.";
      },
      {
        id = 2;
        name = "Triceratops";
        era = "Cretaceous";
        diet = "Herbivore";
        period = "68-66 million years ago";
        length = "30 feet";
        description = "Triceratops was known for its three horns and large bony frill.";
        interestingFact = "Its horns were likely used for defense and combat with rivals.";
      },
      {
        id = 3;
        name = "Stegosaurus";
        era = "Jurassic";
        diet = "Herbivore";
        period = "155-150 million years ago";
        length = "30 feet";
        description = "Stegosaurus is famous for its row of bony plates along its back.";
        interestingFact = "Its tail spikes were called 'thagomizers'.";
      },
      {
        id = 4;
        name = "Velociraptor";
        era = "Cretaceous";
        diet = "Carnivore";
        period = "75-71 million years ago";
        length = "6.8 feet";
        description = "Velociraptor was a small but fierce predator.";
        interestingFact = "Contrary to movies, real velociraptors were about the size of a turkey.";
      },
      {
        id = 5;
        name = "Brachiosaurus";
        era = "Jurassic";
        diet = "Herbivore";
        period = "154-153 million years ago";
        length = "85 feet";
        description = "Brachiosaurus had long necks and was one of the tallest dinosaurs.";
        interestingFact = "Its longer front legs gave its neck an upward angle.";
      },
      {
        id = 6;
        name = "Ankylosaurus";
        era = "Cretaceous";
        diet = "Herbivore";
        period = "68-66 million years ago";
        length = "26 feet";
        description = "Ankylosaurus was heavily armored with a large club-like tail.";
        interestingFact = "Its body armor protected it from predators.";
      },
      {
        id = 7;
        name = "Allosaurus";
        era = "Jurassic";
        diet = "Carnivore";
        period = "155-150 million years ago";
        length = "28 feet";
        description = "Allosaurus was a top predator of the late Jurassic period.";
        interestingFact = "It had sharp teeth and strong jaws.";
      },
      {
        id = 8;
        name = "Iguanodon";
        era = "Cretaceous";
        diet = "Herbivore";
        period = "126-122 million years ago";
        length = "33 feet";
        description = "Iguanodon was one of the first dinosaurs discovered.";
        interestingFact = "It had thumb spikes for defense.";
      },
      {
        id = 9;
        name = "Apatosaurus";
        era = "Jurassic";
        diet = "Herbivore";
        period = "152-151 million years ago";
        length = "75 feet";
        description = "Apatosaurus was a large long-necked dinosaur.";
        interestingFact = "Its long tail could probably make a cracking sound.";
      },
      {
        id = 10;
        name = "Pteranodon";
        era = "Cretaceous";
        diet = "Carnivore";
        period = "83-70 million years ago";
        length = "Wingspan 20-25 feet";
        description = "Pteranodon was a large flying reptile.";
        interestingFact = "It wasn't actually a dinosaur, but a pterosaur.";
      },
      {
        id = 11;
        name = "Compsognathus";
        era = "Jurassic";
        diet = "Carnivore";
        period = "150 million years ago";
        length = "3.3 feet";
        description = "Compsognathus was one of the smallest dinosaurs.";
        interestingFact = "It could run very fast to catch prey.";
      },
      {
        id = 12;
        name = "Plateosaurus";
        era = "Triassic";
        diet = "Herbivore";
        period = "214-204 million years ago";
        length = "27 feet";
        description = "Plateosaurus lived during the late Triassic period.";
        interestingFact = "It was one of the earliest large plant-eating dinosaurs.";
      },
    ];
    dinosaurs.addAll(seededDinosaurs.values());
  };

  seedDinosaurs();

  public shared ({ caller }) func addDinosaur(input : DinosaurInput) : async () {
    let newDinosaur : Dinosaur = {
      id = nextId;
      name = input.name;
      era = input.era;
      diet = input.diet;
      period = input.period;
      length = input.length;
      description = input.description;
      interestingFact = input.interestingFact;
    };
    dinosaurs.add(newDinosaur);
    nextId += 1;
  };

  public query ({ caller }) func getAllDinosaurs() : async [Dinosaur] {
    dinosaurs.toArray().sort();
  };

  public query ({ caller }) func getDinosaursByEra(era : Text) : async [Dinosaur] {
    dinosaurs.filter(
      func(dino) { Text.equal(dino.era, era) }
    ).toArray().sort();
  };

  public query ({ caller }) func getDinosaurById(id : Nat) : async Dinosaur {
    let found = dinosaurs.filter(
      func(dino) { dino.id == id }
    ).toArray();
    if (found.size() == 0) {
      Runtime.trap("Dinosaur not found");
    } else {
      found[0];
    };
  };

  public query ({ caller }) func getQuickFunFacts() : async [Text] {
    quickFunFacts;
  };
};
