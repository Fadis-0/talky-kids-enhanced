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
  options: {
    id: string;
    emoji: string;
    label: string;
    scale: number; // For scaling big/small
    height?: number; // For taller/shorter representation
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

export type InteractiveLevel = {
  id: string;
  question: string;
  targetEmoji: string;
  targetLabel: string;
  items: {
    id: string;
    emoji: string;
    label: string;
    isCorrect: boolean;
  }[];
};

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
    question: "اختر الفيل الأكبر",
    options: [
      { id: "size-1-big", emoji: "🐘", label: "فيل كبير", scale: 1.5 },
      { id: "size-1-small", emoji: "🐘", label: "فيل صغير", scale: 0.8 },
    ],
    correctIndex: 0,
  },
  {
    id: "sizes-2",
    question: "اختر النجم الأصغر",
    options: [
      { id: "size-2-small", emoji: "⭐", label: "نجم صغير", scale: 0.7 },
      { id: "size-2-big", emoji: "⭐", label: "نجم كبير", scale: 1.4 },
    ],
    correctIndex: 0,
  },
  {
    id: "sizes-3",
    question: "اختر الشجرة الطويلة",
    options: [
      { id: "size-3-tall", emoji: "🌳", label: "شجرة طويلة", scale: 1.5, height: 120 },
      { id: "size-3-short", emoji: "🌳", label: "شجرة قصيرة", scale: 0.9, height: 70 },
    ],
    correctIndex: 0,
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

export const INTERACTIVE_LEVELS: InteractiveLevel[] = [
  {
    id: "inter-1",
    question: "ضع الموزة داخل المحفظة",
    targetEmoji: "🎒",
    targetLabel: "المحفظة",
    items: [
      { id: "inter-1-banana", emoji: "🍌", label: "موزة", isCorrect: true },
      { id: "inter-1-apple", emoji: "🍎", label: "تفاحة", isCorrect: false },
    ],
  },
  {
    id: "inter-2",
    question: "ضع السمكة داخل الماء",
    targetEmoji: "🥣",
    targetLabel: "الماء",
    items: [
      { id: "inter-2-bird", emoji: "🐦", label: "عصفور", isCorrect: false },
      { id: "inter-2-fish", emoji: "🐟", label: "سمكة", isCorrect: true },
    ],
  },
  {
    id: "inter-3",
    question: "ضع النجمة في السماء",
    targetEmoji: "☁️",
    targetLabel: "السماء",
    items: [
      { id: "inter-3-star", emoji: "⭐", label: "نجمة", isCorrect: true },
      { id: "inter-3-car", emoji: "🚗", label: "سيارة", isCorrect: false },
    ],
  },
];
