import { motion } from "framer-motion";
import { useState } from "react";

const ProjectCard = ({ 
  id, 
  image, 
  title,
  description,
  link,
  source
}: { 
  id: string; 
  image: string; 
  title: string;
  description: string;
  link: string;
  source: string;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div 
      className="glass rounded-xl shadow-hover overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 h-full"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="group cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="p-5">
          <h3 className="text-2xl font-bold text-gifted group-hover:text-tech mb-3 font-serif tracking-tight">
            {title}
          </h3>
          
          <p className={`text-gray-600 dark:text-gray-300 mb-5 leading-relaxed font-sans ${
            expanded ? "block" : "line-clamp-3"
          }`}>
            {description}
          </p>
        </div>
      </div>

      <div className="mt-auto px-5 pb-5 flex justify-center gap-3 flex-wrap">
        <motion.a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-tech text-white rounded-lg text-sm font-medium hover:bg-yellow-500 transition-colors shadow-md"
          whileHover={{ scale: 1.05, boxShadow: "0px 2px 8px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
        >
          View Demo
        </motion.a>
        
        <motion.a
          href={source}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-md"
          whileHover={{ scale: 1.05, boxShadow: "0px 2px 8px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
        >
          Source Code
        </motion.a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;