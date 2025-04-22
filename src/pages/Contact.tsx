import { useState, useEffect } from "react";
import SocialMediaIcons from "@/components/SocialMediaIcons";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "Have an idea, a project, or just want to say hi? Send a message below or reach out via my social handles above!";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.substring(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50); // Adjust typing speed here

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="container px-4 py-10 flex flex-col items-center max-w-2xl mx-auto">
      <div className="relative mb-5">
        <h2 className="text-3xl font-bold text-tech">Contact Me</h2>
        <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-90 animate-moveDots"></div>
        </div>
      </div>
      <div className="mb-6">
        <SocialMediaIcons slow />
      </div>
      <p className="mb-6 text-lg text-center min-h-[80px]">
        {typedText}
        <span className="animate-pulse">|</span>
      </p>
      <ContactForm />

      <style>
        {`
          @keyframes moveDots {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          .animate-moveDots {
            animation: moveDots 2s linear infinite;
          }
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
          }
          .animate-pulse {
            animation: pulse 1s infinite;
            display: inline-block;
            margin-left: 2px;
          }
        `}
      </style>
    </section>
  );
};

export default Contact;
