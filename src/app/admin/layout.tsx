"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, Home } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-xl font-black uppercase text-neutral-900">
            Wanderlust Admin
          </Link>
          <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold text-neutral-500">
            v1.0
          </span>
          <Link href="/admin/settings" className="rounded-full bg-neutral-900/5 px-4 py-1.5 text-sm font-bold text-neutral-600 hover:bg-neutral-900/10 transition-colors ml-4">
            Site Settings
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-neutral-600 transition-colors hover:bg-neutral-100"
          >
            <Home className="h-4 w-4" />
            Live Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-red-600"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}
