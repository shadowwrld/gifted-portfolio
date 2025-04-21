import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BlogCard = ({ id, title, image, excerpt }) => {
  const truncateExcerpt = (text) => {
    const words = text.split(' ');
    return words.length > 5 ? words.slice(0, 5).join(' ') + '...' : text;
  };

  return (
    <div className="glass p-4 rounded-xl flex flex-col gap-3 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-44 rounded-md object-cover mb-2 hover:scale-105 transition-transform duration-300"
      />
      <h3 className="text-xl font-bold text-tech group-hover:text-yellow-500 transition-colors">
        {title}
      </h3>
      <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
        {truncateExcerpt(excerpt)}
      </p>
      
      <motion.div
        className="mt-auto"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: {
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.5
          }
        }}
      >
        <Link 
          to={`/blogs/${id}`} 
          className="inline-block px-3 py-1 rounded-full text-xs font-medium shadow
                    bg-black text-white hover:bg-gray-800 
                    dark:bg-tech dark:hover:bg-yellow-500
                    transition-colors duration-300"
        >
          Read More
        </Link>
      </motion.div>
    </div>
  );
};

export default BlogCard;