import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import blogs from "@/services/blogs.json";
import { motion } from "framer-motion";
import { FiCopy } from "react-icons/fi";
import { BsCheckLg } from "react-icons/bs";
import ReactMarkdown from "react-markdown";
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";

import { ReactNode } from "react";

interface CodeBlockProps {
  node?: unknown;
  inline?: boolean;
  className?: string;
  children?: ReactNode;
}

const BlogDetail = () => {
  const { id } = useParams<{id: string}>();
  const blog = blogs.find((b) => b.id === id);
  const navigate = useNavigate();
  const [displayedContent, setDisplayedContent] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!blog) return;

    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < blog.content.length) {
        setDisplayedContent(blog.content.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 20);

    return () => clearInterval(typingInterval);
  }, [blog]);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!blog) return (
    <div className="container py-12">
      <p className="text-red-500">Blog not found.</p>
      <button 
        onClick={() => navigate(-1)} 
        className="px-4 py-2 rounded bg-tech mt-4 text-white hover:bg-tech/90 transition"
      >
        Go Back
      </button>
    </div>
  );

  const CodeBlock = ({ node, inline, className, children, ...props }: CodeBlockProps) => {
    const match = /language-(\w+)/.exec(className || '');
    // Handle children as string or string[]
    const codeText = Array.isArray(children) ? children.join('') : String(children);
    const codeIndex = Math.random();

    return !inline ? (
      <div className="relative my-6">
        <SyntaxHighlighter
          language={match?.[1] || 'text'}
          style={atomDark}
          showLineNumbers={match?.[1] !== 'bash'}
          customStyle={{
            background: '#1E293B',
            borderRadius: '0.5rem',
            padding: '1rem',
            fontSize: '0.9rem',
            margin: 0
          }}
          {...props}
        >
          {codeText.replace(/\n$/, '')}
        </SyntaxHighlighter>
        <button
          onClick={() => copyToClipboard(codeText, codeIndex)}
          className="absolute top-2 right-2 p-2 rounded bg-gray-700 hover:bg-gray-600 transition"
          aria-label="Copy code"
        >
          {copiedIndex === codeIndex ? (
            <BsCheckLg className="text-green-400" />
          ) : (
            <FiCopy className="text-gray-300" />
          )}
        </button>
      </div>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  };

  return (
    <section className="container px-4 py-10 flex flex-col items-center">
      <motion.div 
        className="glass rounded-2xl max-w-4xl shadow-lg w-full p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src={blog.image} 
          alt={blog.title} 
          className="w-full h-64 rounded-lg object-cover mb-6 shadow-md"
        />
        
        <motion.h1 
          className="text-4xl font-bold text-tech mb-3 font-serif tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {blog.title}
        </motion.h1>
        
        <div className="flex items-center mb-6 gap-3">
          <img 
            src={blog.authorImage} 
            alt={blog.author}
            className="w-10 h-10 rounded-full object-cover border-2 border-tech"
          />
          <div>
            <p className="font-medium text-gray-800 dark:text-gray-200">{blog.author}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(blog.date)}
            </p>
          </div>
        </div>
        
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              code: CodeBlock,
              h2: ({node, ...props}) => (
                <h2 className="text-2xl font-bold text-tech mt-8 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2" {...props} />
              ),
              strong: ({node, ...props}) => (
                <strong className="font-bold text-tech" {...props} />
              ),
              p: ({node, ...props}) => (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4" {...props} />
              ),
              a: ({node, ...props}) => (
                <a className="text-tech hover:underline" {...props} />
              ),
              ul: ({node, ...props}) => (
                <ul className="list-disc pl-5 mb-4" {...props} />
              ),
              ol: ({node, ...props}) => (
                <ol className="list-decimal pl-5 mb-4" {...props} />
              ),
            }}
          >
            {displayedContent + (!isTypingComplete ? "|" : "")}
          </ReactMarkdown>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isTypingComplete ? 1 : 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex justify-between items-center"
        >
          <div className="flex items-center gap-3">
            <img 
              src={blog.authorImage} 
              alt={blog.author}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Written by {blog.author}
            </span>
          </div>
          <Link
            to="/blogs"
            className="inline-flex items-center px-6 py-2 rounded-full glass text-tech font-medium hover:bg-tech/10 transition"
          >
            ← Back to All Blogs
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BlogDetail;