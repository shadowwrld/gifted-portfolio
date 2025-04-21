import { useState, useEffect } from "react";

const ContactForm = () => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [namePlaceholder, setNamePlaceholder] = useState("");
  const [phonePlaceholder, setPhonePlaceholder] = useState("");
  const [emailPlaceholder, setEmailPlaceholder] = useState("");
  const [messagePlaceholder, setMessagePlaceholder] = useState("");
  
  const fullNamePlaceholder = "Full Name";
  const fullPhonePlaceholder = "Phone Number";
  const fullEmailPlaceholder = "your@email.com";
  const fullMessagePlaceholder = "Type your message...";

  useEffect(() => {
    // Animate name placeholder
    let i = 0;
    const nameInterval = setInterval(() => {
      if (i <= fullNamePlaceholder.length) {
        setNamePlaceholder(fullNamePlaceholder.substring(0, i));
        i++;
      } else {
        clearInterval(nameInterval);
        
        // Animate phone placeholder after name completes
        let j = 0;
        const phoneInterval = setInterval(() => {
          if (j <= fullPhonePlaceholder.length) {
            setPhonePlaceholder(fullPhonePlaceholder.substring(0, j));
            j++;
          } else {
            clearInterval(phoneInterval);
            
            // Animate email placeholder after phone completes
            let k = 0;
            const emailInterval = setInterval(() => {
              if (k <= fullEmailPlaceholder.length) {
                setEmailPlaceholder(fullEmailPlaceholder.substring(0, k));
                k++;
              } else {
                clearInterval(emailInterval);
                
                // Animate message placeholder last
                let l = 0;
                const messageInterval = setInterval(() => {
                  if (l <= fullMessagePlaceholder.length) {
                    setMessagePlaceholder(fullMessagePlaceholder.substring(0, l));
                    l++;
                  } else {
                    clearInterval(messageInterval);
                  }
                }, 50);
              }
            }, 50);
          }
        }, 50);
      }
    }, 100);

    return () => {
      clearInterval(nameInterval);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  if (sent) {
    return (
      <div className="glass p-6 text-green-700 dark:text-green-400 text-center font-semibold text-lg rounded-xl animate-fade-in w-full max-w-2xl">
        Message sent! I will get back to you 🙏
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-1 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-green-500/20 shadow-xl dark:shadow-lg dark:shadow-yellow-500/30">
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          .animate-pulse {
            animation: pulse 2s infinite;
          }
          @keyframes ping {
            75%, 100% {
              transform: scale(1.5);
              opacity: 0;
            }
          }
          .animate-ping {
            animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
        `}
      </style>

      <form
        className="glass p-6 rounded-xl w-full flex flex-col gap-4 animate-fade-in dark:bg-gray-800/80"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="name" className="block mb-1 font-bold text-tech dark:text-yellow-400">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full p-3 border-0 rounded-2xl bg-white/90 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 shadow-inner placeholder-black/60 dark:placeholder-white/60 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all"
            placeholder={namePlaceholder}
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block mb-1 font-bold text-tech dark:text-yellow-400">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            className="w-full p-3 border-0 rounded-2xl bg-white/90 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 shadow-inner placeholder-black/60 dark:placeholder-white/60 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all"
            placeholder={phonePlaceholder}
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-bold text-tech dark:text-yellow-400">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-3 border-0 rounded-2xl bg-white/90 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 shadow-inner placeholder-black/60 dark:placeholder-white/60 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all"
            placeholder={emailPlaceholder}
            required
          />
        </div>

        <div>
          <label htmlFor="msg" className="block mb-1 font-bold text-tech dark:text-yellow-400">
            Message
          </label>
          <textarea
            id="msg"
            className="w-full p-3 border-0 rounded-2xl bg-white/90 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 shadow-inner placeholder-black/60 dark:placeholder-white/60 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all"
            rows={4}
            placeholder={messagePlaceholder}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black dark:bg-yellow-400 text-white dark:text-black font-extrabold py-3 rounded-2xl hover:opacity-90 shadow-md hover:shadow-lg transition-all duration-300"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-ping"></span> Sending Message...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-pulse"></span> Send Message
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;