import React from "react";

export default function Container({ children }) {
  return (
    <div className="min-h-[60dvh] md:min-w-xl min-w-sm rounded-md bg-neutral-300 flex flex-col items-center justify-center mb-4">
      {children}
    </div>
  );
}
