"use client";

import { useRouter } from "next/navigation";
import styles from "./HomeHero.module.css";

export default function HomeHero() {
  const router = useRouter();

  const handleViewCatalog = () => {
    router.push("/catalog");
  };

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Find your perfect rental car</h1>
        <p className={styles.subtitle}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <button className={styles.button} onClick={handleViewCatalog}>
          View Catalog
        </button>
      </div>
    </section>
  );
}
