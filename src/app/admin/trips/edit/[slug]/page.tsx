import { getTripBySlug } from "@/data/tripsData";
import { notFound } from "next/navigation";
import TripBuilder from "@/components/admin/TripBuilder";

export default async function EditTripPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trip = await getTripBySlug(slug);

  if (!trip) {
    notFound();
  }

  return <TripBuilder initialData={trip} />;
}
