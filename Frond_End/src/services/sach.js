import axios from "axios";

export const getAllSach = async ({
  search = "",
  namXuatBan = "",
  country = "",
  category = "",
  sort = "",
}) => {
  try {
    const { data } = await axios.get(
      `/api/sach/?search=${search}&namXuatBan=${namXuatBan}&country=${country}&category=${category}&sort=${sort}`
    );
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
export const getDetailSach = async (idSach) => {
  try {
    const { data } = await axios.get(`/api/sach/${idSach}`);

    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const createSach = async () => {
  try {
    const { data } = await axios.post(`/api/sach/`);
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const updateSach = async ({ idSach, formData }) => {
  try {
    const { data } = await axios.put(`/api/sach/${idSach}`, formData);
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const deleteSach = async ({ idSach }) => {
  try {
    const { data } = await axios.delete(`/api/sach/${idSach}`);
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
