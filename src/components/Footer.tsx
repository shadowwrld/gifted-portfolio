import SocialMediaIcons from "@/components/SocialMediaIcons";

const Footer = () => {
  const slowHeartbeat = {
    animation: "slowHeartbeat 1s infinite",
    display: "inline-block"
  };

  const heartStyle = { 
    color: "#8B5CF6", 
    fontSize: "1.3rem", 
    lineHeight: 1,
    animation: "heartbeat 1.5s infinite, rotate 2s linear infinite",
    display: "inline-block"
  };

  return (
    <footer className="footer-border glass py-3 flex flex-col items-center mt-8 shadow-inner gap-2 relative">
      {/* Social Icons first */}
      <div className="flex justify-center scale-75">
        <SocialMediaIcons slow />
      </div>

      {/* Copyright text with heart */}
      <div className="flex items-center">
        <span 
          className="font-semibold text-md text-tech select-none"
          style={slowHeartbeat}
        >
          © {new Date().getFullYear()} Gifted Tech
        </span>
        <span
          className="ml-2 text-lg select-none"
          role="img"
          aria-label="heartbeat"
          style={heartStyle}
        >
          💛
        </span>
      </div>

      {/* All Rights Reserved text */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        All Rights Reserved
      </div>
      
      <style>{`
        @keyframes heartbeat {
          0% { transform: scale(1); }
          25% { transform: scale(1.1); }
          50% { transform: scale(1); }
          75% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        @keyframes slowHeartbeat {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
