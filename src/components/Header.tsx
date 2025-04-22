import { Menu, Sun, Moon, X, Home, BookOpen, Briefcase, GraduationCap, FileText, Mail } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import SocialMediaIcons from "@/components/SocialMediaIcons";

const navLinks = [
  { label: "Home", to: "/", icon: Home },
  { label: "Skills", to: "/skills", icon: BookOpen },
  { label: "Projects", to: "/projects", icon: Briefcase },
  { label: "Education", to: "/education", icon: GraduationCap },
  { label: "Blogs", to: "/blogs", icon: FileText },
  { label: "Contact", to: "/contact", icon: Mail },
];

const THEME_KEY = "theme";

const TypewriterText = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return <span className={className}>{displayText}</span>;
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem(THEME_KEY) as "light" | "dark") || "light";
    }
    return "light";
  });
  const location = useLocation();
  const logoAnchorRef = useRef<HTMLAnchorElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Avatar spin animation on load
  useEffect(() => {
    if (logoImgRef.current) {
      logoImgRef.current.style.transform = 'rotate(720deg)';
      logoImgRef.current.style.transition = 'transform 1.5s cubic-bezier(0.25, 1, 0.5, 1)';
      
      setTimeout(() => {
        if (logoImgRef.current) {
          logoImgRef.current.style.transform = 'rotate(0deg)';
        }
      }, 10);
    }
  }, []);

  const isDark = theme === "dark";
  const menuBgClass = isDark ? "bg-black/95 text-white shadow-xl" : "bg-white/95 text-[color:var(--foreground)] shadow-xl";
  const navTextClass = isDark ? "text-white" : "text-primary";
  const cardBgClass = isDark ? "bg-gray-900" : "bg-gray-50";

  // Toggle body overflow when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleLogoClick = () => {
    if (logoAnchorRef.current) {
      const logo = logoAnchorRef.current;
      logo.classList.remove("animate-fade-in");
      void logo.offsetWidth;
      logo.classList.add("animate-fade-in");
    }
  };

  return (
    <>
      <header className={`w-full z-30 sticky top-0 transition-all duration-300 ${menuBgClass} rounded-t-3xl rounded-b-3xl py-2`}>
        {/* Backdrop blur when mobile menu is open */}
        {open && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}

        <nav className="container flex justify-between items-center px-4">
          <div className="flex items-center space-x-2">
            <img
              src="https://xtknaolipemhxqikaytx.supabase.co/storage/v1/object/public/avatars/profile_pictures/-1745174332976.png?auto=format&fit=facearea&w=400&h=400"
              alt="Gifted Tech avatar"
              onClick={handleLogoClick}
              ref={logoImgRef}
              className="w-10 h-10 rounded-full object-cover border-2 border-accent shadow-md bg-white dark:bg-black hover:scale-110 transition-transform duration-300"
            />
            {/* Logo with typewriter effect */}
            <Link 
              to="/" 
              ref={logoAnchorRef}
              className="font-montserrat font-bold text-xl flex items-center space-x-1"
              onClick={handleLogoClick}
            >
              <TypewriterText text="Gifted" className="text-accent" />
              <TypewriterText text="Tech" className="text-highlight" />
            </Link>
          </div>
          
          {/* Desktop nav with icons */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map(l => {
              const Icon = l.icon;
              return (
                <Link
                  key={l.label}
                  to={l.to}
                  className={`flex items-center gap-1 text-base hover:text-accent transition-colors font-semibold ${
                    location.pathname === l.to ? "underline underline-offset-8 text-accent" : navTextClass
                  }`}
                >
                  <Icon className="w-4 h-4 animate-spin-slow" />
                  {l.label}
                </Link>
              );
            })}
            {/* Theme toggle icon */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
              className="ml-2 p-1 rounded-lg transition-colors hover:bg-secondary dark:hover:bg-secondary"
            >
              {isDark ? <Sun className="w-5 h-5 text-accent" /> : <Moon className="w-5 h-5 text-accent" />}
            </button>
          </div>
          
          {/* Mobile: Theme toggle + hamburger */}
          <div className="md:hidden flex flex-row items-center gap-1">
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
              className="p-1 rounded-lg transition-colors hover:bg-secondary dark:hover:bg-secondary"
            >
              {isDark ? <Sun className="w-5 h-5 text-accent" /> : <Moon className="w-5 h-5 text-accent" />}
            </button>
            <button
              className="focus:outline-none px-1 flex items-center"
              onClick={() => setOpen(v => !v)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-accent" />
            </button>
          </div>
        </nav>

        {/* Mobile Drawer - Slides in from right with fade and rounded corners */}
        <div
          className={`md:hidden fixed top-0 right-0 h-full w-72 z-50 ${menuBgClass} transition-all duration-300 ease-in-out rounded-l-3xl ${
            open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
        >
          <div className="flex justify-end p-3">
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-full hover:bg-secondary transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-accent" />
            </button>
          </div>

          <div className="flex flex-col h-[calc(100%-120px)] justify-between px-3">
            <div className="flex flex-col gap-2">
              {navLinks.map(l => {
                const Icon = l.icon;
                return (
                  <Link
                    key={l.label}
                    to={l.to}
                    className={`flex items-center gap-2 p-3 text-base font-semibold transition-colors rounded-xl shadow-md ${cardBgClass} ${
                      location.pathname === l.to 
                        ? "border-l-4 border-accent text-accent" 
                        : "hover:bg-secondary/20"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    <Icon className="w-4 h-4 animate-spin-slow" />
                    {l.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-3 mb-3">
              {/* Theme toggle moved above social icons */}
              <div className="flex justify-center mb-3">
                <button
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
                  className="p-2 rounded-full hover:bg-secondary transition-colors mb-3"
                >
                  {isDark ? <Sun className="w-5 h-5 text-accent" /> : <Moon className="w-5 h-5 text-accent" />}
                </button>
              </div>
              
              {/* Social icons */}
              <div className="flex justify-center scale-75 mb-3">
                <SocialMediaIcons slow />
              </div>
              
              <div className={`text-center text-xs p-3 rounded-lg shadow-md ${
                isDark ? 'bg-gray-900' : 'bg-gray-100'
              }`}>
                <p className="animate-pulse">
                  &copy; 2023 - {new Date().getFullYear()} <span className="text-accent"> Gifted Tech</span>
                </p>
                <p className="text-xs mt-1">All Rights Reserved</p>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes spin-slow {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }
          @keyframes cursor-blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}</style>
      </header>
    </>
  );
};

export default Header;
