/* =========================================
   AI CLINIC - APP.JS
   Xử lý tương tác cơ bản trên trang chủ
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // 1. Hiển thị năm hiện tại ở chân trang
    const yearElement = document.querySelector("footer .text-slate-500");

    if (yearElement) {
        yearElement.textContent =
            `© ${new Date().getFullYear()} AI Clinic. All rights reserved.`;
    }


    // 2. Hiệu ứng khi cuộn trang
    const header = document.querySelector("header");

    if (header) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 20) {
                header.classList.add("shadow-md");
            } else {
                header.classList.remove("shadow-md");
            }
        });
    }


    // 3. Cuộn mượt khi nhấn liên kết nội bộ
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // 4. Hiệu ứng thông báo khi nhấn nút đặt lịch
    const bookingButtons = document.querySelectorAll(
        'a[href="booking.html"]'
    );

    bookingButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            console.log("Người dùng đang truy cập chức năng đặt lịch khám.");
        });
    });


    // 5. Hiệu ứng thông báo khi truy cập tư vấn AI
    const aiButtons = document.querySelectorAll(
        'a[href="ai-consultation.html"]'
    );

    aiButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            console.log("Người dùng đang truy cập chức năng tư vấn AI.");
        });
    });


    console.log("AI Clinic đã tải thành công.");
});