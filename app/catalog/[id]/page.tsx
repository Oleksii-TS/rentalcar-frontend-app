import CarDetails from "@/components/CarDetails/CarDetails";
import { fetchCarById } from "@/lib/api/carsApi";

interface Props {
  params: { id: string };
}

export default async function CarDetailsPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const car = await fetchCarById(id);

  return <CarDetails car={car} />;
}
