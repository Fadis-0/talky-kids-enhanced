/**
 * Balloon Blowing Game Data
 * Players blow into the mic to inflate a balloon. Higher levels require
 * louder / more sustained blowing, and the balloon deflates faster.
 */

export type BalloonLevel = {
  id: string;
  levelNumber: number;
  /** Volume threshold needed to pop (0-1, higher = harder) */
  popThreshold: number;
  /** Starting balloon scale (0-1 where 1 = max visual) */
  initialScale: number;
  /** Scale at which balloon pops */
  popScale: number;
  /** How fast balloon shrinks per tick when NOT blowing (higher = faster deflate) */
  shrinkRate: number;
  /** Multiplier applied to raw mic volume – lower = harder to inflate */
  volumeSensitivity: number;
  /** Balloon colour for this level */
  color: string;
  /** Fun label shown above the balloon */
  label: string;
};

export const BALLOON_COLORS = [
  "#FF6B6B", // coral red
  "#FF9600", // orange
  "#FFCC00", // yellow
  "#58CC02", // green
  "#1CB0F6", // blue
  "#CE82FF", // purple
  "#FF6BCB", // pink
  "#FF4B4B", // red
  "#00D2D3", // teal
  "#FF9F43", // amber
] as const;

export const BALLOON_LEVELS: BalloonLevel[] = [
  {
    id: "b-1",
    levelNumber: 1,
    popThreshold: 0.3,
    initialScale: 0.15,
    popScale: 1.0,
    shrinkRate: 0.003,
    volumeSensitivity: 2.5,
    color: BALLOON_COLORS[0],
    label: "Easy peasy! 🎈",
  },
  {
    id: "b-2",
    levelNumber: 2,
    popThreshold: 0.35,
    initialScale: 0.15,
    popScale: 1.0,
    shrinkRate: 0.005,
    volumeSensitivity: 2.2,
    color: BALLOON_COLORS[1],
    label: "A bit harder! 💨",
  },
  {
    id: "b-3",
    levelNumber: 3,
    popThreshold: 0.4,
    initialScale: 0.15,
    popScale: 1.0,
    shrinkRate: 0.007,
    volumeSensitivity: 2.0,
    color: BALLOON_COLORS[2],
    label: "Keep blowing! 🌬️",
  },
  {
    id: "b-4",
    levelNumber: 4,
    popThreshold: 0.45,
    initialScale: 0.15,
    popScale: 1.0,
    shrinkRate: 0.009,
    volumeSensitivity: 1.8,
    color: BALLOON_COLORS[3],
    label: "Getting tough! 💪",
  },
  {
    id: "b-5",
    levelNumber: 5,
    popThreshold: 0.5,
    initialScale: 0.15,
    popScale: 1.0,
    shrinkRate: 0.011,
    volumeSensitivity: 1.6,
    color: BALLOON_COLORS[4],
    label: "Halfway there! 🔥",
  },
  {
    id: "b-6",
    levelNumber: 6,
    popThreshold: 0.55,
    initialScale: 0.15,
    popScale: 1.0,
    shrinkRate: 0.013,
    volumeSensitivity: 1.4,
    color: BALLOON_COLORS[5],
    label: "Super lungs! 🦸",
  },
  {
    id: "b-7",
    levelNumber: 7,
    popThreshold: 0.6,
    initialScale: 0.15,
    popScale: 1.0,
    shrinkRate: 0.016,
    volumeSensitivity: 1.2,
    color: BALLOON_COLORS[6],
    label: "Almost pro! ⭐",
  },
  {
    id: "b-8",
    levelNumber: 8,
    popThreshold: 0.65,
    initialScale: 0.15,
    popScale: 1.0,
    shrinkRate: 0.019,
    volumeSensitivity: 1.0,
    color: BALLOON_COLORS[7],
    label: "Expert mode! 🏆",
  },
  {
    id: "b-9",
    levelNumber: 9,
    popThreshold: 0.7,
    initialScale: 0.15,
    popScale: 1.0,
    shrinkRate: 0.022,
    volumeSensitivity: 0.85,
    color: BALLOON_COLORS[8],
    label: "Legendary! 🐉",
  },
  {
    id: "b-10",
    levelNumber: 10,
    popThreshold: 0.75,
    initialScale: 0.15,
    popScale: 1.0,
    shrinkRate: 0.026,
    volumeSensitivity: 0.7,
    color: BALLOON_COLORS[9],
    label: "CHAMPION! 👑",
  },
];

export function getBalloonLevel(
  levelIndex: number
): BalloonLevel | undefined {
  return BALLOON_LEVELS[levelIndex];
}

export function getTotalBalloonLevels(): number {
  return BALLOON_LEVELS.length;
}
