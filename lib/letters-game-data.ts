/**
 * Letters Game Data
 * Arabic alphabet letters with Algerian Arabic words
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
    letter: "ا",
    letterUpper: "ا",
    images: [
      {
        id: "alif-1",
        label: "ارنب",
        emoji: "🐰",
        audioFile: "arnab.mp3",
      },
      {
        id: "alif-2",
        label: "دار",
        emoji: "🏠",
        audioFile: "dar.mp3",
      },
      {
        id: "alif-3",
        label: "ماء",
        emoji: "💧",
        audioFile: "maa.mp3",
      },
    ],
  },
  {
    id: "2",
    letter: "ب",
    letterUpper: "ب",
    images: [
      {
        id: "ba-1",
        label: "باب",
        emoji: "🚪",
        audioFile: "bab.mp3",
      },
      {
        id: "ba-2",
        label: "كبش",
        emoji: "🐏",
        audioFile: "kabch.mp3",
      },
      {
        id: "ba-3",
        label: "حليب",
        emoji: "🥛",
        audioFile: "halib.mp3",
      },
    ],
  },
  {
    id: "3",
    letter: "ت",
    letterUpper: "ت",
    images: [
      {
        id: "ta-1",
        label: "تفاح",
        emoji: "🍎",
        audioFile: "tofah.mp3",
      },
      {
        id: "ta-2",
        label: "حوتة",
        emoji: "🐟",
        audioFile: "houta.mp3",
      },
      {
        id: "ta-3",
        label: "زيت",
        emoji: "🫒",
        audioFile: "zit.mp3",
      },
    ],
  },
  {
    id: "4",
    letter: "ج",
    letterUpper: "ج",
    images: [
      {
        id: "jim-1",
        label: "جبل",
        emoji: "⛰️",
        audioFile: "jabal.mp3",
      },
      {
        id: "jim-2",
        label: "حجرة",
        emoji: "🧱",
        audioFile: "hojra.mp3",
      },
      {
        id: "jim-3",
        label: "تلج",
        emoji: "❄️",
        audioFile: "talj.mp3",
      },
    ],
  },
  {
    id: "5",
    letter: "ح",
    letterUpper: "ح",
    images: [
      {
        id: "ha-1",
        label: "حصان",
        emoji: "🐴",
        audioFile: "hsan.mp3",
      },
      {
        id: "ha-2",
        label: "بحر",
        emoji: "🌊",
        audioFile: "bhar.mp3",
      },
      {
        id: "ha-3",
        label: "مفتاح",
        emoji: "🔑",
        audioFile: "moftah.mp3",
      },
    ],
  },
  {
    id: "6",
    letter: "خ",
    letterUpper: "خ",
    images: [
      {
        id: "kha-1",
        label: "خيار",
        emoji: "🥒",
        audioFile: "khyar.mp3",
      },
      {
        id: "kha-2",
        label: "مخدة",
        emoji: "🛏️",
        audioFile: "makhda.mp3",
      },
      {
        id: "kha-3",
        label: "مخ",
        emoji: "🧠",
        audioFile: "mokh.mp3",
      },
    ],
  },
  {
    id: "7",
    letter: "د",
    letterUpper: "د",
    images: [
      {
        id: "dal-1",
        label: "دجاجة",
        emoji: "🐔",
        audioFile: "djaja.mp3",
      },
      {
        id: "dal-2",
        label: "مدرسة",
        emoji: "🏫",
        audioFile: "madrasa.mp3",
      },
      {
        id: "dal-3",
        label: "قرد",
        emoji: "🐒",
        audioFile: "qerd.mp3",
      },
    ],
  },
  {
    id: "8",
    letter: "ر",
    letterUpper: "ر",
    images: [
      {
        id: "ra-1",
        label: "رمل",
        emoji: "🏖️",
        audioFile: "raml.mp3",
      },
      {
        id: "ra-2",
        label: "مراية",
        emoji: "🪞",
        audioFile: "mraya.mp3",
      },
      {
        id: "ra-3",
        label: "بحر",
        emoji: "🌊",
        audioFile: "bahr.mp3",
      },
    ],
  },
  {
    id: "9",
    letter: "ز",
    letterUpper: "ز",
    images: [
      {
        id: "zay-1",
        label: "زرافة",
        emoji: "🦒",
        audioFile: "zarafa.mp3",
      },
      {
        id: "zay-2",
        label: "غزال",
        emoji: "🦌",
        audioFile: "ghazal.mp3",
      },
      {
        id: "zay-3",
        label: "خبز",
        emoji: "🍞",
        audioFile: "khobz.mp3",
      },
    ],
  },
  {
    id: "10",
    letter: "س",
    letterUpper: "س",
    images: [
      {
        id: "sin-1",
        label: "سرير",
        emoji: "🛏️",
        audioFile: "srir.mp3",
      },
      {
        id: "sin-2",
        label: "كسرة",
        emoji: "🫓",
        audioFile: "kesra.mp3",
      },
      {
        id: "sin-3",
        label: "كاس",
        emoji: "🥤",
        audioFile: "kas.mp3",
      },
    ],
  },
  {
    id: "11",
    letter: "ش",
    letterUpper: "ش",
    images: [
      {
        id: "shin-1",
        label: "شمس",
        emoji: "☀️",
        audioFile: "shams.mp3",
      },
      {
        id: "shin-2",
        label: "مشطة",
        emoji: "💇",
        audioFile: "mochta.mp3",
      },
      {
        id: "shin-3",
        label: "مشماش",
        emoji: "🍑",
        audioFile: "mishmish.mp3",
      },
    ],
  },
  {
    id: "12",
    letter: "ص",
    letterUpper: "ص",
    images: [
      {
        id: "sad-1",
        label: "صحن",
        emoji: "🍽️",
        audioFile: "sahn.mp3",
      },
      {
        id: "sad-2",
        label: "بصلة",
        emoji: "🧅",
        audioFile: "basla.mp3",
      },
      {
        id: "sad-3",
        label: "قفص",
        emoji: "🦜",
        audioFile: "qafas.mp3",
      },
    ],
  },
  {
    id: "13",
    letter: "ط",
    letterUpper: "ط",
    images: [
      {
        id: "ta2-1",
        label: "طابلة",
        emoji: "🪑",
        audioFile: "tabla.mp3",
      },
      {
        id: "ta2-2",
        label: "طماطم",
        emoji: "🍅",
        audioFile: "tomatem.mp3",
      },
      {
        id: "ta2-3",
        label: "خيط",
        emoji: "🧵",
        audioFile: "khit.mp3",
      },
    ],
  },
  {
    id: "14",
    letter: "ع",
    letterUpper: "ع",
    images: [
      {
        id: "ain-1",
        label: "عنب",
        emoji: "🍇",
        audioFile: "inab.mp3",
      },
      {
        id: "ain-2",
        label: "معجون",
        emoji: "🪥",
        audioFile: "maajoun.mp3",
      },
      {
        id: "ain-3",
        label: "ضبع",
        emoji: "🦡",
        audioFile: "daba3.mp3",
      },
    ],
  },
  {
    id: "15",
    letter: "غ",
    letterUpper: "غ",
    images: [
      {
        id: "ghain-1",
        label: "غابة",
        emoji: "🌲",
        audioFile: "ghaba.mp3",
      },
      {
        id: "ghain-2",
        label: "مغرف",
        emoji: "🥄",
        audioFile: "maghraf.mp3",
      },
      {
        id: "ghain-3",
        label: "فارغ",
        emoji: "📭",
        audioFile: "farigh.mp3",
      },
    ],
  },
  {
    id: "16",
    letter: "ف",
    letterUpper: "ف",
    images: [
      {
        id: "fa-1",
        label: "فم",
        emoji: "👄",
        audioFile: "fam.mp3",
      },
      {
        id: "fa-2",
        label: "طفل",
        emoji: "👶",
        audioFile: "tifl.mp3",
      },
      {
        id: "fa-3",
        label: "غلاف",
        emoji: "✉️",
        audioFile: "ghilaf.mp3",
      },
    ],
  },
  {
    id: "17",
    letter: "ق",
    letterUpper: "ق",
    images: [
      {
        id: "qaf-1",
        label: "قلب",
        emoji: "❤️",
        audioFile: "qalb.mp3",
      },
      {
        id: "qaf-2",
        label: "صقر",
        emoji: "🦅",
        audioFile: "saqr.mp3",
      },
      {
        id: "qaf-3",
        label: "ورق",
        emoji: "📄",
        audioFile: "waraq.mp3",
      },
    ],
  },
  {
    id: "18",
    letter: "ك",
    letterUpper: "ك",
    images: [
      {
        id: "kaf-1",
        label: "كلب",
        emoji: "🐕",
        audioFile: "kalb.mp3",
      },
      {
        id: "kaf-2",
        label: "سكينة",
        emoji: "🔪",
        audioFile: "skina.mp3",
      },
      {
        id: "kaf-3",
        label: "سردوك",
        emoji: "🐓",
        audioFile: "sardouk.mp3",
      },
    ],
  },
  {
    id: "19",
    letter: "ل",
    letterUpper: "ل",
    images: [
      {
        id: "lam-1",
        label: "لسان",
        emoji: "👅",
        audioFile: "lsan.mp3",
      },
      {
        id: "lam-2",
        label: "علم",
        emoji: "🏳️",
        audioFile: "alam.mp3",
      },
      {
        id: "lam-3",
        label: "جمل",
        emoji: "🐫",
        audioFile: "jamal.mp3",
      },
    ],
  },
  {
    id: "20",
    letter: "م",
    letterUpper: "م",
    images: [
      {
        id: "mim-1",
        label: "مسجد",
        emoji: "🕌",
        audioFile: "masjid.mp3",
      },
      {
        id: "mim-2",
        label: "نمال",
        emoji: "🐜",
        audioFile: "nmal.mp3",
      },
      {
        id: "mim-3",
        label: "لحم",
        emoji: "🥩",
        audioFile: "laham.mp3",
      },
    ],
  },
  {
    id: "21",
    letter: "ن",
    letterUpper: "ن",
    images: [
      {
        id: "nun-1",
        label: "نجمة",
        emoji: "⭐",
        audioFile: "najma.mp3",
      },
      {
        id: "nun-2",
        label: "نعناع",
        emoji: "🌿",
        audioFile: "naanaa.mp3",
      },
      {
        id: "nun-3",
        label: "عين",
        emoji: "👁️",
        audioFile: "ain.mp3",
      },
    ],
  },
  {
    id: "22",
    letter: "ه",
    letterUpper: "ه",
    images: [
      {
        id: "ha2-1",
        label: "هلال",
        emoji: "🌙",
        audioFile: "hilal.mp3",
      },
      {
        id: "ha2-2",
        label: "نهار",
        emoji: "☀️",
        audioFile: "nhar.mp3",
      },
      {
        id: "ha2-3",
        label: "وجه",
        emoji: "😊",
        audioFile: "wajh.mp3",
      },
    ],
  },
  {
    id: "23",
    letter: "و",
    letterUpper: "و",
    images: [
      {
        id: "waw-1",
        label: "وردة",
        emoji: "🌹",
        audioFile: "warda.mp3",
      },
      {
        id: "waw-2",
        label: "دواء",
        emoji: "💊",
        audioFile: "dwaa.mp3",
      },
      {
        id: "waw-3",
        label: "جرو",
        emoji: "🐶",
        audioFile: "jarw.mp3",
      },
    ],
  },
  {
    id: "24",
    letter: "ي",
    letterUpper: "ي",
    images: [
      {
        id: "ya-1",
        label: "يد",
        emoji: "✋",
        audioFile: "yad.mp3",
      },
      {
        id: "ya-2",
        label: "ليل",
        emoji: "🌙",
        audioFile: "lil.mp3",
      },
      {
        id: "ya-3",
        label: "كرسي",
        emoji: "🪑",
        audioFile: "korsi.mp3",
      },
    ],
  },
  {
    id: "25",
    letter: "ق",
    letterUpper: "ق٢",
    images: [
      {
        id: "qaf2-1",
        label: "قندورة",
        emoji: "👗",
        audioFile: "gandoura.mp3",
      },
      {
        id: "qaf2-2",
        label: "بقرة",
        emoji: "🐄",
        audioFile: "baqara.mp3",
      },
      {
        id: "qaf2-3",
        label: "برق",
        emoji: "⚡",
        audioFile: "barq.mp3",
      },
    ],
  },
];

/**
 * Get a specific letter level by index (0-24)
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
