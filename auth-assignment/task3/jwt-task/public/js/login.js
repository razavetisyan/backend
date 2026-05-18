async function login() {
  btn.disabled = true;

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error);

    sessionStorage.setItem("token", data.token);

    window.location.href = "/dashboard.html";
  } catch (err) {
    msg.textContent = err.message;
  }

  btn.disabled = false;
}
