const baseUrl = import.meta.env.VITE_API_URL;

export interface Habit {
  _id?: string;
  name: string;
  description: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

// ✅ CREATE HABIT
export async function createHabit(data: Habit): Promise<Habit> {
  try {
    const response = await fetch(`${baseUrl}/api/habit`, {
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

    const result: Habit = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

// ✅ GET ALL HABITS
export async function getAllHabit(): Promise<Habit[]> {
  try {
    const response = await fetch(`${baseUrl}/api/habit`, {
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

    const result: Habit[] = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}
export async function updateHabit(
  data: Partial<Habit>,
  id: string
): Promise<Habit> {
  try {
    const response = await fetch(`${baseUrl}/api/habit/${id}`, {
      method: "PUT",
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

    const result: Habit = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

export async function deleteHabit(id: string): Promise<Habit> {
  try {
    const response = await fetch(`${baseUrl}/api/habit/${id}`, {
      method: "DELETE",
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

    const result: Habit = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}
