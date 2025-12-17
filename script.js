document.addEventListener("DOMContentLoaded", () => {

    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navLinksItems = document.querySelectorAll(".nav-links a");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        navLinksItems.forEach(item => {
            item.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href");
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: "smooth"
                });
            }
        });
    });


    const bookingForm = document.getElementById("bookingForm");
    const bookingModal = document.getElementById("bookingModal");
    const closeModalBtn = document.querySelector(".close-modal");
    const closeModalBtn2 = document.getElementById("closeModalBtn");
    const referenceIdElement = document.getElementById("referenceId");

    if (bookingForm && bookingModal && referenceIdElement) {
        bookingForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            const timestamp = Date.now().toString().slice(-6);
            const randomNum = Math.floor(Math.random() * 1000);
            const referenceId = `ADS-${new Date().getFullYear()}-${timestamp}${randomNum}`;

            referenceIdElement.textContent = referenceId;
            bookingModal.style.display = "flex";

            console.log("Booking submitted:", data);
            this.reset();
        });
    }

    if (closeModalBtn && bookingModal) {
        closeModalBtn.addEventListener("click", () => {
            bookingModal.style.display = "none";
        });
    }

    if (closeModalBtn2 && bookingModal) {
        closeModalBtn2.addEventListener("click", () => {
            bookingModal.style.display = "none";
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === bookingModal) {
            bookingModal.style.display = "none";
        }
    });

    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const paymentDetails = document.getElementById("paymentDetails");

    function updatePaymentDetails(method) {
        if (!paymentDetails) return;

        let details = "";

        switch (method) {
            case "cash":
                details = "<p>You can make payment when you visit our shop. We accept cash in Ghana Cedis (GHS).</p>";
                break;
            case "mobile_money":
                details = "<p>We accept MTN MoMo, Vodafone Cash, and AirtelTigo Money after booking confirmation.</p>";
                break;
            case "card":
                details = "<p>Visa and Mastercard payments are accepted. A payment link will be sent.</p>";
                break;
            default:
                details = "<p>Please select a payment option.</p>";
        }

        paymentDetails.innerHTML = details;
    }

    paymentRadios.forEach(radio => {
        radio.addEventListener("change", function () {
            updatePaymentDetails(this.value);
        });
    });

    updatePaymentDetails("cash");

    const appointmentDate = document.getElementById("appointmentDate");
    if (appointmentDate) {
        const today = new Date().toISOString().split("T")[0];
        appointmentDate.min = today;

        const defaultDate = new Date();
        defaultDate.setDate(defaultDate.getDate() + 3);
        appointmentDate.value = defaultDate.toISOString().split("T")[0];
    }

    window.addEventListener("scroll", () => {
        const sections = document.querySelectorAll("section[id]");
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute("id");

            const link = document.querySelector(`.nav-links a[href*="${sectionId}"]`);
            if (!link) return;

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    });

    const openMapBtn = document.getElementById("openMap");
    if (openMapBtn) {
        openMapBtn.addEventListener("click", () => {
            window.open(
                "https://www.google.com/maps/search/?api=1&query=Osu+Accra+Ghana",
                "_blank"
            );
        });
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animated");
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll(".service-card, .portfolio-item").forEach(el => {
        observer.observe(el);
    });

    document.querySelectorAll("img").forEach(img => {
        img.addEventListener("load", () => {
            img.classList.add("loaded");
        });
    });

});
