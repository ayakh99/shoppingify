import { ListItems } from '@types';
import { create } from 'zustand';

interface ListDrawerStore {
  listId: string;
  setListId: (listId: string) => void;
  listTitle: string;
  setListTitle: (listTitle: string) => void;
  listItems: ListItems;
  setListItems: (listItems: ListItems) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  touchedValues: any;
  addTouched: (itemId: string, values: number) => void;
  removeTouched: (itemId: string) => void;
  clearTouched: () => void;
  isEmpty: boolean;
  setEmpty: (isEmpty: boolean) => void;
  isMultipleActive: boolean;
  setIsMultipleActive: (isMultipleActive: boolean) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useListDrawer = create<ListDrawerStore>((set) => ({
  listId: '',
  setListId: (listId) => set({ listId: listId }),
  listTitle: '',
  setListTitle: (listTitle) => set({ listTitle: listTitle }),
  listItems: [],
  setListItems: (listItems) => set({ listItems: listItems }),
  isEditing: false,
  setIsEditing: (isEditing) => set({ isEditing: isEditing }),
  touchedValues: {},
  addTouched: (itemId, amount) => {
    set((state) => ({
      touchedValues: { ...state.touchedValues, [itemId]: amount },
    }));
  },
  removeTouched: (itemId) => {
    set((state) => {
      delete state.touchedValues[itemId];
      return state.touchedValues;
    });
  },
  clearTouched: () => set({ touchedValues: {} }),
  isEmpty: true,
  setEmpty: (isEmpty) => set({ isEmpty: isEmpty }),
  isMultipleActive: false,
  setIsMultipleActive: (isMultipleActive) => set({ isMultipleActive: isMultipleActive }),
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useListDrawer;
