/**
 * Letters Game Data
 * 26 levels, one for each letter of the alphabet
 */

export type ImageItem = {
  id: string;
  label: string;
  emoji: string; // using emoji as placeholder for images
  audioFile: string; // audio pronunciation file
  imageUrl?: string; // option for actual images later
};

export type LetterLevel = {
  id: string;
  letter: string;
  letterUpper: string;
  images: ImageItem[];
};

export const LETTER_LEVELS: LetterLevel[] = [
  {
    id: "1",
    letter: "a",
    letterUpper: "A",
    images: [
      {
        id: "a-1",
        label: "Apple",
        emoji: "🍎",
        audioFile: "apple.mp3",
      },
      {
        id: "a-2",
        label: "Ant",
        emoji: "🐜",
        audioFile: "ant.mp3",
      },
      {
        id: "a-3",
        label: "Arrow",
        emoji: "🏹",
        audioFile: "arrow.mp3",
      },
    ],
  },
  {
    id: "2",
    letter: "b",
    letterUpper: "B",
    images: [
      {
        id: "b-1",
        label: "Ball",
        emoji: "⚽",
        audioFile: "ball.mp3",
      },
      {
        id: "b-2",
        label: "Balloon",
        emoji: "🎈",
        audioFile: "balloon.mp3",
      },
      {
        id: "b-3",
        label: "Banana",
        emoji: "🍌",
        audioFile: "banana.mp3",
      },
    ],
  },
  {
    id: "3",
    letter: "c",
    letterUpper: "C",
    images: [
      {
        id: "c-1",
        label: "Cat",
        emoji: "🐱",
        audioFile: "cat.mp3",
      },
      {
        id: "c-2",
        label: "Car",
        emoji: "🚗",
        audioFile: "car.mp3",
      },
      {
        id: "c-3",
        label: "Cake",
        emoji: "🎂",
        audioFile: "cake.mp3",
      },
    ],
  },
  {
    id: "4",
    letter: "d",
    letterUpper: "D",
    images: [
      {
        id: "d-1",
        label: "Dog",
        emoji: "🐶",
        audioFile: "dog.mp3",
      },
      {
        id: "d-2",
        label: "Dinosaur",
        emoji: "🦕",
        audioFile: "dinosaur.mp3",
      },
      {
        id: "d-3",
        label: "Duck",
        emoji: "🦆",
        audioFile: "duck.mp3",
      },
    ],
  },
  {
    id: "5",
    letter: "e",
    letterUpper: "E",
    images: [
      {
        id: "e-1",
        label: "Elephant",
        emoji: "🐘",
        audioFile: "elephant.mp3",
      },
      {
        id: "e-2",
        label: "Egg",
        emoji: "🥚",
        audioFile: "egg.mp3",
      },
      {
        id: "e-3",
        label: "Eggplant",
        emoji: "🍆",
        audioFile: "eggplant.mp3",
      },
    ],
  },
  {
    id: "6",
    letter: "f",
    letterUpper: "F",
    images: [
      {
        id: "f-1",
        label: "Fish",
        emoji: "🐠",
        audioFile: "fish.mp3",
      },
      {
        id: "f-2",
        label: "Flower",
        emoji: "🌸",
        audioFile: "flower.mp3",
      },
      {
        id: "f-3",
        label: "Frog",
        emoji: "🐸",
        audioFile: "frog.mp3",
      },
    ],
  },
  {
    id: "7",
    letter: "g",
    letterUpper: "G",
    images: [
      {
        id: "g-1",
        label: "Grapes",
        emoji: "🍇",
        audioFile: "grapes.mp3",
      },
      {
        id: "g-2",
        label: "Giraffe",
        emoji: "🦒",
        audioFile: "giraffe.mp3",
      },
      {
        id: "g-3",
        label: "Guitar",
        emoji: "🎸",
        audioFile: "guitar.mp3",
      },
    ],
  },
  {
    id: "8",
    letter: "h",
    letterUpper: "H",
    images: [
      {
        id: "h-1",
        label: "Hat",
        emoji: "🎩",
        audioFile: "hat.mp3",
      },
      {
        id: "h-2",
        label: "Heart",
        emoji: "❤️",
        audioFile: "heart.mp3",
      },
      {
        id: "h-3",
        label: "House",
        emoji: "🏠",
        audioFile: "house.mp3",
      },
    ],
  },
  {
    id: "9",
    letter: "i",
    letterUpper: "I",
    images: [
      {
        id: "i-1",
        label: "Ice Cream",
        emoji: "🍦",
        audioFile: "ice-cream.mp3",
      },
      {
        id: "i-2",
        label: "Igloo",
        emoji: "🏔️",
        audioFile: "igloo.mp3",
      },
      {
        id: "i-3",
        label: "Ink",
        emoji: "💧",
        audioFile: "ink.mp3",
      },
    ],
  },
  {
    id: "10",
    letter: "j",
    letterUpper: "J",
    images: [
      {
        id: "j-1",
        label: "Jellyfish",
        emoji: "🪼",
        audioFile: "jellyfish.mp3",
      },
      {
        id: "j-2",
        label: "Jacket",
        emoji: "🧥",
        audioFile: "jacket.mp3",
      },
      {
        id: "j-3",
        label: "Jar",
        emoji: "🫙",
        audioFile: "jar.mp3",
      },
    ],
  },
  {
    id: "11",
    letter: "k",
    letterUpper: "K",
    images: [
      {
        id: "k-1",
        label: "Kite",
        emoji: "🪁",
        audioFile: "kite.mp3",
      },
      {
        id: "k-2",
        label: "Key",
        emoji: "🔑",
        audioFile: "key.mp3",
      },
      {
        id: "k-3",
        label: "Keyboard",
        emoji: "⌨️",
        audioFile: "keyboard.mp3",
      },
    ],
  },
  {
    id: "12",
    letter: "l",
    letterUpper: "L",
    images: [
      {
        id: "l-1",
        label: "Lion",
        emoji: "🦁",
        audioFile: "lion.mp3",
      },
      {
        id: "l-2",
        label: "Leaf",
        emoji: "🍃",
        audioFile: "leaf.mp3",
      },
      {
        id: "l-3",
        label: "Lollipop",
        emoji: "🍭",
        audioFile: "lollipop.mp3",
      },
    ],
  },
  {
    id: "13",
    letter: "m",
    letterUpper: "M",
    images: [
      {
        id: "m-1",
        label: "Monkey",
        emoji: "🐵",
        audioFile: "monkey.mp3",
      },
      {
        id: "m-2",
        label: "Moon",
        emoji: "🌙",
        audioFile: "moon.mp3",
      },
      {
        id: "m-3",
        label: "Mountain",
        emoji: "⛰️",
        audioFile: "mountain.mp3",
      },
    ],
  },
  {
    id: "14",
    letter: "n",
    letterUpper: "N",
    images: [
      {
        id: "n-1",
        label: "Nest",
        emoji: "🪺",
        audioFile: "nest.mp3",
      },
      {
        id: "n-2",
        label: "Nose",
        emoji: "👃",
        audioFile: "nose.mp3",
      },
      {
        id: "n-3",
        label: "Necklace",
        emoji: "💍",
        audioFile: "necklace.mp3",
      },
    ],
  },
  {
    id: "15",
    letter: "o",
    letterUpper: "O",
    images: [
      {
        id: "o-1",
        label: "Orange",
        emoji: "🍊",
        audioFile: "orange.mp3",
      },
      {
        id: "o-2",
        label: "Octopus",
        emoji: "🐙",
        audioFile: "octopus.mp3",
      },
      {
        id: "o-3",
        label: "Owl",
        emoji: "🦉",
        audioFile: "owl.mp3",
      },
    ],
  },
  {
    id: "16",
    letter: "p",
    letterUpper: "P",
    images: [
      {
        id: "p-1",
        label: "Penguin",
        emoji: "🐧",
        audioFile: "penguin.mp3",
      },
      {
        id: "p-2",
        label: "Pig",
        emoji: "🐷",
        audioFile: "pig.mp3",
      },
      {
        id: "p-3",
        label: "Pizza",
        emoji: "🍕",
        audioFile: "pizza.mp3",
      },
    ],
  },
  {
    id: "17",
    letter: "q",
    letterUpper: "Q",
    images: [
      {
        id: "q-1",
        label: "Queen",
        emoji: "👑",
        audioFile: "queen.mp3",
      },
      {
        id: "q-2",
        label: "Quest",
        emoji: "🗺️",
        audioFile: "quest.mp3",
      },
      {
        id: "q-3",
        label: "Quilt",
        emoji: "🧺",
        audioFile: "quilt.mp3",
      },
    ],
  },
  {
    id: "18",
    letter: "r",
    letterUpper: "R",
    images: [
      {
        id: "r-1",
        label: "Rainbow",
        emoji: "🌈",
        audioFile: "rainbow.mp3",
      },
      {
        id: "r-2",
        label: "Rabbit",
        emoji: "🐰",
        audioFile: "rabbit.mp3",
      },
      {
        id: "r-3",
        label: "Robot",
        emoji: "🤖",
        audioFile: "robot.mp3",
      },
    ],
  },
  {
    id: "19",
    letter: "s",
    letterUpper: "S",
    images: [
      {
        id: "s-1",
        label: "Sun",
        emoji: "☀️",
        audioFile: "sun.mp3",
      },
      {
        id: "s-2",
        label: "Snake",
        emoji: "🐍",
        audioFile: "snake.mp3",
      },
      {
        id: "s-3",
        label: "Strawberry",
        emoji: "🍓",
        audioFile: "strawberry.mp3",
      },
    ],
  },
  {
    id: "20",
    letter: "t",
    letterUpper: "T",
    images: [
      {
        id: "t-1",
        label: "Tiger",
        emoji: "🐯",
        audioFile: "tiger.mp3",
      },
      {
        id: "t-2",
        label: "Tree",
        emoji: "🌳",
        audioFile: "tree.mp3",
      },
      {
        id: "t-3",
        label: "Train",
        emoji: "🚆",
        audioFile: "train.mp3",
      },
    ],
  },
  {
    id: "21",
    letter: "u",
    letterUpper: "U",
    images: [
      {
        id: "u-1",
        label: "Umbrella",
        emoji: "☂️",
        audioFile: "umbrella.mp3",
      },
      {
        id: "u-2",
        label: "Unicorn",
        emoji: "🦄",
        audioFile: "unicorn.mp3",
      },
      {
        id: "u-3",
        label: "Ukulele",
        emoji: "🎵",
        audioFile: "ukulele.mp3",
      },
    ],
  },
  {
    id: "22",
    letter: "v",
    letterUpper: "V",
    images: [
      {
        id: "v-1",
        label: "Violin",
        emoji: "🎻",
        audioFile: "violin.mp3",
      },
      {
        id: "v-2",
        label: "Volcano",
        emoji: "🌋",
        audioFile: "volcano.mp3",
      },
      {
        id: "v-3",
        label: "Van",
        emoji: "🚐",
        audioFile: "van.mp3",
      },
    ],
  },
  {
    id: "23",
    letter: "w",
    letterUpper: "W",
    images: [
      {
        id: "w-1",
        label: "Whale",
        emoji: "🐳",
        audioFile: "whale.mp3",
      },
      {
        id: "w-2",
        label: "Watermelon",
        emoji: "🍉",
        audioFile: "watermelon.mp3",
      },
      {
        id: "w-3",
        label: "Watch",
        emoji: "⌚",
        audioFile: "watch.mp3",
      },
    ],
  },
  {
    id: "24",
    letter: "x",
    letterUpper: "X",
    images: [
      {
        id: "x-1",
        label: "Xylophone",
        emoji: "🎵",
        audioFile: "xylophone.mp3",
      },
      {
        id: "x-2",
        label: "X-ray",
        emoji: "📷",
        audioFile: "xray.mp3",
      },
      {
        id: "x-3",
        label: "Xmas",
        emoji: "🎄",
        audioFile: "xmas.mp3",
      },
    ],
  },
  {
    id: "25",
    letter: "y",
    letterUpper: "Y",
    images: [
      {
        id: "y-1",
        label: "Yo-Yo",
        emoji: "🪀",
        audioFile: "yoyo.mp3",
      },
      {
        id: "y-2",
        label: "Yacht",
        emoji: "⛵",
        audioFile: "yacht.mp3",
      },
      {
        id: "y-3",
        label: "Yogurt",
        emoji: "🍨",
        audioFile: "yogurt.mp3",
      },
    ],
  },
  {
    id: "26",
    letter: "z",
    letterUpper: "Z",
    images: [
      {
        id: "z-1",
        label: "Zebra",
        emoji: "🦓",
        audioFile: "zebra.mp3",
      },
      {
        id: "z-2",
        label: "Zipper",
        emoji: "🔐",
        audioFile: "zipper.mp3",
      },
      {
        id: "z-3",
        label: "Zoo",
        emoji: "🦁",
        audioFile: "zoo.mp3",
      },
    ],
  },
];

/**
 * Get a specific letter level by index (0-25)
 */
export function getLetterLevel(levelIndex: number): LetterLevel | undefined {
  return LETTER_LEVELS[levelIndex];
}

/**
 * Get total number of levels
 */
export function getTotalLevels(): number {
  return LETTER_LEVELS.length;
}
