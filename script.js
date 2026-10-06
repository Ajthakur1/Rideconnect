document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (menu && nav) menu.addEventListener("click", () => nav.classList.toggle("open"));

  const today = new Date().toISOString().split("T")[0];
  document.querySelectorAll('input[type="date"]').forEach(i => i.min = today);

  const saveRequest = (key, form) => {
    const data = Object.fromEntries(new FormData(form).entries());
    data.createdAt = new Date().toISOString();
    const old = JSON.parse(localStorage.getItem(key) || "[]");
    old.push(data);
    localStorage.setItem(key, JSON.stringify(old));
  };

  const booking = document.getElementById("bookingForm");
  if (booking) booking.addEventListener("submit", e => {
    e.preventDefault();
    saveRequest("rideconnectBookings", booking);
    const msg = document.getElementById("bookingMessage");
    msg.hidden = false;
    msg.textContent = "Request saved on this device. For live customer-driver matching, connect this form to a backend such as Supabase in Phase 2.";
    booking.reset();
  });

  const quick = document.getElementById("quickBooking");
  if (quick) quick.addEventListener("submit", e => {
    e.preventDefault();
    const q = new URLSearchParams(new FormData(quick)).toString();
    window.location.href = "booking.html?" + q;
  });

  const contact = document.getElementById("contactForm");
  if (contact) contact.addEventListener("submit", e => {
    e.preventDefault();
    saveRequest("rideconnectContacts", contact);
    const msg = document.getElementById("contactMessage");
    msg.hidden = false; msg.textContent = "Thank you. Your enquiry was saved on this device. Connect a backend/email service before production launch.";
    contact.reset();
  });

  const partner = document.getElementById("partnerForm");
  if (partner) partner.addEventListener("submit", e => {
    e.preventDefault();
    saveRequest("rideconnectPartners", partner);
    const msg = document.getElementById("partnerMessage");
    msg.hidden = false; msg.textContent = "Partner request saved on this device. Backend verification and partner dashboard should be added before production.";
    partner.reset();
  });
});
