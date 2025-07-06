const baseUrl = import.meta.env.VITE_API_URL;
export interface UploadResponse {
  id: string;
  url: string;
  name: string;
}

export const uploadImage = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${baseUrl}/api/media`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Tải ảnh thất bại");
  }

  const data = await response.json();

  if (!data.url || !data.id || !data.name) {
    throw new Error("Thiếu thông tin trả về từ server");
  }

  return {
    id: data.id,
    url: data.url,
    name: data.name,
  };
};

export const deleteImage = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${baseUrl}/api/media/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Không thể xóa ảnh");
    }
  } catch (error) {
    console.error("Xóa ảnh thất bại:", error);
    throw error;
  }
};