// REGISTER
function register() {
    var u = document.getElementById("regUser").value;
    var p = document.getElementById("regPass").value;
    var m = document.getElementById("regMobile").value;

    if (u === "" || p === "" || m === "") {
        alert("All fields required");
        return;
    }

    var users = JSON.parse(localStorage.getItem("users")) || [];

    for (var i = 0; i < users.length; i++) {
        if (users[i].username === u) {
            alert("Username already exists");
            return;
        }
    }

    users.push({
        username: u,
        password: p,
        mobile: m
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered successfully");
    window.location.href = "login.html";
}

// LOGIN
function login() {
    var u = document.getElementById("loginUser").value;
    var p = document.getElementById("loginPass").value;

    var users = JSON.parse(localStorage.getItem("users")) || [];
    var success = false;

    for (var i = 0; i < users.length; i++) {
        if (users[i].username === u && users[i].password === p) {
            success = true;
            break;
        }
    }

    if (!success) {
        alert("Invalid username or password");
        return;
    }

    localStorage.setItem("currentUser", u);
    window.location.href = "index.html";
}

// CHECK LOGIN
function checkLogin() {
    if (!localStorage.getItem("currentUser")) {
        window.location.href = "login.html";
    }
    showPhotos();
}

// UPLOAD PHOTO
function uploadPhoto() {
    var file = document.getElementById("photoInput").files[0];
    if (!file) {
        alert("Select image");
        return;
    }

    var reader = new FileReader();
    reader.onload = function () {
        var photos = JSON.parse(localStorage.getItem("photos")) || [];
        photos.push({
            user: localStorage.getItem("currentUser"),
            image: reader.result
        });
        localStorage.setItem("photos", JSON.stringify(photos));
        showPhotos();
    };
    reader.readAsDataURL(file);
}

// SHOW PHOTOS
function showPhotos() {
    var gallery = document.getElementById("gallery");
    if (!gallery) return;

    var photos = JSON.parse(localStorage.getItem("photos")) || [];
    var user = localStorage.getItem("currentUser");

    gallery.innerHTML = "";

    photos.forEach(function (p) {
        if (p.user === user) {
            gallery.innerHTML += `
                <div class="photo">
                    <img src="${p.image}">
                </div>
            `;
        }
    });
}
