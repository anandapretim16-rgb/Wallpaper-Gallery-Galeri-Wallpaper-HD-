document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  if (username === "admin" && password === "12345") {
    localStorage.setItem("isLoggedIn", "true");
    alert("Login berhasil! Mengalihkan ke galeri...");
    window.location.href = "index.html";
  } else {
    alert("Username atau password salah!");
  }
});
if (localStorage.getItem("isLoggedIn") === "true") {
  window.location.href = "index.html";
}
