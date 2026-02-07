"use client";

import { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import DatePicker from "@/components/form/date-picker";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import Input from "@/components/form/input/InputField";
import {
  ChevronDownIcon,
  EyeCloseIcon,
  EyeIcon,
  TimeIcon,
} from "@/icons";

const DefaultInputs = () => {
  const [showPassword, setShowPassword] = useState(false);
  const options = [
    { value: "marketing", label: "Marketing" },
    { value: "template", label: "Template" },
    { value: "development", label: "Development" },
  ];

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  return (
    <ComponentCard title="Default Inputs">
      <div className="space-y-6">
        <div>
          <Label>Input</Label>
          <Input type="text" />
        </div>
        <div>
          <Label>Input with Placeholder</Label>
          <Input placeholder="info@gmail.com" type="text" />
        </div>
        <div>
          <Label>Select Input</Label>
          <div className="relative">
            <Select
              className="dark:bg-dark-900"
              onChange={handleSelectChange}
              options={options}
              placeholder="Select an option"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
        </div>
        <div>
          <Label>Password Input</Label>
          <div className="relative">
            <Input
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
            />
            <button
              className="absolute right-4 top-1/2 z-30 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? (
                <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
              ) : (
                <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div>
          <DatePicker
            id="date-picker"
            label="Date Picker Input"
            onChange={(dates, currentDateString) => {
              console.log({ dates, currentDateString });
            }}
            placeholder="Select a date"
          />
        </div>

        <div>
          <Label htmlFor="tm">Time Picker Input</Label>
          <div className="relative">
            <Input
              id="tm"
              name="tm"
              onChange={(event) => console.log(event.target.value)}
              type="time"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              <TimeIcon />
            </span>
          </div>
        </div>
        <div>
          <Label htmlFor="tm">Input with Payment</Label>
          <div className="relative">
            <Input className="pl-[62px]" placeholder="Card number" type="text" />
            <span className="absolute left-0 top-1/2 flex h-11 w-[46px] -translate-y-1/2 items-center justify-center border-r border-gray-200 dark:border-gray-800">
              <svg
                fill="none"
                height="20"
                viewBox="0 0 20 20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="6.25" cy="10" fill="var(--color-brand-500)" r="5.625" />
                <circle cx="13.75" cy="10" fill="var(--color-brand-500)" r="5.625" />
                <path
                  d="M10 14.1924C11.1508 13.1625 11.875 11.6657 11.875 9.99979C11.875 8.33383 11.1508 6.8371 10 5.80713C8.84918 6.8371 8.125 8.33383 8.125 9.99979C8.125 11.6657 8.84918 13.1625 10 14.1924Z"
                  fill="var(--color-brand-500)"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
};

export default DefaultInputs;
