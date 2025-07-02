const baseUrl = import.meta.env.VITE_API_URL;
export interface Challenge {
  _id: string;
  userId: string;
  habitId: string;
  title: string;
  targetDays: number;
  startDate: string; // ISO format
  endDate: string; // ISO format
  streak: number;
  completedDays: string[]; // Mảng các ngày hoàn thành (ISO strings)
  rewardProgress: number; // Có thể là phần trăm (0–100) hoặc số ngày
  plantGrowthStage: number;
  rewardClaimed: boolean;
}

// ✅ CREATE CHALLENGE
export async function createChallenge(
  data: Partial<Challenge>
): Promise<Challenge> {
  try {
    const response = await fetch(`${baseUrl}/api/challenge`, {
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

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

export async function getUserChallenge(userId: string): Promise<Challenge[]> {
  try {
    const response = await fetch(`${baseUrl}/api/challenge/user/${userId}`, {
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

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}
export async function checkInChallenge(
  challengeId: string,
  userId: string
): Promise<Challenge> {
  try {
    const response = await fetch(
      `${baseUrl}/api/challenge/${challengeId}/checkin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          userId,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.result ||
          errorData.message ||
          errorData.error ||
          "Lỗi không xác định từ API"
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

export async function claimRewardOfChallenge(
  challengeId: string
): Promise<Challenge> {
  try {
    const response = await fetch(
      `${baseUrl}/api/challenge/${challengeId}/claim`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.result ||
          errorData.message ||
          errorData.error ||
          "Lỗi không xác định từ API"
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}
