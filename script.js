document.addEventListener("DOMContentLoaded", () => {
    hienThiThongTinUser();

    if (!localStorage.getItem("dsBenhNhan")) {
        localStorage.setItem("dsBenhNhan", JSON.stringify([
            { id: "bn005", ten: "Nông Đức Duy", tuoi: 25, gioiTinh: "Nam", sdt: "0901112233", diaChi: "Hà Nội" }
        ]));
    }
    if (!localStorage.getItem("dsKhoThuoc")) {
        localStorage.setItem("dsKhoThuoc", JSON.stringify([
            { maThuoc: "T001", tenThuoc: "Paracetamol 500mg", soLuong: 1250, donVi: "Viên", gia: "500 đ" },
            { maThuoc: "T002", tenThuoc: "Amoxicillin 500mg", soLuong: 420, donVi: "Viên", gia: "2,000 đ" }
        ]));
    }
    if (!localStorage.getItem("dsVienPhi")) {
        localStorage.setItem("dsVienPhi", JSON.stringify([
            { maHD: "HD001", tenBN: "Nông Đức Duy", noiDung: "Khám Tổng Quát", tongTien: "180,000 đ", trangThai: "Đã thanh toán" }
        ]));
    }
    if (!localStorage.getItem("dsLichHen")) {
        localStorage.setItem("dsLichHen", JSON.stringify([
            { id: 1, maBN: "bn005", tenBN: "Nông Đức Duy", ngayGui: "20/09/2026", khoaKham: "Khoa Nội Tổng Quát", trangThai: "Đã duyệt" }
        ]));
    }
    if (!localStorage.getItem("dsHuyetAp")) {
        localStorage.setItem("dsHuyetAp", JSON.stringify([
            { ngay: "20/09/2026", chiSo: "120/80 mmHg", ghiChu: "Đo buổi sáng", trangThai: "Ổn định" }
        ]));
    }

    loadAllData();
});

function hienThiThongTinUser() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const nameAdmin = document.getElementById("admin-welcome-name");
    const nameSide = document.getElementById("sidebar-patient-name");
    const inputTen = document.getElementById("ten-bn");

    if (nameAdmin && currentUser) nameAdmin.textContent = currentUser.fullName || currentUser.username;
    if (nameSide && currentUser) nameSide.textContent = currentUser.fullName || currentUser.username;
    if (inputTen && currentUser) inputTen.value = currentUser.fullName || "";
}

function switchTab(tabId, titleText, element) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    const target = document.getElementById(tabId);
    if (target) target.classList.add('active');

    document.querySelectorAll('.sidebar-menu .menu-item').forEach(m => m.classList.remove('active'));
    if (element) element.classList.add('active');

    if (document.getElementById('topbar-title')) document.getElementById('topbar-title').textContent = titleText;
    if (document.getElementById('current-breadcrumb')) document.getElementById('current-breadcrumb').textContent = titleText;
}

function switchPatientTab(tabId, titleText, element) {
    document.querySelectorAll('.tab-content-pane').forEach(tab => tab.classList.remove('active'));
    const target = document.getElementById(tabId);
    if (target) target.classList.add('active');

    document.querySelectorAll('.nav-item-pro').forEach(item => item.classList.remove('active'));
    if (element) element.classList.add('active');

    if (document.getElementById('patient-topbar-title')) {
        document.getElementById('patient-topbar-title').innerHTML = `<i class="fa-solid fa-circle-chevron-right text-success me-2"></i> ${titleText}`;
    }
}

function loadAllData() {
    loadBenhNhan();
    loadKhoThuoc();
    loadVienPhi();
    loadBangDuyetLichAdmin();
    loadDanhSachTaiKhoanChoDuyet();
    loadPatientData();
    capNhatThongKe();
}

function capNhatThongKe() {
    let dsBN = JSON.parse(localStorage.getItem("dsBenhNhan")) || [];
    let dsLich = JSON.parse(localStorage.getItem("dsLichHen")) || [];
    let dsTK = JSON.parse(localStorage.getItem("dsTaiKhoan")) || [];
    let dsThuoc = JSON.parse(localStorage.getItem("dsKhoThuoc")) || [];

    let lichCho = dsLich.filter(i => i.trangThai !== "Đã duyệt").length;
    let tkCho = dsTK.filter(i => i.trangThai === "Chờ duyệt" || !i.trangThai).length;

    if (document.getElementById("stat-tong-bn")) document.getElementById("stat-tong-bn").textContent = dsBN.length;
    if (document.getElementById("stat-lich-cho")) document.getElementById("stat-lich-cho").textContent = lichCho;
    if (document.getElementById("stat-tk-cho")) document.getElementById("stat-tk-cho").textContent = tkCho;
    if (document.getElementById("stat-kho-thuoc")) document.getElementById("stat-kho-thuoc").textContent = dsThuoc.length;

    if (document.getElementById("count-cho-duyet")) document.getElementById("count-cho-duyet").textContent = tkCho;
    if (document.getElementById("count-lich-hen")) document.getElementById("count-lich-hen").textContent = lichCho;
}

function loadBenhNhan() {
    const tbody = document.getElementById("table-benh-nhan-body");
    if (!tbody) return;
    let data = JSON.parse(localStorage.getItem("dsBenhNhan")) || [];
    let html = "";
    data.forEach(item => {
        html += `<tr><td><strong class="text-success">${item.id}</strong></td><td><b>${item.ten}</b></td><td>${item.tuoi}</td><td>${item.gioiTinh}</td><td>${item.sdt}</td><td>${item.diaChi}</td></tr>`;
    });
    tbody.innerHTML = html || `<tr><td colspan="6" class="text-center py-4 text-muted">Chưa có dữ liệu</td></tr>`;
}

function loadKhoThuoc() {
    const tbody = document.getElementById("table-kho-thuoc-body");
    if (!tbody) return;
    let data = JSON.parse(localStorage.getItem("dsKhoThuoc")) || [];
    let html = "";
    data.forEach(item => {
        html += `<tr><td><strong class="text-success">${item.maThuoc}</strong></td><td><b>${item.tenThuoc}</b></td><td><span class="badge bg-success">${item.soLuong}</span></td><td>${item.donVi}</td><td><b>${item.gia}</b></td></tr>`;
    });
    tbody.innerHTML = html || `<tr><td colspan="5" class="text-center py-4 text-muted">Kho trống</td></tr>`;
}

function loadVienPhi() {
    const tbody = document.getElementById("table-vien-phi-body");
    if (!tbody) return;
    let data = JSON.parse(localStorage.getItem("dsVienPhi")) || [];
    let html = "";
    data.forEach(item => {
        html += `<tr><td><strong class="text-success">${item.maHD}</strong></td><td><b>${item.tenBN}</b></td><td>${item.noiDung}</td><td><b class="text-primary">${item.tongTien}</b></td><td><span class="badge bg-success">${item.trangThai}</span></td></tr>`;
    });
    tbody.innerHTML = html || `<tr><td colspan="5" class="text-center py-4 text-muted">Chưa có hóa đơn</td></tr>`;
}

function loadBangDuyetLichAdmin() {
    const tbody = document.getElementById("table-duyet-lich-body");
    if (!tbody) return;
    let ds = JSON.parse(localStorage.getItem("dsLichHen")) || [];
    let html = "";
    ds.forEach((item, index) => {
        let badge = item.trangThai === "Đã duyệt" ? "bg-success" : "bg-warning text-dark";
        let btn = item.trangThai === "Đã duyệt" ? `<span class="text-success fw-bold">Đã duyệt</span>` : `<button class="btn btn-sm btn-success fw-bold px-3 shadow-sm" onclick="duyetYeuCau(${item.id})"><i class="fa-solid fa-check me-1"></i> Duyệt</button>`;
        html += `<tr><td>${index + 1}</td><td><strong class="text-success">${item.maBN}</strong></td><td><b>${item.tenBN}</b></td><td>${item.ngayGui}</td><td><span class="badge bg-light text-primary border">${item.khoaKham}</span></td><td><span class="badge ${badge}">${item.trangThai}</span></td><td class="text-center">${btn}</td></tr>`;
    });
    tbody.innerHTML = html || `<tr><td colspan="7" class="text-center py-4 text-muted">Chưa có lịch hẹn</td></tr>`;
}

function duyetYeuCau(id) {
    let ds = JSON.parse(localStorage.getItem("dsLichHen")) || [];
    ds = ds.map(i => { if (i.id === id) i.trangThai = "Đã duyệt"; return i; });
    localStorage.setItem("dsLichHen", JSON.stringify(ds));
    Swal.fire({ icon: 'success', title: 'Đã duyệt lịch hẹn!', timer: 1000, showConfirmButton: false });
    loadAllData();
}

function loadDanhSachTaiKhoanChoDuyet() {
    const tbody = document.getElementById("table-duyet-tai-khoan-body");
    if (!tbody) return;
    let ds = JSON.parse(localStorage.getItem("dsTaiKhoan")) || [];
    let choDuyet = ds.filter(tk => tk.trangThai === "Chờ duyệt" || !tk.trangThai);
    let html = "";
    choDuyet.forEach((item, index) => {
        html += `<tr><td>${index + 1}</td><td><strong class="text-primary">${item.username}</strong></td><td><b>${item.fullName || 'Khách hàng'}</b></td><td><span class="badge bg-warning text-dark">Chờ duyệt</span></td><td class="text-center"><button class="btn btn-sm btn-success fw-bold px-3 me-2 shadow-sm" onclick="duyetTaiKhoan('${item.username}')">Duyệt</button></td></tr>`;
    });
    tbody.innerHTML = html || `<tr><td colspan="5" class="text-center py-4 text-muted">Không có tài khoản chờ duyệt</td></tr>`;
}

function duyetTaiKhoan(username) {
    let ds = JSON.parse(localStorage.getItem("dsTaiKhoan")) || [];
    ds = ds.map(tk => { if (tk.username === username) tk.trangThai = "Đã duyệt"; return tk; });
    localStorage.setItem("dsTaiKhoan", JSON.stringify(ds));
    Swal.fire({ icon: 'success', title: `Đã kích hoạt ${username}!`, timer: 1200, showConfirmButton: false });
    loadAllData();
}

function loadPatientData() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser")) || { username: "bn005", fullName: "Nông Đức Duy" };
    let currentUsername = currentUser.username.trim().toLowerCase();
    let currentFullName = currentUser.fullName ? currentUser.fullName.trim().toLowerCase() : "";

    if (document.getElementById("sidebar-patient-name")) {
        document.getElementById("sidebar-patient-name").textContent = currentUser.fullName || currentUser.username;
    }
    if (document.getElementById("ten-bn")) {
        document.getElementById("ten-bn").value = currentUser.fullName || "";
    }

    let dsLich = JSON.parse(localStorage.getItem("dsLichHen")) || [];
    let dsLichCuaToi = dsLich.filter(item => {
        let itemMaBN = (item.maBN || "").trim().toLowerCase();
        let itemTenBN = (item.tenBN || "").trim().toLowerCase();
        return itemMaBN === currentUsername || itemTenBN === currentFullName;
    });

    const tbodyLich = document.getElementById("table-patient-lich");
    let htmlLich = "";
    if (dsLichCuaToi.length === 0) {
        htmlLich = `<tr><td colspan="6" class="text-center text-muted py-4 fst-italic">Bạn chưa có lịch hẹn khám nào.</td></tr>`;
    } else {
        dsLichCuaToi.forEach((item, index) => {
            let badge = item.trangThai === "Đã duyệt" ? "bg-success" : "bg-warning text-dark";
            htmlLich += `<tr><td><b>${index + 1}</b></td><td><strong class="text-success">${item.maBN}</strong></td><td><b>${item.tenBN}</b></td><td>${item.ngayGui}</td><td><span class="badge bg-light text-primary border">${item.khoaKham}</span></td><td><span class="badge ${badge}">${item.trangThai}</span></td></tr>`;
        });
    }
    if (tbodyLich) tbodyLich.innerHTML = htmlLich;
    if (document.getElementById("h-lich-sap-toi")) {
        document.getElementById("h-lich-sap-toi").textContent = dsLichCuaToi.filter(i => i.trangThai === "Đã duyệt").length + " lịch hẹn";
    }

    let dsHA = JSON.parse(localStorage.getItem("dsHuyetAp")) || [];
    const tbodyHA = document.getElementById("table-huyet-ap");
    let htmlHA = "";
    dsHA.forEach(i => {
        htmlHA += `<tr><td><b>${i.ngay}</b></td><td><span class="badge bg-success">${i.chiSo}</span></td><td>${i.ghiChu || '-'}</td><td><span class="text-success fw-bold">${i.trangThai}</span></td></tr>`;
    });
    if (tbodyHA) tbodyHA.innerHTML = htmlHA || `<tr><td colspan="4" class="text-center text-muted py-3">Chưa có chỉ số</td></tr>`;
}

function xuLyDatLich(e) {
    e.preventDefault();
    let currentUser = JSON.parse(localStorage.getItem("currentUser")) || { username: "bn005", fullName: "Nông Đức Duy" };
    let ten = document.getElementById("ten-bn").value;
    let sdt = document.getElementById("sdt-bn").value;
    let khoa = document.getElementById("khoa-kham").value;
    let ngay = document.getElementById("ngay-kham").value;

    let dsLich = JSON.parse(localStorage.getItem("dsLichHen")) || [];
    dsLich.push({
        id: Date.now(),
        maBN: currentUser.username,
        tenBN: ten,
        sdt: sdt,
        khoaKham: khoa,
        ngayGui: ngay || new Date().toLocaleDateString(),
        trangThai: "Chờ duyệt"
    });
    localStorage.setItem("dsLichHen", JSON.stringify(dsLich));
    Swal.fire({ icon: 'success', title: 'Đặt lịch thành công!', confirmButtonColor: '#0e864d' }).then(() => {
        document.getElementById("form-dat-lich").reset();
        loadPatientData();
        switchPatientTab('tab-trang-thai-lich', 'Trạng Thái Lịch Hẹn', document.querySelectorAll('.nav-item-pro')[2]);
    });
}

function themHuyetAp(e) {
    e.preventDefault();
    let chiSo = document.getElementById("input-ha").value;
    let note = document.getElementById("input-note").value;
    let ds = JSON.parse(localStorage.getItem("dsHuyetAp")) || [];
    ds.unshift({ ngay: new Date().toLocaleDateString(), chiSo: chiSo, ghiChu: note, trangThai: "Ổn định" });
    localStorage.setItem("dsHuyetAp", JSON.stringify(ds));
    Swal.fire({ icon: 'success', title: 'Đã lưu huyết áp!', timer: 1000, showConfirmButton: false });
    document.getElementById("input-ha").value = "";
    document.getElementById("input-note").value = "";
    loadPatientData();
}

function dangXuat() {
    Swal.fire({ title: 'Đăng xuất?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#0e864d' }).then(res => {
        if (res.isConfirmed) { localStorage.removeItem("currentUser"); window.location.href = "login.html"; }
    });
}
function dangXuatPatient() { dangXuat(); }