"use client";

import { useCarsStore } from "@/lib/store/carsStore";
import styles from "./CarList.module.css";
import CarCard from "./CarCard";

export default function CarList() {
  const { cars, isLoading } = useCarsStore();

  if (isLoading && cars.length === 0) {
    return <p>Loading cars...</p>;
  }

  if (!isLoading && cars.length === 0) {
    return <p>No cars found</p>;
  }

  return (
    <ul className={styles.grid}>
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </ul>
  );
}
