import React from "react";

const Background = () => {
  return (
    <div className="fixed inset-0 z-[1] bg-black overflow-hidden">

      {/* BIG Purple Glow */}
      <div className="absolute top-[20%] left-[10%] 
      w-[600px] h-[600px] 
      bg-purple-700/70 
      rounded-full 
      blur-[200px]">
      </div>

      {/* BIG Blue Glow */}
      <div className="absolute bottom-[15%] right-[5%] 
      w-[650px] h-[650px]
      bg-blue-600/70 
      rounded-full 
      blur-[220px]">
      </div>

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.10] pointer-events-none"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.png')",
        }}
      ></div>

    </div>
  );
};

export default Background;
