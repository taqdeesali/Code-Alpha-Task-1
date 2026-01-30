const modal = document.getElementById("planModal");
const modalText = document.getElementById("modalText");
const closeBtn = document.querySelector(".close");
const confirmBtn = document.getElementById("confirmBtn");

// ================= BUY BUTTON CLICK =================
document.querySelectorAll(".buy-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const plan = btn.getAttribute("data-plan");
    const price = btn.getAttribute("data-price");

    btn.parentElement.classList.add("pulse");
    setTimeout(() => btn.parentElement.classList.remove("pulse"), 300);

    modalText.textContent = `You selected the ${plan} plan for PKR ${price}.`;
    modal.style.display = "block";
  });
});

// Header toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// ================= MODAL CLOSE =================
closeBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});
confirmBtn.addEventListener("click", () => {
  alert("Thank you for your purchase! 🎉");
  modal.style.display = "none";
});

// ================= PULSE ANIMATION =================
const style = document.createElement('style');
style.innerHTML = `
.pulse {
  animation: pulseCard 0.3s ease-out;
}
@keyframes pulseCard {
  0% { transform: scale(1); box-shadow: 0 0 10px #b56bff; }
  50% { transform: scale(1.05); box-shadow: 0 0 25px #b56bff; }
  100% { transform: scale(1); box-shadow: 0 0 10px #b56bff; }
}`;
document.head.appendChild(style);

// ================= FAQ TOGGLE =================
document.querySelectorAll(".faq-item .faq-question").forEach(q => {
  q.addEventListener("click", () => {
    const parent = q.parentElement;
    // Toggle active class
    parent.classList.toggle("active");
  });
});
