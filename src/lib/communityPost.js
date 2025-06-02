const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return {
    Authorization: `Bearer ${user?.token}`,
    "Content-Type": "application/json",
  };
};

export const getPostById = async (postId) => {
  const response = await fetch(`/api/posts/${postId}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("게시글 조회 실패");
  return response.json();
};

export const likePost = async (postId) => {
  const response = await fetch(`/api/posts/${postId}/like`, {
    method: "POST",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("좋아요 실패");
};

export const updatePost = async (postId, data) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("게시글 수정 실패");
  return response.json();
};

export const deletePost = async (postId) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("게시글 삭제 실패");
};
