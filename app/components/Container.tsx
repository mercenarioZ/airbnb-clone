"use client";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="max-w-[2520px] mx-auto xl:px-16 md:px-8 px-4">{children}</div>;
};

export default Container;
