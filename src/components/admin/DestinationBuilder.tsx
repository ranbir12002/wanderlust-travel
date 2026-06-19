"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { Destination } from "@/data/destinationsData";
import MediaUploader from "@/components/admin/MediaUploader";
import Button from "@/components/ui/Button";

interface DestinationBuilderProps {
  initialData?: Destination;
}

export default function DestinationBuilder({ initialData }: DestinationBuilderProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [destination, setDestination] = useState<Destination>(initialData || {
    id: "",
    slug: "",
    title: "",
    category: "domestic",
    tag: "",
    heroImage: "",
    description: "",
  });

  const handleChange = (field: keyof Destination, value: any) => {
    setDestination((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!destination.slug || !destination.title || !destination.tag) {
      setError("Slug, Title, and Tag are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/destinations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(destination)
      });

      const data = await res.json();
      if (data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.message || "Failed to save destination");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden">
      <div className="w-full max-w-3xl mx-auto overflow-y-auto bg-white p-6 custom-scrollbar">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-black">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <Button
            onClick={handleSave}
            disabled={loading}
            size="sm"
          >
            <Save className="h-4 w-4 mr-2" /> {loading ? "Saving..." : "Save Destination"}
          </Button>
        </div>

        {error && <div className="mb-4 rounded bg-red-100 p-3 text-sm font-bold text-red-600">{error}</div>}

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1 text-sm font-bold">
              Title
              <input type="text" value={destination.title} onChange={(e) => handleChange("title", e.target.value)} className="rounded border border-neutral-300 p-2 font-normal" placeholder="Ex: Kerala" />
            </label>
            <label className="flex flex-col gap-1 text-sm font-bold">
              URL Slug
              <input type="text" value={destination.slug} onChange={(e) => handleChange("slug", e.target.value)} className="rounded border border-neutral-300 p-2 font-normal" placeholder="ex: kerala" />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1 text-sm font-bold">
              Category
              <select value={destination.category} onChange={(e) => handleChange("category", e.target.value)} className="rounded border border-neutral-300 p-2 font-normal">
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm font-bold">
              Target Tag
              <input type="text" value={destination.tag} onChange={(e) => handleChange("tag", e.target.value)} className="rounded border border-neutral-300 p-2 font-normal" placeholder="Exact tag to match trips, e.g. kerala" />
            </label>
          </div>

          <label className="flex flex-col gap-1 text-sm font-bold">
            Description
            <textarea 
              value={destination.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="h-24 resize-none rounded-lg border border-neutral-300 p-2 font-normal text-sm" 
              placeholder="Short description for the hero section..."
            />
          </label>

          <MediaUploader 
            label="Hero Image" 
            value={destination.heroImage} 
            onChange={(url) => handleChange("heroImage", url)} 
            accept="image/*"
          />
        </div>
      </div>
    </div>
  );
}
