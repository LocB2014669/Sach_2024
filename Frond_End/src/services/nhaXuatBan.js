import axios from "axios";

export const createNXB = async ({ tenNXB, diaChi }) => {
  try {
    const { data } = await axios.post(`/api/nhaXuatBan/`, { tenNXB, diaChi });
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
export const getAllNXB = async () => {
  try {
    const { data } = await axios.get(`/api/nhaXuatBan/`);
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
export const getNXB = async ({ idNXB }) => {
  try {
    const { data } = await axios.get(`/api/nhaXuatBan/${idNXB}`);
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
export const updateNXB = async ({ idNXB, tenNXB, diaChi }) => {
  try {
    const { data } = await axios.put(`/api/nhaXuatBan/${idNXB}`, {
      tenNXB,
      diaChi,
    });
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
export const deleteNXB = async ({ idNXB }) => {
  try {
    const { data } = await axios.delete(`/api/nhaXuatBan/${idNXB}`);
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
