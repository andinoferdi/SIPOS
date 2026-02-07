import { Stars } from "@/assets/stars";

interface SubheadingProps {
  text: string;
}

export const Subheading = ({ text }: SubheadingProps) => {
  return (
    <div className="mx-auto mb-6 max-w-fit rounded-full bg-linear-to-r from-[var(--color-brand-500)] to-[var(--color-brand-500)] p-0.5">
      <div className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm dark:bg-dark-primary dark:text-white/90">
        <Stars />
        <p>{text}</p>
      </div>
    </div>
  );
};
