
import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};

const Card = ({ children }: CardProps) => {
  return (
    <div className="rounded-lg border border-gray-300 p-4 shadow-sm">
      {children}
    </div>
  );
};

export default Card;