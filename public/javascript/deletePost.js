async function deletePost(event) {
  event.preventDefault();
  // Obtains the post id
  const id = document.location.pathname.split("/").at(-1);
  const response = await fetch(`/api/post/${id}`, {
    method: "delete",
  });
  if (response.ok) {
    document.location.replace(`/dashboard`);
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#delete-btn").addEventListener("click", deletePost);
