"use client";

import {
  Bell,
  Bookmark,
  Home,
  List,
  Mail,
  MoreHorizontal,
  User,
  Users,
} from "lucide-react";
import { SidebarDesktop } from "./sidebar-desktop";
import { SidebarButton } from "./sidebar-button";
import { useMediaQuery } from "usehooks-ts";
import { SidebarMobile } from "./sidebar-mobile";
import { SidebarItems } from "./types";

const sidebarItems: SidebarItems = {
  links: [
    { label: "Home", href: "/", icon: Home },

    {
      href: "/admin/users",
      icon: List,
      label: "Users",
    },
    {
      href: "/admin/products",
      icon: List,
      label: "Products",
    },
  ],
  extras: (
    <div className="flex flex-col gap-2">
      <SidebarButton icon={MoreHorizontal} className="w-full">
        More
      </SidebarButton>
      <SidebarButton
        className="w-full justify-center text-white"
        variant="default"
      >
        Tweet
      </SidebarButton>
    </div>
  ),
};

export function Sidebar() {
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });

  if (isDesktop) {
    return <SidebarDesktop sidebarItems={sidebarItems} />;
  }

  return <SidebarMobile sidebarItems={sidebarItems} />;
}
