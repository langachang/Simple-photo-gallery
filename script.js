// REGISTER USER
function registerUser() {
    let username = document.getElementById("regUser").value;
    let password = document.getElementById("regPass").value;

    if (username === "" || password === "") {
        alert("Fill all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user exists
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            alert("Username already exists");
            return;
        }
    }

    users.push({ username: username, password: password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
    window.location.href = "login.html";
}

// LOGIN USER
function loginUser() {
    let username = document.getElementById("loginUser").value;
    let password = document.getElementById("loginPass").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let valid = false;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            valid = true;
            break;
        }
    }

    if (!valid) {
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
    let file = document.getElementById("photoInput").files[0];
    let userId = localStorage.getItem("userId");

    if (!file) {
        alert("Select image");
        return;
    }

    let reader = new FileReader();
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
    let gallery = document.getElementById("gallery");
    if (!gallery) return;

    let photos = JSON.parse(localStorage.getItem("photos")) || [];
    let userId = localStorage.getItem("userId");

    gallery.innerHTML = "";
    let s = 1;

    photos.forEach((p, index) => {
        if (p.userId === userId) {
            gallery.innerHTML += `
                <div class="photo">
                    <strong>S.No. ${s}</strong><br>
                    <img src="${p.image}">
                    <button onclick="deletePhoto(${index})">Delete</button>
                </div>
            `;
            s++;
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

showPhotos();
