import type { UIMessage } from 'ai';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

export const getMostRecentUserMessage = (messages: Array<UIMessage>) => {
  const userMessages = messages.filter((message) => message.role === 'user');
  return userMessages.at(-1);
};

export const errorHandler = (error: unknown) => {
  if (error == null) {
    return 'unknown error';
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return JSON.stringify(error);
};

export const getScrollBarWidth = () => {
  return window.innerWidth - document.documentElement.clientWidth;
};
