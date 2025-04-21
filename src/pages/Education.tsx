import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const educationData = [
  {
    title: "Programming and Software Development",
    place: "At my own effort and research",
    date: "2023 - Ongoing",
    desc: "I have been learning programming and software development on my own through online resources and personal projects."
  },
  {
    title: "Bachelor of Business Management",
    place: "Moi University, Eldoret - Uasin Gishu County",
    date: "2022 - Ongoing",
    desc: "Current studying level as I gain more knowledge."
  },
  {
    title: "Kenya Certificate of Secondary Education",
    place: "Got Agulu Boys High School, Yimbo-Siaya County",
    date: "2017 - 2020",
    desc: "I Attained a mean grade of B+ not bad enough to proceed to university education."
  },
  {
    title: "Primary School Certificate",
    place: "Bondo - Siaya County",
    date: "2010 - 2016",
    desc: "I Obtained a score of 304 marks and qualified to join secondary school."
  }
];

const Education = () => {
  const [typedDesc, setTypedDesc] = useState<string[]>(educationData.map(() => ""));
  const [currentCard, setCurrentCard] = useState(0);

  useEffect(() => {
    // Infinite bounce animation cycle
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % educationData.length);
    }, 3000);

    // Typewriter effect for each card
    educationData.forEach((item, idx) => {
      let i = 0;
      const typing = setInterval(() => {
        if (i <= item.desc.length) {
          setTypedDesc(prev => {
            const newArr = [...prev];
            newArr[idx] = item.desc.substring(0, i);
            return newArr;
          });
          i++;
        } else {
          clearInterval(typing);
        }
      }, 20);
    });

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="container px-4 py-10 flex flex-col items-center">
      <div className="relative mb-12 w-full max-w-3xl text-center">
        <h2 className="text-4xl font-bold text-tech mb-2">Education</h2>
        <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-90 animate-moveDots"></div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto flex flex-col gap-8 w-full">
        {educationData.map((item, idx) => (
          <motion.div
            key={idx}
            className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl px-8 py-6 shadow-2xl border border-gray-200 dark:border-gray-700 relative overflow-hidden"
            initial={{ y: 50, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              scale: currentCard === idx ? 1.03 : 1,
              boxShadow: currentCard === idx 
                ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
            }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: idx * 0.15
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-100/10 to-transparent opacity-30 dark:via-yellow-900/10"></div>
            
            <h3 className="font-bold text-xl text-gifted mb-2 relative z-10">{item.title}</h3>
            
            <div className="mb-3 relative z-10">
              <span className="text-tech font-medium bg-gradient-to-r from-yellow-200 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 px-2 py-1 rounded-md">
                {item.place.replace(/ - /g, " \u2011 ")} {/* Using non-breaking hyphen */}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 border-l border-gray-300 dark:border-gray-600 pl-2">
                {item.date.replace(/ - /g, " \u2011 ")}
              </span>
            </div>
            
            <div className="text-gray-700 dark:text-gray-300 relative z-10 min-h-[60px]">
              {typedDesc[idx] || " "}
              <span className="animate-pulse">|</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;