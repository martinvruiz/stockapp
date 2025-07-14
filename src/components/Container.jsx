import React from "react";

export default function Container({ children }) {
  return (
    <div className="min-h-[60dvh] md:min-w-lg min-w-sm rounded-md bg-red-700 flex flex-col items-center justify-center mb-4">
      {children}
    </div>
  );
}
