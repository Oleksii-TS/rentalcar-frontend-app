"use client";

import Link from "next/link";
import styles from "./CarCard.module.css";
import type { Car } from "@/types/car";
import { formatMileage } from "@/lib/utils/formatMileage";
import { useCarsStore } from "@/lib/store/carsStore";
import Icon from "@/components/Icon/Icon";

interface Props {
  car: Car;
}

const parseAddress = (address: string) => {
  const parts = address.split(",").map((p) => p.trim());
  return {
    city: parts[1] || "",
    country: parts[2] || "",
  };
};

export default function CarCard({ car }: Props) {
  const { toggleFavorite, isFavorite } = useCarsStore();
  const favorite = isFavorite(car.id);

  const { city, country } = parseAddress(car.address);

  return (
    <li className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          className={styles.image}
        />

        <button
          type="button"
          onClick={() => toggleFavorite(car.id)}
          className={`${styles.favoriteBtn} ${favorite ? styles.active : ""}`}
        >
          <Icon
            name={favorite ? "icon-heart-full" : "icon-heart"}
            size={16}
            className={styles.favoriteIcon}
          />
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.topRow}>
          <h2 className={styles.title}>
            <span className={styles.brand}>{car.brand}</span>
            <span className={styles.model}>{car.model}</span>
            <span className={styles.year}>{car.year}</span>
          </h2>

          <span className={styles.price}>${car.rentalPrice}</span>
        </div>

        {/* ЛОКАЦІЯ */}
        <div className={styles.location}>
          <p className={styles.meta}>
            {city} | {country} | {car.rentalCompany}
          </p>

          {/* ТИП + МИЛІ */}
          <p className={styles.meta}>
            {car.type} | {formatMileage(car.mileage)} km
          </p>
        </div>

        <Link href={`/catalog/${car.id}`} className={styles.readMore}>
          Read more
        </Link>
      </div>
    </li>
  );
}
