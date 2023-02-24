import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:3669/", // url = base url + request url
  timeout: 5000, // request timeout
});

const get = (url: string, params?: any) => service.get(url, { params });
const post = (url: string, params?: any) => service.post(url, params);
const deletes = (url: string, id: string) => service.delete(`${url}/${id}`);
const put = (url: string, params: any) =>
  service.put(`${url}/${params.id}`, params);

export default {
  get,
  post,
  deletes,
  put,
  service,
};
