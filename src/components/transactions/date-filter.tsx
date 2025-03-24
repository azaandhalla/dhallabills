"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Calendar } from "lucide-react";
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
import { format, subDays, startOfYear, endOfYear } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

const dateOptions = [
  { value: "this-month", label: "This Month" },
  { value: "last-month", label: "Last Month" },
  { value: "last-90-days", label: "Last 90 Days" },
  { value: "this-year", label: "This Year" },
  { value: "last-year", label: "Last Year" },
];

export function DateFilter() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const dispatch = useDispatch();

  const getDateRange = (option: string) => {
    const today = new Date();
    let rangeStart: Date;
    let rangeEnd: Date;

    switch (option) {
      case "this-month":
        rangeStart = new Date(today.getFullYear(), today.getMonth(), 1);
        rangeEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case "last-month":
        rangeStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        rangeEnd = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case "last-90-days":
        rangeStart = subDays(today, 90);
        rangeEnd = today;
        break;
      case "this-year":
        rangeStart = startOfYear(today);
        rangeEnd = endOfYear(today);
        break;
      case "last-year":
        rangeStart = startOfYear(new Date(today.getFullYear() - 1));
        rangeEnd = endOfYear(new Date(today.getFullYear() - 1));
        break;
      default:
        // For custom range, use the selected dates
        if (!startDate || !endDate) return null;
        rangeStart = new Date(startDate);
        rangeEnd = new Date(endDate);
    }

    return {
      start: rangeStart.toISOString(),
      end: rangeEnd.toISOString(),
    };
  };

  const handleDateRangeSelect = (selectedValue?: string) => {
    // If a value is provided, it's from the dropdown
    if (selectedValue) {
      setValue(selectedValue);
      setOpen(false);
    }

    const dateRange = getDateRange(selectedValue || "custom");
    if (dateRange) {
      dispatch(
        setColumnFilters([
          {
            id: "post",
            value: dateRange,
          },
        ])
      );
    }
  };

  return (
    <div className="flex items-center gap-2">
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
                  onSelect={handleDateRangeSelect}
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

      <div className="flex flex-col">
        <label className="text-sm font-medium">Start Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[200px] justify-start text-left font-normal",
                !startDate && "text-muted-foreground"
              )}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium">End Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[200px] justify-start text-left font-normal",
                !endDate && "text-muted-foreground"
              )}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={endDate}
              onSelect={setEndDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button
        className="self-end"
        onClick={() => handleDateRangeSelect()}
        disabled={!startDate || !endDate}
      >
        Apply
      </Button>
    </div>
  );
}
