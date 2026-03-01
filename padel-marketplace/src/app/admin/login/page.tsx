"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.get("username"),
          password: form.get("password"),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-surface-900 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-6 h-6 text-white"
              stroke="currentColor"
              strokeWidth={2}
            >
              <ellipse cx="12" cy="12" rx="5" ry="8" />
              <line x1="12" y1="4" x2="12" y2="20" />
            </svg>
          </div>
          <h1 className="font-display text-2xl text-surface-900">Admin Login</h1>
          <p className="text-surface-500 text-sm mt-1">PadelMarket Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-surface-200 p-6 space-y-4 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">
              Username
            </label>
            <input
              name="username"
              required
              autoComplete="username"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="input-field"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs text-surface-400 mt-6">
          <a href="/" className="hover:text-surface-600 transition-colors">
            ← Back to PadelMarket
          </a>
        </p>
      </div>
    </div>
  );
}
