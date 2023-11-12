import { Host } from "../../../interfaces/Host.interface";
import axiosInstance from "../axiosInstance";

//events functions
async function getAllHosts() {
  const { data } = await axiosInstance.get("host/all");
  return data.data;
}
async function editHost(newEventData: Host) {
  const { _id, name, description } = newEventData;
  const { data } = await axiosInstance.patch(`host/${_id}`, {
    name,
    description,
  });
  return data.data;
}
async function deleteHost(id: string) {
  const { data } = await axiosInstance.delete(`host/${id}`);
  return data.data;
}

export { getAllHosts, editHost, deleteHost };
