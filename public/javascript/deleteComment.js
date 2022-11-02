async function deleteComment(event) {
  event.preventDefault();
  const id = document.location.pathname.split("/").at(-1);
  const response = await fetch(`/api/comment/${id}`, {
    method: "delete",
  });
  const comment = await response.json();
  if (response.ok) {
    document.location.replace(`/post/${comment.post_id}`);
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#delete-btn").addEventListener("click", deleteComment);
