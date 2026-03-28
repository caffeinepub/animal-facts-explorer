import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import List "mo:core/List";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  type Animal = {
    id : Nat;
    name : Text;
    category : Text;
    shortFact : Text;
    facts : [Text];
    conservationStatus : Text;
  };

  module Animal {
    public func compare(animal1 : Animal, animal2 : Animal) : Order.Order {
      Nat.compare(animal1.id, animal2.id);
    };
  };

  let animals = List.empty<Animal>();

  let categories = ["Rare Animals", "Dinosaurs", "Sea Creatures", "Land Animals"];
  let categoriesArray = categories;

  func seedAnimals() {
    let seededAnimals = [
      // Rare Animals
      {
        id = 1;
        name = "Axolotl";
        category = "Rare Animals";
        shortFact = "The axolotl can regrow lost limbs.";
        facts = [
          "Axolotls are neotenic salamanders that retain juvenile features throughout their lifespan.",
          "They are critically endangered in the wild due to urbanization and water pollution.",
          "Axolotls are native to the lakes surrounding Mexico City.",
          "They have the remarkable ability to regenerate their heart, brain, and spine without scarring.",
        ];
        conservationStatus = "Critically Endangered";
      },
      {
        id = 2;
        name = "Saola";
        category = "Rare Animals";
        shortFact = "The Saola is often called the Asian unicorn.";
        facts = [
          "The Saola was discovered in 1992, making it one of the most recent large mammal discoveries.",
          "It is native to the Annamite Range of Vietnam and Laos.",
          "The Saola is rarely seen and has only been photographed a few times in the wild.",
          "Less than a thousand individuals are estimated to exist.",
        ];
        conservationStatus = "Critically Endangered";
      },
      {
        id = 3;
        name = "Pangolin";
        category = "Rare Animals";
        shortFact = "Pangolins are the only mammals with true scales.";
        facts = [
          "There are eight species of pangolin, found across Africa and Asia.",
          "They roll into a tight ball when threatened, using their scales as armor.",
          "Pangolins are the most trafficked mammal in the world.",
          "Their diet consists mainly of ants and termites.",
        ];
        conservationStatus = "Endangered";
      },

      // Dinosaurs
      {
        id = 4;
        name = "Tyrannosaurus Rex";
        category = "Dinosaurs";
        shortFact = "T-Rex had one of the strongest bites in history.";
        facts = [
          "T-Rex lived around 68 million years ago during the late Cretaceous period.",
          "It could grow up to 40 feet long and 12 feet tall at the hips.",
          "T-Rex had keen eyesight and an excellent sense of smell.",
          "Despite popular belief, T-Rex could likely run up to 20 mph.",
        ];
        conservationStatus = "Extinct";
      },
      {
        id = 5;
        name = "Triceratops";
        category = "Dinosaurs";
        shortFact = "Triceratops means 'three-horned face'.";
        facts = [
          "Triceratops lived about 68-66 million years ago, also during the late Cretaceous period.",
          "It had three facial horns and a large bony frill.",
          "Triceratops fossils are commonly found in North America.",
          "Its beak was designed for eating tough, fibrous plants.",
        ];
        conservationStatus = "Extinct";
      },
      {
        id = 6;
        name = "Velociraptor";
        category = "Dinosaurs";
        shortFact = "Velociraptors were actually the size of turkeys.";
        facts = [
          "They lived about 75 to 71 million years ago.",
          "Velociraptors had sharp, curved claws and were likely covered in feathers.",
          "They were skilled hunters and scavengers.",
          "Despite their small size, they were among the most intelligent dinosaurs.",
        ];
        conservationStatus = "Extinct";
      },

      // Sea Creatures
      {
        id = 7;
        name = "Blue Whale";
        category = "Sea Creatures";
        shortFact = "Blue whales are the largest animals ever known to exist.";
        facts = [
          "An adult blue whale can weigh up to 200 tons.",
          "Their heart is the size of a small car and weighs around 400 pounds.",
          "Blue whales communicate using low-frequency sounds that can travel for miles underwater.",
          "Despite their size, they feed primarily on tiny shrimp-like animals called krill.",
        ];
        conservationStatus = "Endangered";
      },
      {
        id = 8;
        name = "Giant Squid";
        category = "Sea Creatures";
        shortFact = "Giant squids can reach lengths of up to 43 feet.";
        facts = [
          "They have the largest eyes in the animal kingdom, about the size of a basketball.",
          "Giant squids were the inspiration for the legendary sea monster, the Kraken.",
          "They live at depths of up to 3,000 feet and are rarely seen by humans.",
          "Their tentacles are lined with suckers and hooks for capturing prey.",
        ];
        conservationStatus = "Unknown";
      },
      {
        id = 9;
        name = "Clownfish";
        category = "Sea Creatures";
        shortFact = "Clownfish live in symbiosis with sea anemones.";
        facts = [
          "They are immune to the stings of sea anemones due to a special mucus coating on their skin.",
          "Clownfish can change sex, with the dominant male becoming female when necessary.",
          "There are around 30 different species of clownfish.",
          "Their bright coloration serves as a warning to predators.",
        ];
        conservationStatus = "Least Concern";
      },

      // Land Animals
      {
        id = 10;
        name = "African Elephant";
        category = "Land Animals";
        shortFact = "African elephants are the largest land animals on Earth.";
        facts = [
          "They have larger ears than their Asian counterparts, which help regulate body temperature.",
          "Elephants use their trunks for breathing, drinking, and grasping objects.",
          "Females live in family groups led by a matriarch.",
          "An elephant’s brain weighs about 11 pounds, keeping them among the smartest animals.",
        ];
        conservationStatus = "Vulnerable";
      },
      {
        id = 11;
        name = "Cheetah";
        category = "Land Animals";
        shortFact = "Cheetahs are the fastest land animals, reaching speeds up to 75 mph.";
        facts = [
          "They can accelerate from 0 to 60 mph in just a few seconds.",
          "Cheetahs have distinctive black 'tear marks' running from the eyes to the mouth.",
          "Despite their speed, cheetahs tire quickly after short sprints.",
          "They hunt primarily during the day to avoid competition with larger predators.",
        ];
        conservationStatus = "Vulnerable";
      },
      {
        id = 12;
        name = "Giant Panda";
        category = "Land Animals";
        shortFact = "Giant pandas have a diet consisting almost entirely of bamboo.";
        facts = [
          "They spend up to 12 hours a day eating.",
          "Giant pandas have specially adapted wrist bones that function like thumbs.",
          "There are an estimated 1,800 pandas left in the wild.",
          "Panda cubs are born pink, blind, and helpless.",
        ];
        conservationStatus = "Vulnerable";
      },
    ];
    animals.addAll(seededAnimals.values());
  };

  seedAnimals();

  public query func getAllAnimals() : async [Animal] {
    animals.toArray().sort();
  };

  public query func getAnimalsByCategory(category : Text) : async [Animal] {
    animals.filter(
      func(animal) { Text.equal(animal.category, category) }
    ).toArray().sort();
  };

  public query func getAnimal(id : Nat) : async Animal {
    let found = animals.filter(
      func(animal) { animal.id == id }
    ).toArray();

    if (found.size() == 0) {
      Runtime.trap("Animal not found");
    } else {
      found[0];
    };
  };

  public query func getCategories() : async [Text] {
    categoriesArray;
  };
};
