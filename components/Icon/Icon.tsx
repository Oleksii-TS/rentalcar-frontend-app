import React from "react";

type IconProps = {
  name: string;
  size?: number;
  className?: string;
  children?: React.ReactNode;
};

const Icon: React.FC<IconProps> = ({ name, size = 24, className = "" }) => {
  return (
    <svg
      className={`${className}`}
      width={size}
      height={size}
      aria-hidden="true"
    >
      <use href={`/icon.svg#${name}`} />
    </svg>
  );
};

export default Icon;
