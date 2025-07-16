import React from "react";

export default function Container({ children }) {
  return (
    <div className="md:min-w-xl min-w-sm rounded-md bg-neutral-300 flex flex-col items-center justify-center">
      {children}
    </div>
  );
}
