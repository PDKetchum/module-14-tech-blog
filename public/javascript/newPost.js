async function addPost(event) {
  event.preventDefault();
  // Takes user's input
  const titleText = document.querySelector("#title-text").value.trim();
  const contentText = document.querySelector("#content-text").value.trim();
  if (titleText && contentText) {
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({
        title: titleText,
        content: contentText,
        date_created: new Date(),
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace(`/dashboard`);
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector("#submit-comment-btn")
  .addEventListener("click", addPost);
