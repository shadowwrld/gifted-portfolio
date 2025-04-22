import { useEffect, useState } from "react";

const TITLES = [
  "I'm a Web Developer",
  "I'm a Hobby Programmer",
  "I'm a Student",
  "I'm a Bot Developer"
];

const HeroText = () => {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");
  const [direction, setDirection] = useState<"forward"|"backward">("forward");

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const current = TITLES[index];
    if (direction === "forward") {
      if (display.length < current.length) {
        timeout = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), 70);
      } else {
        timeout = setTimeout(() => setDirection("backward"), 1200);
      }
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => setDisplay(current.slice(0, display.length - 1)), 35);
      } else {
        timeout = setTimeout(() => {
          setIndex((index + 1) % TITLES.length);
          setDirection("forward");
        }, 300);
      }
    }
    return () => clearTimeout(timeout);
  }, [display, direction, index]);

  return (
    <>
      <h2 className="text-lg md:text-xl font-bold h-8 flex items-center animate-slide-down font-mono">
        <span className="typing-cursor">{display || '\u00A0'}</span>
      </h2>
    </>
  );
};

export default HeroText;
