import { create } from "zustand";

interface SidebarStoreState {
  isExpanded: boolean;
  isMobileOpen: boolean;
  isHovered: boolean;
  setIsHovered: (isHovered: boolean) => void;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
}

export const useSidebarStore = create<SidebarStoreState>((set) => ({
  isExpanded: true,
  isMobileOpen: false,
  isHovered: false,
  setIsHovered: (isHovered) => set({ isHovered }),
  toggleSidebar: () => set((state) => ({ isExpanded: !state.isExpanded })),
  toggleMobileSidebar: () =>
    set((state) => ({ isMobileOpen: !state.isMobileOpen })),
}));
