"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Blog } from "@/data/blogsData";

import BlogHero from "@/components/blog/BlogHero";

interface BlogBuilderProps {
  initialData?: Blog;
}

export default function BlogBuilder({ initialData }: BlogBuilderProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [blog, setBlog] = useState<Blog>(initialData || {
    id: "",
    slug: "",
    title: "New Blog Post",
    date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    thumbnail: "https://picsum.photos/seed/blogthumb/600/400",
    heroImage: "https://picsum.photos/seed/bloghero/1920/1080",
    author: "Author Name",
    category: "Travel Guide",
    content: ["Start writing your amazing story here..."]
  });

  const handleChange = (field: keyof Blog, value: any) => {
    setBlog((prev) => ({ ...prev, [field]: value }));
  };

  const handleContentChange = (index: number, value: string) => {
    const newContent = [...blog.content];
    newContent[index] = value;
    setBlog((prev) => ({ ...prev, content: newContent }));
  };

  const addParagraph = () => {
    setBlog((prev) => ({ ...prev, content: [...prev.content, ""] }));
  };

  const removeParagraph = (index: number) => {
    const newContent = blog.content.filter((_, i) => i !== index);
    setBlog((prev) => ({ ...prev, content: newContent }));
  };

  const handleSave = async () => {
    if (!blog.slug || !blog.title) {
      setError("Slug and Title are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blog)
      });

      const data = await res.json();
      if (data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.message || "Failed to save blog");
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
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 rounded-full bg-black px-6 py-2 text-sm font-bold uppercase text-white transition hover:bg-neutral-800 disabled:opacity-50"
          >
            <Save className="h-4 w-4" /> {loading ? "Saving..." : "Save Blog"}
          </button>
        </div>

        {error && <div className="mb-4 rounded bg-red-100 p-3 text-sm font-bold text-red-600">{error}</div>}

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1 text-sm font-bold">
              Title
              <input type="text" value={blog.title} onChange={(e) => handleChange("title", e.target.value)} className="rounded border border-neutral-300 p-2 font-normal" />
            </label>
            <label className="flex flex-col gap-1 text-sm font-bold">
              URL Slug
              <input type="text" value={blog.slug} onChange={(e) => handleChange("slug", e.target.value)} className="rounded border border-neutral-300 p-2 font-normal" />
            </label>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <label className="flex flex-col gap-1 text-sm font-bold">
              Author
              <input type="text" value={blog.author} onChange={(e) => handleChange("author", e.target.value)} className="rounded border border-neutral-300 p-2 font-normal" />
            </label>
            <label className="flex flex-col gap-1 text-sm font-bold">
              Date
              <input type="text" value={blog.date} onChange={(e) => handleChange("date", e.target.value)} className="rounded border border-neutral-300 p-2 font-normal" />
            </label>
            <label className="flex flex-col gap-1 text-sm font-bold">
              Category
              <input type="text" value={blog.category} onChange={(e) => handleChange("category", e.target.value)} className="rounded border border-neutral-300 p-2 font-normal" />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1 text-sm font-bold">
              Hero Image URL
              <input type="text" value={blog.heroImage} onChange={(e) => handleChange("heroImage", e.target.value)} className="rounded border border-neutral-300 p-2 font-normal" />
            </label>
            <label className="flex flex-col gap-1 text-sm font-bold">
              Thumbnail Image URL
              <input type="text" value={blog.thumbnail} onChange={(e) => handleChange("thumbnail", e.target.value)} className="rounded border border-neutral-300 p-2 font-normal" />
            </label>
          </div>

          {/* PARAGRAPH BUILDER */}
          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-black uppercase">Content Paragraphs</h3>
              <button type="button" onClick={addParagraph} className="flex items-center gap-1 rounded bg-neutral-100 px-3 py-1.5 text-xs font-bold hover:bg-neutral-200">
                <Plus className="h-3 w-3" /> Add Paragraph
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {blog.content.map((para, index) => (
                <div key={index} className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 relative">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-neutral-500">Paragraph {index + 1}</span>
                    <button type="button" onClick={() => removeParagraph(index)} className="rounded-full p-1 text-red-500 hover:bg-red-100 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <textarea
                    placeholder="Write your paragraph..."
                    value={para}
                    onChange={(e) => handleContentChange(index, e.target.value)}
                    className="h-32 w-full resize-none rounded border border-neutral-300 p-3 text-sm"
                  />
                </div>
              ))}
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
            <div className="min-h-screen bg-white">
              <BlogHero 
                title={blog.title} 
                category={blog.category} 
                date={blog.date} 
                author={blog.author} 
                heroImage={blog.heroImage} 
              />
              
              <main className="mx-auto px-6 py-12">
                <article className="prose prose-neutral w-full max-w-none">
                  {blog.content.map((paragraph, index) => (
                    <p key={index} className="mb-6 leading-relaxed text-neutral-700">
                      {paragraph || "..."}
                    </p>
                  ))}
                </article>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
