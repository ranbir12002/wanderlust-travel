"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";
import { Destination } from "@/data/destinationsData";

export default function DestinationAdminActions({ destination }: { destination: Destination }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this destination?")) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/destinations?id=${destination.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to delete destination");
      }
    } catch (e) {
      alert("Error deleting destination");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-2 mt-auto pt-2 border-t border-neutral-100">
      <Link
        href={`/admin/destinations/edit/${destination.slug}`}
        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-neutral-100 py-2 text-xs font-bold text-neutral-700 transition-colors hover:bg-neutral-200"
      >
        <Edit className="h-3 w-3" /> Edit
      </Link>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="flex items-center justify-center rounded-lg bg-red-50 p-2 text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
