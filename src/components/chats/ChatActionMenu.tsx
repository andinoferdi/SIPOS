"use client";;
import { useState } from "react";
import { MoreDotIcon } from "@/icons";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";

interface ChatActionMenuProps {
  align?: "left" | "right";
  items?: string[];
}

const defaultItems = ["View Profile", "Mute Chat", "Delete Chat"];

const ChatActionMenu = (
  {
    align = "right",
    items = defaultItems,
  }: ChatActionMenuProps,
) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative inline-flex">
      <button onClick={toggleDropdown} className="dropdown-toggle">
        <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
      </button>
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className={`w-40 p-2 ${align === "left" ? "left-0 right-auto" : ""}`}
      >
        {items.map((item) => (
          <DropdownItem
            key={item}
            onItemClick={closeDropdown}
            className="flex w-full rounded-lg text-left font-normal text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
          >
            {item}
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  );
};

export default ChatActionMenu;
