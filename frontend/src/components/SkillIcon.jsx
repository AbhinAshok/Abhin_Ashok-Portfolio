// components/SkillIcon.jsx
import { Code2 } from "lucide-react";
import * as Di  from "react-icons/di";   // Devicons
import * as Si  from "react-icons/si";   // Simple Icons
import * as Fa  from "react-icons/fa";   // Font Awesome 5
import * as Fa6 from "react-icons/fa6";  // Font Awesome 6

const packs = { Di, Si, Fa, Fa6 };

// Normalize: lowercase + strip everything that isn't a-z / 0-9
//   "Python Anywhere"  → "pythonanywhere"
//   "VS Code"          → "vscode"
//   "Tailwind CSS"     → "tailwindcss"
//   "Git & GitHub"     → "gitgithub"
const norm = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * Each skill lists CANDIDATES in priority order.
 * The first one that resolves in the installed packs wins.
 */
const registry = {
  // Languages
  python:      { candidates: [["Si","SiPython"],      ["Di","DiPython"]],           color: "#3776AB" },
  java:        { candidates: [["Fa6","FaJava"],       ["Di","DiJava"]],             color: "#F89820" },
  javascript:  { candidates: [["Si","SiJavascript"],  ["Di","DiJavascript1"]],      color: "#F7DF1E" },
  js:          { candidates: [["Si","SiJavascript"],  ["Di","DiJavascript1"]],      color: "#F7DF1E" },
  sql:         { candidates: [["Fa","FaDatabase"],    ["Di","DiDatabase"]],         color: "#00758F" },

  // Frameworks
  django:              { candidates: [["Si","SiDjango"], ["Di","DiDjango"]],        color: "#44B78B" },
  djangorestframework: { candidates: [["Si","SiDjango"], ["Di","DiDjango"]],        color: "#A30000" },
  djangorest:          { candidates: [["Si","SiDjango"], ["Di","DiDjango"]],        color: "#A30000" },
  drf:                 { candidates: [["Si","SiDjango"], ["Di","DiDjango"]],        color: "#A30000" },
  flask:               { candidates: [["Si","SiFlask"],  ["Di","DiFlask"]],         color: "#FFFFFF" },
  react:               { candidates: [["Si","SiReact"],  ["Di","DiReact"]],         color: "#61DAFB" },

  // Frontend
  html:        { candidates: [["Si","SiHtml5"],          ["Di","DiHtml5"]],         color: "#E34F26" },
  html5:       { candidates: [["Si","SiHtml5"],          ["Di","DiHtml5"]],         color: "#E34F26" },
  css:         { candidates: [["Si","SiCss3"],           ["Di","DiCss3"]],          color: "#1572B6" },
  css3:        { candidates: [["Si","SiCss3"],           ["Di","DiCss3"]],          color: "#1572B6" },
  tailwind:    { candidates: [["Si","SiTailwindcss"],    ["Di","DiTailwindcss"]],   color: "#38BDF8" },
  tailwindcss: { candidates: [["Si","SiTailwindcss"],    ["Di","DiTailwindcss"]],   color: "#38BDF8" },
  bootstrap:   { candidates: [["Si","SiBootstrap"],      ["Di","DiBootstrap"]],     color: "#7952B3" },
  jquery:      { candidates: [["Si","SiJquery"],         ["Di","DiJqueryLogo"]],    color: "#0769AD" },

  // Database
  postgresql:  { candidates: [["Si","SiPostgresql"],     ["Di","DiPostgresql"]],    color: "#4169E1" },
  postgres:    { candidates: [["Si","SiPostgresql"],     ["Di","DiPostgresql"]],    color: "#4169E1" },
  mysql:       { candidates: [["Si","SiMysql"],          ["Di","DiMysql"]],         color: "#00758F" },

  // DevOps
  docker:      { candidates: [["Si","SiDocker"],         ["Di","DiDocker"]],        color: "#2496ED" },
  aws:         { candidates: [["Si","SiAmazonwebservices"],["Si","SiAmazonaws"],["Fa6","FaAws"],["Di","DiAws"]], color: "#FF9900" },

  // Tools
  git:         { candidates: [["Si","SiGit"],            ["Di","DiGit"]],           color: "#F05032" },
  gitgithub:   { candidates: [["Si","SiGit"],            ["Di","DiGit"]],           color: "#F05032" },
  github:      { candidates: [["Si","SiGithub"],         ["Fa","FaGithub"],["Di","DiGithubBadge"]], color: "#FFFFFF" },
  vscode:      { candidates: [["Si","SiVisualstudiocode"],["Di","DiVisualstudio"]], color: "#007ACC" },
  pycharm:     { candidates: [["Si","SiPycharm"],        ["Di","DiPycharm"]],       color: "#21D789" },
  postman:     { candidates: [["Si","SiPostman"],        ["Di","DiPostman"]],       color: "#FF6C37" },
  hoppscotch:  { candidates: [["Si","SiHoppscotch"]],                               color: "#1FB6C1" },

  // No brand logo exists anywhere — render a colored text badge
  pythonanywhere: { text: "PyA", color: "#306998" },

  // Generic
  api:         { candidates: [["Fa","FaCode"],           ["Di","DiCode"]],          color: "#009688" },
};

function resolve(candidates) {
  for (const [packName, key] of candidates || []) {
    const pack = packs[packName];
    if (pack && pack[key]) return pack[key];
  }
  return null;
}

export default function SkillIcon({ name, size = 21, color }) {
  const key   = norm(name);
  const entry = registry[key];

  if (!entry) return <Code2 size={size} />;   // unknown skill → Lucide fallback

  const finalColor = color || entry.color;

  // Text badge path
  if (entry.text) {
    return (
      <span
        aria-label={name}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
          fontSize: Math.max(8, size * 0.42),
          fontWeight: 700,
          color: "#fff",
          background: finalColor,
          borderRadius: size * 0.22,
          lineHeight: 1,
          verticalAlign: "middle",
        }}
      >
        {entry.text}
      </span>
    );
  }

  const Icon = resolve(entry.candidates);
  if (!Icon) return <Code2 size={size} color={finalColor} />;   // missing name → fallback

  return (
    <Icon
      size={size}
      color={finalColor}
      aria-label={name}
      style={{ display: "inline-block", verticalAlign: "middle" }}
    />
  );
}