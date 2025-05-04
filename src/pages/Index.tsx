import { useEffect, useRef } from "react";
import HeroText from "@/components/HeroText";

const Index = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const mobileImageRef = useRef<HTMLImageElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const floatingBoxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const underlineRef = useRef<HTMLDivElement>(null);
  const techImageRef = useRef<HTMLImageElement>(null);
  const techImageMobileRef = useRef<HTMLImageElement>(null);

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

    // Tech image animation (alternating rotation)
    const rotateTechImage = (img: HTMLImageElement | null) => {
      if (img) {
        img.style.animation = 'rotateClockwise 8s linear infinite';
        
        // Alternate direction every 4 seconds
        setInterval(() => {
          if (img) {
            const currentAnim = img.style.animation.includes('clockwise') 
              ? 'rotateCounterClockwise 8s linear infinite' 
              : 'rotateClockwise 8s linear infinite';
            img.style.animation = currentAnim;
          }
        }, 8000);
      }
    };

    rotateTechImage(techImageRef.current);
    rotateTechImage(techImageMobileRef.current);

    // Cursor blinking animation
    const cursorInterval = setInterval(() => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = cursorRef.current.style.opacity === '0' ? '1' : '0';
      }
    }, 500);

    // Floating box animations
    floatingBoxRefs.current.forEach((box, index) => {
      if (box) {
        box.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
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
        @keyframes rotateClockwise {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes rotateCounterClockwise {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }
        .animate-moveDots {
          animation: moveDots 3s linear infinite;
        }
        .tech-image-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .tech-image-rays {
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(0,255,255,0.3) 0%, rgba(0,255,255,0) 70%);
          animation: pulseRay 4s ease-in-out infinite;
          border-radius: 50%;
          pointer-events: none;
        }
        @keyframes pulseRay {
          0%, 100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.3;
          }
        }
        .floating-card {
          width: 100%;
          max-width: 28rem;
          padding: 1.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }
        .dark .floating-card {
          background: rgba(0, 0, 0, 0.8);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
        }
        .floating-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        .dark .floating-card:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
        }
      `}</style>

      <section className="flex flex-col lg:flex-row items-center justify-center gap-8 px-4 py-12 min-h-[80vh]">
        {/* Left Column - Only shows on desktop */}
        <div className="hidden lg:flex lg:w-1/3 flex-col items-center mb-0">
          <img
            ref={imageRef}
            src="https://xtknaolipemhxqikaytx.supabase.co/storage/v1/object/public/avatars/profile_pictures/-1745174332976.png?auto=format&fit=facearea&w=400&h=400"
            alt="SHADOW WRLD"
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
              alt="SHADOW WRLD"
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
              {/* Paragraphs */}
           <div className="text-center lg:text-left text-gray-700 dark:text-gray-300 max-w-md lg:max-w-2xl">
           <p>
             I'm a self-learned developer from Haiti. I'm still a student, currently in third year school of Business and economics taking Bachelor of Business Management at Moi University - Eldoret.
           </p>
            <p>
             I have a passion for web development, app and software development, backend development and I love to learn new things. I'm also a tech enthusiast and I love to share my knowledge as well as collaborate with others.
           </p>
          </div>
              {/* First Card */}
              <div 
                ref={el => floatingBoxRefs.current[0] = el}
                className="floating-card"
              >
                <p className="text-center lg:text-left">
                  <span className="text-tech font-bold">SHADOW WRLD</span> {' '}
                  <span className="text-highlight">Crafts</span> {' '}
                  digital <span className="text-purple-500">Experiences</span> {' '}
                  that <span className="text-green-500">Inspire</span> {' '}
                  and <span className="text-yellow-500">Transform</span>.
                </p>
              </div>

              {/* Second Paragraph */}
              <p className="text-center lg:text-left text-gray-700 dark:text-gray-300 max-w-md lg:max-w-2xl">
                My journey in technology has been driven by curiosity and a desire to create meaningful solutions. I specialize in building responsive, accessible, and performant digital experiences that make an impact.
              </p>

              {/* Second Card */}
              <div 
                ref={el => floatingBoxRefs.current[1] = el}
                className="floating-card"
              >
                <p className="text-center lg:text-left">
                  <span className="text-tech font-bold">I try to blend</span> {' '}
                  <span className="text-highlight">Technology</span> {' '}
                  with <span className="text-purple-500">Passion</span> {' '}
                  to create <span className="text-green-500">Polutions</span> {' '}
                  that <span className="text-yellow-500">Shine</span>.
                </p>
              </div>
            </div>

            {/* Tech Image - Shows on both mobile and desktop */}
            <div className="tech-image-container w-full lg:w-1/3 flex justify-center items-center my-8 lg:my-0">
              <div className="relative w-40 h-40 lg:w-48 lg:h-48">
                <div className="tech-image-rays"></div>
                <img
                  ref={techImageRef}
                  src="https://zanalydpkhnbrjipfldc.supabase.co/storage/v1/object/public/juustgifted//vecteezy_modern-cybersecurity-technology-blue-eye-cutout_13471571.png"
                  alt="Technology Illustration"
                  className="w-full h-full object-contain hidden lg:block"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.6))'
                  }}
                />
                <img
                  ref={techImageMobileRef}
                  src="https://zanalydpkhnbrjipfldc.supabase.co/storage/v1/object/public/juustgifted//vecteezy_modern-cybersecurity-technology-blue-eye-cutout_13471571.png"
                  alt="Technology Illustration"
                  className="w-full h-full object-contain lg:hidden"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.6))'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
