// import React, { useRef, useState } from "react";
// import Card from "./Card";
// import FloatingAddButton from "./FloatingAddButton";
// import { categorizeFile } from "../utils/categorizer";

// const Foreground = () => {
//   const ref = useRef(null);
//   const [cards, setCards] = useState([]);
//   const [showInput, setShowInput] = useState(false);
//   const [newFile, setNewFile] = useState(null);

//   const createCard = () => {
//     if (!newFile) return;

//     const icon = categorizeFile(newFile.name);

//     const card = {
//       id: Date.now(),
//       name: newFile.name,
//       size: (newFile.size / 1024 / 1024).toFixed(2),
//       file: newFile,
//       icon,
//     };

//     setCards([...cards, card]);
//     setShowInput(false);
//   };

//   return (
//     <>
//       {/* Add Button */}
//       <FloatingAddButton onClick={() => setShowInput(true)} />

//       {/* Popup */}
//       {showInput && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-[999]">
//           <div className="bg-white p-6 rounded-xl text-black">
//             <input type="file" onChange={(e) => setNewFile(e.target.files[0])} />
//             <button 
//               className="mt-4 bg-black text-white px-4 py-2 rounded"
//               onClick={createCard}
//             >
//               Create Card
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Cards */}
//       <div ref={ref} className="fixed inset-0 flex flex-wrap gap-6 p-6">
//         {cards.map((c) => (
//           <Card key={c.id} data={c} reference={ref} />
//         ))}
//       </div>
//     </>
//   );
// };

// export default Foreground;

import React, { useRef, useState } from "react";
import Card from "./Card";
import FloatingAddButton from "./FloatingAddButton";
import { categorizeFile } from "../utils/categorizer";

const Foreground = () => {
  const ref = useRef(null);
  const [cards, setCards] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [newFile, setNewFile] = useState(null);
  const [editingCard, setEditingCard] = useState(null);
  const [editName, setEditName] = useState("");

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
    setNewFile(null);
    setShowInput(false);
  };

  const deleteCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const startEditing = (card) => {
    setEditingCard(card.id);
    setEditName(card.name);
  };

  const saveEdit = () => {
    if (!editName.trim()) return;
    
    setCards(cards.map(card => 
      card.id === editingCard 
        ? { ...card, name: editName }
        : card
    ));
    setEditingCard(null);
    setEditName("");
  };

  const cancelEdit = () => {
    setEditingCard(null);
    setEditName("");
  };

  const handleFileUpdate = (id, newFileData) => {
    const icon = categorizeFile(newFileData.name);
    
    setCards(cards.map(card => 
      card.id === id 
        ? { 
            ...card, 
            name: newFileData.name,
            size: (newFileData.size / 1024 / 1024).toFixed(2),
            file: newFileData,
            icon
          }
        : card
    ));
  };

  return (
    <>
      {/* Add Button */}
      <FloatingAddButton onClick={() => setShowInput(true)} />

      {/* File Upload Popup */}
      {showInput && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-[999]">
          <div className="bg-white p-6 rounded-xl text-black w-96">
            <h2 className="text-xl font-bold mb-4">Upload File</h2>
            <input 
              type="file" 
              onChange={(e) => setNewFile(e.target.files[0])}
              className="w-full mb-4 p-2 border rounded"
            />
            <div className="flex gap-2 justify-end">
              <button 
                className="px-4 py-2 border rounded hover:bg-gray-100"
                onClick={() => {
                  setShowInput(false);
                  setNewFile(null);
                }}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                onClick={createCard}
                disabled={!newFile}
              >
                Create Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Name Popup */}
      {editingCard && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-[999]">
          <div className="bg-white p-6 rounded-xl text-black w-96">
            <h2 className="text-xl font-bold mb-4">Edit File Name</h2>
            <input 
              type="text" 
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
              placeholder="Enter new file name"
              onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
            />
            <div className="flex gap-2 justify-end">
              <button 
                className="px-4 py-2 border rounded hover:bg-gray-100"
                onClick={cancelEdit}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                onClick={saveEdit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cards Container */}
      <div ref={ref} className="fixed inset-0 flex flex-wrap gap-6 p-6">
        {cards.map((c) => (
          <Card 
            key={c.id} 
            data={c} 
            reference={ref}
            onDelete={() => deleteCard(c.id)}
            onEdit={() => startEditing(c)}
            onFileUpdate={(file) => handleFileUpdate(c.id, file)}
          />
        ))}
      </div>
    </>
  );
};

export default Foreground;

