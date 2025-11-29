export const formatMileage = (mileage: number): string => {
  return mileage.toLocaleString("en-US").replace(/,/g, " ");
};
