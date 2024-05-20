import { create } from "zustand";

type EditAccountSheetState = {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  onOpen: (id: string) => void;
};

export const useEditAccountSheet = create<EditAccountSheetState>((set) => ({
  id: undefined,
  isOpen: false,
  onClose: () => set({ id: undefined, isOpen: false }),
  onOpen: (id: string) => set({ id, isOpen: true }),
}));
