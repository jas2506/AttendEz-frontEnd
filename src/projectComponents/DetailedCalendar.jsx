import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";

function DetailedCalendar() {
  const present = [new Date(2025, 5, 20), new Date(2025, 5, 25)];
  const absent = [new Date(2025, 5, 21), new Date(2025, 5, 24)];
  const multiple = [new Date(2025, 5, 22), new Date(2025, 5, 23)];

  return (
    <Card className="w-fit shadow-md rounded-xl p-4">
      <Calendar
        mode="single"
        selected={new Date()}
        modifiers={{
          present: present,
          absent: absent,
          multiple: multiple,
        }}
        modifiersClassNames={{
          present: "bg-green-300 text-black font-semibold rounded-md scale-90",
          absent: "bg-red-300 text-black font-semibold rounded-md scale-90",
          multiple:
            "bg-orange-300 text-black font-semibold rounded-md scale-90",
        }}
      />
    </Card>
  );
}

export default DetailedCalendar;
