import { create } from 'zustand';

interface ItemDrawerStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useItemDrawer = create<ItemDrawerStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useItemDrawer;
