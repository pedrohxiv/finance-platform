import { create } from "zustand";

type NewCategorySheetState = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const useNewCategorySheet = create<NewCategorySheetState>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
