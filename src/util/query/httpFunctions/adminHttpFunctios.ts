import { Admin } from "../../../interfaces/Admin.interface";
import axiosInstance from "../axiosInstance";

async function getAdmins() {
  const { data } = await axiosInstance.get("admin");
  const users: Array<Admin> = data.data;
  return users;
}
async function editAdmin(newAdminData: Admin) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, name, email } = newAdminData;
  const { data } = await axiosInstance.patch(`admin/${_id}`, {
    name,
    email,
  });
  return data.data;
}

async function addAdmin(newAdminData: Admin) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const { data } = await axiosInstance.post(`admin`, newAdminData);
  return data.data;
}

async function deleteAdmin(id: string) {
  const { data } = await axiosInstance.delete(`admin/${id}`);
  return data.data;
}

async function getAdmin(id: string) {
  const { data } = await axiosInstance.get(`admin/${id}`);
  return data.data;
}
export { getAdmins, editAdmin, addAdmin, deleteAdmin, getAdmin };
