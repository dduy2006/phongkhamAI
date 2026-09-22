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