import type { ReactNode } from "react"

type Title = {
    children:ReactNode;
    title:string;
};



export const Section = ({title,children}:Title) => {
  return (
    <div>
        <h2>{title}</h2>
        {children}
    </div>
  )
}
