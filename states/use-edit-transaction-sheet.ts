import { create } from "zustand";

type EditTransactionSheetState = {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  onOpen: (id: string) => void;
};

export const useEditTransactionSheet = create<EditTransactionSheetState>(
  (set) => ({
    id: undefined,
    isOpen: false,
    onClose: () => set({ id: undefined, isOpen: false }),
    onOpen: (id: string) => set({ id, isOpen: true }),
  })
);
