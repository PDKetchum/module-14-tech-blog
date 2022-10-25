const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the signup form
  const name = document.querySelector("#inputUsername").value.trim();
  const email = document.querySelector("#inputEmail").value.trim();
  const password = document.querySelector("#inputPassword").value.trim();

  if (name && email && password) {
    // Send a POST request to the API endpoint/create a user
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ name: name, email: email, password: password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace("/homepage");
    } else {
      alert(response.statusText);
    }
  }
};
document
  .querySelector("#signup-button")
  .addEventListener("click", signupFormHandler);
