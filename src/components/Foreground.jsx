import React, { useRef, useState } from "react";
import Card from "./Card";
import FloatingAddButton from "./FloatingAddButton";
import { categorizeFile } from "../utils/categorizer";

const Foreground = () => {
  const ref = useRef(null);
  const [cards, setCards] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [newFile, setNewFile] = useState(null);

  const createCard = () => {
    if (!newFile) return;

    const icon = categorizeFile(newFile.name);

    const card = {
      id: Date.now(),
      name: newFile.name,
      size: (newFile.size / 1024 / 1024).toFixed(2),
      file: newFile,
      icon,
    };

    setCards([...cards, card]);
    setShowInput(false);
  };

  return (
    <>
      {/* Add Button */}
      <FloatingAddButton onClick={() => setShowInput(true)} />

      {/* Popup */}
      {showInput && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-[999]">
          <div className="bg-white p-6 rounded-xl text-black">
            <input type="file" onChange={(e) => setNewFile(e.target.files[0])} />
            <button 
              className="mt-4 bg-black text-white px-4 py-2 rounded"
              onClick={createCard}
            >
              Create Card
            </button>
          </div>
        </div>
      )}

      {/* Cards */}
      <div ref={ref} className="fixed inset-0 flex flex-wrap gap-6 p-6">
        {cards.map((c) => (
          <Card key={c.id} data={c} reference={ref} />
        ))}
      </div>
    </>
  );
};

export default Foreground;
