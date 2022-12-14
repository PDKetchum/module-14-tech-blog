// Logs user out with POST logout route
const logout = async () => {
  const response = await fetch("/api/user/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/exit");
  } else {
    alert(response.statusText);
  }
};

document.querySelector("#logout-button").addEventListener("click", logout);
