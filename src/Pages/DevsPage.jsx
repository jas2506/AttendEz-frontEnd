import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Mail, Github, Linkedin } from "lucide-react";

import gln from "../assets/gln.jpg";
import saipranav from "../assets/saipranav.jpg";
import murari from "../assets/murari.jpg";
import rahul from "../assets/rahul.jpg";
import ramcharan from "../assets/ramcharan.jpg";
import jaswanth from "../assets/jaswanth.jpg";

const devs = [
  {
    name: "Saipranav",
    role: "Backend Developer, DevOps, DB",
    image: saipranav,
    github: "https://github.com/AvGeeky",
    linkedin: "https://www.linkedin.com/in/saipranav-m/",
    email: "sai@buildapp.in",
  },
  {
    name: "Murari Sreekumar",
    role: "Backend Developer, DB and Tester",
    image: murari,
    github: "https://github.com/muru2005",
    linkedin:
      "https://www.linkedin.com/in/murari-sreekumar-1a5809305?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B1UuUPkK9Tq2ZdQYjITygIw%3D%3D",
    email: "murari@buildapp.in",
  },
  {
    name: "Rahul VS",
    role: "Mobile App",
    image: rahul,
    github: "https://github.com/techieRahul17",
    linkedin: "https://www.linkedin.com/in/rahul-v-s",
    email: "rahul@buildapp.in",
  },
  {
    name: "Ramcharan S",
    role: "Mobile App",
    image: ramcharan,
    github: "https://github.com/Ramcharan-Swaminathan",
    linkedin: "https://www.linkedin.com/in/ramcharan-s-30506628a",
    email: "ramcharan@buildapp.in",
  },
  {
    name: "Jaswanth Sridharan",
    role: "UI/UX, Web Developer",
    image: jaswanth,
    github: "https://github.com/jas2506",
    linkedin: "https://www.linkedin.com/in/jaswanth-sridharan",
    email: "jaswanth@buildapp.in",
  },
  {
    name: "Gautham Narayan G",
    role: "UI/UX, Web Developer",
    image: gln,
    github: "https://github.com/gautham-gln",
    linkedin: "https://www.linkedin.com/in/gautham-narayan-g",
    email: "gautham@buildapp.in",
  },
];

export default function DevsPage() {
  return (
    <div className="min-h-screen px-10 py-16 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          <TooltipProvider>
            {devs.map((dev, idx) => (
              <Tooltip key={idx}>
                <TooltipTrigger asChild>
                  <Card className="w-full bg-gray-100 rounded-xl p-4 hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="flex flex-col items-center text-center gap-3">
                      <img
                        src={dev.image}
                        alt={dev.name}
                        className="w-28 h-28 rounded-full border-2 border-gray-300 object-cover"
                      />

                      <h2 className="text-lg font-bold text-blue-700 whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">
                        {dev.name}
                      </h2>

                      <p className="text-sm font-semibold text-gray-700">
                        {dev.role}
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

        <div className="text-gray-800 max-w-sm mt-8 lg:mt-0">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">
            About the App
          </h2>
          <p className="text-base leading-relaxed">
            A collaborative platform built by a passionate team from CSE, 3rd
            year. It includes attendance, and dashboard tools to streamline
            academic workflows.
          </p>
        </div>
      </div>
    </div>
  );
}
