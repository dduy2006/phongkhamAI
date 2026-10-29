/* =========================================
   AI CLINIC - AUTH-CHECK.JS
   Kiểm tra đăng nhập và tự động thêm thanh User & Đăng xuất
========================================= */

document.addEventListener("DOMContentLoaded", function () {
    // 1. Kiểm tra xem người dùng đã đăng nhập chưa (trừ trang login và trang chủ index.html nếu muốn cho khách xem tự do)
    const currentPage = window.location.pathname.split("/").pop();
    const sessionData = localStorage.getItem("currentSession");

    // Nếu ở trang quản trị, lịch bác sĩ, kho, hóa đơn... mà chưa đăng nhập thì bắt buộc về login.html
    const protectedPages = ["admin-clinic.html", "doctor-schedule.html", "doctors.html", "inventory.html", "invoices.html", "patients.html", "medical-records.html"];
    
    if (protectedPages.includes(currentPage) && !sessionData) {
        alert("Vui lòng đăng nhập để truy cập chức năng này!");
        window.location.href = "login.html";
        return;
    }

    // 2. Nếu đã đăng nhập, tự động tạo thanh hiển thị tài khoản & nút đăng xuất ở góc trên bên phải màn hình
    if (sessionData) {
        try {
            const user = JSON.parse(sessionData);

            // Kiểm tra xem trang đã có thanh user chưa, nếu chưa thì tạo mới
            if (!document.getElementById("globalAuthBar")) {
                const bar = document.createElement("div");
                bar.id = "globalAuthBar";
                bar.className = "fixed top-4 right-4 z-50 flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-slate-200 text-xs sm:text-sm";
                
                bar.innerHTML = `
                    <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                        ${user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                        <p class="font-bold text-slate-800 leading-tight">${user.name || user.username}</p>
                        <span class="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-semibold">${user.role || "Thành viên"}</span>
                    </div>
                    <button onclick="globalLogout()" title="Đăng xuất tài khoản" class="ml-2 bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-xl transition flex items-center gap-1 font-semibold">
                        <i class="fa-solid fa-right-from-bracket"></i>
                        <span class="hidden sm:inline">Đăng xuất</span>
                    </button>
                `;
                document.body.appendChild(bar);
            }
        } catch (e) {
            console.error("Lỗi đọc thông tin phiên làm việc:", e);
        }
    }
});

// Hàm đăng xuất toàn cục
function globalLogout() {
    if (confirm("Bạn có chắc chắn muốn đăng xuất khỏi tài khoản không?")) {
        localStorage.removeItem("currentSession");
        window.location.href = "login.html";
    }
}