import axios from "axios";

export const createCategory = async ({ title }) => {
  try {
    const { data } = await axios.post(`/api/sachCategory/`, { title });
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getAllCategory = async () => {
  try {
    const { data } = await axios.get(`/api/sachCategory/`);
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getCategory = async ({ categoryId }) => {
  try {
    const { data } = await axios.get(`/api/sachCategory/${categoryId}`);
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
export const updateCategory = async ({ categoryId, title }) => {
  try {
    const { data } = await axios.put(`/api/sachCategory/${categoryId}`, {
      title,
    });
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
export const deleteCategory = async ({ categoryId }) => {
  try {
    const { data } = await axios.delete(`/api/sachCategory/${categoryId}`);
    return { data };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
