export type MassageStep = {
  id: number;
  titleKey: string;
  descriptionKey: string;
  duration: string;
};

export type MassageReminder = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  time: string;
  emoji: string;
  steps: MassageStep[];
  color: string;
  backgroundColor: string;
};

export const massageReminders: MassageReminder[] = [
  {
    id: "morning-massage",
    titleKey: "reminders.massage.morningTitle",
    descriptionKey: "reminders.massage.morningDesc",
    time: "08:00",
    emoji: "🌅",
    color: "#FF9600",
    backgroundColor: "#FFF4E5",
    steps: [
      {
        id: 1,
        titleKey: "reminders.massage.steps.step1Title",
        descriptionKey: "reminders.massage.steps.step1Desc",
        duration: "30 ثانية",
      },
      {
        id: 2,
        titleKey: "reminders.massage.steps.step2Title",
        descriptionKey: "reminders.massage.steps.step2Desc",
        duration: "1 دقيقة",
      },
      {
        id: 3,
        titleKey: "reminders.massage.steps.step3Title",
        descriptionKey: "reminders.massage.steps.step3Desc",
        duration: "30 ثانية",
      },
      {
        id: 4,
        titleKey: "reminders.massage.steps.step4Title",
        descriptionKey: "reminders.massage.steps.step4Desc",
        duration: "1 دقيقة",
      },
      {
        id: 5,
        titleKey: "reminders.massage.steps.step5Title",
        descriptionKey: "reminders.massage.steps.step5Desc",
        duration: "1 دقيقة",
      },
      {
        id: 6,
        titleKey: "reminders.massage.steps.step6Title",
        descriptionKey: "reminders.massage.steps.step6Desc",
        duration: "1-2 دقيقة",
      },
      {
        id: 7,
        titleKey: "reminders.massage.steps.step7Title",
        descriptionKey: "reminders.massage.steps.step7Desc",
        duration: "30 ثانية",
      },
    ],
  },
  {
    id: "afternoon-massage",
    titleKey: "reminders.massage.afternoonTitle",
    descriptionKey: "reminders.massage.afternoonDesc",
    time: "14:30",
    emoji: "☀️",
    color: "#FF6B35",
    backgroundColor: "#FFE5D5",
    steps: [
      {
        id: 1,
        titleKey: "reminders.massage.steps.step1Title",
        descriptionKey: "reminders.massage.steps.step1Desc",
        duration: "30 ثانية",
      },
      {
        id: 2,
        titleKey: "reminders.massage.steps.step2Title",
        descriptionKey: "reminders.massage.steps.step2Desc",
        duration: "1 دقيقة",
      },
      {
        id: 3,
        titleKey: "reminders.massage.steps.step3Title",
        descriptionKey: "reminders.massage.steps.step3Desc",
        duration: "30 ثانية",
      },
      {
        id: 4,
        titleKey: "reminders.massage.steps.step4Title",
        descriptionKey: "reminders.massage.steps.step4Desc",
        duration: "1 دقيقة",
      },
      {
        id: 5,
        titleKey: "reminders.massage.steps.step5Title",
        descriptionKey: "reminders.massage.steps.step5Desc",
        duration: "1 دقيقة",
      },
      {
        id: 6,
        titleKey: "reminders.massage.steps.step6Title",
        descriptionKey: "reminders.massage.steps.step6Desc",
        duration: "1-2 دقيقة",
      },
      {
        id: 7,
        titleKey: "reminders.massage.steps.step7Title",
        descriptionKey: "reminders.massage.steps.step7Desc",
        duration: "30 ثانية",
      },
    ],
  },
  {
    id: "evening-massage",
    titleKey: "reminders.massage.eveningTitle",
    descriptionKey: "reminders.massage.eveningDesc",
    time: "19:00",
    emoji: "🌙",
    color: "#CE82FF",
    backgroundColor: "#F3E8FF",
    steps: [
      {
        id: 1,
        titleKey: "reminders.massage.steps.step1Title",
        descriptionKey: "reminders.massage.steps.step1Desc",
        duration: "30 ثانية",
      },
      {
        id: 2,
        titleKey: "reminders.massage.steps.step2Title",
        descriptionKey: "reminders.massage.steps.step2Desc",
        duration: "1 دقيقة",
      },
      {
        id: 3,
        titleKey: "reminders.massage.steps.step3Title",
        descriptionKey: "reminders.massage.steps.step3Desc",
        duration: "30 ثانية",
      },
      {
        id: 4,
        titleKey: "reminders.massage.steps.step4Title",
        descriptionKey: "reminders.massage.steps.step4Desc",
        duration: "1 دقيقة",
      },
      {
        id: 5,
        titleKey: "reminders.massage.steps.step5Title",
        descriptionKey: "reminders.massage.steps.step5Desc",
        duration: "1 دقيقة",
      },
      {
        id: 6,
        titleKey: "reminders.massage.steps.step6Title",
        descriptionKey: "reminders.massage.steps.step6Desc",
        duration: "1-2 دقيقة",
      },
      {
        id: 7,
        titleKey: "reminders.massage.steps.step7Title",
        descriptionKey: "reminders.massage.steps.step7Desc",
        duration: "30 ثانية",
      },
    ],
  },
];
