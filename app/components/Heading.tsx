"use client";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-xl font-semibold">{title}</div>

      <div className="text-md font-medium text-neutral-600/80 mt-1 mb-3">
        {subtitle}
      </div>
    </div>
  );
};

export default Heading;
