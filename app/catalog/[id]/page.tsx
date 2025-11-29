import CarDetails from "@/components/CarDetails/CarDetails";
import { fetchCarById } from "@/lib/api/carsApi";

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const car = await fetchCarById(id);

  if (!car) {
    return {
      title: "Car Not Found | RentalCar",
      description: "The requested car does not exist.",
    };
  }

  const title = `${car.brand} ${car.model} — Rent a Car`;
  const description = `Rent a ${car.brand} ${car.model}. Year: ${car.year}. Mileage: ${car.mileage} km. Price: $${car.rentalPrice}/day.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://rentalcar-frontend-app.vercel.app/catalog/${id}`,
      siteName: "RentalCar",
      type: "article",
      images: [
        {
          url: car.img,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function CarDetailsPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const car = await fetchCarById(id);

  return <CarDetails car={car} />;
}
