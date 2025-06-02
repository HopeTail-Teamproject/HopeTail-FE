const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return {
    Authorization: `Bearer ${user?.token}`,
    "Content-Type": "application/json",
  };
};

export const getComments = async (postId) => {
  const res = await fetch(`/api/posts/${postId}/comments`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("댓글 목록 조회 실패");
  return res.json();
};

export const createComment = async (postId, content) => {
  const res = await fetch(`/api/posts/${postId}/comments`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ content }),
  });
  if (!res.ok) throw new Error("댓글 작성 실패");
  return res.json();
};

export const deleteComment = async (commentId) => {
  const res = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("댓글 삭제 실패");
};
