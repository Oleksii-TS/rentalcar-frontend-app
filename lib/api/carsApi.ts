import { api } from "./axiosClient";
import type { Car, CarFilters, CarsResponse } from "@/types/car";

export interface FetchCarsParams extends CarFilters {
  page?: number;
  limit?: number;
}

export const fetchCars = async (
  params: FetchCarsParams = {}
): Promise<CarsResponse> => {
  const {
    page = 1,
    limit = 12,
    brand,
    rentalPrice,
    minMileage,
    maxMileage,
  } = params;

  const response = await api.get<CarsResponse>("/cars", {
    params: {
      page: String(page),
      limit: String(limit),
      brand,
      rentalPrice,
      minMileage: minMileage !== undefined ? String(minMileage) : undefined,
      maxMileage: maxMileage !== undefined ? String(maxMileage) : undefined,
    },
  });

  return response.data;
};

export const fetchCarById = async (id: string): Promise<Car> => {
  const response = await api.get<Car>(`/cars/${id}`);
  return response.data;
};

export const fetchBrands = async (): Promise<string[]> => {
  const response = await api.get<string[]>("/brands");
  return response.data;
};
