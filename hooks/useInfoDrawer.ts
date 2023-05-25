import { create } from 'zustand';

interface InfoDrawerStore {
  itemId: string;
  setItemId: (itemId: string) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useInfoDrawer = create<InfoDrawerStore>((set) => ({
  itemId: '',
  setItemId: (itemId) => set({ itemId: itemId }),
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useInfoDrawer;
