async function editPost(event) {
  event.preventDefault();
  // Takes user's input
  const titleText = document.querySelector("#title-text").value.trim();
  const contentText = document.querySelector("#content-text").value.trim();
  // Obtains the post id
  const id = document.location.pathname.split("/").at(-1);

  if (titleText && contentText) {
    const response = await fetch(`/api/post/${id}`, {
      method: "put",
      body: JSON.stringify({
        title: titleText,
        content: contentText,
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

document.querySelector("#update-post-btn").addEventListener("click", editPost);
