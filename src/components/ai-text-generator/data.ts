import type { Message } from "@ai-sdk/react";

export type HistoryGroup = "Today" | "Yesterday";

export interface HistorySession {
  id: string;
  title: string;
  group: HistoryGroup;
  messages: Message[];
}

const createMessage = (
  id: string,
  role: "user" | "assistant",
  content: string
): Message => ({
  id,
  role,
  content,
});

export const aiHistorySessions: HistorySession[] = [
  {
    id: "today-follow-up-email",
    title: "Write a follow-up email to a client",
    group: "Today",
    messages: [
      createMessage(
        "msg-1",
        "user",
        "Can you generate some random, creative, and engaging placeholder text for me? It does not need to follow any specific structure. I just need something interesting to fill space temporarily."
      ),
      createMessage(
        "msg-2",
        "assistant",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et varius tortor. Aenean dui magna, vehicula in lacinia non, euismod sed odio. Aliquam erat volutpat.\n\nInteger iaculis eu tellus vel tincidunt. Sed sed dictum orci, in pretium erat. Proin ut mi a arcu mollis hendrerit. Ut id est finibus, egestas tellus ac, pharetra ante."
      ),
      createMessage(
        "msg-3",
        "user",
        "I need another one with a quirky and unexpected tone for placeholder content."
      ),
      createMessage(
        "msg-4",
        "assistant",
        "A tiny paper spaceship landed on my keyboard and asked for coffee before launch. Meanwhile, a neon cactus started giving project deadlines in rhymes, and everyone in the office nodded like this was normal.\n\nIn the hallway, someone trained a goldfish to send reminder emails. Every message ended with, \"Please review before lunch,\" and somehow productivity went up."
      ),
    ],
  },
  {
    id: "today-login-layout",
    title: "Generate responsive login form layout",
    group: "Today",
    messages: [
      createMessage(
        "msg-5",
        "user",
        "Create a responsive login form layout using Tailwind classes."
      ),
      createMessage(
        "msg-6",
        "assistant",
        "Use a centered container with max width, keep inputs full-width on mobile, and split into two columns at lg breakpoint. Add clear error and success states for each input."
      ),
    ],
  },
  {
    id: "today-warning-modal",
    title: "Create a warning state modal",
    group: "Today",
    messages: [
      createMessage(
        "msg-7",
        "user",
        "Write content for a warning modal before deleting user data."
      ),
      createMessage(
        "msg-8",
        "assistant",
        "Title: Delete User Data?\nBody: This action permanently removes user profile, settings, and activity history.\nActions: Cancel, Delete Permanently."
      ),
    ],
  },
  {
    id: "today-dark-theme",
    title: "Suggest color palette for dark theme",
    group: "Today",
    messages: [
      createMessage(
        "msg-9",
        "user",
        "Suggest a neutral dark theme palette with one accent color."
      ),
      createMessage(
        "msg-10",
        "assistant",
        "Background: #0B1020, Surface: #131A2B, Border: #24304A, Text: #E5E7EB, Muted: #94A3B8, Accent: #6366F1."
      ),
    ],
  },
  {
    id: "yesterday-accessibility",
    title: "Improve login page accessibility",
    group: "Yesterday",
    messages: [
      createMessage(
        "msg-11",
        "user",
        "List improvements to make login page accessibility better."
      ),
      createMessage(
        "msg-12",
        "assistant",
        "Add visible labels, keyboard focus states, semantic form errors with aria-describedby, and color contrast at least 4.5:1 for text."
      ),
    ],
  },
  {
    id: "yesterday-warning-animation",
    title: "Create a warning state modal with animation",
    group: "Yesterday",
    messages: [
      createMessage(
        "msg-13",
        "user",
        "Give me warning modal motion guidelines for Tailwind."
      ),
      createMessage(
        "msg-14",
        "assistant",
        "Use 180ms fade for overlay and 220ms scale-in from 96% to 100% for modal panel. Respect reduced motion preference."
      ),
    ],
  },
  {
    id: "yesterday-password-toggle",
    title: "Add password visibility toggle",
    group: "Yesterday",
    messages: [
      createMessage(
        "msg-15",
        "user",
        "How should I implement password visibility toggle for accessibility?"
      ),
      createMessage(
        "msg-16",
        "assistant",
        "Use a button with aria-pressed and aria-label that switches between show and hide states. Keep icon-only button focusable and keyboard-friendly."
      ),
    ],
  },
  {
    id: "yesterday-validation",
    title: "Write validation logic for login form",
    group: "Yesterday",
    messages: [
      createMessage(
        "msg-17",
        "user",
        "Write basic login validation rules."
      ),
      createMessage(
        "msg-18",
        "assistant",
        "Validate email format, minimum password length, and lock submit when required fields are empty. Show field-level and global error feedback."
      ),
    ],
  },
  {
    id: "yesterday-mobile-fix",
    title: "Fix mobile responsiveness of login UI",
    group: "Yesterday",
    messages: [
      createMessage(
        "msg-19",
        "user",
        "How can I improve mobile login layout quickly?"
      ),
      createMessage(
        "msg-20",
        "assistant",
        "Reduce horizontal padding, keep input touch target at least 44px height, and keep CTA button fixed to full width on small screens."
      ),
    ],
  },
];
