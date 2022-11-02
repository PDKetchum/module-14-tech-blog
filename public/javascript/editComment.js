async function editComment(event) {
  event.preventDefault();

  // Takes user's input
  const contentText = document.querySelector("#content-text").value.trim();
  // Obtains the comment id
  const id = document.location.pathname.split("/").at(-1);

  if (contentText) {
    const response = await fetch(`/api/comment/${id}`, {
      method: "put",
      body: JSON.stringify({
        content: contentText,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const comment = await response.json();
    if (response.ok) {
      // Returns user to the post that the comment belongs to
      document.location.replace(`/post/${comment.post_id}`);
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector("#update-comment-btn")
  .addEventListener("click", editComment);
