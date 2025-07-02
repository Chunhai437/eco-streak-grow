const baseUrl = import.meta.env.VITE_API_URL;

export interface Place {
  _id?: string;
  name: string;
  description: string;
  type: string;
  image: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  greenTags: string[];
  partnerVouchers: {
    _id?: string; // <- thay đổi ở đây
    name: string;
    description: string;
    pointsRequired: number;
  }[];
  reviews: {
    userId: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

// ✅ CREATE PlACE
export async function createPlace(data: Place): Promise<Place> {
  try {
    const response = await fetch(`${baseUrl}/api/greenplace`, {
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

    const result: Place = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

// ✅ GET ALL PLACES
export async function getAllPlaces(): Promise<Place[]> {
  try {
    const response = await fetch(`${baseUrl}/api/greenplace`, {
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

    const result: Place[] = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

// ✅ GET PLACE BY ID
export async function getPlacesById(placeId: string): Promise<Place> {
  try {
    const response = await fetch(`${baseUrl}/api/greenplace/${placeId}`, {
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

// ✅ UPDATE PLACE
export async function updatePlace(data: Place, id: string): Promise<Place> {
  try {
    const response = await fetch(`${baseUrl}/api/greenplace/${id}`, {
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

    const result: Place = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

// ✅ DELETE PLACE
export async function deletePlace(id: string): Promise<Place[]> {
  try {
    const response = await fetch(`${baseUrl}/api/greenplace/${id}`, {
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

    const result: Place[] = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

// ✅ REVIEW PLACE
export async function reviewPlace(
  placeId: string,
  userId: string,
  rating: number,
  comment: string
): Promise<Place> {
  try {
    const response = await fetch(
      `${baseUrl}/api/greenplace/${placeId}/review`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          userId,
          rating,
          comment,
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
