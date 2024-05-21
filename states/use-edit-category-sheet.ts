import { create } from "zustand";

type EditCategorySheetState = {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  onOpen: (id: string) => void;
};

export const useEditCategorySheet = create<EditCategorySheetState>((set) => ({
  id: undefined,
  isOpen: false,
  onClose: () => set({ id: undefined, isOpen: false }),
  onOpen: (id: string) => set({ id, isOpen: true }),
}));
