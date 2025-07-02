import { Challenge } from "./Challenge";

const baseUrl = import.meta.env.VITE_API_URL;

export interface LogEntry {
  _id: string;
  userId: string;
  challengeId: Challenge;
  date: string; // ISO format string
  status: "done" | "missed" | string;
  __v: number;
}
export const getDailyLog = async (userId: string): Promise<LogEntry[]> => {
  try {
    const response = await fetch(`${baseUrl}/api/daily-log/history/${userId}`, {
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
          "Lỗi không xác định từ API"
      );
    }

    const result = await response.json();
    return result.logs;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};
