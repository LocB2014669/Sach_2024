import axios from "axios";

export const createDocGia = async ({
  email = "",
  password = "",
  hoLot = "",
  ten = "",
  role = "docgia",
}) => {
  try {
    const { data } = await axios.post(`/api/users/register`, {
      email,
      password,
      hoLot,
      ten,
      role,
    });
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const { data } = await axios.post(`/api/users/login`, {
      email,
      password,
    });
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const userProfile = async ({ token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/users/profile`, config);
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
export const updateProfile = async ({
  token,
  email,
  hoTenNV,
  chucVu,
  diaChi,
  soDienThoai,
  hoLot,
  ten,
  ngaySinh,
  phai,
}) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `/api/users/updateProfile`,
      {
        email,
        hoTenNV,
        chucVu,
        diaChi,
        soDienThoai,
        hoLot,
        ten,
        ngaySinh,
        phai,
      },
      config
    );
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
export const getAllUser = async () => {
  try {
    const { data } = await axios.get(`/api/users/`);
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
export const deleteUser = async ({ idUser }) => {
  try {
    const { data } = await axios.delete(`/api/users/${idUser}`);
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
