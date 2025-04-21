import SocialMediaIcons from "@/components/SocialMediaIcons";
import ContactForm from "@/components/ContactForm";

const Contact = () => (
  <section className="container px-4 py-10 flex flex-col items-center max-w-2xl mx-auto">
    <div className="relative mb-5">
      <h2 className="text-3xl font-bold text-tech">Contact Gifted</h2>
      <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-90 animate-moveDots"></div>
      </div>
    </div>
    <div className="mb-6">
      <SocialMediaIcons slow />
    </div>
    <p className="mb-6 text-lg text-center">
      Have an idea, a project, or just want to say hi? Send a message below or reach out via my social handles above!
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
      `}
    </style>
  </section>
);

export default Contact;