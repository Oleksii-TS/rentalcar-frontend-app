import CatalogPageClient from "@/components/Catalog/CatalogPageClient";

export async function generateMetadata() {
  return {
    title: "Car Catalog | RentalCar",
    description:
      "Browse the full catalog of rental cars. Easy search, useful filters, and up-to-date prices.",
    openGraph: {
      title: "Car Catalog | RentalCar",
      description:
        "Browse all rental cars. Filter by brand, price, mileage, and more.",
      url: "https://rentalcar-frontend-app.vercel.app/catalog",
      siteName: "RentalCar",
      type: "website",
      images: [
        {
          url: "/images/Picture.png",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default function CatalogPage() {
  return <CatalogPageClient />;
}
