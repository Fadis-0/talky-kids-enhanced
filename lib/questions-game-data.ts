/**
 * Questions Game Data
 * Multi-mode game categories for speech practice and cognitive understanding in Arabic.
 */

export type PlacesLevel = {
  id: string;
  question: string;
  visualType: "box-ball" | "table-cat" | "tree-bird";
  visualPosition: "inside" | "outside" | "above" | "under" | "left" | "right";
  options: {
    label: string;
    pronunciation: string; // text to speak for TTS
  }[];
  correctAnswer: string; // The correct option label
};

export type SizesLevel = {
  id: string;
  question: string;
  audioFile: string; // audio file for the question (mp4)
  options: {
    id: string;
    emoji: string;
    label: string;
    scale: number;
    height?: number;
  }[];
  correctIndex: number;
};


export type ColorsLevel = {
  id: string;
  question: string;
  options: {
    id: string;
    emoji: string;
    label: string;
    colorHex?: string;
  }[];
  correctIndex: number;
};

export type ApplesLevel = {
  id: string;
  type: "apples";
  audioFile: string;
  targetCount: number;
};

export type BooksLevel = {
  id: string;
  type: "books";
  audioFile: string;
  correctBook: "red" | "green" | "yellow";
  maxAttempts: number;
};

export type InteractiveLevel = ApplesLevel | BooksLevel;

export const INTERACTIVE_LEVELS: InteractiveLevel[] = [
  {
    id: "inter-1",
    type: "apples",
    audioFile: "interactive-apples.mp4",
    targetCount: 6,
  },
  {
    id: "inter-2",
    type: "books",
    audioFile: "books-audio.mp4",
    correctBook: "red",
    maxAttempts: 5,
  },
];


export const PLACES_LEVELS: PlacesLevel[] = [
  {
    id: "places-1",
    question: "أين هي الكرة بالنسبة للصندوق؟",
    visualType: "box-ball",
    visualPosition: "inside",
    options: [
      { label: "داخل", pronunciation: "دَاخِلْ" },
      { label: "خارج", pronunciation: "خَارِجْ" },
    ],
    correctAnswer: "داخل",
  },
  {
    id: "places-2",
    question: "أين هي الكرة بالنسبة للصندوق؟",
    visualType: "box-ball",
    visualPosition: "outside",
    options: [
      { label: "داخل", pronunciation: "دَاخِلْ" },
      { label: "خارج", pronunciation: "خَارِجْ" },
    ],
    correctAnswer: "خارج",
  },
  {
    id: "places-3",
    question: "أين هي القطة بالنسبة للطاولة؟",
    visualType: "table-cat",
    visualPosition: "under",
    options: [
      { label: "فوق", pronunciation: "فَوْقْ" },
      { label: "تحت", pronunciation: "تَحْتْ" },
    ],
    correctAnswer: "تحت",
  },
  {
    id: "places-4",
    question: "أين هو العصفور بالنسبة للشجرة؟",
    visualType: "tree-bird",
    visualPosition: "above",
    options: [
      { label: "فوق", pronunciation: "فَوْقْ" },
      { label: "تحت", pronunciation: "تَحْتْ" },
    ],
    correctAnswer: "فوق",
  },
];

export const SIZES_LEVELS: SizesLevel[] = [
  {
    id: "sizes-1",
    question: "اختر الولد الأطول",
    audioFile: "sizes-tallest.mp4", // question audio: "Who is the tallest?"
    options: [
      { id: "size-1-tall", emoji: "🧒", label: "طويل", scale: 1, height: 160 },
      { id: "size-1-short", emoji: "🧒", label: "قصير", scale: 1, height: 90 },
    ],
    correctIndex: 0,
  },
  {
    id: "sizes-2",
    question: "اختر الولد الأقصر",
    audioFile: "sizes-shortest.mp4", // question audio: "Who is the shortest?"
    options: [
      { id: "size-2-tall", emoji: "🧒", label: "طويل", scale: 1, height: 160 },
      { id: "size-2-short", emoji: "🧒", label: "قصير", scale: 1, height: 90 },
    ],
    correctIndex: 1,
  },
];


export const COLORS_LEVELS: ColorsLevel[] = [
  {
    id: "colors-1",
    question: "اختر التفاحة الحمراء",
    options: [
      { id: "color-1-red", emoji: "🍎", label: "تفاحة حمراء" },
      { id: "color-1-green", emoji: "🍏", label: "تفاحة خضراء" },
    ],
    correctIndex: 0,
  },
  {
    id: "colors-2",
    question: "اختر السيارة الصفراء",
    options: [
      { id: "color-2-blue", emoji: "🚙", label: "سيارة زرقاء" },
      { id: "color-2-yellow", emoji: "🚕", label: "سيارة صفراء" },
    ],
    correctIndex: 1,
  },
  {
    id: "colors-3",
    question: "اختر البالون الأخضر",
    options: [
      { id: "color-3-green", emoji: "🟢", label: "بالون أخضر" },
      { id: "color-3-red", emoji: "🔴", label: "بالون أحمر" },
    ],
    correctIndex: 0,
  },
];

