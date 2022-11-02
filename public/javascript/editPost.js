async function editPost(event) {
  event.preventDefault();
  // Takes user's input
  const titleText = document.querySelector("#title-text").value.trim();
  const contentText = document.querySelector("#content-text").value.trim();
  const id = document.location.pathname.split("/").at(-1);

  console.log(id);
  if (titleText && contentText) {
    const response = await fetch(`/api/post/${id}`, {
      method: "put",
      body: JSON.stringify({
        title: titleText,
        content: contentText,
      }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace(`/post/${id}`);
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector("#update-post-btn").addEventListener("click", editPost);
