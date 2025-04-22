import { useEffect, useRef } from "react";
import HeroText from "@/components/HeroText";

const Index = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const mobileImageRef = useRef<HTMLImageElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const floatingBoxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const underlineRef = useRef<HTMLDivElement>(null);
  const techImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Image spin animation for both desktop and mobile
    const spinImage = (img: HTMLImageElement | null) => {
      if (img) {
        img.style.transform = 'rotate(720deg)';
        img.style.transition = 'transform 1.5s cubic-bezier(0.25, 1, 0.5, 1)';
        
        setTimeout(() => {
          if (img) {
            img.style.transform = 'rotate(0deg)';
          }
        }, 10);
      }
    };

    spinImage(imageRef.current);
    spinImage(mobileImageRef.current);

    // Tech image animation (bounce and spin)
    if (techImageRef.current) {
      techImageRef.current.style.animation = 'bounceSpin 4s ease-in-out infinite';
    }

    // Cursor blinking animation
    const cursorInterval = setInterval(() => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = cursorRef.current.style.opacity === '0' ? '1' : '0';
      }
    }, 500);

    // Floating box animations
    floatingBoxRefs.current.forEach(box => {
      if (box) {
        box.style.animation = 'float 3s ease-in-out infinite';
      }
    });

    return () => clearInterval(cursorInterval);
  }, []);

  const handleImageClick = (isMobile = false) => {
    const img = isMobile ? mobileImageRef.current : imageRef.current;
    if (img) {
      img.style.transform = 'scale(1.1)';
      setTimeout(() => {
        if (img) {
          img.style.transform = 'scale(1)';
        }
      }, 300);
    }
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
          }
        }
        @keyframes moveDots {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes bounceSpin {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(90deg);
          }
          50% {
            transform: translateY(0) rotate(180deg);
          }
          75% {
            transform: translateY(-20px) rotate(270deg);
          }
        }
        .animate-moveDots {
          animation: moveDots 3s linear infinite;
        }
      `}</style>

      <section className="flex flex-col lg:flex-row items-center justify-center gap-8 px-4 py-12 min-h-[80vh]">
        {/* Left Column - Only shows on desktop */}
        <div className="hidden lg:flex lg:w-1/3 flex-col items-center mb-0">
          <img
            ref={imageRef}
            src="https://xtknaolipemhxqikaytx.supabase.co/storage/v1/object/public/avatars/profile_pictures/-1745174332976.png?auto=format&fit=facearea&w=400&h=400"
            alt="Gifted Tech"
            className="rounded-full object-cover w-48 h-48 border-4 border-tech shadow-lg glass cursor-pointer mb-6 hover:shadow-xl transition-all duration-300 animate-glow"
            onClick={() => handleImageClick(false)}
            style={{
              boxShadow: '0 0 15px rgba(0, 255, 255, 0.6)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }}
          />
          
          {/* Gifted Tech with animated underline */}
          <div className="relative mb-4">
            <h1 className="text-4xl font-black font-montserrat flex gap-2 leading-tight">
              <span className="text-highlight">Gifted</span>
              <span className="text-tech">Tech</span>
            </h1>
            <div className="absolute -bottom-1 left-0 right-0 h-1 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-90 animate-moveDots"></div>
            </div>
          </div>

          <HeroText />

          <h2 className="text-2xl font-bold text-center mb-6">
            <span className="text-highlight">Innovating</span> <span className="text-black dark:text-white">Solutions with</span>
            <br />
            <span className="text-black dark:text-white">Digital</span> <span className="text-highlight">Excellence</span>
          </h2>
        </div>

        {/* Right Column - Shows on all screens */}
        <div className="w-full lg:w-2/3 flex flex-col items-center">
          {/* Mobile Only: Image and Hero Text */}
          <div className="lg:hidden flex flex-col items-center w-full mb-8">
            <img
              ref={mobileImageRef}
              src="https://xtknaolipemhxqikaytx.supabase.co/storage/v1/object/public/avatars/profile_pictures/-1745174332976.png?auto=format&fit=facearea&w=400&h=400"
              alt="Gifted Tech"
              className="rounded-full object-cover w-48 h-48 border-4 border-tech shadow-lg glass cursor-pointer mb-6 hover:shadow-xl transition-all duration-300 animate-glow"
              onClick={() => handleImageClick(true)}
              style={{
                boxShadow: '0 0 15px rgba(0, 255, 255, 0.6)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
            />
            
            <div className="relative mb-4">
              <h1 className="text-4xl font-black font-montserrat flex gap-2 leading-tight">
                <span className="text-highlight">Gifted</span>
                <span className="text-tech">Tech</span>
              </h1>
              <div className="absolute -bottom-1 left-0 right-0 h-1 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-90 animate-moveDots"></div>
              </div>
            </div>

            <HeroText />

            <h2 className="text-2xl font-bold text-center mb-6">
              <span className="text-highlight">Innovating</span> <span className="text-black dark:text-white">Solutions with</span>
              <br />
              <span className="text-black dark:text-white">Digital</span> <span className="text-highlight">Excellence</span>
            </h2>
          </div>

          {/* Content Area (shows on all screens) */}
          <div className="w-full flex flex-col lg:flex-row items-center gap-6">
            <div className="flex flex-col items-center lg:items-start gap-6 lg:w-2/3">
              {/* Paragraph */}
              <p className="text-center lg:text-left text-gray-700 dark:text-gray-300 max-w-md lg:max-w-2xl">
                I'm a self-learned developer from Kenya. I'm still a student, currently in third year school of Business and economics taking Bachelor of Business Management at Moi University - Eldoret. </br>I have a passion for web development, app and software development, backend development and I love to learn new things. I'm also a tech enthusiast and I love to share my knowledge as well as collaborate with others.
              </p>

              {/* Cards */}
              <div 
                ref={el => floatingBoxRefs.current[0] = el}
                className="w-full max-w-md p-4 rounded-lg shadow-md bg-white/80 dark:bg-black/80"
              >
                <p className="text-center lg:text-left">
                  <span className="text-tech font-bold">Gifted Tech</span> {' '}
                  <span className="text-highlight">crafts</span> {' '}
                  digital <span className="text-purple-500">experiences</span> {' '}
                  that <span className="text-green-500">inspire</span> {' '}
                  and <span className="text-yellow-500">transform</span>.
                </p>
              </div>

              {/* Second Paragraph */}
              <p className="text-center lg:text-left text-gray-700 dark:text-gray-300 max-w-md lg:max-w-2xl">
                My journey in technology has been driven by curiosity and a desire to create meaningful solutions. I specialize in building responsive, accessible, and performant digital experiences that make an impact.
              </p>

              <div 
                ref={el => floatingBoxRefs.current[1] = el}
                className="w-full max-w-md p-4 rounded-lg shadow-md bg-white/80 dark:bg-black/80"
              >
                <p className="text-center lg:text-left">
                  <span className="text-tech font-bold">I try to blend</span> {' '}
                  <span className="text-highlight">technology</span> {' '}
                  with <span className="text-purple-500">passion</span> {' '}
                  to create <span className="text-green-500">solutions</span> {' '}
                  that <span className="text-yellow-500">shine</span>.
                </p>
              </div>
            </div>

            {/* Tech Image - Only shows on desktop */}
            <div className="hidden lg:flex lg:w-1/3 justify-center items-center">
              <img
                ref={techImageRef}
                src="https://zanalydpkhnbrjipfldc.supabase.co/storage/v1/object/public/juustgifted//vecteezy_modern-cybersecurity-technology-blue-eye-cutout_13471571.png"
                alt="Technology Illustration"
                className="w-64 h-64 object-contain"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.6))'
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
