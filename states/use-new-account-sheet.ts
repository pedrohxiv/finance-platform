import { create } from "zustand";

type NewAccountSheetState = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const useNewAccountSheet = create<NewAccountSheetState>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
