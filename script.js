/*=========================================
NIIST PUBLIC SCHOOL - script.js
=========================================*/

/* Loader runs immediately on page load completion */
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    if (loader) {
        loader.classList.add("hide");
    }
});

document.addEventListener("DOMContentLoaded", () => {

    /*=========================
    STICKY HEADER
    =========================*/
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (header) {
            if (window.scrollY > 80) {
                header.classList.add("active");
            } else {
                header.classList.remove("active");
            }
        }
    });

    /*=========================
    MOBILE MENU
    =========================*/
    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector(".nav-links");

    if (menuBtn && nav) {
        menuBtn.addEventListener("click", () => {
            nav.classList.toggle("active");
            const icon = menuBtn.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-times");
            }
        });

        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("active");
                const icon = menuBtn.querySelector("i");
                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-times");
                }
            });
        });
    }

    /*=========================
    ACTIVE NAVIGATION ON SCROLL
    =========================*/
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(sec => {
            const top = sec.offsetTop - 120;
            if (window.pageYOffset >= top) {
                current = sec.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (current && link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    });

    /*=========================
    STAT COUNTER
    =========================*/
    const counters = document.querySelectorAll(".counter-item h2, .stat h3");
    let counted = false;

    function startCounter() {
        if (counted) return;

        const trigger = document.querySelector(".counter") || document.querySelector(".hero-stats");
        if (!trigger) return;

        if (window.scrollY + window.innerHeight > trigger.offsetTop + 100) {
            counted = true;

            counters.forEach(counter => {
                const target = +counter.dataset.target;
                if (!target) return;

                let count = 0;
                const speed = target / 120;

                const update = () => {
                    count += speed;
                    if (count < target) {
                        counter.innerText = Math.floor(count) + "+";
                        requestAnimationFrame(update);
                    } else {
                        counter.innerText = target + "+";
                    }
                };
                update();
            });
        }
    }
    window.addEventListener("scroll", startCounter);
    startCounter(); // Trigger check on load in case section is already in view

    /*=========================
    FAQ ACCORDION
    =========================*/
    document.querySelectorAll(".faq-item").forEach(item => {
        const question = item.querySelector(".faq-question");
        if (question) {
            question.addEventListener("click", () => {
                item.classList.toggle("active");
            });
        }
    });

    /*=========================
    SCROLL FADE-UP ANIMATION
    =========================*/
    const reveals = document.querySelectorAll(".fade-up");
    function reveal() {
        reveals.forEach(box => {
            const top = box.getBoundingClientRect().top;
            if (top < window.innerHeight - 100) {
                box.classList.add("show");
            }
        });
    }
    window.addEventListener("scroll", reveal);
    reveal();

    /*=========================
    BACK TO TOP BUTTON
    =========================*/
    const topBtn = document.querySelector(".back-top");
    if (topBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 500) {
                topBtn.classList.add("show");
            } else {
                topBtn.classList.remove("show");
            }
        });

        topBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /*=========================
    SMOOTH SCROLL FOR HASH LINKS
    =========================*/
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    /*=========================
    FOOTER CURRENT YEAR
    =========================*/
    const year = document.getElementById("year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    /*=========================
    HERO SLIDER
    =========================*/
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-dot");
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        if (slides[index]) slides[index].classList.add("active");
        if (dots[index]) dots[index].classList.add("active");
    }

    function nextSlide() {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }

    if (slides.length > 0) {
        showSlide(0);
        setInterval(nextSlide, 5000);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentSlide = index;
            showSlide(index);
        });
    });

    /*=========================
    GALLERY LIGHTBOX
    =========================*/
    const galleryImages = document.querySelectorAll(".gallery-grid img, .gallery-item img");
    galleryImages.forEach(image => {
        image.addEventListener("click", () => {
            const overlay = document.createElement("div");
            overlay.className = "lightbox";
            overlay.innerHTML = `
                <div class="lightbox-content">
                    <img src="${image.src}" alt="${image.alt || 'Gallery Image'}">
                    <span class="lightbox-close">&times;</span>
                </div>
            `;
            document.body.appendChild(overlay);

            overlay.addEventListener("click", () => overlay.remove());
        });
    });

    /*=========================
    COUNTDOWN TIMER
    =========================*/
    const countdown = document.getElementById("countdown");
    if (countdown) {
        const target = new Date("April 01, 2027 08:00:00").getTime();
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const gap = target - now;

            if (gap <= 0) {
                countdown.innerHTML = "Admissions Open";
                clearInterval(timer);
                return;
            }

            const days = Math.floor(gap / (1000 * 60 * 60 * 24));
            const hrs = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));

            countdown.innerHTML = `${days} Days ${hrs} Hrs ${mins} Min`;
        }, 1000);
    }

    /*=========================
    FORM VALIDATION & TOAST
    =========================*/
    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
        form.addEventListener("submit", (e) => {
            const required = form.querySelectorAll("[required]");
            let valid = true;

            required.forEach(input => {
                if (input.value.trim() === "") {
                    valid = false;
                    input.style.borderColor = "red";
                } else {
                    input.style.borderColor = "#ddd";
                }
            });

            if (!valid) {
                e.preventDefault();
                showToast("Please fill all required fields");
            } else {
                e.preventDefault(); // Remove e.preventDefault() if sending form data to a backend
                showToast("Form Submitted Successfully");
                form.reset();
            }
        });
    });

    function showToast(message) {
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerText = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add("show"), 100);
        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    /*=========================
    READING SCROLL PROGRESS
    =========================*/
    const progress = document.createElement("div");
    progress.className = "scroll-progress";
    document.body.appendChild(progress);

    window.addEventListener("scroll", () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        if (total > 0) {
            const current = (window.pageYOffset / total) * 100;
            progress.style.width = current + "%";
        }
    });

});