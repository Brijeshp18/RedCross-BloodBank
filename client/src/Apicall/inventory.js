import { axiosInstances } from ".";
// Add addInventory
export const AddInventory = async (payload) => {
  const response = await axiosInstances("post", "/api/inventory/add", payload);
  return response;
};

// get inventory
export const GetInventory = async () => {
  const response = await axiosInstances("get", "/api/inventory/get");
  return response;
};

export const GetInventoryWithFilters = (filters,limit) => {
  const response = axiosInstances("post", "/api/inventory/filter", {
    filters,limit,
  });
  return response;
};


