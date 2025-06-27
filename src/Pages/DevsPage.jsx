import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Mail, Github, Linkedin } from "lucide-react";

const devs = [
  { name: "Saipranav", github: "#", linkedin: "#", email: "a@x.com" },
  { name: "Murari Sreekumar", github: "#", linkedin: "#", email: "b@x.com" },
  { name: "Rahul VS", github: "#", linkedin: "#", email: "c@x.com" },
  { name: "Ramcharan S", github: "#", linkedin: "#", email: "d@x.com" },
  { name: "Jaswanth Sridharan", github: "#", linkedin: "#", email: "e@x.com" },
  { name: "Gautham Narayan G", github: "#", linkedin: "#", email: "f@x.com" },
];

export default function DevsPage() {
  return (
    <div className="min-h-screen px-10 py-16 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-12">
        {/* LEFT: Profile Cards Grid */}
        <div className="grid grid-cols-3 gap-x-10 gap-y-12">
          <TooltipProvider>
            {devs.map((dev, idx) => (
              <Tooltip key={idx}>
                <TooltipTrigger asChild>
                  <Card className="w-72 bg-gray-100 rounded-xl p-4 hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="flex flex-col items-center text-center gap-3">
                      <div className="w-28 h-28 bg-white rounded-full border-2 border-gray-300" />
                      <h2 className="text-lg font-bold text-blue-700 whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">
                        {dev.name}
                      </h2>

                      <p className="text-sm font-semibold text-gray-700">
                        Backend Developer
                      </p>
                      <p className="text-sm text-gray-600">CSE, 3rd year</p>
                      <div className="flex justify-between w-full mt-2 px-6">
                        <a
                          href={dev.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="text-blue-600 hover:text-black" />
                        </a>
                        <a
                          href={dev.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="text-blue-600 hover:text-black" />
                        </a>
                        <a href={`mailto:${dev.email}`}>
                          <Mail className="text-blue-600 hover:text-black" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Let's connect and collaborate!</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>

        {/* RIGHT: App Description */}
        <div className="text-gray-800 max-w-sm">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            About the App
          </h2>
          <p className="text-base leading-relaxed">
            A collaborative platform built by a passionate backend team from
            CSE, 3rd year. It includes attendance, file sharing, and dashboard
            tools to streamline academic workflows.
          </p>
        </div>
      </div>
    </div>
  );
}
