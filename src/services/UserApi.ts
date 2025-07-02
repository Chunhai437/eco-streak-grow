const baseUrl = import.meta.env.VITE_API_URL;

export interface User {
  _id?: string;
  username?: string;
  fullname?: string;
  email?: string;
  password?: string;
  role?: string;
  address?: string;
  phoneNumber?: string;
  isVerified?: boolean;
  verificationToken?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ✅ GET ALL USERS
export async function getAllUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${baseUrl}/api/user/all`, {
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
    return data.data;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

// ✅ GET USER BY ID
export async function getUserByID(id: string): Promise<User> {
  try {
    const response = await fetch(`${baseUrl}/api/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Không lấy được người dùng");
    }

    const data = await response.json();
    return data.data; // phụ thuộc cấu trúc API
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

// ✅ UPDATE USER FOR USER
export async function updateUser(
  data: Partial<User>,
  id: string
): Promise<User> {
  try {
    const response = await fetch(`${baseUrl}/api/user/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Cập nhật thất bại");
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

// ✅ DELETE USER
export async function deleteUser(id: string): Promise<{ message: string }> {
  try {
    const response = await fetch(`${baseUrl}/api/user/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Xóa người dùng thất bại");
    }

    const data = await response.json();
    return data; // có thể chứa thông báo `message`
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}
