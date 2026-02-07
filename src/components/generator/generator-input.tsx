import { useEffect, useRef } from "react";
import { AttachmentIcon, LongArrowUpIcon } from "@/icons/icons";

interface GeneratorInputProps {
  onChange?: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  value?: string;
  disabled?: boolean;
}

const GeneratorInput = ({ onChange, value, disabled }: GeneratorInputProps) => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!textareaRef.current) {
      return;
    }

    textareaRef.current.style.height = "0";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [value]);

  return (
    <div className="sticky inset-x-0 bottom-0 z-30 mt-auto">
      <div className="h-4" />

      <div
        aria-disabled={disabled}
        className="overflow-hidden rounded-3xl border border-gray-200 bg-white/15 shadow-theme-md backdrop-blur-[10px] aria-disabled:pointer-events-none aria-disabled:opacity-70 dark:border-white/10 dark:bg-white/5"
      >
        <div className="p-5 pb-0 pr-[calc((var(--spacing)*5)-10px)]">
          <textarea
            className="custom-scrollbar max-h-44 w-full resize-none pb-8 leading-5 placeholder:text-sm focus:outline-0 dark:text-white/90 dark:placeholder:text-white/50"
            onChange={onChange}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                submitButtonRef.current?.click();
              }
            }}
            placeholder="Type your message"
            ref={textareaRef}
            required
            rows={1}
            value={value}
          />
        </div>
        <div className="flex items-center justify-between gap-2 p-3 pt-0">
          <label className="flex items-center gap-1.5" htmlFor="attach-file">
            <input
              accept=".pdf, .doc, .docx, .txt"
              className="sr-only"
              id="attach-file"
              name="attachFile"
              type="file"
            />
            <AttachmentIcon />

            <span className="text-sm text-gray-400">Attach file</span>
          </label>

          <button
            className="flex size-10 items-center justify-center rounded-full bg-gray-800 text-white transition dark:bg-primary-500 dark:disabled:bg-white/20"
            disabled={!value?.trim()}
            ref={submitButtonRef}
            type="submit"
          >
            <span className="sr-only">Submit</span>
            <LongArrowUpIcon />
          </button>
        </div>
      </div>

      <div className="h-5" />
    </div>
  );
};

export default GeneratorInput;
