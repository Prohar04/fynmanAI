import Link from "next/link";
import type { ReactNode } from "react";

import DashboardNav from "./DashboardNav";
import DashboardShellClient from "./DashboardShellClient";
import { DashboardDataProvider } from "./DashboardDataProvider";
import MobileNav from "../../../../components/ui/MobileNav";
import  TopNav  from "@/components/landing/TopNav";
import BrandMark from "@/components/ui/BrandMark";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (

    <div className="bg-background text-on-background h-screen w-full overflow-hidden fade-in">
      <div className="flex h-full w-full">
        <div className="flex md:hidden">
          <TopNav />
        </div>
        <aside className="hidden md:flex flex-col py-6 px-4 gap-2 bg-surface-container-low text-primary fixed left-0 top-0 h-screen w-70 border-r border-outline-variant">
          <Link href="/" className="flex items-center gap-3 mb-6">
            <BrandMark className="h-12 w-12" />
            <span className="text-2xl font-semibold text-on-surface tracking-tight">
              FymenAI
            </span>
          </Link>
          <Link
            href="/session/new-session"
            className="bg-primary text-on-primary py-4 px-6 rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 mb-6 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined">add</span>
            Start New Session
          </Link>
          <DashboardNav />
          <div className="mt-auto flex flex-col gap-1 pt-6 border-t border-outline-variant">
            <div className="flex items-center gap-4 p-4 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-xl cursor-pointer">
              <span className="material-symbols-outlined">help</span>
              <span className="font-label-md text-label-md">Help</span>
            </div>
            <div className="flex items-center gap-4 p-4 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-xl cursor-pointer">
              <span className="material-symbols-outlined">shield</span>
              <span className="font-label-md text-label-md">Privacy</span>
            </div>
          </div>
        </aside>

        <div className="flex-1 ml-0 md:ml-70 relative">
            <DashboardDataProvider>
          <DashboardShellClient>
              {children}
          </DashboardShellClient>
              </DashboardDataProvider>
        </div>
      </div>

<MobileNav
  leftItems={[
    { icon: "home", label: "Home", href: "/dashboard" },
    { icon: "folder_open", label: "Resources", href: "/dashboard/resources", filled: true },
  ]}
  centerButton={{ icon: "add", href: "/session/new-session" }}
  rightItems={[
    { icon: "auto_stories", label: "Learning Path", href: "/dashboard/learning-path" },
    { icon: "settings", label: "Settings", href: "/dashboard/settings" },
  ]}
/>    </div>
  );
}
