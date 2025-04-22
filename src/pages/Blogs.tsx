import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import blogs from "@/services/blogs.json";
import BlogCard from "@/components/BlogCard";

const Blogs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <section className="container px-4 py-10 flex flex-col items-center max-w-2xl mx-auto">
      <div className="relative mb-5 w-full text-center">
        <h2 className="text-3xl font-bold text-tech">My Blogs</h2>
        <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-90 animate-moveDots"></div>
        </div>
      </div>
      
      {/* Welcome paragraph added here */}
      <motion.p 
        className="mb-8 text-gray-300 text-center max-w-lg mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Welcome to my blog space! Here I share my thoughts, experiences, and knowledge about 
        web development, design, and technology. Feel free to explore and learn something new.
      </motion.p>

      <motion.div
        className="grid gap-7 md:grid-cols-2 lg:grid-cols-3 w-full"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            variants={cardVariants}
            whileHover={{ 
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
            }}
          >
            <BlogCard {...blog} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Blogs;
