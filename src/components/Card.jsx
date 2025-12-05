import React from "react";
import { motion } from "framer-motion";
import {
  FaFilePdf, FaFileImage, FaFileVideo, FaFileArchive, FaRegFileAlt
} from "react-icons/fa";

const iconMap = {
  pdf: <FaFilePdf size={40} />,
  image: <FaFileImage size={40} />,
  video: <FaFileVideo size={40} />,
  zip: <FaFileArchive size={40} />,
  file: <FaRegFileAlt size={40} />,
};

const colorMap = {
  pdf: "bg-red-500",
  image: "bg-green-500",
  video: "bg-purple-500",
  zip: "bg-yellow-500",
  file: "bg-blue-500",
};

const Card = ({ data, reference }) => {
  const color = colorMap[data.icon] || "bg-blue-500";

  return (
    <motion.div
      drag
      dragConstraints={reference}
      className="relative w-64 h-80 p-6 rounded-3xl backdrop-blur-xl
      bg-white/10 border border-white/20 text-white shadow-xl"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Icon */}
      <div className="text-white mb-4">
        {iconMap[data.icon]}
      </div>

      {/* File name */}
      <p className="font-semibold text-lg break-all">{data.name}</p>

      {/* Size */}
      <p className="text-sm opacity-70">{data.size} MB</p>

      {/* Bottom Tag */}
      <div className={`absolute bottom-0 left-0 w-full h-14 ${color}
      flex items-center justify-center rounded-b-3xl`}>
        {data.icon.toUpperCase()} FILE
      </div>
    </motion.div>
  );
};

export default Card;
