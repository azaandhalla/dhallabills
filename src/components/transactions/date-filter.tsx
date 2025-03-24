"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDispatch } from "react-redux";
import { setColumnFilters } from "@/store/slices/transactionSlice";
import { cn } from "@/libs/utils";

const dateOptions = [
  {
    value: "this-month",
    label: "This Month",
  },
  {
    value: "last-month",
    label: "Last Month",
  },
];

export function DateFilter() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch();

  const getDateRange = (option: string) => {
    const today = new Date();
    let startDate: Date;
    let endDate: Date;

    if (option === "this-month") {
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    } else {
      startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      endDate = new Date(today.getFullYear(), today.getMonth(), 0);
    }

    return {
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    };
  };

  const handleSelect = (currentValue: string) => {
    setValue(currentValue);
    setOpen(false);

    const dateRange = getDateRange(currentValue);
    dispatch(
      setColumnFilters([
        {
          id: "post",
          value: dateRange,
        },
      ])
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? dateOptions.find((option) => option.value === value)?.label
            : "Select date range..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search date range..." />
          <CommandEmpty>No date range found.</CommandEmpty>
          <CommandGroup>
            {dateOptions.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={handleSelect}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
