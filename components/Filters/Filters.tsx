"use client";

import { FormEvent, useEffect, useState } from "react";
import styles from "./Filters.module.css";
import { useCarsStore } from "@/lib/store/carsStore";
import { fetchBrands, fetchCars } from "@/lib/api/carsApi";
import CustomSelect from "./CustomSelect";

export default function Filters() {
  const { setFilters, isLoading } = useCarsStore();

  const [brands, setBrands] = useState<string[]>([]);
  const [prices, setPrices] = useState<number[]>([]);

  const [brand, setBrand] = useState("");
  const [rentalPrice, setRentalPrice] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const brandsData = await fetchBrands();
        setBrands(brandsData);

        const carsResponse = await fetchCars({ page: 1, limit: 200 });
        const cars = carsResponse?.cars || carsResponse || [];

        const uniquePrices = Array.from(
          new Set(
            cars
              .map((car: any) => Number(car.rentalPrice))
              .filter((n) => !isNaN(n))
          )
        ).sort((a, b) => a - b);

        setPrices(uniquePrices);
      } catch (err) {
        console.log("Error loading filters:", err);
      }
    };

    load();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await setFilters({
      brand: brand || undefined,
      rentalPrice: rentalPrice ? Number(rentalPrice) : undefined,
      minMileage: minMileage ? Number(minMileage) : undefined,
      maxMileage: maxMileage ? Number(maxMileage) : undefined,
    });
  };

  const formatNumber = (value: number | string) => {
    if (!value) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const extractNumber = (value: string) => {
    return value.replace(/\D/g, "");
  };

  return (
    <form className={styles.filters} onSubmit={handleSubmit}>
      <CustomSelect
        label="Car brand"
        placeholder="Choose a brand"
        value={brand}
        options={brands.map((b) => ({
          value: b,
          listLabel: b,
          displayLabel: b,
        }))}
        onChange={(v) => setBrand(v ? String(v) : "")}
      />

      <CustomSelect
        label="Price / 1 hour"
        placeholder="Choose a price"
        value={rentalPrice}
        options={prices.map((p) => ({
          value: p,
          listLabel: p,
          displayLabel: `To $${p}`,
        }))}
        onChange={(v) => setRentalPrice(v ? String(v) : "")}
      />

      <div className={styles.field}>
        <label>Car mileage / km</label>

        <div className={styles.mileageGroup}>
          <div className={styles.fieldLeft}>
            <input
              id="mileage-from"
              name="mileage-from"
              type="text"
              inputMode="numeric"
              placeholder="From"
              value={minMileage ? `From ${formatNumber(minMileage)}` : ""}
              onChange={(e) => {
                const onlyNums = extractNumber(e.target.value);
                setMinMileage(onlyNums);
              }}
            />
          </div>

          <div className={styles.fieldRight}>
            <input
              id="mileage-to"
              name="mileage-to"
              type="text"
              inputMode="numeric"
              placeholder="To"
              value={maxMileage ? `To ${formatNumber(maxMileage)}` : ""}
              onChange={(e) => {
                const onlyNums = extractNumber(e.target.value);
                setMaxMileage(onlyNums);
              }}
            />
          </div>
        </div>
      </div>

      <button className={styles.submitBtn} disabled={isLoading}>
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
