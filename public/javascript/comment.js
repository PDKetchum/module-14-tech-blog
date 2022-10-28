async function addComment(event) {
  event.preventDefault();
  // Takes user's input
  const commentText = document.querySelector("#form-text").value.trim();
  const id = document.location.pathname.split("/").at(-1);
  if (commentText) {
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        post_id: parseInt(id),
        content: commentText,
        date_created: new Date(),
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace(`/post/${id}`);
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector("#submit-comment-btn")
  .addEventListener("click", addComment);
