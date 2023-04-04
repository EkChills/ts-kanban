import React, { ReactNode, RefObject } from "react";

const BoardBcg = ({ children, className, overlayRef }: { children: ReactNode, className?:string; overlayRef?:RefObject<any> }) => {
  return (
    <div ref={overlayRef} className={`w-full max-w-[30rem] rounded-md bg-[var(--side-bar-bcg)] ${className} `}>
      {children}
    </div>
  );
};

export default BoardBcg;
