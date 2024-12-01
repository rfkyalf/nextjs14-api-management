import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.jikan.moe/v4',
});

export const getAllAnime = async (
  query?: string,
  currentPage?: number,
  orderBy?: string,
  type?: string,
  status?: string,
  sort?: string,
  limit?: number
) => {
  try {
    const res = await axiosInstance.get(
      `/anime?q=${query}&page=${currentPage}&order_by=${orderBy}&type=${type}&status=${status}&sort=${sort}&limit=${limit}`
    );

    const totalPages = res.data.pagination.last_visible_page;

    return {
      data: res.data.data,
      totalPages,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
