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
    <footer className="footer-border glass py-3 flex justify-center items-center mt-8 shadow-inner gap-2 relative">
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