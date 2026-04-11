import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trash2 } from "lucide-react";
import { getTrips } from "@/data/tripsData";
import { getBlogs } from "@/data/blogsData";
import TripAdminActions from "@/components/admin/TripAdminActions";
import BlogAdminActions from "@/components/admin/BlogAdminActions";

export default async function AdminDashboard() {
  const trips = await getTrips();
  const blogs = await getBlogs();

  return (
    <div className="flex flex-col gap-12">
      {/* Trips Section */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-neutral-900">Manage Trips</h2>
            <p className="text-neutral-500">Add, edit, or remove your travel itineraries.</p>
          </div>
          <Link
            href="/admin/trips/new"
            className="flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-transform hover:scale-105"
          >
            <Plus className="h-4 w-4" /> Add Trip
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <div key={trip.id} className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="relative h-40 w-full bg-neutral-200">
                {trip.thumbnail ? (
                  <Image src={trip.thumbnail} alt={trip.title} fill className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs font-bold text-neutral-400">NO IMAGE</div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="line-clamp-1 font-bold">{trip.title}</h3>
                <p className="mb-4 text-xs font-medium text-neutral-500">{trip.duration} • {trip.price}</p>
                <TripAdminActions trip={trip} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blogs Section */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-neutral-900">Manage Blogs</h2>
            <p className="text-neutral-500">Publish new stories and guides.</p>
          </div>
          <Link
            href="/admin/blogs/new"
            className="flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-transform hover:scale-105"
          >
            <Plus className="h-4 w-4" /> Add Blog
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div key={blog.id} className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="relative h-40 w-full bg-neutral-200">
                {blog.thumbnail ? (
                  <Image src={blog.thumbnail} alt={blog.title} fill className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs font-bold text-neutral-400">NO IMAGE</div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="line-clamp-1 font-bold">{blog.title}</h3>
                <p className="mb-4 text-xs font-medium text-neutral-500">{blog.author} • {blog.date}</p>
                <BlogAdminActions blog={blog} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
