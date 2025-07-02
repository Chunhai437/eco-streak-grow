const baseUrl = import.meta.env.VITE_API_URL;
export async function register(
  username,
  fullname,
  email,
  password,
  address,
  phoneNumber
) {
  try {
    const response = await fetch(`${baseUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        username,
        fullname,
        email,
        password,
        address,
        phoneNumber,
      }),
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
    console.log(response);
    return response;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}
export async function login(data) {
  try {
    const response = await fetch(`${baseUrl}/api/auth/login`, {
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
    console.log(response);
    return response;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}
export async function loginWithGoogle() {
  try {
    const response = await fetch(`${baseUrl}/api/auth/google`, {
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
    console.log(response);
    return response;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

export async function verifyEmail(token: string) {
  try {
    const response = await fetch(
      `${baseUrl}/api/auth/verify-email?token=${token}`,
      {
        method: "GET",
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
    console.log(response);
    return response;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}
