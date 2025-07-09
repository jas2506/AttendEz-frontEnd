import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
function DetailedCalendar({ present = [], absent = [], multiple = [] }) {
  return (
    <Card className="w-fit shadow-md rounded-xl p-4">
      <Calendar
        mode="single"
        selected={new Date()}
        modifiers={{ present, absent, multiple }}
        modifiersClassNames={{
          present: "bg-green-300 text-black font-semibold rounded-md scale-90",
          absent: "bg-red-300 text-black font-semibold rounded-md scale-90",
          multiple:
            "bg-purple-300 text-black font-semibold rounded-md scale-90",
        }}
      />
    </Card>
  );
}

export default DetailedCalendar;
