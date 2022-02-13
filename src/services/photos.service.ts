import Axios from "axios"
import { API_URL } from "../config/constants"

export const uploadPhoto = async (photo: File): Promise<string> => {
  try {
    const data = new FormData()
    data.append("file", photo)
    const res = await Axios.post(`${API_URL}/photos`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    return res.data.url
  } catch (e) {
    throw e
  }
}
