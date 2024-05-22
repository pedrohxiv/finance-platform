import { create } from "zustand";

type NewTransactionSheetState = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const useNewTransactionSheet = create<NewTransactionSheetState>(
  (set) => ({
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true }),
  })
);
