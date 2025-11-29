import HomeHero from "@/components/HomeHero/HomeHero";

export async function generateMetadata() {
  return {
    title: "RentalCar — Rent a Car Easily",
    description:
      "Rent a car quickly and easily. Large selection of vehicles, convenient filters, and transparent prices.",
    openGraph: {
      title: "RentalCar — Rent a Car Easily",
      description:
        "Fast and convenient car rentals. Choose from dozens of available models.",
      url: "https://rentalcar-frontend-app.vercel.app",
      siteName: "RentalCar",
      type: "website",
      images: [
        {
          url: "/public/images/Picture.png",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default function HomePage() {
  return <HomeHero />;
}
