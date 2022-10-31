const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the signup form
  const username = document.querySelector("#inputUsername").value.trim();
  const email = document.querySelector("#inputEmail").value.trim();
  const password = document.querySelector("#inputPassword").value.trim();

  if (username && email && password) {
    // Send a POST request to the API endpoint/create a user
    const response = await fetch("/api/user/signup", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};
document
  .querySelector("#signup-button")
  .addEventListener("click", signupFormHandler);
