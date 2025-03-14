"use client";

import { useState, useEffect, useCallback, ChangeEvent } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

type Option = Array<{ label: string; value: string }>;

export function ComboboxInput({
  options = [],
  onChange,
  disabled = false,
  value: controlledValue,
}: {
  options?: Option;
  onChange?: (value: string) => void;
  disabled?: boolean;
  value?: string;
}) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  useEffect(() => {
    if (isControlled) {
      const matchedOption = options.find(
        (option) => option.value === controlledValue,
      );
      setInputValue(matchedOption?.value || controlledValue || "");
    }
  }, [controlledValue, options, isControlled]);

  const handleSelect = useCallback(
    (currentValue: string) => {
      if (currentValue === value) {
        if (!isControlled) setInternalValue("");
        setInputValue("");
        onChange?.("");
      } else {
        if (!isControlled) setInternalValue(currentValue);
        const selectedOption = options.find(
          (option) => option.value === currentValue,
        );
        setInputValue(selectedOption?.value || currentValue);
        onChange?.(currentValue);
      }
      setOpen(false);
    },
    [value, onChange, options, isControlled],
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      const matchedOption = options.find(
        (option) => option.value.toLowerCase() === newValue.toLowerCase(),
      );

      const valueToSet = matchedOption?.value || newValue;

      if (!isControlled) {
        setInternalValue(valueToSet);
      }

      onChange?.(valueToSet);
    },
    [options, onChange, isControlled],
  );

  return (
    <Popover
      open={disabled ? false : open}
      onOpenChange={disabled ? undefined : setOpen}
    >
      <PopoverTrigger asChild disabled={disabled}>
        <div className="relative flex items-center w-full">
          <Input
            id="combobox-input"
            value={inputValue}
            onChange={handleInputChange}
            className="w-full bg-white border border-grey rounded-[0px] !ring-offset-0 !ring-0 font-spectral"
            disabled={disabled}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 h-full rounded-l-none"
            onClick={() => !disabled && setOpen(!open)}
            type="button"
            disabled={disabled}
          >
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-0"
        align="start"
      >
        <Command>
          <CommandInput placeholder="Search options..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={handleSelect}
                  className="font-spectral"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.value}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
