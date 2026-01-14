// REGISTER
function register() {
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;

    if (!username || !password) {
        alert("Please fill all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username]) {
        alert("Username already exists");
        return;
    }

    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    window.location.href = "login.html";
}

// LOGIN
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (!users[username] || users[username] !== password) {
        alert("Invalid username or password");
        return;
    }

    localStorage.setItem("userId", username);
    window.location.href = "album.html";
}

// LOGOUT
function logout() {
    localStorage.removeItem("userId");
    window.location.href = "login.html";
}

// UPLOAD PHOTO
function uploadPhoto() {
    const userId = localStorage.getItem("userId");
    const file = document.getElementById("photoInput").files[0];

    if (!file) {
        alert("Select an image");
        return;
    }

    const reader = new FileReader();
    reader.onload = function () {
        let photos = JSON.parse(localStorage.getItem("photos")) || [];
        photos.push({ userId: userId, image: reader.result });
        localStorage.setItem("photos", JSON.stringify(photos));
        showPhotos();
    };
    reader.readAsDataURL(file);
}

// SHOW USER PHOTOS WITH SERIAL NUMBER
function showPhotos() {
    const gallery = document.getElementById("gallery");
    if (!gallery) return;

    const userId = localStorage.getItem("userId");
    let photos = JSON.parse(localStorage.getItem("photos")) || [];

    gallery.innerHTML = "";
    let serial = 1;

    photos.forEach((photo, index) => {
        if (photo.userId === userId) {
            gallery.innerHTML += `
                <div class="photo">
                    <strong>S.No. ${serial}</strong>
                    <img src="${photo.image}">
                    <button onclick="deletePhoto(${index})">Delete</button>
                </div>
            `;
            serial++;
        }
    });
}

// DELETE PHOTO
function deletePhoto(index) {
    let photos = JSON.parse(localStorage.getItem("photos"));
    photos.splice(index, 1);
    localStorage.setItem("photos", JSON.stringify(photos));
    showPhotos();
}

// AUTO LOAD
showPhotos();
