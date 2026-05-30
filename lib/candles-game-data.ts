export interface CandleLevel {
  id: string;
  levelNumber: number;
  candleCount: number;
  volumeSensitivity: number; // multiplier for mic input
  extinguishTarget: number; // total accumulated energy needed per candle (e.g. 100 ticks)
  label: string;
  colors: string[];
}

export const CANDLE_COLORS = [
  "#FF6B6B", // Coral Red
  "#1CB0F6", // Bright Blue
  "#58CC02", // Lime Green
  "#CE82FF", // Lavender Purple
  "#FFCC00", // Gold Yellow
  "#FF9600", // Orange
];

export const CANDLES_LEVELS: CandleLevel[] = [
  {
    id: "c-1",
    levelNumber: 1,
    candleCount: 1,
    volumeSensitivity: 2.2,
    extinguishTarget: 40, // ~2 seconds of sustained blowing
    label: "Make a wish! 🎂",
    colors: [CANDLE_COLORS[0]],
  },
  {
    id: "c-2",
    levelNumber: 2,
    candleCount: 2,
    volumeSensitivity: 2.0,
    extinguishTarget: 45, // ~2.2 seconds per candle
    label: "Double trouble! 🕯️🕯️",
    colors: [CANDLE_COLORS[0], CANDLE_COLORS[1]],
  },
  {
    id: "c-3",
    levelNumber: 3,
    candleCount: 3,
    volumeSensitivity: 1.8,
    extinguishTarget: 50,
    label: "Three little lights! ✨",
    colors: [CANDLE_COLORS[0], CANDLE_COLORS[1], CANDLE_COLORS[2]],
  },
  {
    id: "c-4",
    levelNumber: 4,
    candleCount: 4,
    volumeSensitivity: 1.6,
    extinguishTarget: 55,
    label: "Light breeze needed! 🌬️",
    colors: [CANDLE_COLORS[0], CANDLE_COLORS[1], CANDLE_COLORS[2], CANDLE_COLORS[3]],
  },
  {
    id: "c-5",
    levelNumber: 5,
    candleCount: 5,
    volumeSensitivity: 1.5,
    extinguishTarget: 60,
    label: "Big birthday blow! 🥳",
    colors: [CANDLE_COLORS[0], CANDLE_COLORS[1], CANDLE_COLORS[2], CANDLE_COLORS[3], CANDLE_COLORS[4]],
  },
  {
    id: "c-6",
    levelNumber: 6,
    candleCount: 6,
    volumeSensitivity: 1.4,
    extinguishTarget: 65,
    label: "Super storm puff! 🌪️",
    colors: CANDLE_COLORS,
  },
];

export function getCandlesLevel(index: number): CandleLevel {
  if (index < 0) return CANDLES_LEVELS[0];
  if (index >= CANDLES_LEVELS.length) return CANDLES_LEVELS[CANDLES_LEVELS.length - 1];
  return CANDLES_LEVELS[index];
}

export function getTotalCandlesLevels(): number {
  return CANDLES_LEVELS.length;
}
