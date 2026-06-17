/**
 * Letters Game Data
 * Arabic alphabet letters with Algerian Arabic words
 */

export type ImageItem = {
  id: string;
  label?: string;
  emoji: string; // using emoji as placeholder for images
  audioFile: string; // audio pronunciation file
  imageUrl?: any; // option for actual images later
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
    letter: "أ",
    letterUpper: "أ",
    images: [
      {
        id: "alif-1",
        label: "ارنب",
        emoji: "🐰",
        audioFile: "arnab.mp4",
        imageUrl: require("../assets/images/alif/rabbit.jpeg")
      },
      {
        id: "alif-2",
        label: "دار",
        emoji: "🏠",
        audioFile: "dar.mp3",
        imageUrl: require("../assets/images/alif/home.jpeg")
      },
      {
        id: "alif-3",
        label: "ماء",
        emoji: "💧",
        audioFile: "maa.mp3",
        imageUrl: require("../assets/images/alif/water.jpeg")
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
        imageUrl: require("../assets/images/ba/ba-1.jpeg")
      },
      {
        id: "ba-2",
        label: "كبش",
        emoji: "🐏",
        audioFile: "kabch.mp3",
        imageUrl: require("../assets/images/ba/ba-2.jpeg")
      },
      {
        id: "ba-3",
        label: "حليب",
        emoji: "🥛",
        audioFile: "halib.mp3",
        imageUrl: require("../assets/images/ba/ba-3.jpeg")
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
        imageUrl: require("../assets/images/ta/ta-1.jpeg")
      },
      {
        id: "ta-2",
        label: "حوتة",
        emoji: "🐟",
        audioFile: "houta.mp3",
        imageUrl: require("../assets/images/ta/ta-2.jpeg")
      },
      {
        id: "ta-3",
        label: "زيت",
        emoji: "🫒",
        audioFile: "zit.mp3",
        imageUrl: require("../assets/images/ta/ta-3.jpeg")
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
        imageUrl: require("../assets/images/jim/jim-1.jpeg")
      },
      {
        id: "jim-2",
        label: "حجرة",
        emoji: "🧱",
        audioFile: "hojra.mp3",
        imageUrl: require("../assets/images/jim/jim-2.jpeg")
      },
      {
        id: "jim-3",
        label: "تلج",
        emoji: "❄️",
        audioFile: "talj.mp3",
        imageUrl: require("../assets/images/jim/jim-3.jpeg")
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
        imageUrl: require("../assets/images/ha/ha-1.jpeg")
      },
      {
        id: "ha-2",
        label: "بحر",
        emoji: "🌊",
        audioFile: "bhar.mp3",
        imageUrl: require("../assets/images/ha/ha-2.jpeg")
      },
      {
        id: "ha-3",
        label: "مفتاح",
        emoji: "🔑",
        audioFile: "moftah.mp3",
        imageUrl: require("../assets/images/ha/ha-3.jpeg")
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
        imageUrl: require("../assets/images/kha/kha-1.jpeg")
      },
      {
        id: "kha-2",
        label: "مخدة",
        emoji: "🛏️",
        audioFile: "makhda.mp3",
        imageUrl: require("../assets/images/kha/kha-2.jpeg")
      },
      {
        id: "kha-3",
        label: "مخ",
        emoji: "🧠",
        audioFile: "mokh.mp3",
        imageUrl: require("../assets/images/kha/kha-3.jpeg")
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
        imageUrl: require("../assets/images/dal/dal-1.jpeg")
      },
      {
        id: "dal-2",
        label: "مدرسة",
        emoji: "🏫",
        audioFile: "madrasa.mp3",
        imageUrl: require("../assets/images/dal/dal-2.jpeg")
      },
      {
        id: "dal-3",
        label: "قرد",
        emoji: "🐒",
        audioFile: "qerd.mp3",
        imageUrl: require("../assets/images/dal/dal-3.jpeg")
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
        imageUrl: require("../assets/images/ra/ra-1.jpeg")
      },
      {
        id: "ra-2",
        label: "مراية",
        emoji: "🪞",
        audioFile: "mraya.mp3",
        imageUrl: require("../assets/images/ra/ra-2.jpeg")
      },
      {
        id: "ra-3",
        label: "قمر",
        emoji: "🌊",
        audioFile: "kmar.mp3",
        imageUrl: require("../assets/images/ra/ra-3.jpeg")
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
        imageUrl: require("../assets/images/zay/zay-1.jpeg")
      },
      {
        id: "zay-2",
        label: "غزال",
        emoji: "🦌",
        audioFile: "ghazal.mp3",
        imageUrl: require("../assets/images/zay/zay-2.jpeg")
      },
      {
        id: "zay-3",
        label: "خبز",
        emoji: "🍞",
        audioFile: "khobz.mp3",
        imageUrl: require("../assets/images/zay/zay-3.jpeg")
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
        imageUrl: require("../assets/images/sin/sin-1.jpeg")
      },
      {
        id: "sin-2",
        label: "كسرة",
        emoji: "🫓",
        audioFile: "kesra.mp3",
        imageUrl: require("../assets/images/sin/sin-2.jpeg")
      },
      {
        id: "sin-3",
        label: "كاس",
        emoji: "🥤",
        audioFile: "kas.mp3",
        imageUrl: require("../assets/images/sin/sin-3.jpeg")
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
        imageUrl: require("../assets/images/shin/shin-1.jpeg")
      },
      {
        id: "shin-2",
        label: "مشطة",
        emoji: "💇",
        audioFile: "mochta.mp3",
        imageUrl: require("../assets/images/shin/shin-2.jpeg")
      },
      {
        id: "shin-3",
        label: "مشماش",
        emoji: "🍑",
        audioFile: "mishmish.mp3",
        imageUrl: require("../assets/images/shin/shin-3.jpeg")
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
        imageUrl: require("../assets/images/sad/sad-1.jpeg")
      },
      {
        id: "sad-2",
        label: "بصلة",
        emoji: "🧅",
        audioFile: "basla.mp3",
        imageUrl: require("../assets/images/sad/sad-2.jpeg")
      },
      {
        id: "sad-3",
        label: "قفص",
        emoji: "🦜",
        audioFile: "qafas.mp3",
        imageUrl: require("../assets/images/sad/sad-3.jpeg")
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
        imageUrl: require("../assets/images/ta2/ta2-1.jpeg")
      },
      {
        id: "ta2-2",
        label: "طماطم",
        emoji: "🍅",
        audioFile: "tomatem.mp3",
        imageUrl: require("../assets/images/ta2/ta2-2.jpeg")
      },
      {
        id: "ta2-3",
        label: "خيط",
        emoji: "🧵",
        audioFile: "khit.mp3",
        imageUrl: require("../assets/images/ta2/ta2-3.jpeg")
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
        imageUrl: require("../assets/images/ain/ain-1.jpeg")
      },
      {
        id: "ain-2",
        label: "معجون",
        emoji: "🪥",
        audioFile: "maajoun.mp3",
        imageUrl: require("../assets/images/ain/ain-2.jpeg")
      },
      {
        id: "ain-3",
        label: "ضبع",
        emoji: "🦡",
        audioFile: "daba3.mp3",
        imageUrl: require("../assets/images/ain/ain-3.jpeg")
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
        imageUrl: require("../assets/images/ghain/ghain-1.jpeg")
      },
      {
        id: "ghain-2",
        label: "مغرف",
        emoji: "🥄",
        audioFile: "maghraf.mp3",
        imageUrl: require("../assets/images/ghain/ghain-2.jpeg")
      },
      {
        id: "ghain-3",
        label: "صباغ",
        emoji: "📭",
        audioFile: "farigh.mp3",
        imageUrl: require("../assets/images/ghain/ghain-3.jpeg")
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
        imageUrl: require("../assets/images/fa/fa-1.jpeg")
      },
      {
        id: "fa-2",
        label: "طفل",
        emoji: "👶",
        audioFile: "tifl.mp3",
        imageUrl: require("../assets/images/fa/fa-2.jpeg")
      },
      {
        id: "fa-3",
        label: "سيف",
        emoji: "✉️",
        audioFile: "ghilaf.mp3",
        imageUrl: require("../assets/images/fa/fa-3.jpeg")
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
        imageUrl: require("../assets/images/qaf/qaf-1.jpeg")
      },
      {
        id: "qaf-2",
        label: "صقر",
        emoji: "🦅",
        audioFile: "saqr.mp3",
        imageUrl: require("../assets/images/qaf/qaf-2.jpeg")
      },
      {
        id: "qaf-3",
        label: "ورق",
        emoji: "📄",
        audioFile: "waraq.mp3",
        imageUrl: require("../assets/images/qaf/qaf-3.jpeg")
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
        imageUrl: require("../assets/images/kaf/kaf-1.jpeg")
      },
      {
        id: "kaf-2",
        label: "سكينة",
        emoji: "🔪",
        audioFile: "skina.mp3",
        imageUrl: require("../assets/images/kaf/kaf-2.jpeg")
      },
      {
        id: "kaf-3",
        label: "سردوك",
        emoji: "🐓",
        audioFile: "sardouk.mp3",
        imageUrl: require("../assets/images/kaf/kaf-3.jpeg")
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
        imageUrl: require("../assets/images/lam/lam-1.jpeg")
      },
      {
        id: "lam-2",
        label: "علم",
        emoji: "🏳️",
        audioFile: "alam.mp3",
        imageUrl: require("../assets/images/lam/lam-2.jpeg")
      },
      {
        id: "lam-3",
        label: "جمل",
        emoji: "🐫",
        audioFile: "jamal.mp3",
        imageUrl: require("../assets/images/lam/lam-3.jpeg")
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
        imageUrl: require("../assets/images/mim/mim-1.jpeg")
      },
      {
        id: "mim-2",
        label: "نمال",
        emoji: "🐜",
        audioFile: "nmal.mp3",
        imageUrl: require("../assets/images/mim/mim-2.jpeg")
      },
      {
        id: "mim-3",
        label: "لحم",
        emoji: "🥩",
        audioFile: "laham.mp3",
        imageUrl: require("../assets/images/mim/mim-3.jpeg")
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
        imageUrl: require("../assets/images/nun/nun-1.jpeg")
      },
      {
        id: "nun-2",
        label: "عين",
        emoji: "👁️",
        audioFile: "ain.mp3",
        imageUrl: require("../assets/images/nun/nun-3.jpeg")
      },

      {
        id: "nun-3",
        label: "فنجال",
        emoji: "🌿",
        audioFile: "naanaa.mp3",
        imageUrl: require("../assets/images/nun/nun-2.jpeg")
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
        imageUrl: require("../assets/images/ha2/ha2-1.jpeg")
      },
      {
        id: "ha2-2",
        label: "نهار",
        emoji: "☀️",
        audioFile: "nhar.mp3",
        imageUrl: require("../assets/images/ha2/ha2-2.jpeg")
      },
      {
        id: "ha2-3",
        label: "وجه",
        emoji: "😊",
        audioFile: "wajh.mp3",
        imageUrl: require("../assets/images/ha2/ha2-3.jpeg")
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
        imageUrl: require("../assets/images/waw/waw-1.jpeg")
      },
      {
        id: "waw-2",
        label: "دواء",
        emoji: "💊",
        audioFile: "dwaa.mp3",
        imageUrl: require("../assets/images/waw/waw-2.jpeg")
      },
      {
        id: "waw-3",
        label: "جرو",
        emoji: "🐶",
        audioFile: "jarw.mp3",
        imageUrl: require("../assets/images/waw/waw-3.jpeg")
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
        imageUrl: require("../assets/images/ya/ya-1.jpeg")
      },
      {
        id: "ya-2",
        label: "ليل",
        emoji: "🌙",
        audioFile: "lil.mp3",
        imageUrl: require("../assets/images/ya/ya-2.jpeg")
      },
      {
        id: "ya-3",
        label: "كرسي",
        emoji: "🪑",
        audioFile: "korsi.mp3",
        imageUrl: require("../assets/images/ya/ya-3.jpeg")
      },
    ],
  },
  {
    id: "25",
    letter: "ڤ",
    letterUpper: "ڤ",
    images: [
      {
        id: "qaf2-1",
        label: "ڤندورة",
        emoji: "👗",
        audioFile: "gandoura.mp3",
        imageUrl: require("../assets/images/qaf2/qaf2-1.jpeg")
      },
      {
        id: "qaf2-2",
        label: "بڨرة",
        emoji: "🐄",
        audioFile: "baqara.mp3",
        imageUrl: require("../assets/images/qaf2/qaf2-2.jpeg")
      },
      {
        id: "qaf2-3",
        label: "برڨ",
        emoji: "⚡",
        audioFile: "barq.mp3",
        imageUrl: require("../assets/images/qaf2/qaf2-3.jpeg")
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
