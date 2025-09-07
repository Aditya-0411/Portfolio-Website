"use strict";

/* ===========================
   SIDEBAR: Show/Hide Contacts
   =========================== */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
}

/* ===========================
   PAGE NAVIGATION (Tabs)
   =========================== */
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    // active link
    navLinks.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");

    // show page
    const pageName = this.textContent.trim().toLowerCase();
    pages.forEach((page) => {
      page.classList.remove("active");
      if (page.dataset.page === pageName) page.classList.add("active");
    });

    // scroll to top on page switch for mobile feel
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

/* ===========================
   PORTFOLIO FILTER (Buttons)
   =========================== */
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

function applyFilter(category) {
  const cat = category.toLowerCase();
  filterItems.forEach((item) => {
    const isMatch = cat === "all" || item.dataset.category === cat;
    item.classList.toggle("active", isMatch);
  });
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    filterBtns.forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    applyFilter(this.textContent.trim());
  });
});

/* ===========================
   PORTFOLIO FILTER (Custom Select)
   =========================== */
const select = document.querySelector("[data-select]");
const selectValue = document.querySelector("[data-select-value]");
const selectList = document.querySelector(".select-list");

if (select && selectValue && selectList) {
  select.addEventListener("click", () => {
    select.classList.toggle("active");
  });

  selectList.addEventListener("click", (e) => {
    const item = e.target.closest("[data-select-item]");
    if (!item) return;

    const value = item.textContent.trim();
    selectValue.textContent = value;
    select.classList.remove("active");
    applyFilter(value);
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!select.contains(e.target)) select.classList.remove("active");
  });
}

/* ===========================
   CONTACT FORM (Basic UX)
   =========================== */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const submitBtn = document.querySelector("[data-form-btn]");

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
}

function checkFormValidity() {
  if (!form || !submitBtn) return;

  // minimal validation: all inputs non-empty + email valid (if present)
  let allFilled = true;
  let emailOk = true;

  formInputs.forEach((inp) => {
    if (inp.type === "email") {
      emailOk = isValidEmail(inp.value.trim());
    } else {
      if (!inp.value.trim()) allFilled = false;
    }
  });

  submitBtn.disabled = !(allFilled && emailOk);
}

// attach listeners
if (form) {
  formInputs.forEach((inp) => {
    inp.addEventListener("input", checkFormValidity);
  });

  checkFormValidity();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // You can hook up an actual email service here.
    alert("Thanks! Your message has been sent.");
    form.reset();
    checkFormValidity();
  });
}

/* ===========================
   INITIAL STATE
   =========================== */
// If you want "All" projects visible by default:
applyFilter("all");
