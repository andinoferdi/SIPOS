"use client";

import { useState } from "react";
import { AutoGrowingTextArea } from "@/components/ui/inputs/textarea";
import { PencilIcon } from "@/icons/icons";
import { cn } from "@/lib/utils";

interface UserMessageProps {
  message: string;
  showActions?: boolean;
  onEdit: (
    newMessage: string,
    options?: { isSubmitting: boolean },
  ) => Promise<void>;
}

const UserMessage = ({ message, showActions, onEdit }: UserMessageProps) => {
  const [showEditInput, setShowEditInput] = useState(false);
  const [value, setValue] = useState(message);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCancel = () => {
    setShowEditInput(false);
    setValue(message);
  };

  const handleEdit = async () => {
    setIsSubmitting(true);

    try {
      await onEdit(value, { isSubmitting });
    } catch (error) {
      console.error("Error while editing message:", error);
    } finally {
      setIsSubmitting(false);
      setShowEditInput(false);
    }
  };

  return (
    <div>
      <div
        className={cn(
          "shadow-theme-xs ml-auto w-fit max-w-md rounded-3xl rounded-tr-lg bg-primary-100 px-5 py-4 dark:bg-white/10",
          showEditInput && "max-w-none w-full",
        )}
      >
        {!showEditInput ? (
          message
        ) : (
          <AutoGrowingTextArea
            autoFocus
            onChange={(newValue) => setValue(newValue)}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                handleCancel();
              }
            }}
            value={value}
          />
        )}
      </div>

      {showActions && !showEditInput && (
        <div className="ml-auto mt-2 max-w-fit">
          <button
            className="flex items-center gap-1 rounded-full border border-gray-100 bg-white px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-gray-800 dark:border-white/5 dark:bg-white/3 dark:text-gray-400 dark:hover:text-white/90"
            onClick={() => setShowEditInput(true)}
            title="Edit message"
            type="button"
          >
            <PencilIcon className="size-4.5" />
            <span className="sr-only">Edit message</span>
          </button>
        </div>
      )}

      {showEditInput && (
        <div className="mt-3 flex justify-end gap-2">
          <button
            className="rounded-full border border-[var(--color-brand-500)] bg-white px-4.5 py-2 text-sm font-medium text-[var(--color-brand-500)] shadow-xs hover:opacity-90 disabled:pointer-events-none disabled:opacity-80 dark:border-[var(--color-brand-500)] dark:bg-[var(--color-brand-500)] dark:text-gray-400"
            disabled={isSubmitting}
            onClick={handleCancel}
            type="button"
          >
            Cancel
          </button>

          <button
            className="rounded-full bg-primary-500 px-4.5 py-2 text-sm font-medium text-white hover:opacity-90 disabled:pointer-events-none disabled:opacity-70"
            disabled={isSubmitting}
            onClick={handleEdit}
            type="button"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMessage;
