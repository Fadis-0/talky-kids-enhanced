/**
 * Video Questions Game Data
 * Multi-level game where users watch videos/GIFs and answer questions with voice recording
 */

export type VideoQuestion = {
  id: string;
  question: string;
  videoUrl?: string; // URL to video or GIF
  videoEmoji?: string; // emoji as placeholder for video
  expectedAnswers?: string[]; // possible correct answers for validation
};

export type VideoQuestionLevel = {
  id: string;
  levelNumber: number;
  videoQuestion: VideoQuestion;
};

export const VIDEO_QUESTION_LEVELS: VideoQuestionLevel[] = [
  {
    id: "v-1",
    levelNumber: 1,
    videoQuestion: {
      id: "vq-1",
      question: "What animal do you see in the video?",
      videoEmoji: "🐶",
      expectedAnswers: ["dog", "doggy"],
    },
  },
  {
    id: "v-2",
    levelNumber: 2,
    videoQuestion: {
      id: "vq-2",
      question: "What color is the ball?",
      videoEmoji: "🔴",
      expectedAnswers: ["red"],
    },
  },
  {
    id: "v-3",
    levelNumber: 3,
    videoQuestion: {
      id: "vq-3",
      question: "How many cats do you see?",
      videoEmoji: "🐱",
      expectedAnswers: ["two", "2"],
    },
  },
  {
    id: "v-4",
    levelNumber: 4,
    videoQuestion: {
      id: "vq-4",
      question: "What sound does the animal make?",
      videoEmoji: "🐮",
      expectedAnswers: ["moo"],
    },
  },
  {
    id: "v-5",
    levelNumber: 5,
    videoQuestion: {
      id: "vq-5",
      question: "What is the person doing?",
      videoEmoji: "👟",
      expectedAnswers: ["running", "run"],
    },
  },
  {
    id: "v-6",
    levelNumber: 6,
    videoQuestion: {
      id: "vq-6",
      question: "What fruit do you see?",
      videoEmoji: "🍎",
      expectedAnswers: ["apple"],
    },
  },
  {
    id: "v-7",
    levelNumber: 7,
    videoQuestion: {
      id: "vq-7",
      question: "What is the name of this toy?",
      videoEmoji: "🧸",
      expectedAnswers: ["teddy bear", "bear"],
    },
  },
  {
    id: "v-8",
    levelNumber: 8,
    videoQuestion: {
      id: "vq-8",
      question: "What color is the flower?",
      videoEmoji: "🌻",
      expectedAnswers: ["yellow"],
    },
  },
];

export function getVideoQuestionLevel(
  levelIndex: number
): VideoQuestionLevel | undefined {
  return VIDEO_QUESTION_LEVELS[levelIndex];
}

export function getTotalVideoLevels(): number {
  return VIDEO_QUESTION_LEVELS.length;
}
