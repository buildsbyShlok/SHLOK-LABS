export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  link?: string;
  logo?: string;
}

export const experiences: Experience[] = [
  {
    id: "lensvision",
    company: "LenixVision",
    role: "Embedded Systems Engineer",
    duration: "2026",
    location: "Hybrid",
    description:
      "Worked on embedded systems and hardware-software integration, developing and testing microcontroller-based solutions involving sensors, electronics, and real-time system logic.",
    responsibilities: [
      "Developed and tested embedded systems using microcontrollers and sensors",
      "Worked on firmware, hardware interfacing, and real-time system integration",
      "Integrated electronic components for practical monitoring and automation applications",
      "Debugged hardware and software interactions during system development",
    ],
    technologies: [
      "Embedded C",
      "ESP32",
      "Arduino",
      "Sensors",
      "Microcontrollers",
    ],
  },

  {
    id: "convegenius",
    company: "ConveGenius.AI",
    role: "AI Engineer Intern",
    duration: "2025",
    location: "Remote",
    description:
      "Worked on AI-powered educational technology, exploring machine learning and natural language processing to build intelligent features and improve digital learning experiences.",
    responsibilities: [
      "Developed AI-driven features for educational applications",
      "Worked with machine learning and NLP pipelines",
      "Built backend services supporting intelligent AI workflows",
      "Integrated AI capabilities into product features and user-facing systems",
    ],
    technologies: [
      "Python",
      "AI/ML",
      "NLP",
      "FastAPI",
      "Docker",
    ],
  },

  {
    id: "techqware",
    company: "TechQware",
    role: "IoT & Robotics Engineer",
    duration: "2025",
    location: "On-site",
    description:
      "Worked across IoT, robotics, and industrial automation, gaining hands-on experience with connected hardware, robotic systems, sensors, and automation technologies through practical workshops and technical training.",
    responsibilities: [
      "Worked with IoT and robotics systems through hands-on implementation",
      "Explored sensors, microcontrollers, communication protocols, and connected devices",
      "Participated in practical workshops covering industrial automation and robotics",
      "Gained exposure to automation systems, control technologies, and hardware integration",
    ],
    technologies: [
      "IoT",
      "Robotics",
      "ESP32",
      "Sensors",
      "Automation",
    ],
  },

  {
    id: "gssoc",
    company: "GirlScript Summer of Code",
    role: "Open Source Contributor",
    duration: "2024",
    location: "Remote",
    description:
      "Contributed to open-source projects through GirlScript Summer of Code, collaborating with developers and improving community-driven software through real-world development tasks.",
    responsibilities: [
      "Contributed features, fixes, and improvements to open-source projects",
      "Worked with Git and GitHub-based collaboration workflows",
      "Reviewed existing code and implemented changes based on project requirements",
      "Collaborated with contributors through issues and pull requests",
    ],
    technologies: [
      "Git",
      "GitHub",
      "JavaScript",
      "React",
      "Open Source",
    ],
  },
];