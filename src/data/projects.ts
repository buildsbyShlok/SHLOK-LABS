export interface ProjectLink {
  label: string;
  url: string;
  type: 'github' | 'live' | 'docs' | 'video' | 'paper';
}

export interface PipelineStep {
  name: string;
  desc: string;
}

export interface ProjectFeature {
  title: string;
  desc: string;
}

export interface ProjectMedia {
  figNum?: string;
  title: string;
  caption: string;
  type: 'schematic' | 'diagram' | 'render' | 'map' | 'photo';
  image?: string;
  accentColor?: string;
}

export interface Project {
  id: string;
  slug: string;
  projectNumber: string;
  title: string;
  subtitle: string;
  category: "software" | "ai" | "robotics" | "embedded" | "iot";
  domain: string;
  year: string;
  role: string;
  event?: string;
  description: string;
  overview: string;
  problem?: string;
  solution?: string;
  architecture?: string;
  pipeline?: PipelineStep[];
  hardwareSpecs?: { name: string; spec: string }[];
  softwareSpecs?: { name: string; spec: string }[];
  hardware?: string[];
  softwareStack?: string[];
  features: (string | ProjectFeature)[];
  implementation?: string;
  challenges?: string;
  outcome?: string;
  technologies: string[];
  status: "live" | "building" | "completed";
  links: ProjectLink[];
  gallery?: ProjectMedia[];
  heroImage?: string;
  images?: string[];
  featured: boolean;
  hasInteractive3D?: boolean;
  github?: string;
  live?: string;
}

export const projects: Project[] = [
  {
    id: "delivery-robot",
    slug: "autonomous-indoor-delivery-robot",
    projectNumber: "01",
    title: "Autonomous Indoor Delivery Robot",
    subtitle: "Real-Time SLAM · Perception · Autonomous Navigation",
    category: "robotics",
    domain: "Robotics · SLAM · Computer Vision · Autonomous Systems",
    year: "2026",
    role: "Lead Robotics & Embedded Systems Engineer",
    description:
      "Autonomous mobile robot platform engineered with 360° laser LiDAR scanning, stereo depth perception, Cartographer SLAM, and dynamic obstacle avoidance for complex indoor facilities.",
    overview:
      "A fully integrated autonomous mobile robot (AMR) designed for point-to-point payload delivery in dynamic indoor environments. The system fuses raw range data from a 360-degree LiDAR and RGB-D depth camera to construct 2D/3D probabilistic occupancy maps in real-time, localize its pose with sub-centimeter accuracy, and plan collision-free trajectories around static and dynamic obstacles.",
    problem:
      "Modern indoor logistics and hospital facilities suffer from labor-intensive manual material transfers and erratic dispatch cycles. Existing commercial mobile robots are prohibitively expensive, closed-source, and fail to handle dynamically moving pedestrians or narrow hallway constraints without extensive infrastructure modification.",
    solution:
      "Engineered an open, modular differential-drive autonomous platform running ROS 2 on an edge ARM compute module. By coupling high-frequency laser scan matching with local Dynamic Window Approach (DWA) trajectory synthesis, the robot navigates unstructured hallways safely at up to 1.8 m/s.",
    architecture:
      "Hierarchical dual-tier compute architecture: Low-level STM32/MCU managing high-frequency PID motor loops, quadrature optical encoders, and hardware emergency safety interrupts, interfaced over high-speed CAN/UART to a primary Raspberry Pi 4 compute core running ROS 2, Cartographer SLAM, and WebSockets telemetry.",
    pipeline: [
      { name: "Stereo Vision & LiDAR", desc: "10Hz 360° laser scans + depth camera point arrays" },
      { name: "Image Processing", desc: "Spatial filtering, edge segmentation & decimation" },
      { name: "Perception & Detection", desc: "Dynamic obstacle classification & clustering" },
      { name: "Cartographer SLAM", desc: "Submap building & scan-to-submap matching" },
      { name: "AMCL Localization", desc: "Monte Carlo particle filter pose estimation" },
      { name: "TEB / DWA Planning", desc: "Global Dijkstra + local timed-elastic-band" },
      { name: "Closed-Loop PID Control", desc: "Hardware PWM & quadrature optical encoder feedback" },
    ],
    hardwareSpecs: [
      { name: "Compute Core", spec: "Raspberry Pi 4 Model B (4GB RAM) + STM32 Companion MCU" },
      { name: "LiDAR Scanner", spec: "RPLiDAR A1 360° Laser Rangefinder (12m radius, 5.5Hz - 10Hz)" },
      { name: "Vision Sensor", spec: "Stereo RGB-D Depth Camera (87° × 58° Field of View)" },
      { name: "Drive System", spec: "4x High-Torque Planetary Gear DC Motors with Optical Encoders" },
      { name: "Motor Controller", spec: "Dual L298N H-Bridge with Hardware PWM Timing" },
      { name: "Power Rail", spec: "24V 6000mAh LiFePO4 Pack with 5V/12V Regulated Buck Rails" },
    ],
    softwareSpecs: [
      { name: "Framework", spec: "ROS 2 (Robot Operating System) / Nav2 Stack" },
      { name: "Languages", spec: "Python 3.11, Embedded C/C++" },
      { name: "Computer Vision", spec: "OpenCV 4.x, Depth Map Point Cloud Decimation" },
      { name: "SLAM Mapping", spec: "Google Cartographer 2D/3D Occupancy Grid Engine" },
      { name: "Local Planner", spec: "Timed-Elastic-Band (TEB) & Dynamic Window Approach (DWA)" },
      { name: "Telemetry Dashboard", spec: "Micro-ROS + WebSocket Real-Time JSON Telemetry" },
    ],
    hardware: ["Raspberry Pi 4", "RPLiDAR A1", "Stereo Depth Camera", "DC Encoder Motors", "L298N Driver", "24V LiFePO4"],
    softwareStack: ["ROS 2", "Python 3.11", "Google Cartographer", "OpenCV", "TEB Local Planner", "Embedded C++"],
    features: [
      {
        title: "Autonomous SLAM Mapping",
        desc: "Generates high-fidelity 0.05m probabilistic occupancy grids in real time with submap loop-closure verification.",
      },
      {
        title: "Dynamic Obstacle Bypass",
        desc: "20Hz local costmap recalculation actively routes around sudden pedestrians and unexpected obstructions.",
      },
      {
        title: "Adaptive Pose Localization",
        desc: "Sub-centimeter pose estimation using adaptive Monte Carlo particle filters fused with IMU priors.",
      },
      {
        title: "Live Telemetry & Diagnostics",
        desc: "Real-time WebSocket telemetry stream broadcasting battery, velocity vectors, and hardware sensor health.",
      },
      {
        title: "Closed-Loop Motor Feedback",
        desc: "Hardware timer interrupt-driven PID regulation synchronized with dual quadrature optical encoders.",
      },
      {
        title: "Fail-Safe Hardware Interrupts",
        desc: "Emergency tactile and proximity cutoff lines bypassing software stack for immediate sub-10ms emergency braking.",
      },
    ],
    implementation:
      "Engineered the custom differential drive kinematic solver, calibrated wheel odometry against IMU fusion filters, authored the low-level motor driver firmware in C++, and orchestrated the ROS2 navigation nodes.",
    challenges:
      "Overcoming sensor noise and odometry drift in feature-poor corridors was solved by tuning the Cartographer scan-matching weight matrices and incorporating IMU angular velocity priors.",
    outcome:
      "Validated across 40+ simulated and physical laboratory trial runs, achieving 99.4% goal reach reliability in dynamic hallway navigation with zero collision incidents.",
    technologies: ["Raspberry Pi", "Python", "Computer Vision", "SLAM", "ROS 2", "Motor Drivers"],
    status: "building",
    featured: true,
    hasInteractive3D: true,
    github: "https://github.com/shlokrajput",
    links: [
      { label: "Source Code Repository", url: "https://github.com/shlokrajput", type: "github" },
      { label: "System Architecture Docs", url: "https://github.com/shlokrajput", type: "docs" },
    ],
    gallery: [
      { figNum: "FIG. 01", title: "Chassis Mechanical CAD", caption: "SolidWorks mechanical chassis packaging with sensor mast and payload bay", type: "render" },
      { figNum: "FIG. 02", title: "Cartographer Spatial Map", caption: "2D spatial occupancy grid generated during indoor corridor sweep test", type: "map" },
      { figNum: "FIG. 03", title: "Power Distribution Schematic", caption: "24V LiFePO4 battery rail with isolated MCU & logic regulators", type: "schematic" },
    ],
  },
  {
  id: "third-eye",
  slug: "third-eye-for-blind",
  projectNumber: "02",
  title: "Third Eye for Blind",
  subtitle: "AI-Assisted Braille & Assistive Technology",
  category: "ai",
  domain: "Assistive Technology · Embedded Systems · AI",
  year: "2025",
  role: "Hardware & Software Developer",

  description:
    "Assistive technology project combining Raspberry Pi, AI-based interaction, and a custom Braille display to help visually impaired users access digital and textual information.",

  overview:
    "Third Eye for Blind was developed as part of the e-Yantra Innovation Challenge to explore accessible human-computer interaction for visually impaired users. The system combines a Raspberry Pi, AI chatbot, text processing, and a custom Braille Dot Display to convert digital information into tactile feedback.",

  problem:
    "Visually impaired users often face difficulties accessing digital and textual information through conventional interfaces. The project explores a tactile interface that can present information through Braille instead of relying entirely on visual displays.",

  solution:
    "Developed an assistive system that processes text and converts it into Braille patterns for display on a custom Braille Dot Display. Raspberry Pi was used for system control and AI interaction, while the hardware interface was designed to provide tactile feedback.",

  architecture:
    "The system uses Raspberry Pi as the main processing unit, receiving text or AI-generated responses, processing the content, converting characters into corresponding Braille patterns, and sending the required signals to the Braille display.",

  pipeline: [
    {
      name: "Input",
      desc: "Text and user interaction received by the system"
    },
    {
      name: "AI Processing",
      desc: "AI chatbot processes queries and generates responses"
    },
    {
      name: "Text Processing",
      desc: "Response text is prepared for Braille conversion"
    },
    {
      name: "Braille Translation",
      desc: "Characters are mapped to corresponding Braille patterns"
    },
    {
      name: "Tactile Output",
      desc: "Braille patterns are represented through the custom display"
    },
  ],

  hardwareSpecs: [
    {
      name: "Main Processing Unit",
      spec: "Raspberry Pi"
    },
    {
      name: "Output Interface",
      spec: "Custom Braille Dot Display"
    },
    {
      name: "Electronics",
      spec: "Custom-designed control circuitry and PCB"
    },
  ],

  softwareSpecs: [
    {
      name: "Programming",
      spec: "Python"
    },
    {
      name: "AI Interaction",
      spec: "AI Chatbot"
    },
    {
      name: "Text Processing",
      spec: "Text-to-Braille Conversion"
    },
  ],

  hardware: [
    "Raspberry Pi",
    "Braille Dot Display",
    "Custom PCB",
    "Electronic Components"
  ],

  softwareStack: [
    "Python",
    "AI",
    "Text Processing",
    "Raspberry Pi"
  ],

  features: [
    {
      title: "AI-Assisted Interaction",
      desc: "Uses an AI chatbot to provide an accessible way of interacting with digital information."
    },
    {
      title: "Text-to-Braille Conversion",
      desc: "Converts text into corresponding Braille patterns for tactile output."
    },
    {
      title: "Custom Braille Display",
      desc: "Built a tactile Braille interface for presenting information without relying on a conventional screen."
    },
    {
      title: "Custom Electronics",
      desc: "Designed and fabricated the supporting PCB and electronic interface for the system."
    },
  ],

  implementation:
    "Worked on the Raspberry Pi integration, text-to-Braille conversion logic, AI chatbot interaction, and development of the custom Braille display and supporting PCB.",

  challenges:
    "The main challenge was integrating software-generated Braille patterns with a physical tactile display while keeping the system compact, reliable, and easy to interact with.",

  outcome:
    "Developed a working assistive technology prototype demonstrating AI-assisted interaction and tactile Braille output for accessible information access.",

  technologies: [
    "Raspberry Pi",
    "Python",
    "AI",
    "Braille",
    "PCB Design"
  ],

  status: "completed",
  featured: true,
  heroImage: "/projects/third-eye/Braille_01.png",
  images: [
    "/projects/third-eye/Braille_01.png",
    "/projects/third-eye/Braille_02.png"
  ],

  github: "https://github.com/shlokrajput",

  links: [
    {
      label: "Source Code Repository",
      url: "https://github.com/shlokrajput",
      type: "github"
    }
  ],

  gallery: [
    {
      figNum: "FIG. 01",
      title: "Braille Display Hardware Prototype",
      caption: "Custom tactile Braille display prototype showing refreshable pin layout and mechanical assembly",
      type: "photo",
      image: "/projects/third-eye/Braille_01.png"
    },
    {
      figNum: "FIG. 02",
      title: "Driver Circuitry & Custom PCB",
      caption: "Custom driver circuit and control board designed for actuating the Braille display mechanism",
      type: "photo",
      image: "/projects/third-eye/Braille_02.png"
    }
  ],
},
 {
  id: "ecobin",
  slug: "ecobin",
  projectNumber: "03",
  title: "EcoBin Smart Waste",
  subtitle: "IoT-Based Waste Monitoring & AI Classification",
  category: "iot",
  domain: "IoT · AI · Embedded Systems · Real-Time Dashboard",
  year: "2024",
  role: "IoT & Dashboard Developer",
  event: "Smart India Hackathon",

  description:
    "Smart waste management system combining IoT sensors, AI-based waste classification, and a real-time monitoring dashboard for tracking waste levels and segregation data.",

  overview:
    "EcoBin was developed as a Smart India Hackathon project to improve waste management through connected sensing and intelligent monitoring. The system uses an ESP32 with IR and ultrasonic sensors to monitor waste activity and bin fill levels, while an AI-based waste classification model helps identify different types of waste. The collected data is visualized through a web dashboard connected to Firebase.",

  problem:
    "Traditional waste bins provide little visibility into fill levels and waste composition, making monitoring and timely collection difficult. The project aimed to combine sensor-based monitoring with intelligent waste classification and a centralized dashboard.",

  solution:
    "Developed an IoT-enabled smart waste monitoring system using an ESP32, ultrasonic and IR sensors, Firebase Realtime Database, and an AI waste classification model. A web dashboard presents live sensor data, waste distribution, and historical trends for easier monitoring.",

  architecture:
    "The ESP32 collects sensor readings from the smart bin and sends the data to Firebase Realtime Database. The web dashboard retrieves the live data and presents it through charts and monitoring panels, while the AI classification system identifies the type of waste.",

  pipeline: [
    {
      name: "Waste Detection",
      desc: "IR sensor detects waste interaction with the bin"
    },
    {
      name: "Fill Level Monitoring",
      desc: "Ultrasonic sensor measures the available space inside the bin"
    },
    {
      name: "AI Classification",
      desc: "AI model identifies the category of incoming waste"
    },
    {
      name: "IoT Data Transfer",
      desc: "ESP32 sends sensor and classification data to Firebase"
    },
    {
      name: "Real-Time Dashboard",
      desc: "Web dashboard visualizes live waste and fill-level data"
    },
  ],

  hardwareSpecs: [
    {
      name: "Microcontroller",
      spec: "ESP32"
    },
    {
      name: "Fill Level Sensor",
      spec: "Ultrasonic Sensor"
    },
    {
      name: "Waste Detection",
      spec: "IR Sensor"
    },
    {
      name: "Display",
      spec: "I2C LCD"
    },
  ],

  softwareSpecs: [
    {
      name: "AI Classification",
      spec: "Teachable Machine Waste Detection Model"
    },
    {
      name: "Cloud Database",
      spec: "Firebase Realtime Database"
    },
    {
      name: "Web Dashboard",
      spec: "React + Chart.js"
    },
    {
      name: "Data Communication",
      spec: "ESP32 → Firebase"
    },
  ],

  hardware: [
    "ESP32",
    "Ultrasonic Sensor",
    "IR Sensor",
    "I2C LCD"
  ],

  softwareStack: [
    "React",
    "Firebase Realtime Database",
    "Chart.js",
    "AI Waste Classification",
    "ESP32"
  ],

  features: [
    {
      title: "Real-Time Fill Monitoring",
      desc: "Ultrasonic sensing provides live information about the waste level inside the bin."
    },
    {
      title: "AI Waste Classification",
      desc: "An AI-based image classification model helps identify and categorize different types of waste."
    },
    {
      title: "IoT Data Monitoring",
      desc: "ESP32 collects sensor data and synchronizes it with Firebase for remote monitoring."
    },
    {
      title: "Interactive Dashboard",
      desc: "A React-based dashboard visualizes waste distribution, fill levels, and historical sensor data."
    },
  ],

  implementation:
    "Integrated the ESP32 with ultrasonic and IR sensors, connected the system to Firebase Realtime Database, developed the AI-based waste classification workflow, and built the web dashboard for real-time monitoring and analytics.",

  challenges:
    "The main challenge was coordinating sensor data, AI classification, and cloud synchronization into a single monitoring workflow while keeping the dashboard responsive and easy to interpret.",

  outcome:
    "Developed an end-to-end smart waste monitoring prototype combining embedded hardware, AI classification, cloud connectivity, and a real-time web dashboard for waste management applications.",

  technologies: [
    "ESP32",
    "IoT",
    "AI/ML",
    "Firebase",
    "React",
    "Chart.js",
    "Ultrasonic Sensor",
    "IR Sensor"
  ],

  status: "completed",
  featured: true,
  heroImage: "/projects/eco-bin/Fig_01.jpg",
  images: [
    "/projects/eco-bin/Fig_01.jpg",
    "/projects/eco-bin/Fig_02.jpg"
  ],

  github:
    "https://github.com/buildsbyShlok/Electronics-Engineering/tree/main/Projects/EcoBin",

  links: [
    {
      label: "Source Code Repository",
      url: "https://github.com/buildsbyShlok/Electronics-Engineering/tree/main/Projects/EcoBin",
      type: "github"
    },
  ],

  gallery: [
    {
      figNum: "FIG. 01",
      title: "EcoBin Hardware Assembly & Sensors",
      caption: "ESP32-based smart waste sensing unit with ultrasonic fill sensors and integrated IR detection",
      type: "photo",
      image: "/projects/eco-bin/Fig_01.jpg"
    },
    {
      figNum: "FIG. 02",
      title: "Smart Waste Analytics Dashboard",
      caption: "Real-time web dashboard displaying fill-level percentages, AI classification streams, and historical analytics",
      type: "photo",
      image: "/projects/eco-bin/Fig_02.jpg"
    },
  ],
},
 {
  id: "smartfarm",
  slug: "smartfarm",
  projectNumber: "04",
  title: "SmartFarm & Agri Bot",
  subtitle: "IoT-Based Agricultural Monitoring System",
  category: "iot",
  domain: "IoT · Embedded Systems · Smart Agriculture",
  year: "2025",
  role: "IoT & Embedded Systems Developer",

  description:
    "ESP32-based agricultural monitoring system that collects soil, environmental, and water-level data and synchronizes it with a real-time dashboard for smarter farm monitoring.",

  overview:
    "SmartFarm & Agri Bot is an IoT-based agricultural monitoring project designed to provide a centralized view of important farm conditions. An ESP32 collects readings from soil moisture, temperature, humidity, light, and water-level sensors and sends the data to Firebase Realtime Database for visualization and analysis.",

  problem:
    "Monitoring soil and environmental conditions manually makes it difficult to continuously track changes in a growing environment. The project aims to bring multiple farm parameters together into a connected system that can be monitored remotely.",

  solution:
    "Built an ESP32-based sensor system that collects soil moisture, temperature, humidity, light, and water-level readings. The sensor data is synchronized with Firebase and presented through a dashboard containing live readings, historical trends, and agricultural insights.",

  architecture:
    "The ESP32 acts as the central sensing unit, reading data from multiple agricultural sensors and publishing the measurements to Firebase Realtime Database. The dashboard retrieves the data and converts it into live monitoring panels, graphs, and system insights.",

  pipeline: [
    {
      name: "Sensor Acquisition",
      desc: "ESP32 collects readings from soil and environmental sensors"
    },
    {
      name: "Data Processing",
      desc: "Sensor readings are processed and organized by the microcontroller"
    },
    {
      name: "Cloud Synchronization",
      desc: "ESP32 publishes agricultural data to Firebase Realtime Database"
    },
    {
      name: "Dashboard Monitoring",
      desc: "Web dashboard displays live sensor readings and trends"
    },
    {
      name: "Agricultural Insights",
      desc: "Collected data is used to understand soil, climate, and water conditions"
    },
  ],

  hardwareSpecs: [
    {
      name: "Microcontroller",
      spec: "ESP32"
    },
    {
      name: "Soil Monitoring",
      spec: "Capacitive Soil Moisture Sensor"
    },
    {
      name: "Environmental Monitoring",
      spec: "DHT11 Temperature & Humidity Sensor"
    },
    {
      name: "Light Monitoring",
      spec: "LDR Light Sensor"
    },
    {
      name: "Water Monitoring",
      spec: "Float Switch Water-Level Sensor"
    },
  ],

  softwareSpecs: [
    {
      name: "Firmware",
      spec: "ESP32 Embedded C/C++"
    },
    {
      name: "Cloud Database",
      spec: "Firebase Realtime Database"
    },
    {
      name: "Dashboard",
      spec: "React-based Monitoring Interface"
    },
    {
      name: "Data Visualization",
      spec: "Charts & Historical Sensor Trends"
    },
  ],

  hardware: [
    "ESP32",
    "Capacitive Soil Moisture Sensor",
    "DHT11",
    "LDR",
    "Water-Level Sensor"
  ],

  softwareStack: [
    "ESP32",
    "Embedded C/C++",
    "Firebase Realtime Database",
    "React",
    "IoT"
  ],

  features: [
    {
      title: "Real-Time Soil Monitoring",
      desc: "Tracks soil moisture readings through sensors connected to the ESP32."
    },
    {
      title: "Environmental Monitoring",
      desc: "Monitors temperature, humidity, and surrounding light conditions for agricultural analysis."
    },
    {
      title: "Water Tank Monitoring",
      desc: "Uses a water-level sensor to monitor the availability of water in the system."
    },
    {
      title: "Connected Farm Dashboard",
      desc: "Displays live sensor readings and historical trends through a centralized Firebase-powered dashboard."
    },
  ],

  implementation:
    "Integrated multiple agricultural sensors with an ESP32, programmed the device to collect and transmit sensor readings, connected the system to Firebase Realtime Database, and developed the dashboard for monitoring and visualizing the collected data.",

  challenges:
    "The main challenge was integrating multiple sensors with the ESP32 while maintaining consistent readings and reliable synchronization with the Firebase database.",

  outcome:
    "Developed a connected agricultural monitoring prototype capable of collecting and remotely visualizing key soil, environmental, and water-level parameters.",

  technologies: [
    "ESP32",
    "IoT",
    "Firebase",
    "React",
    "Soil Sensors",
    "DHT11"
  ],

  status: "completed",
  featured: false,

  github:
    "https://github.com/buildsbyShlok/Electronics-Engineering/tree/main/Projects/AgriBot",

  links: [
    {
      label: "Source Code Repository",
      url: "https://github.com/buildsbyShlok/Electronics-Engineering/tree/main/Projects/AgriBot",
      type: "github"
    },
  ],
},
  {
  id: "line-follower",
  slug: "precision-line-follower",
  projectNumber: "05",
  title: "Line Following Robot",
  subtitle: "PID-Based Autonomous Line Navigation",
  category: "embedded",
  domain: "Embedded Systems · Control Systems · Robotics",
  year: "2024",
  role: "Embedded Hardware & Firmware Developer",

  description:
    "Autonomous line following robot using an Arduino Nano, infrared sensor array, TB6612FNG motor driver, and PID-based control for accurate track following.",

  overview:
    "The Precision Line Following Robot is a compact autonomous robot designed to follow a marked path using infrared sensors and differential motor control. The system continuously reads the track position, calculates the deviation from the desired path, and adjusts motor speeds to maintain stable movement through turns and curves.",

  problem:
    "Basic line-following logic can cause sudden steering changes and unstable movement, especially around curves and changes in track direction. A more responsive control approach is required for smoother and more accurate navigation.",

  solution:
    "Implemented sensor-based position detection and PID control to continuously adjust the speed of the left and right motors according to the robot's deviation from the line.",

  architecture:
    "The infrared sensor array detects the position of the line and sends readings to the Arduino Nano. The firmware calculates the line position and error, applies PID correction, and generates motor control signals through the TB6612FNG motor driver.",

  pipeline: [
    {
      name: "Line Detection",
      desc: "Infrared sensor array detects the track position"
    },
    {
      name: "Sensor Processing",
      desc: "Sensor readings are combined to estimate the robot's position relative to the line"
    },
    {
      name: "Error Calculation",
      desc: "The deviation from the desired center position is calculated"
    },
    {
      name: "PID Control",
      desc: "PID correction determines the required steering adjustment"
    },
    {
      name: "Motor Control",
      desc: "TB6612FNG adjusts the left and right motor speeds"
    },
  ],

  hardwareSpecs: [
    {
      name: "Microcontroller",
      spec: "Arduino Nano"
    },
    {
      name: "Sensor Array",
      spec: "5-Channel Infrared Line Sensor"
    },
    {
      name: "Motor Driver",
      spec: "TB6612FNG Dual Motor Driver"
    },
    {
      name: "Drive System",
      spec: "Two DC Gear Motors"
    },
  ],

  softwareSpecs: [
    {
      name: "Firmware",
      spec: "Embedded C/C++"
    },
    {
      name: "Control Algorithm",
      spec: "PID-Based Line Position Correction"
    },
    {
      name: "Motor Control",
      spec: "PWM-Based Differential Drive"
    },
  ],

  hardware: [
    "Arduino Nano",
    "5-Channel IR Sensor Array",
    "TB6612FNG Motor Driver",
    "DC Gear Motors",
    "Robot Chassis"
  ],

  softwareStack: [
    "Embedded C/C++",
    "PID Control",
    "PWM",
    "Arduino"
  ],

  features: [
    {
      title: "PID-Based Navigation",
      desc: "Continuously adjusts motor speeds based on the robot's deviation from the line."
    },
    {
      title: "Multi-Sensor Line Detection",
      desc: "Uses multiple infrared sensors to estimate the position of the track and improve navigation accuracy."
    },
    {
      title: "Differential Motor Control",
      desc: "Independently controls the left and right motors to steer the robot through curves."
    },
    {
      title: "Real-Time Embedded Control",
      desc: "Processes sensor readings and motor corrections directly on the Arduino Nano for responsive navigation."
    },
  ],

  implementation:
    "Integrated the infrared sensor array, Arduino Nano, and TB6612FNG motor driver, then implemented sensor-based line position calculation and tuned the PID parameters for smoother movement and improved curve handling.",

  challenges:
    "The main challenge was tuning the PID parameters and sensor response so that the robot could maintain the line without excessive oscillation or abrupt steering corrections.",

  outcome:
    "Developed a working autonomous line-following robot capable of navigating marked tracks using real-time sensor feedback and PID-based motor control.",

  technologies: [
    "Arduino Nano",
    "Embedded C/C++",
    "IR Sensors",
    "TB6612FNG",
    "PID Control",
    "DC Motors"
  ],

  status: "completed",
  featured: false,
  links: [],
},
{
  id: "gesture-robotic-arm",
  slug: "gesture-controlled-robotic-arm",
  projectNumber: "06",
  title: "Gesture-Controlled Robotic Arm",
  subtitle: "Computer Vision · Human-Robot Interaction",
  category: "robotics",
  domain: "Computer Vision · Robotics · Embedded Systems · HRI",
  year: "2025",
  role: "Robotics & Computer Vision Developer",

  description:
    "Vision-guided robotic arm controlled through real-time hand gestures, translating human finger and hand movements into physical robotic motion.",

  overview:
    "The Gesture-Controlled Robotic Arm explores natural human-machine interaction by replacing conventional joysticks and buttons with hand gestures. A camera captures the user's hand, MediaPipe tracks its landmarks, and Python maps selected gestures and finger movements to robotic arm joint commands.",

  problem:
    "Traditional robotic arm interfaces often rely on joysticks, keyboards, or predefined control panels, creating a barrier for intuitive human interaction. A vision-based interface can provide a more natural way to control robotic systems.",

  solution:
    "Developed a computer-vision control pipeline that detects hand landmarks in real time and converts specific gestures into commands for robotic arm joints. Raspberry Pi handles vision processing while servo motors execute the resulting movements.",

  architecture:
    "Camera frames are processed using OpenCV and MediaPipe on Raspberry Pi. Hand landmarks are extracted and interpreted into gesture states and joint positions, which are then converted into GPIO or serial control signals for the robotic arm.",

  pipeline: [
    {
      name: "Camera Capture",
      desc: "Camera continuously captures the user's hand movements"
    },
    {
      name: "Hand Tracking",
      desc: "MediaPipe detects and tracks hand landmarks in real time"
    },
    {
      name: "Gesture Recognition",
      desc: "Finger positions and hand gestures are interpreted as control commands"
    },
    {
      name: "Motion Mapping",
      desc: "Detected gestures are mapped to individual robotic arm joints"
    },
    {
      name: "Actuation",
      desc: "Servo motors execute the generated movement commands"
    },
  ],

  hardwareSpecs: [
    {
      name: "Processing Unit",
      spec: "Raspberry Pi"
    },
    {
      name: "Vision Input",
      spec: "Camera Module / USB Camera"
    },
    {
      name: "Actuation",
      spec: "Servo Motors"
    },
    {
      name: "Mechanical System",
      spec: "Multi-Axis Robotic Arm"
    },
  ],

  softwareSpecs: [
    {
      name: "Vision Processing",
      spec: "Python + OpenCV"
    },
    {
      name: "Hand Tracking",
      spec: "MediaPipe"
    },
    {
      name: "Hardware Control",
      spec: "Raspberry Pi GPIO / Serial Communication"
    },
    {
      name: "Motion Mapping",
      spec: "Gesture-to-Joint Control Logic"
    },
  ],

  hardware: [
    "Raspberry Pi",
    "Camera",
    "Servo Motors",
    "Robotic Arm"
  ],

  softwareStack: [
    "Python",
    "OpenCV",
    "MediaPipe",
    "Raspberry Pi GPIO"
  ],

  features: [
    {
      title: "Real-Time Hand Tracking",
      desc: "Tracks hand landmarks through a camera feed using MediaPipe for responsive gesture recognition."
    },
    {
      title: "Gesture-to-Motion Mapping",
      desc: "Converts detected finger and hand movements into commands for individual robotic arm joints."
    },
    {
      title: "Touchless Robotic Control",
      desc: "Allows the robotic arm to be operated without a physical controller or conventional input device."
    },
    {
      title: "Modular Control Pipeline",
      desc: "Separates vision processing, gesture interpretation, and hardware actuation for easier development and testing."
    },
  ],

  implementation:
    "Developed the computer-vision pipeline using OpenCV and MediaPipe, implemented gesture interpretation logic, and connected the processed commands to servo-based robotic arm actuation through Raspberry Pi.",

  challenges:
    "The main challenge was maintaining stable robotic movement despite small variations in hand position and camera input. Gesture thresholds and motion mapping were tuned to make the system more responsive and predictable.",

  outcome:
    "Developed a functional prototype demonstrating touchless human-robot interaction through real-time hand gesture recognition.",

  technologies: [
    "Python",
    "OpenCV",
    "MediaPipe",
    "Raspberry Pi",
    "Servo Motors",
    "Computer Vision"
  ],

  status: "completed",
  featured: false,

  links: [],
},
  {
  id: "aura",
  slug: "aura-autonomous-perception",
  projectNumber: "07",
  title: "AURA",
  subtitle: "Autonomous Robotic Perception & Navigation Platform",
  category: "robotics",
  domain: "Robotics · Computer Vision · SLAM · Edge AI · ROS 2",
  year: "2026",
  role: "Robotics Systems Engineer",

  description:
    "An experimental autonomous robotics platform combining computer vision, spatial perception, SLAM, sensor fusion, and intelligent navigation for real-world mobile robots.",

  overview:
    "AURA is a modular robotics platform being developed to explore how low-cost robots can understand and navigate indoor environments using onboard perception. The system combines camera-based perception, spatial mapping, localization, path planning, and real-time control into a unified robotic intelligence stack.",

  problem:
    "Autonomous robots operating in real environments must continuously understand their surroundings, estimate their position, detect obstacles, and plan safe movements despite incomplete and changing information. High-end autonomous platforms often rely on expensive sensors and specialized hardware.",

  solution:
    "Developing a cost-conscious robotic perception stack using Raspberry Pi, computer vision, ROS 2, and sensor fusion to enable an indoor robot to construct a representation of its environment, localize itself, detect obstacles, and navigate toward goals.",

  architecture:
    "A ROS 2-based modular architecture separates perception, localization, mapping, planning, and hardware control. Camera and distance sensors provide environmental observations, the perception layer extracts spatial information, SLAM maintains the robot's map and pose estimate, and the navigation layer generates motion commands.",

  pipeline: [
    {
      name: "Visual Perception",
      desc: "Camera frames are processed to detect objects, obstacles, and environmental features"
    },
    {
      name: "Depth & Spatial Understanding",
      desc: "Visual and distance information is combined to estimate nearby geometry"
    },
    {
      name: "Visual SLAM",
      desc: "The robot estimates its position while constructing a representation of the environment"
    },
    {
      name: "Occupancy Mapping",
      desc: "Perception data is converted into a navigable representation of the environment"
    },
    {
      name: "Path Planning",
      desc: "Navigation algorithms calculate a safe route toward the selected destination"
    },
    {
      name: "Motion Control",
      desc: "The robot converts navigation commands into motor movements"
    },
  ],

  hardwareSpecs: [
    {
      name: "Edge Computer",
      spec: "Raspberry Pi 4"
    },
    {
      name: "Primary Vision Sensor",
      spec: "USB Camera"
    },
    {
      name: "Distance Sensing",
      spec: "Ultrasonic / ToF Sensors"
    },
    {
      name: "Motor Control",
      spec: "Microcontroller + Dual Motor Driver"
    },
    {
      name: "Drive System",
      spec: "Differential Drive Mobile Platform"
    },
  ],

  softwareSpecs: [
    {
      name: "Robotics Framework",
      spec: "ROS 2"
    },
    {
      name: "Computer Vision",
      spec: "OpenCV"
    },
    {
      name: "Mapping",
      spec: "Visual SLAM / Occupancy Mapping"
    },
    {
      name: "Navigation",
      spec: "Path Planning + Obstacle Avoidance"
    },
    {
      name: "Programming",
      spec: "Python + C++"
    },
  ],

  hardware: [
    "Raspberry Pi 4",
    "USB Camera",
    "Ultrasonic / ToF Sensors",
    "DC Gear Motors",
    "Motor Driver",
    "Mobile Robot Chassis"
  ],

  softwareStack: [
    "ROS 2",
    "Python",
    "C++",
    "OpenCV",
    "SLAM",
    "Computer Vision"
  ],

  features: [
    {
      title: "Visual Environment Perception",
      desc: "Uses onboard vision to extract useful information about objects, obstacles, and the surrounding environment."
    },
    {
      title: "Real-Time Mapping",
      desc: "Builds a spatial representation of an indoor environment while the robot explores it."
    },
    {
      title: "Self-Localization",
      desc: "Estimates the robot's position within its environment using perception and mapping data."
    },
    {
      title: "Autonomous Navigation",
      desc: "Plans and executes routes while responding to obstacles and changes in the environment."
    },
    {
      title: "Modular ROS 2 Architecture",
      desc: "Separates perception, mapping, planning, and control into reusable robotic software modules."
    },
  ],

  implementation:
    "The platform is being developed incrementally, beginning with low-level motor control and sensor integration before introducing computer vision, mapping, localization, and autonomous navigation modules.",

  challenges:
    "The main engineering challenge is achieving reliable spatial perception and navigation on constrained hardware while maintaining enough real-time performance for safe robotic movement.",

  outcome:
    "A research-oriented autonomous robotics platform under development, designed to explore perception-driven navigation using accessible hardware and open-source robotics technologies.",

  technologies: [
    "ROS 2",
    "Raspberry Pi",
    "Python",
    "C++",
    "OpenCV",
    "SLAM",
    "Computer Vision"
  ],

  status: "live",
  featured: true,

  links: [],
},
];

export const projectCategories = [
  { id: "all", label: "All" },
  { id: "robotics", label: "Robotics" },
  { id: "embedded", label: "Embedded" },
  { id: "ai", label: "AI & Vision" },
  { id: "iot", label: "IoT" },
  { id: "software", label: "Software" },
] as const;

export function getProjectBySlug(slug: string): Project | undefined {
  const normalized = slug.toLowerCase().trim();
  return projects.find(
    (p) =>
      p.slug.toLowerCase() === normalized ||
      p.id.toLowerCase() === normalized
  );
}

export function getAllProjectSlugs(): string[] {
  const slugs: string[] = [];
  projects.forEach((p) => {
    slugs.push(p.slug);
    if (p.id !== p.slug) {
      slugs.push(p.id);
    }
  });
  return slugs;
}

export function getAdjacentProjects(currentSlugOrId: string): {
  prev: Project;
  next: Project;
} {
  const current = getProjectBySlug(currentSlugOrId);
  const currentIndex = current ? projects.findIndex((p) => p.id === current.id) : 0;
  
  const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
  const nextIndex = (currentIndex + 1) % projects.length;

  return {
    prev: projects[prevIndex],
    next: projects[nextIndex],
  };
}
