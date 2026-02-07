import { beforeEach, describe, expect, it } from "vitest";
import { useSidebarStore } from "@/stores/sidebar-store";

describe("sidebar store", () => {
  beforeEach(() => {
    useSidebarStore.setState({
      isExpanded: true,
      isHovered: false,
      isMobileOpen: false,
    });
  });

  it("toggles desktop sidebar", () => {
    useSidebarStore.getState().toggleSidebar();
    expect(useSidebarStore.getState().isExpanded).toBe(false);
  });

  it("toggles mobile sidebar", () => {
    useSidebarStore.getState().toggleMobileSidebar();
    expect(useSidebarStore.getState().isMobileOpen).toBe(true);
  });
});
