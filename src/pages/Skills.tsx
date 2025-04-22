import { useState, useEffect } from 'react';
import { SiJavascript, SiPython, SiTypescript, SiHtml5, SiCss3, SiExpress, SiNextdotjs, SiMongodb, SiPostgresql, SiSqlite, SiMysql } from "react-icons/si";
import { FaReact, FaNodeJs } from "react-icons/fa";
import SkillMeter from "@/components/SkillMeter";

const skillsData = [
  { 
    category: "Programming Languages",
    skills: [
      { name: "JavaScript", icon: <SiJavascript className="text-yellow-400 text-xm" />, percent: 94 },
      { name: "Python", icon: <SiPython className="text-blue-400 text-xm" />, percent: 52 },
      { name: "TypeScript", icon: <SiTypescript className="text-blue-500 text-xm" />, percent: 62 },
      { name: "HTML/CSS", icon: <div className="flex gap-1"><SiHtml5 className="text-orange-500 text-xm" /><SiCss3 className="text-blue-500 text-xm" /></div>, percent: 89 },
    ]
  },
  {
    category: "Frameworks & Libraries",
    skills: [
      { name: "React", icon: <FaReact className="text-blue-500 text-xm" />, percent: 72 },
      { name: "Node.js", icon: <FaNodeJs className="text-green-500 text-xm" />, percent: 97 },
      { name: "Express", icon: <SiExpress className="text-gray-500 text-xm" />, percent: 95 },
      { name: "Next.js", icon: <SiNextdotjs className="text-black dark:text-white text-xm" />, percent: 24 },
    ]
  },
  {
    category: "Database Technologies",
    skills: [
      { name: "MongoDB", icon: <SiMongodb className="text-yellow-400 text-xm" /> , percent: 80 },
      { name: "PostgreSQL", icon: <SiPostgresql className="text-yellow-400 text-xm" /> , percent: 53 },
    ]
  }
];

const Skills = () => {
  const [visibleCategories, setVisibleCategories] = useState<number[]>([]);
  const [visibleSkills, setVisibleSkills] = useState<{[key: number]: number[]}>({});
  const [typedText, setTypedText] = useState("");
  const fullText = "With a diverse skill set spanning multiple programming languages, frameworks, and databases, I bring comprehensive technical expertise to every project. Below you'll find a breakdown of my proficiency levels across different technologies.";

  useEffect(() => {
    // Typewriter effect
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.substring(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 20); // Typing speed (lower = faster)

    // Animate categories one by one
    const categoryTimer = setTimeout(() => {
      setVisibleCategories([0]);
      
      const frameworksTimer = setTimeout(() => {
        setVisibleCategories([0, 1]);
        
        const databasesTimer = setTimeout(() => {
          setVisibleCategories([0, 1, 2]);
        }, 1000);
        
        return () => clearTimeout(databasesTimer);
      }, 1000);
      
      return () => clearTimeout(frameworksTimer);
    }, 500);
    
    return () => {
      clearInterval(typingInterval);
      clearTimeout(categoryTimer);
    };
  }, []);

  useEffect(() => {
    // Animate skills within each category sequentially
    const newVisibleSkills: {[key: number]: number[]} = {};
    
    visibleCategories.forEach((categoryIndex, catIdx) => {
      const categorySkills = skillsData[categoryIndex].skills;
      
      categorySkills.forEach((_, skillIdx) => {
        setTimeout(() => {
          newVisibleSkills[categoryIndex] = [...(newVisibleSkills[categoryIndex] || []), skillIdx];
          setVisibleSkills({...newVisibleSkills});
        }, 200 * skillIdx + (catIdx * 1000));
      });
    });
  }, [visibleCategories]);

  return (
    <section className="container px-4 py-10 flex flex-col items-center max-w-2xl mx-auto">
      <div className="relative mb-5">
        <h2 className="text-3xl font-bold text-tech">My Skills</h2>
        <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-90 animate-moveDots"></div>
        </div>
      </div>
      
      <p className="text-center mb-10 max-w-2xl text-gray-600 dark:text-gray-300 min-h-[120px]">
        {typedText}
        <span className={`inline-block ml-1 h-5 w-0.5 bg-yellow-500 ${typedText.length === fullText.length ? 'opacity-0' : 'animate-pulse'}`}></span>
      </p>

      {skillsData.map((category, categoryIndex) => (
        <div 
          key={category.category}
          className={`w-full max-w-3xl glass p-6 rounded-2xl shadow-lg mb-8 transition-all duration-500 ${
            visibleCategories.includes(categoryIndex) 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="font-bold text-xl mb-4 text-tech text-center">{category.category}</h3>
          <div className="flex flex-wrap gap-6 justify-center">
            {category.skills.map((skill, skillIndex) => (
              <div 
                key={skill.name}
                className={`transition-all duration-300 ${
                  (visibleSkills[categoryIndex] || []).includes(skillIndex)
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-90"
                }`}
              >
                <SkillMeter 
                  {...skill} 
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes moveDots {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-moveDots {
          animation: moveDots 3s linear infinite;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .animate-pulse {
          animation: pulse 1s infinite;
        }
      `}</style>
    </section>
  );
};

export default Skills;
