"use client";

import { useEffect, useState, useCallback } from "react";
import ImageUpload from "@/components/ImageUpload";
import { BRANDS, CONDITIONS, SHAPES } from "@/lib/validators";

interface Racket {
  id: string;
  title: string;
  brand: string;
  model: string;
  condition: string;
  price: number;
  description: string;
  images: string[];
  weight?: string;
  shape?: string;
  featured: boolean;
  sold: boolean;
  createdAt: string;
}

const EMPTY_FORM = {
  title: "",
  brand: "",
  model: "",
  condition: "good" as string,
  price: 0,
  description: "",
  images: [] as string[],
  weight: "",
  shape: "" as string,
  featured: false,
  sold: false,
};

export default function AdminRacketsPage() {
  const [rackets, setRackets] = useState<Racket[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const fetchRackets = useCallback(async () => {
    const res = await fetch("/api/admin/rackets");
    const data = await res.json();
    setRackets(data.data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRackets();
  }, [fetchRackets]);

  function startEdit(racket: Racket) {
    setForm({
      title: racket.title,
      brand: racket.brand,
      model: racket.model,
      condition: racket.condition,
      price: racket.price,
      description: racket.description,
      images: racket.images,
      weight: racket.weight || "",
      shape: racket.shape || "",
      featured: racket.featured,
      sold: racket.sold,
    });
    setEditing(racket.id);
    setShowForm(true);
  }

  function startNew() {
    setForm(EMPTY_FORM);
    setEditing(null);
    setShowForm(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        shape: form.shape || undefined,
        weight: form.weight || undefined,
      };

      if (editing) {
        await fetch("/api/admin/rackets", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editing, ...payload }),
        });
      } else {
        await fetch("/api/admin/rackets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      setShowForm(false);
      setEditing(null);
      fetchRackets();
    } catch (err) {
      alert("Failed to save racket");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this racket?")) return;

    await fetch(`/api/admin/rackets?id=${id}`, { method: "DELETE" });
    fetchRackets();
  }

  async function toggleSold(racket: Racket) {
    await fetch("/api/admin/rackets", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: racket.id, sold: !racket.sold }),
    });
    fetchRackets();
  }

  async function toggleFeatured(racket: Racket) {
    await fetch("/api/admin/rackets", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: racket.id, featured: !racket.featured }),
    });
    fetchRackets();
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-surface-400">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Rackets</h1>
          <p className="text-surface-500 text-sm">{rackets.length} total listings</p>
        </div>
        <button onClick={startNew} className="btn-primary">
          + Add Racket
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl w-full max-w-2xl my-8 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">
                {editing ? "Edit Racket" : "Add New Racket"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-surface-100 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <input
                  className="input-field"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Bullpadel Hack 03 2024"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Brand *</label>
                  <select
                    className="input-field"
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                  >
                    <option value="">Select</option>
                    {BRANDS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Model *</label>
                  <input
                    className="input-field"
                    value={form.model}
                    onChange={(e) => setForm({ ...form, model: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Condition *</label>
                  <select
                    className="input-field"
                    value={form.condition}
                    onChange={(e) => setForm({ ...form, condition: e.target.value })}
                  >
                    {Object.entries(CONDITIONS).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price (€) *</label>
                  <input
                    type="number"
                    className="input-field"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Weight</label>
                  <input
                    className="input-field"
                    value={form.weight}
                    onChange={(e) => setForm({ ...form, weight: e.target.value })}
                    placeholder="e.g. 365g"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Shape</label>
                <select
                  className="input-field"
                  value={form.shape}
                  onChange={(e) => setForm({ ...form, shape: e.target.value })}
                >
                  <option value="">Not specified</option>
                  {Object.entries(SHAPES).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description *</label>
                <textarea
                  className="input-field resize-none"
                  rows={4}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Images</label>
                <ImageUpload
                  images={form.images}
                  onChange={(images) => setForm({ ...form, images })}
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="w-4 h-4 rounded border-surface-300"
                  />
                  <span className="text-sm">Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.sold}
                    onChange={(e) => setForm({ ...form, sold: e.target.checked })}
                    className="w-4 h-4 rounded border-surface-300"
                  />
                  <span className="text-sm">Sold</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-surface-100">
              <button
                onClick={() => setShowForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-primary"
              >
                {saving ? "Saving..." : editing ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rackets table */}
      <div className="bg-white rounded-xl border border-surface-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-50 border-b border-surface-100 text-left">
                <th className="px-4 py-3 font-medium text-surface-600">Racket</th>
                <th className="px-4 py-3 font-medium text-surface-600">Price</th>
                <th className="px-4 py-3 font-medium text-surface-600">Condition</th>
                <th className="px-4 py-3 font-medium text-surface-600">Status</th>
                <th className="px-4 py-3 font-medium text-surface-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {rackets.map((racket) => (
                <tr key={racket.id} className="hover:bg-surface-50 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-surface-900">{racket.title}</p>
                      <p className="text-xs text-surface-400">{racket.brand} · {racket.model}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold">€{racket.price}</td>
                  <td className="px-4 py-3">
                    <span className={`badge badge-condition-${racket.condition}`}>
                      {CONDITIONS[racket.condition as keyof typeof CONDITIONS]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {racket.sold && (
                        <span className="badge bg-surface-200 text-surface-700">Sold</span>
                      )}
                      {racket.featured && (
                        <span className="badge bg-brand-100 text-brand-700">Featured</span>
                      )}
                      {!racket.sold && !racket.featured && (
                        <span className="badge bg-emerald-100 text-emerald-700">Active</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => toggleFeatured(racket)}
                        className="p-1.5 rounded hover:bg-surface-100 text-surface-400 hover:text-brand-600"
                        title={racket.featured ? "Unfeature" : "Feature"}
                      >
                        ★
                      </button>
                      <button
                        onClick={() => toggleSold(racket)}
                        className="p-1.5 rounded hover:bg-surface-100 text-surface-400 hover:text-surface-900"
                        title={racket.sold ? "Mark available" : "Mark sold"}
                      >
                        {racket.sold ? "↩" : "✓"}
                      </button>
                      <button
                        onClick={() => startEdit(racket)}
                        className="p-1.5 rounded hover:bg-surface-100 text-surface-400 hover:text-surface-900"
                        title="Edit"
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => handleDelete(racket.id)}
                        className="p-1.5 rounded hover:bg-red-50 text-surface-400 hover:text-red-600"
                        title="Delete"
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {rackets.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-surface-400">
                    No rackets yet. Click &quot;Add Racket&quot; to create your first listing.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
