export interface Achievement {
  id: string;
  title: string;
  event: string;
  year: string;
  metric?: string;
  description: string;
}

export const achievements: Achievement[] = [
  {
    id: "robotex",
    title: "Winner",
    event: "Robotex India",
    year: "2024",
    description:
      "Won the Robot Making category at Robotex India, competing against teams in a national robotics competition.",
  },
  {
    id: "wrc",
    title: "Top 5",
    event: "World Robotics Championship",
    year: "2024",
    description:
      "Secured a Top 5 position at the World Robotics Championship through competitive line-following robotics.",
  },
  {
    id: "iag",
    title: "12th Nationwide",
    event: "India Automation Games",
    year: "2025",
    description:
      "Secured 12th position nationwide at the India Automation Games, competing against teams from across the country.",
  },
  {
    id: "eyantra",
    title: "Finalist",
    event: "e-Yantra Innovation Challenge · IIT Bombay",
    year: "2025",
    description:
      "Reached the final stage of the e-Yantra Innovation Challenge by IIT Bombay with an assistive robotics and embedded systems project.",
  },
  {
    id: "sih",
    title: "Semi-Finalist",
    event: "Smart India Hackathon",
    year: "2025",
    description:
      "Reached the semi-final stage of Smart India Hackathon with an IoT-based waste segregation and monitoring solution.",
  },
  {
  id: "robotics-challenge",
  title: "Top 30",
  event: "National Robotics Challenge",
  year: "2025",
  description:
    "Ranked among the Top 30 teams in a national robotics challenge, competing through practical robot design, programming, and problem-solving.",
},
];