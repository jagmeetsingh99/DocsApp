import React from "react";

const FloatingAddButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-white text-black 
      text-4xl flex items-center justify-center shadow-xl hover:scale-110 transition-all z-[999]"
    >
      +
    </button>
  );
};

export default FloatingAddButton;
