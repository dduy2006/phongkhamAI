if (user === "admin" && pass === "123456") {
        let adminUser = { username: "admin", role: "admin", fullname: "Quản Trị Viên" };
        localStorage.setItem("currentUser", JSON.stringify(adminUser));
        
        Swal.fire({
            icon: 'success',
            title: 'Đăng nhập thành công!',
            text: 'Chào      mừng Quản trị viên.',
            timer: 1500,
            showConfirmButton: false
        }).then(() => {
            window.location.href = "index.html"; // Đảm bảo đúng tên file giao diện quản trị của bạn
        });
        return false;
    }
    // Bắt sự kiện khi form đăng nhập được gửi đi
const formLogin = document.querySelector("form");

if (formLogin) {
    formLogin.addEventListener("submit", function(e) {
        e.preventDefault(); // Chặn trang web bị tải lại

        // Lấy giá trị từ các ô input dựa vào ID chuẩn trong HTML của bạn
        const emailNguoiDungNhap = document.querySelector("#email").value; // Hoặc đổi thành id của ô email nếu khác
        const matKhauNguoiDungNhap = document.querySelector("#password").value;[cite: 8]

        // Gọi API từ Google Sheets (SheetDB) về để kiểm tra
        fetch('https://sheetdb.io/api/v1/p21vsw6v2glwy')
        .then(response => response.json())
        .then(danhSachTuSheet => {
            
            // So khớp email và mật khẩu với dữ liệu trong bảng tính
            let taiKhoanHopLe = danhSachTuSheet.find(item => item.gmail === emailNguoiDungNhap && item.matkhau === matKhauNguoiDungNhap);

            if (taiKhoanHopLe) {
                alert("Đăng nhập thành công!");

                // Lưu tên người dùng tạm thời
                localStorage.setItem("nguoiDungDangNhap", taiKhoanHopLe["ho ten"]);

                // CHUYỂN THẲNG VÀO HỆ THỐNG
                window.location.href = "admin-clinic.html"; 
            } else {
                alert("Sai tài khoản hoặc mật khẩu, vui lòng kiểm tra lại!");
            }
        })
        .catch(error => {
            console.error("Lỗi kết nối:", error);
            alert("Không thể kết nối tới cơ sở dữ liệu!");
        });
    });
}