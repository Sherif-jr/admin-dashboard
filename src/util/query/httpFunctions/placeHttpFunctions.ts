import { Place } from "../../../interfaces/Place.interface";
import axiosInstance from "../axiosInstance";

//events functions
async function getAllPlaces() {
  const { data } = await axiosInstance.get("place/all");
  return data.data;
}
async function editPlace(newEventData: Place) {
  const { _id, address, description, category } = newEventData;
  const { data } = await axiosInstance.patch(`place/with_admin/${_id}`, {
    address,
    description,
    category,
  });
  return data.data;
}
async function deletePlace(id: string) {
  const { data } = await axiosInstance.delete(`place/with_admin/${id}`);
  return data.data;
}

export { getAllPlaces, editPlace, deletePlace };
