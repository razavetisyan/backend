async function register() {
  const email = emailEl.value;
  const password = passwordEl.value;

  btn.disabled = true;

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error);

    msg.className = "msg success";
    msg.textContent = "Registered successfully!";

    setTimeout(() => {
      window.location.href = "/login.html";
    }, 1000);
  } catch (err) {
    msg.textContent = err.message;
  }

  btn.disabled = false;
}
