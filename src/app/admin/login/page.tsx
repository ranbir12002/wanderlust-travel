"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh(); // Important to refresh Server Components cache
      } else {
        setError(data.message || "Invalid password");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-900 px-4">
      <div className="w-full max-w-sm rounded-[2rem] bg-neutral-800 p-8 shadow-2xl">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-700">
            <Lock className="h-8 w-8 text-neutral-300" />
          </div>
          <h1 className="text-2xl font-black uppercase text-white">Admin Access</h1>
          <p className="mt-2 text-center text-sm font-medium text-neutral-400">
            Enter your password to manage trips and blogs.
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-full bg-neutral-700 px-6 py-4 text-sm font-medium text-white placeholder-neutral-400 outline-none transition-all focus:ring-2 focus:ring-neutral-500"
              required
            />
          </div>
          
          {error && <p className="text-center text-sm font-bold text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-black uppercase tracking-widest text-neutral-900 transition-transform active:scale-95 disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
