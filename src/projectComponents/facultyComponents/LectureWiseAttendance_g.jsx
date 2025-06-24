import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function LectureWiseAttendance_g({ lectures = [] }) {
  return (
    <div className="w-2/3 mx-auto my-6">
      <Table>
        <TableHeader>
          <TableRow className="bg-blue-500 text-white hover:bg-blue-500">
            <TableHead className="text-white">Lecture number</TableHead>
            <TableHead className="text-white">Attended</TableHead>
            <TableHead className="text-white">Total</TableHead>
            <TableHead className="text-white">Percentage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lectures.map((lecture, index) => {
            const percentage =
              lecture.total === 0
                ? "N/A"
                : `${((lecture.attended / lecture.total) * 100).toFixed(1)}%`;
            return (
              <TableRow key={index}>
                <TableCell>{lecture.number}</TableCell>
                <TableCell>{lecture.attended}</TableCell>
                <TableCell>{lecture.total}</TableCell>
                <TableCell>{percentage}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
export default LectureWiseAttendance_g;
