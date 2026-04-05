"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus, Trash2, X, ChevronUp, ChevronDown, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Trip, ItineraryDay, ItineraryActivity } from "@/data/tripsData";
import MediaUploader from "@/components/admin/MediaUploader";

import TripHero from "@/components/trip/TripHero";
import QuickStats from "@/components/trip/QuickStats";
import ItinerarySection from "@/components/trip/ItinerarySection";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Heading, Text } from "@/components/ui/Typography";

interface TripBuilderProps {
  initialData?: Trip;
}

export default function TripBuilder({ initialData }: TripBuilderProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [trip, setTrip] = useState<Trip>(initialData || {
    id: "",
    slug: "",
    title: "NEW ADVENTURE",
    badge: null,
    duration: "7 days",
    price: "15,000/- onwards",
    thumbnail: "",
    heroImage: "",
    videoUrl: "",
    natureOfTrip: "Road Trip",
    lodgingType: "Camps",
    subtitle: "the journey begins",
    itinerary: [
      { day: 1, title: "ARRIVAL", description: "Welcome to the starting point." }
    ],
    tags: [],
    routeWaypoints: [],
    category: "domestic",
    gallery: []
  });

  const [tagInput, setTagInput] = useState("");
  const [waypointInput, setWaypointInput] = useState("");

  const handleChange = (field: keyof Trip, value: any) => {
    setTrip((prev) => ({ ...prev, [field]: value }));
  };

  const handleItineraryChange = (index: number, field: keyof ItineraryDay, value: any) => {
    const newItinerary = [...trip.itinerary];
    newItinerary[index] = { ...newItinerary[index], [field]: value };
    setTrip((prev) => ({ ...prev, itinerary: newItinerary }));
  };

  const addDay = () => {
    const nextDayNum = trip.itinerary.length + 1;
    setTrip((prev) => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        { day: nextDayNum, title: "", description: "" }
      ]
    }));
  };

  const removeDay = (index: number) => {
    const newItinerary = trip.itinerary.filter((_, i) => i !== index);
    const renumbered = newItinerary.map((dayObj, idx) => ({ ...dayObj, day: idx + 1 }));
    setTrip((prev) => ({ ...prev, itinerary: renumbered }));
  };

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!trip.tags?.includes(tagInput.trim())) {
        handleChange("tags", [...(trip.tags || []), tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    handleChange("tags", (trip.tags || []).filter(t => t !== tagToRemove));
  };

  // Route waypoint helpers
  const addWaypoint = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && waypointInput.trim()) {
      e.preventDefault();
      handleChange("routeWaypoints", [...(trip.routeWaypoints || []), waypointInput.trim()]);
      setWaypointInput("");
    }
  };

  const removeWaypoint = (index: number) => {
    const updated = [...(trip.routeWaypoints || [])];
    updated.splice(index, 1);
    handleChange("routeWaypoints", updated);
  };

  const moveWaypoint = (index: number, direction: "up" | "down") => {
    const updated = [...(trip.routeWaypoints || [])];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= updated.length) return;
    [updated[index], updated[targetIndex]] = [updated[targetIndex], updated[index]];
    handleChange("routeWaypoints", updated);
  };

  const autoPopulateWaypoints = () => {
    // Extract destination names from itinerary titles
    const extracted = trip.itinerary.flatMap(day => {
      // Split on " - ", " TO ", " & " to get individual place names
      return day.title
        .split(/\s*[-–&]\s*|\s+TO\s+/i)
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.match(/^(DAY|ARRIVAL|DEPARTURE|LOCAL|SIGHTSEEING)$/i));
    });
    // Deduplicate preserving order
    const unique = [...new Set(extracted)];
    handleChange("routeWaypoints", unique);
  };

  const handleSave = async () => {
    if (!trip.slug || !trip.title) {
      setError("Slug and Title are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trip)
      });

      const data = await res.json();
      if (data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.message || "Failed to save trip");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden">
      {/* LEFT: THE FORM BUILDER */}
      <div className="w-1/2 flex-shrink-0 overflow-y-auto border-r border-neutral-200 bg-white p-6 custom-scrollbar">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2 text-sm font-bold text-neutral-500 hover:text-black">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <Button
            onClick={handleSave}
            disabled={loading}
            size="sm"
          >
            <Save className="h-4 w-4 mr-2" /> {loading ? "Saving..." : "Save Trip"}
          </Button>
        </div>

        {error && <div className="mb-4 rounded bg-red-100 p-3 text-sm font-bold text-red-600">{error}</div>}

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1 text-sm font-bold">
              Title
              <input type="text" value={trip.title} onChange={(e) => handleChange("title", e.target.value)} className="rounded border border-neutral-300 p-2 font-normal" placeholder="Ex: SPITI VALLEY" />
            </label>
            <label className="flex flex-col gap-1 text-sm font-bold">
              URL Slug
              <input type="text" value={trip.slug} onChange={(e) => handleChange("slug", e.target.value)} className="rounded border border-neutral-300 p-2 font-normal" placeholder="ex: spiti-valley" />
            </label>
          </div>

          <label className="flex flex-col gap-1 text-sm font-bold">
            Subtitle
            <input type="text" value={trip.subtitle} onChange={(e) => handleChange("subtitle", e.target.value)} className="rounded border border-neutral-300 p-2 font-normal" placeholder="the middle land" />
          </label>

          <div className="grid grid-cols-2 gap-4">
            <MediaUploader 
              label="Hero Image" 
              value={trip.heroImage} 
              onChange={(url) => handleChange("heroImage", url)} 
              accept="image/*"
            />
            <MediaUploader 
              label="Thumbnail Image" 
              value={trip.thumbnail} 
              onChange={(url) => handleChange("thumbnail", url)} 
              accept="image/*"
            />
          </div>

          <MediaUploader 
            label="Hero Background Video (Optional)" 
            value={trip.videoUrl || ""} 
            onChange={(url) => handleChange("videoUrl", url)} 
            accept="video/*"
            maxSizeMB={100}
          />

          {/* GALLERY SECTION */}
          <div className="flex flex-col gap-4 rounded-2xl border border-neutral-100 bg-neutral-50/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-900">Trip Gallery</h3>
                <p className="text-xs text-neutral-400">Add multiple photos for the experience carousel</p>
              </div>
              <MediaUploader 
                label="" 
                value="" 
                onChange={(url) => handleChange("gallery", [...(trip.gallery || []), url])} 
                accept="image/*"
                className="!w-auto !aspect-square"
              />
            </div>
            
            {trip.gallery && trip.gallery.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {trip.gallery.map((url, idx) => (
                  <div key={idx} className="group relative aspect-square overflow-hidden rounded-lg border border-neutral-200 bg-white">
                    <Image src={url} alt="Gallery" fill className="object-cover" />
                    <button
                      onClick={() => {
                        const newGallery = [...(trip.gallery || [])];
                        newGallery.splice(idx, 1);
                        handleChange("gallery", newGallery);
                      }}
                      className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <label className="flex flex-col gap-1 text-sm font-bold">
              Duration
              <input type="text" value={trip.duration} onChange={(e) => handleChange("duration", e.target.value)} className="rounded border border-neutral-300 p-2 font-normal" />
            </label>
            <label className="flex flex-col gap-1 text-sm font-bold">
              Price
              <input type="text" value={trip.price} onChange={(e) => handleChange("price", e.target.value)} className="rounded border border-neutral-300 p-2 font-normal" />
            </label>
            <label className="flex flex-col gap-1 text-sm font-bold">
              Badge
              <select value={trip.badge || ""} onChange={(e) => handleChange("badge", e.target.value === "" ? null : e.target.value)} className="rounded border border-neutral-300 p-2 font-normal">
                <option value="">None</option>
                <option value="SPECIAL OFFERS">SPECIAL OFFERS</option>
                <option value="BEST SELLER">BEST SELLER</option>
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm font-bold">
              Trip Category
              <select value={trip.category || ""} onChange={(e) => handleChange("category", e.target.value === "" ? null : e.target.value)} className="rounded border border-neutral-300 p-2 font-normal">
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
              </select>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1 text-sm font-bold">
              Nature of Trip
              <input type="text" value={trip.natureOfTrip} onChange={(e) => handleChange("natureOfTrip", e.target.value)} className="rounded border border-neutral-300 p-2 font-normal" />
            </label>
            <label className="flex flex-col gap-1 text-sm font-bold">
              Lodging Type
              <input type="text" value={trip.lodgingType} onChange={(e) => handleChange("lodgingType", e.target.value)} className="rounded border border-neutral-300 p-2 font-normal" />
            </label>
          </div>

          <label className="flex flex-col gap-1 text-sm font-bold">
            Custom Tags
            <input 
              type="text" 
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={addTag}
              className="rounded border border-neutral-300 p-2 font-normal" 
              placeholder="Press Enter to add tag (e.g. Hiking, Family Friendly)" 
            />
            {trip.tags && trip.tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {trip.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="ml-1 text-neutral-500 hover:text-red-500">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </label>

          {/* ROUTE MAP WAYPOINTS */}
          <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50/50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                <h3 className="text-sm font-black uppercase text-blue-900">Route Map Waypoints</h3>
              </div>
              <button
                type="button"
                onClick={autoPopulateWaypoints}
                className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700 transition hover:bg-blue-200"
              >
                Auto-fill from Itinerary
              </button>
            </div>
            <p className="mb-3 text-xs text-blue-700/70">
              Add location names in route order. These appear as an animated path overlay on the trip hero image.
            </p>
            <input
              type="text"
              value={waypointInput}
              onChange={(e) => setWaypointInput(e.target.value)}
              onKeyDown={addWaypoint}
              className="mb-3 w-full rounded border border-blue-200 bg-white p-2 text-sm font-normal placeholder:text-blue-300"
              placeholder="Type a location and press Enter (e.g. Manali)"
            />
            {trip.routeWaypoints && trip.routeWaypoints.length > 0 && (
              <div className="flex flex-col gap-1.5">
                {trip.routeWaypoints.map((wp, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm shadow-sm border border-blue-100"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="flex-1 font-medium text-neutral-800">{wp}</span>
                    <div className="flex items-center gap-0.5">
                      <button
                        type="button"
                        onClick={() => moveWaypoint(i, "up")}
                        disabled={i === 0}
                        className="rounded p-0.5 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700 disabled:opacity-30"
                      >
                        <ChevronUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveWaypoint(i, "down")}
                        disabled={i === trip.routeWaypoints!.length - 1}
                        className="rounded p-0.5 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700 disabled:opacity-30"
                      >
                        <ChevronDown className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeWaypoint(i)}
                        className="ml-1 rounded p-0.5 text-red-400 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ITINERARY BUILDER */}
          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-black uppercase tracking-tight">Itinerary</h3>
              <Button type="button" variant="primary" size="sm" onClick={addDay}>
                <Plus className="h-4 w-4 mr-1" /> Add Day
              </Button>
            </div>

            <div className="flex flex-col gap-6">
              {trip.itinerary.map((dayObj, index) => {
                // Inline helpers for nested itinerary items
                const addActivity = () => {
                  const newActivities = [...(dayObj.activities || []), { time: "09:00 AM", title: "" }];
                  handleItineraryChange(index, "activities", newActivities);
                };
                const removeActivity = (aIndex: number) => {
                  const newActivities = dayObj.activities!.filter((_, i) => i !== aIndex);
                  handleItineraryChange(index, "activities", newActivities);
                };
                const updateActivity = (aIndex: number, field: keyof ItineraryActivity, val: string) => {
                  const newActivities = [...(dayObj.activities || [])];
                  newActivities[aIndex] = { ...newActivities[aIndex], [field]: val };
                  handleItineraryChange(index, "activities", newActivities);
                };

                const addBullet = () => {
                  handleItineraryChange(index, "bulletPoints", [...(dayObj.bulletPoints || []), ""]);
                };
                const removeBullet = (bIndex: number) => {
                   handleItineraryChange(index, "bulletPoints", dayObj.bulletPoints!.filter((_, i) => i !== bIndex));
                };
                const updateBullet = (bIndex: number, val: string) => {
                   const newBullets = [...(dayObj.bulletPoints || [])];
                   newBullets[bIndex] = val;
                   handleItineraryChange(index, "bulletPoints", newBullets);
                };

                return (
                  <div key={index} className="flex flex-col gap-4 rounded-3xl border border-neutral-100 bg-neutral-50/50 p-6 shadow-sm transition-all hover:bg-neutral-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-xs font-black text-white">
                          {dayObj.day}
                        </span>
                        <input
                          type="text"
                          placeholder="DAY TITLE (Ex: arrival & check-in)"
                          value={dayObj.title}
                          onChange={(e) => handleItineraryChange(index, "title", e.target.value)}
                          className="w-full bg-transparent text-lg font-black lowercase tracking-tight focus:outline-none"
                        />
                      </div>
                      <button type="button" onClick={() => removeDay(index)} className="rounded-full p-2 text-red-500 hover:bg-red-100">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="space-y-4">
                       <label className="flex flex-col gap-1 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                          Main Description
                          <textarea
                            placeholder="Overall description for the day..."
                            value={dayObj.description}
                            onChange={(e) => handleItineraryChange(index, "description", e.target.value)}
                            className="h-24 w-full resize-none rounded-xl border border-neutral-200 bg-white p-3 text-sm focus:border-neutral-900 focus:outline-none"
                          />
                       </label>

                       {/* Sub-Activities */}
                       <div className="space-y-2">
                          <div className="flex items-center justify-between">
                             <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Sub-Activities</h4>
                             <button type="button" onClick={addActivity} className="text-[10px] font-bold text-blue-600 hover:underline">+ ADD ACTIVITY</button>
                          </div>
                          <div className="grid gap-2">
                             {dayObj.activities?.map((activity, aIdx) => (
                                <div key={aIdx} className="flex items-center gap-2">
                                   <input 
                                      type="text" 
                                      value={activity.time} 
                                      onChange={(e) => updateActivity(aIdx, 'time', e.target.value)}
                                      className="w-24 rounded-lg border border-neutral-200 bg-white p-2 text-xs font-bold uppercase" 
                                      placeholder="Time" 
                                   />
                                   <input 
                                      type="text" 
                                      value={activity.title} 
                                      onChange={(e) => updateActivity(aIdx, 'title', e.target.value)}
                                      className="flex-1 rounded-lg border border-neutral-200 bg-white p-2 text-xs" 
                                      placeholder="What's happening?" 
                                   />
                                   <button type="button" onClick={() => removeActivity(aIdx)} className="text-red-400 hover:text-red-600">
                                      <X size={14} />
                                   </button>
                                </div>
                             ))}
                          </div>
                       </div>

                       {/* Bullet Points */}
                       <div className="space-y-2">
                          <div className="flex items-center justify-between">
                             <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Bullet Points</h4>
                             <button type="button" onClick={addBullet} className="text-[10px] font-bold text-blue-600 hover:underline">+ ADD BULLET</button>
                          </div>
                          <div className="grid gap-2">
                             {dayObj.bulletPoints?.map((bp, bIdx) => (
                                <div key={bIdx} className="flex items-center gap-2">
                                   <span className="text-neutral-300">•</span>
                                   <input 
                                      type="text" 
                                      value={bp} 
                                      onChange={(e) => updateBullet(bIdx, e.target.value)}
                                      className="flex-1 rounded-lg border border-neutral-200 bg-white p-2 text-xs" 
                                      placeholder="Important point..." 
                                   />
                                   <button type="button" onClick={() => removeBullet(bIdx)} className="text-red-400 hover:text-red-600">
                                      <X size={14} />
                                   </button>
                                </div>
                             ))}
                          </div>
                       </div>

                       {/* Notes */}
                       <label className="flex flex-col gap-1 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                          Special Notes for the day
                          <textarea
                            placeholder="Things to carry, warnings, or special tips..."
                            value={dayObj.notes || ""}
                            onChange={(e) => handleItineraryChange(index, "notes", e.target.value)}
                            className="h-16 w-full resize-none rounded-xl border border-neutral-200 bg-neutral-100 p-3 text-xs italic focus:border-neutral-900 focus:outline-none"
                          />
                       </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: LIVE PREVIEW */}
      <div className="w-1/2 flex-shrink-0 overflow-y-auto bg-neutral-100 custom-scrollbar shadow-inner">
        <div className="sticky top-0 z-10 flex w-full items-center justify-center bg-black/80 py-2 text-xs font-black uppercase tracking-widest text-white backdrop-blur">
          Live Phone Preview
        </div>
        
        <div className="mx-auto my-8 max-w-[400px] overflow-hidden rounded-[3rem] border-8 border-black bg-white shadow-2xl">
          <div className="h-[800px] overflow-y-auto custom-scrollbar">
            <TripHero 
              title={trip.title}
              subtitle={trip.subtitle}
              heroImage={trip.heroImage}
              videoUrl={trip.videoUrl}
              routeWaypoints={trip.routeWaypoints}
            />
            <main className="mx-auto px-4 py-8 relative z-20">
              <div className="mb-8">
                {trip.badge && (
                  <span className="mb-4 mr-2 inline-block rounded-full bg-neutral-900 px-4 py-1 text-xs font-bold text-white">
                    {trip.badge}
                  </span>
                )}
                {trip.tags?.map((tag) => (
                  <span key={tag} className="mb-4 mr-2 inline-block rounded-full border border-neutral-300 px-4 py-1 text-xs font-bold text-neutral-600">
                    {tag}
                  </span>
                ))}
                <h2 className="mt-2 text-3xl font-black lowercase tracking-tight">trip brief</h2>
              </div>
              <QuickStats trip={trip} />

              <div className="mt-12">
                <h2 className="mb-8 text-3xl font-black lowercase tracking-tight">itinerary</h2>
                <ItinerarySection itinerary={trip.itinerary} />
              </div>
            </main>
          </div>
        </div>

      </div>
    </div>
  );
}
