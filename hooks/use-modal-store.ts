import { create } from "zustand";

export type ModalType = "createServer";

interface ModelStore {
    type : ModalType | null;
    isOpen : boolean;
    onOpen : (type : ModalType) => void;
    onClose : () => void;
}

export const useModal = create<ModelStore>((set) => ({
    type : null,
    isOpen : false,
    onOpen : (type : ModalType) => set({isOpen : true, type}),
    onClose : () => set({isOpen : false, type : null})
}))