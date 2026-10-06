export interface SkillGroup {
  id: string;
  number: string;
  title: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "robotics-embedded",
    number: "01",
    title: "Robotics / Embedded",
    skills: ["ESP32", "Arduino", "Raspberry Pi", "Embedded C/C++", "Sensors & Actuators", "IoT", "ROS / SLAM"],
  },
  {
    id: "ai-cv",
    number: "02",
    title: "AI / Computer Vision",
    skills: ["Python", "OpenCV", "Computer Vision", "Machine Learning", "AI APIs", "FastAPI"],
  },
  {
    id: "languages",
    number: "03",
    title: "Software Languages",
    skills: ["C", "C++", "Python", "JavaScript", "TypeScript", "Java"],
  },
  {
    id: "fullstack",
    number: "04",
    title: "Full Stack",
    skills: ["React", "Next.js", "Node.js", "Express", "Tailwind CSS", "MongoDB", "PostgreSQL", "Firebase"],
  },
  {
    id: "tools",
    number: "05",
    title: "Tools & Environment",
    skills: ["Git", "GitHub", "Linux", "Docker", "Postman", "VS Code", "Figma"],
  },
];
