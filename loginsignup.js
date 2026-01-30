// TAB SWITCHING
const tabBtns = document.querySelectorAll('.tab-btn');
const forms = document.querySelectorAll('.auth-form');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const target = btn.getAttribute('data-target');
    forms.forEach(f => f.classList.remove('active'));
    document.getElementById(target).classList.add('active');
  });
});

// FORM SUBMISSION: redirect to homepage
document.getElementById('login-form').addEventListener('submit', e => {
  e.preventDefault();
  // you can add backend login logic here
  alert('Login successful! Redirecting to homepage...');
  window.location.href = 'home.html';
});

document.getElementById('signup-form').addEventListener('submit', e => {
  e.preventDefault();
  // you can add backend signup logic here
  alert('Signup successful! Redirecting to homepage...');
  window.location.href = 'home.html';
});
// Header toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});