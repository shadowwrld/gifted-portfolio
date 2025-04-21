import { useEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaWhatsapp, FaTiktok } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

type SocialMediaIconsProps = {
  slow?: boolean;
};

const items = [
  {
    href: "https://github.com/mauricegift",
    icon: FaGithub,
    label: "GitHub"
  },
  {
    href: "https://whatsapp.com/channel/0029Vb3hlgX5kg7G0nFggl0Y", 
    icon: FaWhatsapp,
    label: "WhatsApp"
  },
  {
    href: "https://twitter.com/GiftedMauriceKe",
    icon: FaTwitter,
    label: "Twitter"
  },
  {
    href: "https://tiktok.com/@giftedtechke",
    icon: FaTiktok,
    label: "TikTok"
  },
  {
    href: "mailto:contact@giftedtech.web.id",
    icon: HiMail,
    label: "Email"
  },
];

const SocialMediaIcons = ({ slow }: SocialMediaIconsProps) => {
  const iconRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const currentIcons = iconRefs.current;

    currentIcons.forEach((icon, index) => {
      if (icon) {
        icon.style.opacity = '0';
        icon.style.transform = 'translateY(-50px)';
        
        setTimeout(() => {
          icon.style.transition = 'opacity 0.5s ease-out, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
          icon.style.opacity = '1';
          icon.style.transform = 'translateY(0)';
        }, index * 150);
      }
    });

    return () => {
      currentIcons.forEach(icon => {
        if (icon) {
          icon.style.transition = '';
          icon.style.opacity = '';
          icon.style.transform = '';
        }
      });
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes heartbeat-slow {
          0% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.1);
          }
          50% {
            transform: scale(1);
          }
          75% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-heartbeat-slow {
          animation: heartbeat-slow 2s ease-in-out infinite;
        }
      `}</style>
      
      <div className="flex gap-5">
        {items.map((item, index) => (
          <a
            key={item.label}
            ref={el => iconRefs.current[index] = el}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className={`p-2 rounded-full shadow-md 
              bg-white/60 dark:bg-black
              hover:bg-tech hover:text-white
              animate-heartbeat-slow
            `}
          >
            <item.icon className="w-5 h-5" />
          </a>
        ))}
      </div>
    </>
  );
};

export default SocialMediaIcons;