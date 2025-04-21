import { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import projects from "@/services/projects.json";

const Projects = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    setFadeIn(true);
    
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos > prevScrollPos) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <section className="container px-2 py-12">
      <div className="flex flex-col items-center mb-12">
        <div className="relative w-full max-w-3xl text-center">
          <h2 className="text-4xl font-bold text-tech mb-2">My Projects</h2>
          <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-90 animate-moveLine"></div>
          </div>
        </div>

        <p className="mt-6 text-center max-w-2xl text-gray-600 dark:text-gray-300">
          Here are some of my featured projects showcasing my skills and experience from the most recent works. 
          Each project represents unique challenges and creative solutions I've developed.
        </p>
      </div>

      <div className={`grid gap-8 sm:grid-cols-2 md:grid-cols-3 ${fadeIn ? "animate-fade-in" : ""}`}>
        {projects.map((proj, index) => (
          <div 
            key={proj.id}
            className={`transition-all duration-500 ease-out ${
              scrollDirection === 'down' 
                ? 'transform translate-y-0 opacity-100' 
                : 'transform -translate-y-4 opacity-90'
            }`}
            style={{
              transitionDelay: `${index * 100}ms`
            }}
          >
            <ProjectCard 
              id={proj.id}
              title={proj.title}
              image={proj.image}
              description={proj.description}
              link={proj.link}
              source={proj.source}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;