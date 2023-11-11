import { Event } from "../../../interfaces/Event.interface";
import axiosInstance from "../axiosInstance";

//events functions
async function getAllEvents() {
  const { data } = await axiosInstance.get("event/all");
  return data.data;
}
async function editEvent(newEventData: Event) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, category, dateTime, title, description, ticketCount } =
    newEventData;
  const { data } = await axiosInstance.post(`event/edit_with_admin/${_id}`, {
    category,
    dateTime,
    title,
    description,
    ticketCount,
  });
  return data.data;
}
async function deleteEvent(id: string) {
  const { data } = await axiosInstance.delete(`event/delete_with_admin/${id}`);
  return data.data;
}

export { getAllEvents, editEvent, deleteEvent };
