
type SkillProps = {
  name: string;
  icon: React.ReactNode;
  percent: number;
};

const SkillMeter = ({ name, icon, percent }: SkillProps) => (
  <div className="flex flex-col items-center w-32 p-2 glow-container glass rounded-xl animate-fade-in">
    <div className="relative mb-2">
      <span className="block bg-primary rounded-full p-3 text-white shadow-lg heartbeat">
        {icon}
      </span>
      <span className="absolute -right-2 -top-2 text-[13px] font-bold text-tech">
        {percent}%
      </span>
    </div>
    <span className="font-semibold text-gifted">{name}</span>
  </div>
);

export default SkillMeter;
