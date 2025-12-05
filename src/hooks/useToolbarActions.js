import { useState } from "react";

let globalCards = [];
let setCardsGlobal = () => {};

export function subscribeCards(fn) {
  setCardsGlobal = fn;
}

export default function useToolbarActions() {

  const addCard = () => {
    document.dispatchEvent(new Event("open-file-upload"));
  };

  const sortBySize = () => {
    globalCards.sort(
      (a, b) => parseFloat(a.filesize) - parseFloat(b.filesize)
    );
    setCardsGlobal([...globalCards]);
  };

  const snapToGrid = () => {
    const grid = 60;

    const snapped = globalCards.map(c => ({
      ...c,
      x: Math.round((c.x || 0) / grid) * grid,
      y: Math.round((c.y || 0) / grid) * grid,
    }));

    setCardsGlobal(snapped);
  };

  return { addCard, sortBySize, snapToGrid };
}
