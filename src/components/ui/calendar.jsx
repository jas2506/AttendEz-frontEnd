"use client";

import * as React from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  present = [],
  absent = [],
  partial = [],
  onDayClick,
  ...props
}) {
  const defaultClassNames = getDefaultClassNames();

  const modifiers = {
    present: present,
    absent: absent,
    partial: partial,
  };

  const modifiersStyles = {
    present: {
      backgroundColor: "transparent",
      color: "inherit",
    },
    absent: {
      backgroundColor: "transparent",
      color: "inherit",
    },
    partial: {
      backgroundColor: "transparent",
      color: "inherit",
    },
  };

  const handleDayClick = (day, modifiers) => {
    if (onDayClick) {
      onDayClick(day);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn(
          "bg-transparent group/calendar [--cell-size:48px]",
          className
        )}
        captionLayout={captionLayout}
        modifiers={modifiers}
        modifiersStyles={modifiersStyles}
        onDayClick={handleDayClick}
        formatters={{
          formatMonthDropdown: (date) =>
            date.toLocaleString("default", { month: "short" }),
          ...formatters,
        }}
        classNames={{
          root: cn("w-fit mx-auto", defaultClassNames.root),
          months: cn(
            "flex gap-6 flex-col md:flex-row relative",
            defaultClassNames.months
          ),
          month: cn("flex flex-col w-full gap-6", defaultClassNames.month),
          nav: cn(
            "flex items-center gap-2 w-full absolute -top-2 inset-x-0 justify-between z-10",
            defaultClassNames.nav
          ),
          button_previous: cn(
            "h-10 w-10 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md",
            "aria-disabled:opacity-50 p-0 select-none",
            defaultClassNames.button_previous
          ),
          button_next: cn(
            "h-10 w-10 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md",
            "aria-disabled:opacity-50 p-0 select-none",
            defaultClassNames.button_next
          ),
          month_caption: cn(
            "flex items-center justify-center h-12 w-full px-12 mb-2",
            defaultClassNames.month_caption
          ),
          dropdowns: cn(
            "w-full flex items-center text-lg font-semibold justify-center h-12 gap-2 text-gray-800",
            defaultClassNames.dropdowns
          ),
          dropdown_root: cn(
            "relative has-focus:border-blue-500 border border-gray-200 shadow-sm has-focus:ring-blue-500/20 has-focus:ring-4 rounded-lg bg-white",
            defaultClassNames.dropdown_root
          ),
          dropdown: cn(
            "absolute inset-0 opacity-0",
            defaultClassNames.dropdown
          ),
          caption_label: cn(
            "select-none font-semibold text-lg text-gray-800",
            captionLayout === "label"
              ? "text-lg"
              : "rounded-lg pl-3 pr-2 flex items-center gap-2 text-lg h-10 bg-white border border-gray-200 hover:bg-gray-50 transition-colors [&>svg]:text-gray-500 [&>svg]:size-4",
            defaultClassNames.caption_label
          ),
          table: "w-full border-collapse mt-4",
          weekdays: cn("flex mb-2", defaultClassNames.weekdays),
          weekday: cn(
            "text-gray-600 rounded-lg flex-1 font-medium text-sm select-none h-10 flex items-center justify-center uppercase tracking-wide",
            defaultClassNames.weekday
          ),
          week: cn("flex w-full gap-1 mb-1", defaultClassNames.week),
          week_number_header: cn(
            "select-none w-12",
            defaultClassNames.week_number_header
          ),
          week_number: cn(
            "text-sm select-none text-gray-500 font-medium",
            defaultClassNames.week_number
          ),
          day: cn(
            "relative w-12 h-12 p-0 text-center group/day select-none",
            defaultClassNames.day
          ),
          range_start: cn(
            "rounded-l-lg bg-blue-50",
            defaultClassNames.range_start
          ),
          range_middle: cn(
            "rounded-none bg-blue-50",
            defaultClassNames.range_middle
          ),
          range_end: cn("rounded-r-lg bg-blue-50", defaultClassNames.range_end),
          today: cn(
            "bg-blue-50 text-blue-700 rounded-lg font-semibold ring-2 ring-blue-200",
            defaultClassNames.today
          ),
          outside: cn(
            "text-gray-300 aria-selected:text-gray-300",
            defaultClassNames.outside
          ),
          disabled: cn("text-gray-300 opacity-50", defaultClassNames.disabled),
          hidden: cn("invisible", defaultClassNames.hidden),
          ...classNames,
        }}
        components={{
          Root: ({ className, rootRef, ...props }) => {
            return (
              <div
                data-slot="calendar"
                ref={rootRef}
                className={cn(className)}
                {...props}
              />
            );
          },
          Chevron: ({ className, orientation, ...props }) => {
            if (orientation === "left") {
              return (
                <ChevronLeftIcon
                  className={cn("size-5 text-gray-600", className)}
                  {...props}
                />
              );
            }
            if (orientation === "right") {
              return (
                <ChevronRightIcon
                  className={cn("size-5 text-gray-600", className)}
                  {...props}
                />
              );
            }
            return (
              <ChevronDownIcon
                className={cn("size-4 text-gray-500", className)}
                {...props}
              />
            );
          },
          DayButton: CalendarDayButton,
          WeekNumber: ({ children, ...props }) => {
            return (
              <td {...props}>
                <div className="flex w-12 h-12 items-center justify-center text-center text-sm text-gray-500 font-medium">
                  {children}
                </div>
              </td>
            );
          },
          ...components,
        }}
        {...props}
      />
    </div>
  );
}

function CalendarDayButton({ className, day, modifiers, ...props }) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  // Determine the styling based on attendance status
  let attendanceClass =
    "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200";
  let icon = null;

  if (modifiers.present) {
    attendanceClass =
      "bg-gradient-to-br from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-200/50 transform hover:scale-105";
    icon = (
      <CheckCircle className="w-3 h-3 absolute top-0.5 right-0.5 opacity-80" />
    );
  } else if (modifiers.absent) {
    attendanceClass =
      "bg-gradient-to-br from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white border-rose-400 shadow-lg shadow-rose-200/50 transform hover:scale-105";
    icon = (
      <XCircle className="w-3 h-3 absolute top-0.5 right-0.5 opacity-80" />
    );
  } else if (modifiers.partial) {
    attendanceClass =
      "bg-gradient-to-br from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white border-amber-400 shadow-lg shadow-amber-200/50 transform hover:scale-105 cursor-pointer ring-2 ring-amber-200";
    icon = (
      <AlertCircle className="w-3 h-3 absolute top-0.5 right-0.5 opacity-80" />
    );
  }

  // Special styling for today
  if (
    modifiers.today &&
    !modifiers.present &&
    !modifiers.absent &&
    !modifiers.partial
  ) {
    attendanceClass =
      "bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 text-blue-800 border-blue-300 ring-2 ring-blue-300 font-semibold";
  }

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "relative w-12 h-12 rounded-lg font-medium text-sm transition-all duration-200 ease-in-out",
        "hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2",
        "data-[selected-single=true]:ring-2 data-[selected-single=true]:ring-blue-500",
        attendanceClass,
        defaultClassNames.day,
        className
      )}
      {...props}
    >
      <span className="relative z-10">{day.date.getDate()}</span>
      {icon}
    </Button>
  );
}

export { Calendar, CalendarDayButton };
