let passwords = JSON.parse(localStorage.getItem("passwords")) || [];
displayPasswords();

function addPassword() {
    const website = document.getElementById("website").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!website || !username || !password) {
        alert("Please fill in all fields.");
        return;
    }

    const entry = { website, username, password };
    passwords.push(entry);
    localStorage.setItem("passwords", JSON.stringify(passwords));
    document.getElementById("website").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    displayPasswords();
}

function displayPasswords() {
    const list = document.getElementById("passwords");
    list.innerHTML = "";
    passwords.forEach((entry, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${entry.website}</strong> - ${entry.username} - <span class="password">${"*".repeat(entry.password.length)}</span>
                        <button onclick="deletePassword(${index})">Delete</button>`;
        list.appendChild(li);
    });
}

function deletePassword(index) {
    passwords.splice(index, 1);
    localStorage.setItem("passwords", JSON.stringify(passwords));
    displayPasswords();
}

function searchPasswords() {
    const searchQuery = document.getElementById("search").value.toLowerCase();
    document.querySelectorAll("#passwords li").forEach(li => {
        li.style.display = li.textContent.toLowerCase().includes(searchQuery) ? "block" : "none";
    });
}

function togglePasswords() {
    const showPasswords = document.getElementById("showPasswords").checked;
    document.querySelectorAll(".password").forEach((span, index) => {
        span.textContent = showPasswords ? passwords[index].password : "*".repeat(passwords[index].password.length);
    });
}
