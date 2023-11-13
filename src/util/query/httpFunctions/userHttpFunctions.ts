import { User } from "../../../interfaces/User.interface";
import axiosInstance from "../axiosInstance";

//Get user && banned users
async function getAllUsers() {
  const { data } = await axiosInstance.get("user/all");
  const users: Array<User> = data.data;
  return users;
}

async function editUser(newuserData: User) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, name, phoneNumber, isBan, isVIP } = newuserData;
  const { data } = await axiosInstance.patch(`user/${_id}`, {
    name,
    phoneNumber,
    isBan,
    isVIP,
  });
  return data.data;
}
async function addUser(newuserData: User) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  console.log("adding user", newuserData);

  const { data } = await axiosInstance.post(`user/add_user`, newuserData);
  return data.data;
}
async function deleteUser(id: string) {
  const { data } = await axiosInstance.delete(`user/${id}`);
  return data.data;
}
async function getUser(id: string) {
  const { data } = await axiosInstance.get(`user/${id}`);
  return data.data;
}

export { getAllUsers, editUser, addUser, deleteUser, getUser };
