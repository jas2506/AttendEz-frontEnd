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
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-2 xs:p-3 sm:p-4 md:p-6 w-full max-w-full">
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn("group/calendar w-full", className)}
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
          root: cn("w-full", defaultClassNames.root),
          months: cn(
            "flex gap-2 sm:gap-4 flex-col sm:flex-row relative w-full",
            defaultClassNames.months
          ),
          month: cn(
            "flex flex-col w-full gap-3 sm:gap-4 md:gap-6",
            defaultClassNames.month
          ),
          nav: cn(
            "flex items-center gap-1 sm:gap-2 w-full absolute -top-1 sm:-top-2 inset-x-0 justify-between z-10",
            defaultClassNames.nav
          ),
          button_previous: cn(
            "h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md",
            "aria-disabled:opacity-50 p-0 select-none",
            defaultClassNames.button_previous
          ),
          button_next: cn(
            "h-8 w-8 xs:h-9 xs:w-9 sm:h-10 sm:w-10 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md",
            "aria-disabled:opacity-50 p-0 select-none",
            defaultClassNames.button_next
          ),
          month_caption: cn(
            "flex items-center justify-center h-10 sm:h-12 w-full px-8 xs:px-10 sm:px-12 mb-2",
            defaultClassNames.month_caption
          ),
          dropdowns: cn(
            "w-full flex items-center text-xs xs:text-sm sm:text-lg font-semibold justify-center h-10 sm:h-12 gap-1 sm:gap-2 text-gray-800",
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
            "select-none font-semibold text-xs xs:text-sm sm:text-lg text-gray-800",
            captionLayout === "label"
              ? "text-xs xs:text-sm sm:text-lg"
              : "rounded-lg pl-2 xs:pl-3 pr-1 xs:pr-2 flex items-center gap-1 xs:gap-2 text-xs xs:text-sm sm:text-lg h-8 xs:h-9 sm:h-10 bg-white border border-gray-200 hover:bg-gray-50 transition-colors [&>svg]:text-gray-500 [&>svg]:size-3 xs:[&>svg]:size-4",
            defaultClassNames.caption_label
          ),
          table: "w-full border-collapse mt-2 sm:mt-4",
          weekdays: cn("flex mb-1 sm:mb-2 w-full", defaultClassNames.weekdays),
          weekday: cn(
            "text-gray-600 rounded-lg flex-1 font-medium text-xs xs:text-sm select-none h-6 xs:h-8 sm:h-10 flex items-center justify-center uppercase tracking-wide",
            defaultClassNames.weekday
          ),
          week: cn(
            "flex w-full gap-0.5 xs:gap-1 mb-0.5 xs:mb-1",
            defaultClassNames.week
          ),
          week_number_header: cn(
            "select-none w-6 xs:w-8 sm:w-12",
            defaultClassNames.week_number_header
          ),
          week_number: cn(
            "text-xs xs:text-sm select-none text-gray-500 font-medium",
            defaultClassNames.week_number
          ),
          day: cn(
            "relative flex-1 aspect-square p-0 text-center group/day select-none min-w-0",
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
            "bg-blue-50 text-blue-700 rounded-lg font-semibold ring-1 xs:ring-2 ring-blue-200",
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
                className={cn("w-full", className)}
                {...props}
              />
            );
          },
          Chevron: ({ className, orientation, ...props }) => {
            if (orientation === "left") {
              return (
                <ChevronLeftIcon
                  className={cn(
                    "size-3 xs:size-4 sm:size-5 text-gray-600",
                    className
                  )}
                  {...props}
                />
              );
            }
            if (orientation === "right") {
              return (
                <ChevronRightIcon
                  className={cn(
                    "size-3 xs:size-4 sm:size-5 text-gray-600",
                    className
                  )}
                  {...props}
                />
              );
            }
            return (
              <ChevronDownIcon
                className={cn("size-3 xs:size-4 text-gray-500", className)}
                {...props}
              />
            );
          },
          DayButton: CalendarDayButton,
          WeekNumber: ({ children, ...props }) => {
            return (
              <td {...props}>
                <div className="flex w-6 h-6 xs:w-8 xs:h-8 sm:w-12 sm:h-12 items-center justify-center text-center text-xs xs:text-sm text-gray-500 font-medium">
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
      "bg-gradient-to-br from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white border-emerald-400 shadow-md xs:shadow-lg shadow-emerald-200/50 transform hover:scale-105";
    icon = (
      <CheckCircle className="w-2 h-2 xs:w-3 xs:h-3 absolute top-0.5 right-0.5 opacity-80" />
    );
  } else if (modifiers.absent) {
    attendanceClass =
      "bg-gradient-to-br from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white border-rose-400 shadow-md xs:shadow-lg shadow-rose-200/50 transform hover:scale-105";
    icon = (
      <XCircle className="w-2 h-2 xs:w-3 xs:h-3 absolute top-0.5 right-0.5 opacity-80" />
    );
  } else if (modifiers.partial) {
    attendanceClass =
      "bg-gradient-to-br from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white border-amber-400 shadow-md xs:shadow-lg shadow-amber-200/50 transform hover:scale-105 cursor-pointer ring-1 xs:ring-2 ring-amber-200";
    icon = (
      <AlertCircle className="w-2 h-2 xs:w-3 xs:h-3 absolute top-0.5 right-0.5 opacity-80" />
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
      "bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 text-blue-800 border-blue-300 ring-1 xs:ring-2 ring-blue-300 font-semibold";
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
        "relative w-full aspect-square rounded-md xs:rounded-lg font-medium text-xs xs:text-sm transition-all duration-200 ease-in-out min-w-0",
        "hover:shadow-sm xs:hover:shadow-md focus:outline-none focus:ring-1 xs:focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-1 xs:focus:ring-offset-2",
        "data-[selected-single=true]:ring-1 xs:data-[selected-single=true]:ring-2 data-[selected-single=true]:ring-blue-500",
        attendanceClass,
        defaultClassNames.day,
        className
      )}
      {...props}
    >
      <span className="relative z-10 leading-none">{day.date.getDate()}</span>
      {icon}
    </Button>
  );
}

export { Calendar, CalendarDayButton };
