import { getDestinationBySlug } from "@/data/destinationsData";
import DestinationBuilder from "@/components/admin/DestinationBuilder";
import { notFound } from "next/navigation";

export default async function EditDestinationPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const destination = await getDestinationBySlug(params.slug);
  
  if (!destination) {
    notFound();
  }

  return <DestinationBuilder initialData={destination} />;
}
