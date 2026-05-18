const token = sessionStorage.getItem("token");

if (!token) {
  window.location.href = "/login.html";
}

async function loadData() {
  try {
    const res = await fetch("/api/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    user.textContent = "User: " + data.user.email;

    posts.innerHTML = data.posts
      .map((p) => `<p>${p.title} - ${p.content}</p>`)
      .join("");
  } catch (err) {
    msg.textContent = err.message;

    sessionStorage.removeItem("token");
    window.location.href = "/login.html";
  }
}

function logout() {
  sessionStorage.removeItem("token");
  window.location.href = "/login.html";
}

loadData();