import { Stars } from "@/assets/stars";

type PropsType = {
  text: string;
};

export function Subheading({ text }: PropsType) {
  return (
    <div className="rounded-full mb-6 max-w-fit mx-auto bg-linear-to-r from-[var(--color-accent-pink-500-alpha)] to-[var(--color-accent-blue-500-alpha)] p-0.5">
      <div className="bg-[var(--token-white)] dark:bg-dark-primary py-2 text-sm items-center gap-2 px-5 inline-flex dark:text-[var(--token-white-90)] rounded-full">
        <Stars />
        <p>{text}</p>
      </div>
    </div>
  );
}
