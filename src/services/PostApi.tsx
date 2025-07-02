const baseUrl = import.meta.env.VITE_API_URL;

export interface Post {
  _id?: string;
  userId?: {
    _id: string;
  };
  communityId?: {
    _id: string;
    name: string;
  };
  title?: string;
  content?: string;
  image?: string;
  likeCount?: number;
  commentCount?: number;
  createdAt?: string;

  likedByUser?: boolean;
}

export interface Comment {
  _id?: string;
  content?: string;
  userId?: {
    _id?: string;
  };
  postId?: string;
  createdAt?: string;
}

// ✅ CREATE POST
export async function createPost(
  title: string,
  content: string,
  image: string,
  communityId: string
): Promise<Post> {
  try {
    const response = await fetch(`${baseUrl}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        title,
        content,
        image,
        communityId,
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

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

// ✅ GET ALL POSTS
export async function getAllPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${baseUrl}/api/posts`, {
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
    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

// ✅ GET POSTS OF COMMUNITY
export async function getPostsOfCommunity(
  communityId: string
): Promise<Post[]> {
  try {
    const response = await fetch(
      `${baseUrl}/api/posts/community/${communityId}`,
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

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

// ✅ CREATE COMMENT
export async function createComment(
  postId: string,
  content: string
): Promise<Comment> {
  try {
    const response = await fetch(`${baseUrl}/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        postId,
        content,
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

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

// ✅ GET ALL COMMENTS OF POST
export async function getAllCommentsOfPost(postId: string): Promise<Comment[]> {
  try {
    const response = await fetch(`${baseUrl}/api/comments/${postId}`, {
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
    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

// ✅ LIKE POST
export async function likePost(
  postId: string,
  userId: string
): Promise<{
  message: string;
  like: {
    _id: string;
    userId: string;
    postId: string;
    createdAt: string;
  };
}> {
  try {
    const response = await fetch(`${baseUrl}/api/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ postId, userId }),
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
    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}

// ✅ UNLIKE POST
export async function unLikePost(
  postId: string,
  userId: string
): Promise<{ message: string }> {
  try {
    const response = await fetch(`${baseUrl}/api/unlike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ postId, userId }),
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
    return data;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
}
