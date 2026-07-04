// Data akun sementara
const akun = {
    email: "admin@gov.id",
    password: "admin123"
};

// Cek apakah sudah login
if (localStorage.getItem("isLogin") === "true") {
    window.location.href = "dashboard.html";
}

// Form Login
const form = document.getElementById("loginForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === akun.email && password === akun.password) {

        localStorage.setItem("isLogin", "true");
        localStorage.setItem("namaUser", "Administrator");

        alert("Login Berhasil!");

        window.location.href = "dashboard.html";

    } else {

        alert("Email atau Password salah!");

    }

});
function logout(){

localStorage.removeItem("isLogin");

window.location.href="index.html";

}