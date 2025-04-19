let passwords = JSON.parse(localStorage.getItem("passwords")) || [];
displayPasswords();

function addPassword() {
  const website = document.getElementById("website").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!website || !username || !password) {
    showToast("Please fill all fields.");
    return;
  }

  const entry = { website, username, password };
  passwords.push(entry);
  localStorage.setItem("passwords", JSON.stringify(passwords));
  clearForm();
  displayPasswords();
  showToast("Password added!");
}

function clearForm() {
  document.getElementById("website").value = "";
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("strength").textContent = "Strength: N/A";
}

function displayPasswords() {
  const list = document.getElementById("passwords");
  list.innerHTML = "";
  passwords.forEach((entry, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${entry.website}</strong><br>${entry.username} - 
      <span class="password" id="pw-${index}">${"*".repeat(entry.password.length)}</span>
      <div class="actions">
        <button class="copy-btn" onclick="copyPassword(${index})">Copy</button>
        <button class="show-btn" onclick="toggleSinglePassword(${index})">Show</button>
        <button class="delete-btn" onclick="deletePassword(${index})">Delete</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function deletePassword(index) {
  passwords.splice(index, 1);
  localStorage.setItem("passwords", JSON.stringify(passwords));
  displayPasswords();
  showToast("Password deleted.");
}

function searchPasswords() {
  const query = document.getElementById("search").value.toLowerCase();
  document.querySelectorAll("#passwords li").forEach(li => {
    li.style.display = li.textContent.toLowerCase().includes(query) ? "block" : "none";
  });
}

function copyPassword(index) {
  navigator.clipboard.writeText(passwords[index].password);
  showToast("Password copied to clipboard!");
}

function toggleSinglePassword(index) {
  const span = document.getElementById(`pw-${index}`);
  const current = span.textContent;
  span.textContent = current.includes("*") ? passwords[index].password : "*".repeat(passwords[index].password.length);
}

function checkStrength() {
  const pw = document.getElementById("password").value;
  const strengthText = document.getElementById("strength");

  let strength = "Weak";
  if (pw.length > 6 && /[A-Z]/.test(pw) && /\d/.test(pw)) strength = "Medium";
  if (pw.length > 10 && /[A-Z]/.test(pw) && /\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) strength = "Strong";

  strengthText.textContent = "Strength: " + strength;
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.style.display = "block";
  setTimeout(() => (toast.style.display = "none"), 2500);
}

// Theme toggle
document.getElementById("toggleTheme").addEventListener("change", (e) => {
  document.body.classList.toggle("dark", e.target.checked);
});
