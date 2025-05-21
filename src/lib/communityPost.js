export const getPostById = async (postId) => {
  const response = await fetch(`/api/posts/${postId}`);
  if (!response.ok) throw new Error("게시글 조회 실패");
  return response.json();
};

export const likePost = async (postId) => {
  const response = await fetch(`/api/posts/${postId}/like`, {
    method: "POST",
  });
  if (!response.ok) throw new Error("좋아요 실패");
};

export const updatePost = async (postId, data) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("게시글 수정 실패");
  return response.json();
};

export const deletePost = async (postId) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("게시글 삭제 실패");
};
