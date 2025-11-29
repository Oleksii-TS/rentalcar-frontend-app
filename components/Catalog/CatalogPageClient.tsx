"use client";

import { useEffect } from "react";
import styles from "./CatalogPageClient.module.css";
import Filters from "../Filters/Filters";
import CarList from "./CarList";
import { useCarsStore } from "@/lib/store/carsStore";

export default function CatalogPageClient() {
  const {
    setFilters,
    filters,
    loadMore,
    isLoading,
    cars,
    totalPages,
    page,
    error,
  } = useCarsStore();

  useEffect(() => {
    if (cars.length === 0 && !isLoading) {
      setFilters(filters);
    }
  }, []);

  const handleLoadMore = () => {
    loadMore();
  };

  const hasMore = page < totalPages;

  useEffect(() => {
    return () => {
      useCarsStore.getState().resetCars();
    };
  }, []);

  return (
    <section className={styles.catalog}>
      <Filters />

      {error && <p className={styles.error}>{error}</p>}

      <CarList />

      {hasMore && (
        <div className={styles.loadMoreWrapper}>
          <button
            className={styles.loadMoreButton}
            onClick={handleLoadMore}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </section>
  );
}
