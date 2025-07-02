const baseUrl = import.meta.env.VITE_API_URL;

export interface Community {
  _id?: string;
  name: string;
  description: string;
  createdAt: string;
}

// ✅ CREATE COMMUNITY
export async function createCommunity(data: Community): Promise<Community> {
  try {
    const response = await fetch(`${baseUrl}/api/communities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.result ||
          errorData.message ||
          errorData.error ||
          "Lỗi không xác định từ API"
      );
    }

    const result: Community = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

// ✅ GET ALL COMMUNITIES
export async function getAllCommunities(): Promise<Community[]> {
  try {
    const response = await fetch(`${baseUrl}/api/communities`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.result ||
          errorData.message ||
          errorData.error ||
          "Lỗi không xác định từ API"
      );
    }

   const data = await response.json();
    return data.communities;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}
