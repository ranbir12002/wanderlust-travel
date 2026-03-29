"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { Trip } from "@/data/tripsData";

export default function TripAdminActions({ trip }: { trip: Trip }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${trip.title}"?`)) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/trips?id=${trip.id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh(); // Refresh the list
      } else {
        alert("Failed to delete trip.");
      }
    } catch {
      alert("Error deleting trip.");
    } finally {
      setLoading(false);
    }
  };

  const handleDuplicate = async () => {
    setLoading(true);
    try {
      // Create a cloned trip object
      const clonedTrip = {
        ...trip,
        id: "", // Will be assigned on server
        slug: `${trip.slug}-copy`,
        title: `${trip.title} (Copy)`,
      };

      const res = await fetch("/api/admin/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clonedTrip)
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to duplicate trip.");
      }
    } catch {
      alert("Error duplicating trip.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-auto flex flex-wrap justify-end gap-2 pt-4">
      <button 
        onClick={handleDuplicate}
        disabled={loading}
        className="flex items-center gap-1 rounded bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600 transition-colors hover:bg-blue-100 disabled:opacity-50"
      >
        <Copy className="h-3 w-3" /> Duplicate
      </button>

      <Link 
        href={`/admin/trips/edit/${trip.slug}`} 
        className="flex items-center gap-1 rounded bg-neutral-100 px-3 py-1.5 text-xs font-bold text-neutral-700 transition-colors hover:bg-neutral-200"
      >
        <Edit className="h-3 w-3" /> Edit
      </Link>

      <button 
        onClick={handleDelete}
        disabled={loading}
        className="flex items-center gap-1 rounded bg-red-50 text-red-600 px-3 py-1.5 text-xs font-bold transition-colors hover:bg-red-100 disabled:opacity-50"
      >
        <Trash2 className="h-3 w-3" /> Delete
      </button>
    </div>
  );
}
