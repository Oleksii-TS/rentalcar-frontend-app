"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchCars } from "@/lib/api/carsApi";
import type { Car, CarFilters } from "@/types/car";

interface CarsState {
  cars: Car[];
  page: number;
  limit: number;
  totalCars: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;

  filters: CarFilters;

  favorites: string[];

  setFilters: (filters: CarFilters) => Promise<void>;
  loadMore: () => Promise<void>;
  resetCars: () => void;

  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useCarsStore = create<CarsState>()(
  persist(
    (set, get) => ({
      cars: [],
      page: 1,
      limit: 12,
      totalCars: 0,
      totalPages: 1,
      isLoading: false,
      error: null,

      filters: {},

      favorites: [],

      resetCars: () =>
        set({
          cars: [],
          page: 1,
          totalCars: 0,
          totalPages: 1,
          error: null,
          filters: {},
        }),

      setFilters: async (filters: CarFilters) => {
        set({ filters });

        set({
          cars: [],
          page: 1,
          totalCars: 0,
          totalPages: 1,
          error: null,
        });

        try {
          set({ isLoading: true });
          const { limit } = get();
          const data = await fetchCars({ ...filters, page: 1, limit });

          set({
            cars: data.cars,
            totalCars: data.totalCars,
            totalPages: data.totalPages,
            page: 1,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error?.message ?? "Failed to load cars",
            isLoading: false,
          });
        }
      },

      loadMore: async () => {
        const { page, limit, filters, cars, totalPages, isLoading } = get();
        if (isLoading) return;
        if (page >= totalPages) return;

        try {
          set({ isLoading: true });
          const nextPage = page + 1;
          const data = await fetchCars({ ...filters, page: nextPage, limit });

          set({
            cars: [...cars, ...data.cars],
            page: nextPage,
            totalCars: data.totalCars,
            totalPages: data.totalPages,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error?.message ?? "Failed to load more cars",
            isLoading: false,
          });
        }
      },

      toggleFavorite: (id: string) => {
        const { favorites } = get();
        if (favorites.includes(id)) {
          set({ favorites: favorites.filter((f) => f !== id) });
        } else {
          set({ favorites: [...favorites, id] });
        }
      },

      isFavorite: (id: string) => {
        return get().favorites.includes(id);
      },
    }),
    {
      name: "rental-car-store",
      partialize: (state) => ({
        favorites: state.favorites,
      }),
    }
  )
);
