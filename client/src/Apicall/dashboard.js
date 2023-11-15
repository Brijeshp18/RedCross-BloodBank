import { axiosInstances } from ".";

export const GetAllBloodBroupsInInventory = () => {
  return axiosInstances("get", "/api/dashboard/blood-groups-data");
}; 