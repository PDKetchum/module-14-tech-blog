async function editComment(event) {
  event.preventDefault();
  // Takes user's input

  const contentText = document.querySelector("#content-text").value.trim();
  const id = document.location.pathname.split("/").at(-1);

  console.log(id);
  if (contentText) {
    const response = await fetch(`/api/comment/${id}`, {
      method: "put",
      body: JSON.stringify({
        content: contentText,
      }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace(`/comment/${id}`);
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector("#update-comment-btn")
  .addEventListener("click", editComment);
