# Design & Structure Plan for the Questions Game (لعبة الأسئلة)

We are restructuring the second game (originally "Video Questions") into a multi-mode **Questions Game (لعبة الأسئلة)** tailored for children learning Arabic. 

The entry point `/video-questions` will be replaced by a Category Selector Hub showing 4 sub-games. Each sub-game will have its own interactive gameplay mechanics, progress tracking, and voice or choice-based feedback.

---

## User Review Required

> [!IMPORTANT]
> **Game Type Counting:** You mentioned showing "3 types of the game" but listed 4 distinct concepts (Places, Sizes, Colors, and Drag & Drop). We have structured the game with **4 categories** to support all your ideas. Please let us know if any categories should be grouped together or modified.

> [!NOTE]
> **Progress Tracking:** We are adding 4 new progress fields to `UserDataContext` to save children's progress separately for each game type (`questionsPlacesLevel`, `questionsSizesLevel`, `questionsColorsLevel`, `questionsInteractiveLevel`), replacing the single `videoQuestionsGameLevel` field.

---

## Open Questions

> [!IMPORTANT]
> **Drag & Drop library:** For the Interactive Drag & Drop game, we plan to implement it using standard React Native `PanResponder` to avoid adding heavy third-party gesture dependencies, which keeps the Expo build stable. Is this native touch gesture model acceptable?

---

## Proposed Changes

### Data & Architecture

#### [NEW] [questions-game-data.ts](file:///c:/Users/MOUNIR%20LAPTOP/.cursor/projects/empty-window/talky-kids/lib/questions-game-data.ts)
Create the data structures and game levels for each category:
* **Places & Directions:** 4 levels (inside/outside, above/under, left/right). 
* **Sizes:** 3 levels (bigger/smaller, taller/shorter).
* **Colors:** 3 levels (selecting based on color context).
* **Interactive Drag & Drop:** 3 levels (dragging item into a target basket/bag).

#### [MODIFY] [UserDataContext.tsx](file:///c:/Users/MOUNIR%20LAPTOP/.cursor/projects/empty-window/talky-kids/contexts/UserDataContext.tsx)
Add separate progress tracking fields for each game mode:
* `questionsPlacesLevel` (default: 0)
* `questionsSizesLevel` (default: 0)
* `questionsColorsLevel` (default: 0)
* `questionsInteractiveLevel` (default: 0)

---

### Routing & Navigation

#### [MODIFY] [routes.ts](file:///c:/Users/MOUNIR%20LAPTOP/.cursor/projects/empty-window/talky-kids/lib/routes.ts)
Map the new `/questions-game` routes. Since Expo Router matches files dynamically, we will define sub-routes for each game:
* Selector: `/questions-game`
* Places: `/questions-game/places`
* Sizes: `/questions-game/sizes`
* Colors: `/questions-game/colors`
* Interactive: `/questions-game/interactive`

---

### Gameplay Screens

#### [DELETE] [video-questions.tsx](file:///c:/Users/MOUNIR%20LAPTOP/.cursor/projects/empty-window/talky-kids/app/video-questions.tsx)
Delete the original video questions screen file.

#### [NEW] [index.tsx](file:///c:/Users/MOUNIR%20LAPTOP/.cursor/projects/empty-window/talky-kids/app/questions-game/index.tsx)
A premium selector screen displaying cards for the 4 categories, styled with Duolingo colors (purple, orange, green, blue). Clicking a card navigates to the respective sub-game.

#### [NEW] [places.tsx](file:///c:/Users/MOUNIR%20LAPTOP/.cursor/projects/empty-window/talky-kids/app/questions-game/places.tsx)
Voice-recording based game:
1. Displays visual (e.g., box with ball).
2. Option buttons (e.g., "داخل", "خارج") are clickable, playing their pronunciations using `expo-speech`.
3. User records their pronunciation to match the correct position.

#### [NEW] [sizes.tsx](file:///c:/Users/MOUNIR%20LAPTOP/.cursor/projects/empty-window/talky-kids/app/questions-game/sizes.tsx)
Click-to-answer game:
1. Spreads a hearable question (e.g., "أين هو الفيل الأكبر؟").
2. Presents two options with scaling layout animations (large vs small emoji/shapes).
3. Clicking the correct option triggers success feedback.

#### [NEW] [colors.tsx](file:///c:/Users/MOUNIR%20LAPTOP/.cursor/projects/empty-window/talky-kids/app/questions-game/colors.tsx)
Click-to-answer game:
1. Spreads a color-related question (e.g., "اختر التفاحة الحمراء").
2. Presents colorful option buttons.
3. Correct selection yields interactive star-effects and unlocks the next level.

#### [NEW] [interactive.tsx](file:///c:/Users/MOUNIR%20LAPTOP/.cursor/projects/empty-window/talky-kids/app/questions-game/interactive.tsx)
Drag & drop interactive game:
1. Renders a target zone container (e.g. Bag `🎒`) and two items (e.g. Banana `🍌` and Apple `🍎`).
2. Child drags the correct object into the bag.
3. On contact/overlap, triggers success animation and voice guidance.

---

### App Integration

#### [MODIFY] [index.tsx](file:///c:/Users/MOUNIR%20LAPTOP/.cursor/projects/empty-window/talky-kids/app/%28tabs%29/index.tsx)
Update the second game item on the dashboard:
* Rename card header and description to Arabic details for "لعبة الأسئلة والفهم" (Questions & Understanding Game).
* Change navigation handler to route to `/questions-game`.
* Calculate unified progress across all 4 categories to display the progress bar.

---

## Verification Plan

### Manual Verification
1. Open the app on the Expo simulator.
2. Select the second game from the dashboard and verify the category selector page opens properly.
3. Verify places, sizes, colors, and interactive drag-and-drop gameplay modes operate smoothly.
4. Verify Arabic TTS plays when items are clicked.
5. Verify progress is saved and displayed on the home screen progress bar.
