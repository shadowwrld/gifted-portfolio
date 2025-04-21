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
    <section className="container px-2 py-10">
      <h2 className="text-3xl font-bold text-tech mb-8">Blogs</h2>
      <motion.div
        className="grid gap-7 md:grid-cols-2 lg:grid-cols-3"
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