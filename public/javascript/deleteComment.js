async function deleteComment(event) {
  event.preventDefault();
  // Obtains the comment id
  const id = document.location.pathname.split("/").at(-1);
  const response = await fetch(`/api/comment/${id}`, {
    method: "delete",
  });
  const comment = await response.json();
  if (response.ok) {
    // Returns user to the post that the comment belongs to
    document.location.replace(`/post/${comment.post_id}`);
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#delete-btn").addEventListener("click", deleteComment);
