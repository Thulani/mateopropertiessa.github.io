/* ==========================================================================
   Mateo Properties — site behaviour (vanilla JS, no dependencies)
   - Mobile menu toggle
   - Header shadow on scroll + back-to-top button
   - Smooth scroll for in-page links (respects reduced-motion)
   - Gallery lightbox
   - Enquiry form: pre-fill room type from URL, placeholder-endpoint guard, AJAX submit
   ========================================================================== */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function closeNav(returnFocus) {
    if (!navToggle || !nav) return;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    nav.classList.remove("is-open");
    if (returnFocus) navToggle.focus();
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      if (open) {
        closeNav(false);
      } else {
        navToggle.setAttribute("aria-expanded", "true");
        navToggle.setAttribute("aria-label", "Close menu");
        nav.classList.add("is-open");
      }
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) closeNav(true);
    });

    document.addEventListener("click", function (e) {
      if (nav.classList.contains("is-open") && !e.target.closest(".site-header")) closeNav(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 1000) closeNav(false);
    });
  }

  /* ---------- Header shadow + back to top ---------- */
  var header = document.querySelector(".site-header");
  var backToTop = document.querySelector(".back-to-top");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("is-scrolled", y > 8);
    if (backToTop) backToTop.classList.toggle("is-visible", y > 500);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
      var skipTarget = document.getElementById("main");
      if (skipTarget) skipTarget.focus({ preventScroll: true });
    });
  }

  /* ---------- Smooth scroll for same-page anchors ---------- */
  document.addEventListener("click", function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var id = link.getAttribute("href").slice(1);
    if (!id) return;
    var target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    history.replaceState(null, "", "#" + id);
  });

  /* ---------- Gallery lightbox ---------- */
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
  if (galleryItems.length) {
    var lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Image viewer");
    lightbox.innerHTML =
      '<button type="button" class="lightbox__btn lightbox__close" aria-label="Close image viewer"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>' +
      '<button type="button" class="lightbox__btn lightbox__prev" aria-label="Previous image"><i class="fa-solid fa-chevron-left" aria-hidden="true"></i></button>' +
      '<figure class="lightbox__figure"><img class="lightbox__img" src="" alt=""><figcaption class="lightbox__caption" aria-live="polite"></figcaption></figure>' +
      '<button type="button" class="lightbox__btn lightbox__next" aria-label="Next image"><i class="fa-solid fa-chevron-right" aria-hidden="true"></i></button>';
    document.body.appendChild(lightbox);

    var lbImg = lightbox.querySelector(".lightbox__img");
    var lbCaption = lightbox.querySelector(".lightbox__caption");
    var lbClose = lightbox.querySelector(".lightbox__close");
    var lbPrev = lightbox.querySelector(".lightbox__prev");
    var lbNext = lightbox.querySelector(".lightbox__next");
    var current = 0;
    var lastFocused = null;

    function show(index) {
      current = (index + galleryItems.length) % galleryItems.length;
      var item = galleryItems[current];
      var thumb = item.querySelector("img");
      lbImg.src = item.getAttribute("data-full") || (thumb && thumb.src) || "";
      lbImg.alt = thumb ? thumb.alt : "";
      lbCaption.textContent = (item.getAttribute("data-caption") || "") +
        " (" + (current + 1) + " of " + galleryItems.length + ")";
    }

    function open(index) {
      lastFocused = document.activeElement;
      show(index);
      lightbox.classList.add("is-open");
      document.body.classList.add("no-scroll");
      lbClose.focus();
    }

    function close() {
      lightbox.classList.remove("is-open");
      document.body.classList.remove("no-scroll");
      if (lastFocused) lastFocused.focus();
    }

    galleryItems.forEach(function (item, i) {
      item.addEventListener("click", function () { open(i); });
    });
    lbClose.addEventListener("click", close);
    lbPrev.addEventListener("click", function () { show(current - 1); });
    lbNext.addEventListener("click", function () { show(current + 1); });
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });

    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(current - 1);
      else if (e.key === "ArrowRight") show(current + 1);
      else if (e.key === "Tab") {
        // Keep focus inside the dialog
        var focusables = [lbClose, lbPrev, lbNext];
        var idx = focusables.indexOf(document.activeElement);
        e.preventDefault();
        var next = e.shiftKey ? idx - 1 : idx + 1;
        focusables[(next + focusables.length) % focusables.length].focus();
      }
    });
  }

  /* ---------- Enquiry form ---------- */
  var form = document.getElementById("enquiry-form");
  if (form) {
    var status = document.getElementById("form-status");
    var params = new URLSearchParams(window.location.search);

    // Pre-select the room type when arriving from an "Enquire" button
    var roomParam = params.get("room");
    if (roomParam) {
      var roomInput = form.querySelector('input[name="room_type"][value="' + (roomParam === "shared" ? "Shared room" : "Single room") + '"]');
      if (roomInput) roomInput.checked = true;
    }

    // Move-in date can't be in the past
    var moveIn = form.querySelector("#move-in");
    if (moveIn) {
      var today = new Date();
      var local = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
      moveIn.min = local.toISOString().slice(0, 10);
    }

    function setStatus(type, html) {
      status.className = "form-status is-visible form-status--" + type;
      status.innerHTML = html;
      status.focus();
    }

    var fallbackContact = 'Please <a href="' + (form.getAttribute("data-whatsapp") || "contact.html") +
      '">message us on WhatsApp</a> or call us directly.';

    form.addEventListener("submit", function (e) {
      var action = form.getAttribute("action") || "";

      // The browser has already run native validation before this event fires
      e.preventDefault();

      // The form endpoint has not been configured yet (README → "Contact form")
      if (action.indexOf("[") !== -1 || action === "") {
        setStatus("error",
          "Our online form is being set up and can't send messages yet. " + fallbackContact);
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalLabel = submitBtn ? submitBtn.innerHTML : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }

      fetch(action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (!response.ok) throw new Error("Request failed");
          form.reset();
          setStatus("success",
            "Thank you, your enquiry has been sent. A member of our team will be in touch soon. " +
            "If it's urgent, WhatsApp or call us.");
        })
        .catch(function () {
          setStatus("error", "Sorry, we couldn't send your enquiry just now. " + fallbackContact);
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalLabel;
          }
        });
    });
  }
})();
