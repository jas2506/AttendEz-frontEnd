import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, BadgeInfo, User2 } from "lucide-react";

export default function DetailedProfile() {
  return (
    <Card className="max-w-md mx-auto p-4">
      <CardContent className="flex flex-col items-center space-y-4">
        <Avatar className="w-20 h-20">
          <AvatarFallback className="text-2xl">MS</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold">Murari Sreekumar</h2>

        <div className="w-full space-y-2 text-sm">
          <InfoRow label="Degree" value="B.E." />
          <InfoRow label="Department" value="CSE" />
          <InfoRow label="Section" value="A" />
          <InfoRow
            label="Digital ID"
            value="2310332"
            icon={<BadgeInfo className="w-4 h-4 text-muted-foreground" />}
          />
          <InfoRow
            label="Email"
            value="murari2310332@ssn.edu.in"
            icon={<Mail className="w-4 h-4 text-muted-foreground" />}
          />
          <InfoRow
            label="Register Number"
            value="3122235001081"
            icon={<User2 className="w-4 h-4 text-muted-foreground" />}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function InfoRow({ label, value, icon }) {
  return (
    <div className="flex justify-between items-center bg-muted p-2 rounded-md">
      <span className="font-medium text-muted-foreground flex items-center gap-1">
        {icon}
        {label}
      </span>
      <span className="font-semibold text-right">{value}</span>
    </div>
  );
}
