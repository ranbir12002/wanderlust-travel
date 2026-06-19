"use client";

import { useState, useEffect } from "react";
import { Save, Plus, X, GripVertical, Image as ImageIcon } from "lucide-react";
import NextImage from "next/image";

interface FeaturedCard {
  type: "trip" | "destination";
  slug: string;
  customTitle?: string;
  customDesc?: string;
  customImage?: string;
}

interface TripOption { slug: string; title: string; thumbnail: string; category: string; }
interface DestOption { slug: string; title: string; heroImage: string; category: string; }

export default function FeaturedCardsManager() {
  const [cards, setCards] = useState<FeaturedCard[]>([]);
  const [trips, setTrips] = useState<TripOption[]>([]);
  const [destinations, setDestinations] = useState<DestOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [cardsRes, tripsRes, destsRes] = await Promise.all([
          fetch("/api/admin/featured-cards"),
          fetch("/api/admin/trips"),
          fetch("/api/admin/destinations"),
        ]);
        const cardsData = await cardsRes.json();
        const tripsData = await tripsRes.json();
        const destsData = await destsRes.json();

        setCards(Array.isArray(cardsData) ? cardsData : []);
        setTrips(tripsData);
        setDestinations(destsData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const addCard = () => {
    if (cards.length >= 6) return;
    setCards([...cards, { type: "trip", slug: "" }]);
  };

  const removeCard = (idx: number) => {
    setCards(cards.filter((_, i) => i !== idx));
  };

  const updateCard = (idx: number, field: keyof FeaturedCard, value: string) => {
    const updated = [...cards];
    updated[idx] = { ...updated[idx], [field]: value };
    // Reset slug when type changes
    if (field === "type") {
      updated[idx].slug = "";
    }
    setCards(updated);
  };

  const moveCard = (idx: number, direction: "up" | "down") => {
    const target = direction === "up" ? idx - 1 : idx + 1;
    if (target < 0 || target >= cards.length) return;
    const updated = [...cards];
    [updated[idx], updated[target]] = [updated[target], updated[idx]];
    setCards(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/featured-cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cards }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("✓ Saved successfully!");
      } else {
        setMessage("✕ Failed to save.");
      }
    } catch {
      setMessage("✕ Error saving.");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // Helper to get preview info for a card
  const getPreview = (card: FeaturedCard) => {
    if (card.type === "trip") {
      const trip = trips.find(t => t.slug === card.slug);
      return { title: card.customTitle || trip?.title || "—", image: card.customImage || trip?.thumbnail || "" };
    } else {
      const dest = destinations.find(d => d.slug === card.slug);
      return { title: card.customTitle || dest?.title || "—", image: card.customImage || dest?.heroImage || "" };
    }
  };

  const getOptions = (type: "trip" | "destination") => {
    if (type === "trip") return trips.map(t => ({ slug: t.slug, label: `${t.title} (${t.category})` }));
    return destinations.map(d => ({ slug: d.slug, label: `${d.title} (${d.category})` }));
  };

  if (loading) {
    return <div className="py-8 text-center text-neutral-400 font-bold">Loading...</div>;
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black uppercase tracking-tight text-neutral-900">Homepage Featured Cards</h3>
          <p className="text-sm text-neutral-500">Choose which trips or destinations appear on the homepage. Drag to reorder.</p>
        </div>
        <div className="flex items-center gap-3">
          {message && (
            <span className={`text-sm font-bold ${message.startsWith("✓") ? "text-green-600" : "text-red-500"}`}>
              {message}
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-bold uppercase tracking-widest text-white transition-transform hover:scale-105 disabled:opacity-50"
          >
            <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {cards.map((card, idx) => {
          const preview = getPreview(card);
          const options = getOptions(card.type);

          return (
            <div
              key={idx}
              className="flex items-center gap-4 rounded-xl border border-neutral-100 bg-neutral-50 p-4 transition-colors hover:bg-neutral-100/50"
            >
              {/* Position & Drag Handle */}
              <div className="flex flex-col items-center gap-1">
                <button
                  onClick={() => moveCard(idx, "up")}
                  disabled={idx === 0}
                  className="text-neutral-300 hover:text-neutral-600 disabled:opacity-30 text-xs"
                >▲</button>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-xs font-black text-white">
                  {idx + 1}
                </span>
                <button
                  onClick={() => moveCard(idx, "down")}
                  disabled={idx === cards.length - 1}
                  className="text-neutral-300 hover:text-neutral-600 disabled:opacity-30 text-xs"
                >▼</button>
              </div>

              {/* Image Preview */}
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-200">
                {preview.image ? (
                  <NextImage src={preview.image} alt={preview.title} fill className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <ImageIcon className="h-5 w-5 text-neutral-400" />
                  </div>
                )}
              </div>

              {/* Type Selector */}
              <select
                value={card.type}
                onChange={(e) => updateCard(idx, "type", e.target.value)}
                className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-bold"
              >
                <option value="trip">Trip</option>
                <option value="destination">Destination</option>
              </select>

              {/* Slug Selector */}
              <select
                value={card.slug}
                onChange={(e) => updateCard(idx, "slug", e.target.value)}
                className="flex-1 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm"
              >
                <option value="">-- Select --</option>
                {options.map(opt => (
                  <option key={opt.slug} value={opt.slug}>{opt.label}</option>
                ))}
              </select>

              {/* Preview Title */}
              <span className="hidden lg:block text-sm font-bold text-neutral-700 truncate max-w-[150px]">
                {preview.title}
              </span>

              {/* Remove */}
              <button
                onClick={() => removeCard(idx)}
                className="rounded-full p-2 text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Add button */}
      {cards.length < 6 && (
        <button
          onClick={addCard}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-200 py-4 text-sm font-bold text-neutral-400 transition-colors hover:border-neutral-400 hover:text-neutral-600"
        >
          <Plus className="h-4 w-4" /> Add Card (Slot {cards.length + 1})
        </button>
      )}

      {cards.length === 0 && (
        <p className="mt-4 text-center text-sm text-neutral-400">
          No featured cards configured. The homepage will fall back to showing the first 2 domestic + 2 international trips.
        </p>
      )}
    </div>
  );
}
