"use client";

import type { Car } from "@/types/car";
import styles from "./CarDetails.module.css";
import { formatMileage } from "@/lib/utils/formatMileage";
import BookingForm from "./BookingForm";
import Icon from "@/components/Icon/Icon";

interface Props {
  car: Car;
}

export default function CarDetails({ car }: Props) {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <img
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            className={styles.image}
          />

          <BookingForm car={car} />
        </div>

        <div className={styles.right}>
          <h1 className={styles.title}>
            {car.brand} {car.model}, {car.year},{" "}
            <span className={styles.carId}>Id: {car.id.slice(0, 4)}</span>
          </h1>

          <div className={styles.metaLine}>
            <span className={styles.metaItem}>
              <Icon name="icon-location" size={16} />
              {car.address.split(",").slice(-2).join(", ").trim()}
            </span>

            <span className={styles.metaItem}>
              Mileage: {formatMileage(car.mileage)} km
            </span>
          </div>

          <p className={styles.price}>${car.rentalPrice}</p>

          {car.description && (
            <p className={styles.description}>{car.description}</p>
          )}

          <div className={styles.carBlock}>
            <div className={styles.block}>
              <h3 className={styles.blockTitle}>Rental Conditions:</h3>

              <ul className={styles.list}>
                {car.rentalConditions.map((cond) => (
                  <li key={cond} className={styles.listItem}>
                    <Icon name="icon-check-circle" size={16} />
                    {cond}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.block}>
              <h3 className={styles.blockTitle}>Car Specifications:</h3>

              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <Icon name="icon-calendar" size={16} /> Year: {car.year}
                </li>
                <li className={styles.listItem}>
                  <Icon name="icon-car" size={16} /> Type: {car.type}
                </li>
                <li className={styles.listItem}>
                  <Icon name="icon-fuel" size={16} /> Fuel Consumption:{" "}
                  {car.fuelConsumption}
                </li>
                <li className={styles.listItem}>
                  <Icon name="icon-settings" size={16} /> Engine Size:{" "}
                  {car.engineSize}
                </li>
              </ul>
            </div>

            <div className={styles.block}>
              <h3 className={styles.blockTitle}>
                Accessories and functionalities:
              </h3>

              <ul className={styles.list}>
                {car.accessories.map((acc) => (
                  <li key={acc} className={styles.listItem}>
                    <Icon name="icon-check-circle" size={16} /> {acc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
