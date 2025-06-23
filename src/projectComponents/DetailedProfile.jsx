import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, BadgeInfo, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function DetailedProfile({ details, setIsLoggedIn }) {
  const navigate = useNavigate();

  function Logoutfunc() {
    setIsLoggedIn(false);

    navigate("/");
  }
  return (
    <Card className="w-full p-4">
      <CardContent className="flex flex-col items-center space-y-4">
        <Avatar className="w-20 h-20">
          <AvatarFallback className="text-2xl">MS</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold">{details.name}</h2>

        <div className="w-full space-y-2 text-sm">
          <InfoRow label="Degree" value={details.degree} />
          <InfoRow label="Department" value={details.department} />
          <InfoRow label="Section" value="B" />
          <InfoRow
            label="Digital ID"
            value={details.digitalid}
            icon={<BadgeInfo className="w-4 h-4 text-muted-foreground" />}
          />
          <InfoRow
            label="Email"
            value={details.email}
            icon={<Mail className="w-4 h-4 text-muted-foreground" />}
          />
          <InfoRow
            label="Register Number"
            value={details.registerNumber}
            icon={<User2 className="w-4 h-4 text-muted-foreground" />}
          />
        </div>
      </CardContent>
      <Button
        onClick={Logoutfunc}
        variant="ghost"
        className="hover:bg-gray-200 cursor-pointer"
      >
        Log out
      </Button>
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
