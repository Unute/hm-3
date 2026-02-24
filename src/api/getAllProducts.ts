import qs from "qs";
import type { ProductsResponse } from "@/types/product";

import { api } from "@/api/axiosInstance";

export const getAllProducts = async (): Promise<ProductsResponse> => {
  const query = qs.stringify({
    populate: ["images", "productCategory"],
    pagination: { pageSize: 100 },
  });
  
  const response = await api.get<ProductsResponse>(`?${query}`);
  return response.data;
};
