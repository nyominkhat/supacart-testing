import axios from "axios";

export default async function uploadImage(image: Blob) {
  const formData = new FormData();
  formData.append("image", image);
  console.log(formData);
  try {
    await axios.post("http://127.0.0.1:8000/api/upload", formData);
    console.log("Image uploaded successfully!");
  } catch (error: any) {
    console.log(error.response.data);
  }
}
