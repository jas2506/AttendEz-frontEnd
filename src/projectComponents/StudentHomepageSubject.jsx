import { Clock } from "lucide-react";

function format24HourTime(hour, minute) {
  const paddedHour = hour.toString().padStart(2, "0");
  const paddedMin = minute.toString().padStart(2, "0");
  return `${paddedHour}:${paddedMin}`;
}

function StudentHomepageSubject({ classname, start, end, n, t }) {
  const subject = classname;
  const numberAttended = n;
  const totalClasses = t;
  const attendancePercentage =
    n === 0 && t === 0 ? 0 : ((n / t) * 100).toFixed(2);
  const percentStyle =
    attendancePercentage >= 75 ? "text-green-500" : "text-red-500";

  const startTime = start;
  const endTime = end;

  let adviceText = "";
  if (attendancePercentage < 75 && attendancePercentage > 0) {
    const requiredAttended = Math.ceil(0.75 * totalClasses);
    const moreNeeded = requiredAttended - numberAttended;
    adviceText = `Attend ${moreNeeded} more class${
      moreNeeded > 1 ? "es" : ""
    } to reach 75%`;
  } else if (attendancePercentage > 0) {
    let x = 0;
    while ((numberAttended / (totalClasses + x)) * 100 >= 75) {
      x++;
    }
    x--;
    adviceText = `You can miss ${x} more class${x !== 1 ? "es" : ""}`;
  }

  return (
    <div className="p-4 md:p-6">
      <div className="rounded-2xl border border-gray-300 bg-white shadow-md p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full max-w-4xl mx-auto">
        <div className="flex flex-col gap-1">
          <p className="font-bold text-xl text-blue-600">{subject}</p>
          <div className="flex items-center text-gray-600 text-sm gap-1">
            <Clock className="w-4 h-4" />
            <span>
              {format24HourTime(startTime.hour, startTime.minute)} –{" "}
              {format24HourTime(endTime.hour, endTime.minute)}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1 items-center text-center">
          <p className={`text-xl ${percentStyle} font-semibold text-gray-800`}>
            {attendancePercentage}%
          </p>
          <p className="text-xs text-gray-600">{adviceText}</p>
        </div>
      </div>
    </div>
  );
}

export default StudentHomepageSubject;
