// import React from "react";
// import { motion } from "framer-motion";
// import {
//   FaFilePdf, FaFileImage, FaFileVideo, FaFileArchive, FaRegFileAlt
// } from "react-icons/fa";

// const iconMap = {
//   pdf: <FaFilePdf size={40} />,
//   image: <FaFileImage size={40} />,
//   video: <FaFileVideo size={40} />,
//   zip: <FaFileArchive size={40} />,
//   file: <FaRegFileAlt size={40} />,
// };

// const colorMap = {
//   pdf: "bg-red-500",
//   image: "bg-green-500",
//   video: "bg-purple-500",
//   zip: "bg-yellow-500",
//   file: "bg-blue-500",
// };

// const Card = ({ data, reference }) => {
//   const color = colorMap[data.icon] || "bg-blue-500";

//   return (
//     <motion.div
//       drag
//       dragConstraints={reference}
//       className="relative w-64 h-80 p-6 rounded-3xl backdrop-blur-xl
//       bg-white/10 border border-white/20 text-white shadow-xl"
//       initial={{ opacity: 0, y: 30, scale: 0.9 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       whileHover={{ scale: 1.05 }}
//     >
//       {/* Icon */}
//       <div className="text-white mb-4">
//         {iconMap[data.icon]}
//       </div>

//       {/* File name */}
//       <p className="font-semibold text-lg break-all">{data.name}</p>

//       {/* Size */}
//       <p className="text-sm opacity-70">{data.size} MB</p>

//       {/* Bottom Tag */}
//       <div className={`absolute bottom-0 left-0 w-full h-14 ${color}
//       flex items-center justify-center rounded-b-3xl`}>
//         {data.icon.toUpperCase()} FILE
//       </div>
//     </motion.div>
//   );
// };

// export default Card;
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaFilePdf, FaFileImage, FaFileVideo, FaFileArchive, 
  FaRegFileAlt, FaTrash, FaEdit, FaUpload, FaTimes
} from "react-icons/fa";
import "./Card.css"
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

const Card = ({ data, reference, onDelete, onEdit, onFileUpdate }) => {
  const [showActions, setShowActions] = useState(false);
  const [showUpdateFile, setShowUpdateFile] = useState(false);
  const [newFile, setNewFile] = useState(null);
  const color = colorMap[data.icon] || "bg-blue-500";
  
  // File type display text with proper formatting
  const fileTypeText = {
    pdf: "PDF Document",
    image: "Image File",
    video: "Video File",
    zip: "Archive File",
    file: "Document"
  };

  const handleFileUpdate = () => {
    if (newFile && onFileUpdate) {
      onFileUpdate(newFile);
      setNewFile(null);
      setShowUpdateFile(false);
    }
  };

  return (
    <>
      <motion.div
        drag
        dragConstraints={reference}
        className="card-container relative w-64 h-80 p-6 rounded-3xl backdrop-blur-xl
        bg-white/10 border border-white/20 text-white shadow-xl cursor-move"
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        onDoubleClick={() => setShowActions(!showActions)}
      >
        {/* Menu Button */}
        <button 
          className="card-menu-btn absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 
          flex items-center justify-center hover:bg-white/30 transition-all duration-200"
          onClick={() => setShowActions(!showActions)}
        >
          ⋮
        </button>

        {/* Action Menu */}
        {showActions && (
          <div className="card-action-menu absolute top-12 right-4 bg-black/90 backdrop-blur-xl 
          rounded-xl p-3 z-10 border border-white/20 shadow-2xl min-w-40">
            <div className="flex flex-col gap-2">
              <button 
                className="action-btn edit-btn flex items-center gap-3 px-4 py-2 rounded-lg 
                hover:bg-white/10 transition-all duration-200"
                onClick={onEdit}
              >
                <FaEdit size={16} />
                <span>Edit Name</span>
              </button>
              <button 
                className="action-btn update-btn flex items-center gap-3 px-4 py-2 rounded-lg 
                hover:bg-white/10 transition-all duration-200"
                onClick={() => {
                  setShowUpdateFile(true);
                  setShowActions(false);
                }}
              >
                <FaUpload size={16} />
                <span>Update File</span>
              </button>
              <button 
                className="action-btn delete-btn flex items-center gap-3 px-4 py-2 rounded-lg 
                hover:bg-red-500/20 text-red-400 transition-all duration-200"
                onClick={onDelete}
              >
                <FaTrash size={16} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        )}

        {/* Icon */}
        <div className="card-icon text-white mb-4">
          {iconMap[data.icon]}
        </div>

        {/* File name */}
        <p className="card-filename font-semibold text-lg break-all mb-2">{data.name}</p>

        {/* Size */}
        <p className="card-size text-sm opacity-70">{data.size} MB</p>

        {/* File Type Badge */}
        <div className={`file-type-badge mt-4 inline-block px-4 py-2 rounded-full text-sm font-medium ${color}`}>
          {fileTypeText[data.icon] || data.icon.toUpperCase()}
        </div>

        {/* Bottom Tag - File Type with color */}
        <div className={`absolute bottom-0 left-0 w-full h-14 ${color}
        flex items-center justify-center rounded-b-3xl text-sm font-medium card-bottom-tag`}>
          {data.icon.toUpperCase()} FILE
        </div>
      </motion.div>

      {/* Update File Popup */}
      {showUpdateFile && (
        <div className="update-file-modal fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-[999]">
          <div className="modal-content bg-white p-6 rounded-xl text-black w-96">
            <div className="modal-header flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Update File</h2>
              <button 
                onClick={() => {
                  setShowUpdateFile(false);
                  setNewFile(null);
                }}
                className="modal-close-btn text-gray-500 hover:text-black transition-colors duration-200"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <input 
              type="file" 
              onChange={(e) => setNewFile(e.target.files[0])}
              className="file-input w-full mb-4 p-2 border rounded transition-all duration-200
              hover:border-gray-400 focus:border-black focus:outline-none"
            />
            {newFile && (
              <div className="file-preview mb-4 p-3 bg-gray-100 rounded">
                <p className="font-medium">Selected: {newFile.name}</p>
                <p className="text-sm text-gray-600">
                  {(newFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            )}
            <div className="modal-actions flex gap-2 justify-end">
              <button 
                className="modal-btn-cancel px-4 py-2 border rounded hover:bg-gray-100 
                transition-all duration-200"
                onClick={() => {
                  setShowUpdateFile(false);
                  setNewFile(null);
                }}
              >
                Cancel
              </button>
              <button 
                className={`modal-btn-save px-4 py-2 bg-black text-white rounded 
                transition-all duration-200 ${!newFile ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
                onClick={handleFileUpdate}
                disabled={!newFile}
              >
                Update File
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
