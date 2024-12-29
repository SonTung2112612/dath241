document.addEventListener("DOMContentLoaded", function () {
    fetchCustomers();
});

document.getElementById('openFormBtn').addEventListener('click', function () {
    document.getElementById('formContainer').style.display = 'block';
});
// Đóng form đăng nhập
function closeLoginForm() {
    document.getElementById('formContainer').style.display = 'none';
}
document.querySelector('.close-btn').addEventListener('click', closeLoginForm);
//chuyển tab trong form đăng nhậpnhập
function openTab(event, tabId) {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => link.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    event.currentTarget.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

document.getElementById('defaultTab').click();

const tabs = document.querySelectorAll('.tab-container button');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Loại bỏ lớp active khỏi tất cả các tab
        tabs.forEach(t => t.classList.remove('active'));

        // Thêm lớp active vào tab hiện tại
        tab.classList.add('active');

        // Cập nhật nội dung bảng hoặc giao diện khác nếu cần
        console.log(`Tab ${tab.textContent} được chọn.`);
    });
});

// Xử lý tìm kiếm
document.querySelector('.search-container button').addEventListener('click', () => {
    const searchInput = document.querySelector('.search-container input').value;
    console.log(`Tìm kiếm: ${searchInput}`);
    // Thực hiện hành động tìm kiếm và cập nhật dữ liệu trong bảng
});
// Hàm thêm vào bảng

document.addEventListener("DOMContentLoaded", function () {
    // Các đoạn mã có sẵn vẫn giữ nguyên ở đây

    // Thêm chức năng xử lý form "Thêm hàng mới"
    const addRowBtn = document.getElementById("addRowBtn");
    const addRowForm = document.getElementById("addRowForm");
    const newRowForm = document.getElementById("newRowForm");

    // Mở form thêm hàng
    addRowBtn.addEventListener("click", function () {
        addRowForm.style.display = "block";
    });

    // Đóng form thêm hàng
    function closeForm() {
        addRowForm.style.display = "none";
    }

    // Xử lý khi submit form
    newRowForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Lấy giá trị từ form
        const newRow = [
            document.getElementById("BusinessEntityID").value,
            document.getElementById("PersonType").value,
            document.getElementById("NameStyle").value,
            document.getElementById("FirstName").value,
            document.getElementById("LastName").value,
            document.getElementById("EmailAddress").value,
            document.getElementById("EmailPromotion").value,
            document.getElementById("AddressType").value,
            document.getElementById("AddressLine1").value,
            document.getElementById("City").value,
            document.getElementById("StateProvinceName").value,
            document.getElementById("CountryRegionName").value,
            document.getElementById("PostalCode").value
        ];

        // Thêm dữ liệu vào bảng
        function addRowToTable(row) {
            const tableBody = document.querySelector("#dataTable tbody");
        
            const tr = document.createElement("tr");
        
            row.forEach((col, colIndex) => {
                const td = document.createElement("td");
        
                if (colIndex === row.length - 1) { // Cột PostalCode
                    const link = document.createElement("a");
                    link.textContent = "See postalCode";
                    link.href = "#";
                    link.addEventListener("click", function (e) {
                        e.preventDefault();
                        alert(`PostalCode: ${col}`);
                    });
                    td.appendChild(link);
                } else {
                    td.textContent = col;
                }
        
                tr.appendChild(td);
            });
        
            // Thêm nút "Xóa" vào cột cuối
            const actionTd = document.createElement("td");
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Xóa";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", function () {
                tr.remove(); // Xóa hàng khỏi bảng
            });
            actionTd.appendChild(deleteBtn);
            tr.appendChild(actionTd);
        
            tableBody.appendChild(tr);
        }
        

        // Đóng form
        closeForm();
    });

    // Gắn hàm đóng form vào nút đóng
    window.closeForm = closeForm;

    // Hàm thêm hàng vào bảng
    function addRowToTable(row) {
        const tableBody = document.querySelector("#dataTable tbody");

        const tr = document.createElement("tr");
        row.forEach(col => {
            const td = document.createElement("td");
            td.textContent = col;
            tr.appendChild(td);
        });

        // Thêm nút "Xóa" vào cột cuối
        const actionTd = document.createElement("td");
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Xóa";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function () {
            tr.remove(); // Xóa hàng khỏi bảng
        });
        actionTd.appendChild(deleteBtn);
        tr.appendChild(actionTd);

        tableBody.appendChild(tr);
    }
});
/*
document.addEventListener("DOMContentLoaded", function () {
    const csvPath = "data.csv"; // Đường dẫn đến file CSV
    const rowsPerPage = 10; // Số hàng mỗi trang
    let currentPage = 1;
    let totalPages = 0;
    let dataRows = []; // Dữ liệu từ CSV

    // Hàm tải và phân tích dữ liệu CSV
    
    fetch(csvPath)
        .then(response => response.text())
        .then(text => {
            const rows = text.split("\n").filter(row => row.trim() !== "");
            const headers = rows[0].split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/); // Tách dòng tiêu đề
            dataRows = rows.slice(1).map(row => row.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/));

            totalPages = Math.ceil(dataRows.length / rowsPerPage); // Tính tổng số trang
            loadPageData(currentPage); // Hiển thị dữ liệu trang đầu tiên
            renderPagination(currentPage, totalPages); // Tạo phân trang
        })
        .catch(error => console.error("Error:", error));
    
    // Hàm hiển thị dữ liệu của trang hiện tại
    function loadPageData(page) {
        const tableBody = document.querySelector("#dataTable tbody");
        tableBody.innerHTML = ""; // Xóa dữ liệu cũ
    
        const startIdx = (page - 1) * rowsPerPage;
        const endIdx = Math.min(startIdx + rowsPerPage, dataRows.length);
    
        for (let i = startIdx; i < endIdx; i++) {
            const row = dataRows[i];
            const tr = document.createElement("tr");
    
            row.forEach((col, colIndex) => {
                const td = document.createElement("td");
    
                if (colIndex === 1) { // Cột PersonType
                    td.textContent = col.replace(/\"/g, "").trim();
                    td.addEventListener("mouseover", function () {
                        const typeDescriptions = {
                            "SC": "Store Contact",
                            "IN": "ndividual (retail) customer",
                            "SP": "Sales person",
                            "EM": "Employee (non-sales)",
                            "VC": "Vendor contact",
                            "GC": "General contact"
                        };
                        const tooltipText = typeDescriptions[td.textContent.trim()] || "Unknown person type";
                        td.setAttribute("title", tooltipText);
                    });
                    td.addEventListener("mouseout", function () {
                        td.removeAttribute("title");
                    });
                } else if (colIndex === 2) { // Cột NameStyle
                    td.textContent = col.replace(/\"/g, "").trim();
                    td.addEventListener("mouseover", function () {
                        if (td.textContent.trim() === "0") {
                            td.setAttribute("title", "Western name style");
                        } else if (td.textContent.trim() === "1") {
                            td.setAttribute("title", "Eastern name style");
                        }
                    });
                    td.addEventListener("mouseout", function () {
                        td.removeAttribute("title");
                    });
                } else if (colIndex === 6) { // Cột EmailPromotion
                    td.textContent = col.replace(/\"/g, "").trim();
                    td.addEventListener("mouseover", function () {
                        const promotionDescriptions = {
                            "0": "Contact does not wish to receive e-mail promotions",
                            "1": "Contact does wish to receive e-mail promotions from AdventureWorks",
                            "2": "Contact does wish to receive e-mail promotions from AdventureWorks and selected partners"
                        };
                        const tooltipText = promotionDescriptions[td.textContent.trim()] || "Unknown promotion preference";
                        td.setAttribute("title", tooltipText);
                    });
                    td.addEventListener("mouseout", function () {
                        td.removeAttribute("title");
                    });
                } else if (colIndex === row.length - 1) { // Cột PostalCode
                    const link = document.createElement("a");
                    link.textContent = "See Postalcode";
                    link.href = "#";
                    link.addEventListener("click", function (e) {
                        e.preventDefault();
                        alert(`PostalCode: ${col.replace(/\"/g, "").trim()}`);
                    });
                    td.appendChild(link);
                } else {    
                    td.textContent = col.replace(/\"/g, "").trim();
                }
                tr.appendChild(td);
            });
            const actionTd = document.createElement("td");
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Xóa";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", function () {
                // Xóa hàng từ dataRows và cập nhật bảng
                dataRows.splice(i, 1);
                totalPages = Math.ceil(dataRows.length / rowsPerPage);
                loadPageData(currentPage);
                renderPagination(currentPage, totalPages);
            });
            actionTd.appendChild(deleteBtn);
            tr.appendChild(actionTd);

            tableBody.appendChild(tr);
        }
    }
    
    // Hàm hiển thị giao diện phân trang
    function renderPagination(currentPage, totalPages) {
        const paginationContainer = document.querySelector(".pagination");
        paginationContainer.innerHTML = ""; // Xóa nội dung cũ

        if (currentPage > 1) {
            paginationContainer.innerHTML += `<span class="page-link" data-page="1">&laquo;</span>`;
        } else {
            paginationContainer.innerHTML += `<span class="page-link disabled">&laquo;</span>`;
        }

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                paginationContainer.innerHTML += `<span class="page-link ${i === currentPage ? "active" : ""}" data-page="${i}">${i}</span>`;
            }
        } else {
            if (currentPage > 3) {
                paginationContainer.innerHTML += `<span class="page-link" data-page="1">1</span>`;
                if (currentPage > 4) {
                    paginationContainer.innerHTML += `<span class="page-link disabled">...</span>`;
                }
            }

            const startPage = Math.max(1, currentPage - 2);
            const endPage = Math.min(totalPages, currentPage + 2);

            for (let i = startPage; i <= endPage; i++) {
                paginationContainer.innerHTML += `<span class="page-link ${i === currentPage ? "active" : ""}" data-page="${i}">${i}</span>`;
            }

            if (currentPage < totalPages - 2) {
                if (currentPage < totalPages - 3) {
                    paginationContainer.innerHTML += `<span class="page-link disabled">...</span>`;
                }
                paginationContainer.innerHTML += `<span class="page-link" data-page="${totalPages}">${totalPages}</span>`;
            }
        }

        if (currentPage < totalPages) {
            paginationContainer.innerHTML += `<span class="page-link" data-page="${totalPages}">&raquo;</span>`;
        } else {
            paginationContainer.innerHTML += `<span class="page-link disabled">&raquo;</span>`;
        }
    }

    // Sự kiện khi nhấn vào phân trang
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("page-link") && !e.target.classList.contains("disabled")) {
            currentPage = parseInt(e.target.dataset.page);
            loadPageData(currentPage);
            renderPagination(currentPage, totalPages);
        }
    });
});
// Xử lý phân trang
function renderPagination(currentPage, totalPages) {
    const paginationContainer = document.querySelector(".pagination");
    paginationContainer.innerHTML = ""; // Xóa nội dung cũ

    // Tạo nút "Trang đầu"
    if (currentPage > 1) {
        paginationContainer.innerHTML += `<span class="page-link" data-page="1">&laquo;</span>`;
    } else {
        paginationContainer.innerHTML += `<span class="page-link disabled">&laquo;</span>`;
    }

    // Hiển thị các nút trang
    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
            paginationContainer.innerHTML += `<span class="page-link ${i === currentPage ? "active" : ""}" data-page="${i}">${i}</span>`;
        }
    } else {
        if (currentPage > 3) {
            paginationContainer.innerHTML += `<span class="page-link" data-page="1">1</span>`;
            if (currentPage > 4) {
                paginationContainer.innerHTML += `<span class="page-link disabled">...</span>`;
            }
        }

        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);

        for (let i = startPage; i <= endPage; i++) {
            paginationContainer.innerHTML += `<span class="page-link ${i === currentPage ? "active" : ""}" data-page="${i}">${i}</span>`;
        }

        if (currentPage < totalPages - 2) {
            if (currentPage < totalPages - 3) {
                paginationContainer.innerHTML += `<span class="page-link disabled">...</span>`;
            }
            paginationContainer.innerHTML += `<span class="page-link" data-page="${totalPages}">${totalPages}</span>`;
        }
    }

    // Tạo nút "Trang cuối"
    if (currentPage < totalPages) {
        paginationContainer.innerHTML += `<span class="page-link" data-page="${totalPages}">&raquo;</span>`;
    } else {
        paginationContainer.innerHTML += `<span class="page-link disabled">&raquo;</span>`;
    }
}

// Sự kiện khi nhấn vào phân trang
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("page-link") && !e.target.classList.contains("disabled")) {
        const page = parseInt(e.target.dataset.page);
        // Thay đổi dữ liệu hiển thị dựa trên trang hiện tại (nếu cần)
        loadPageData(page);
        renderPagination(page, 10); // Thay 10 bằng tổng số trang thực tế
    }
});
*/
document.addEventListener("DOMContentLoaded", function () {
    fetchCustomers();
});

// Hàm mô phỏng tải dữ liệu trang
function loadPageData(page) {
    console.log(`Tải dữ liệu cho trang ${page}`);
    // Thực hiện hành động tải dữ liệu cho trang tương ứng
}

// Khởi tạo phân trang ban đầu
document.addEventListener("DOMContentLoaded", () => {
    renderPagination(1, 10); // Thay 10 bằng tổng số trang thực tế
});

// Kết nối API
const API_BASE_URL = "http://127.0.0.1:8000/api";

function addCustomer(data) {
    fetch("http://127.0.0.1:8000/api/addCustomer", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        console.log("Customer added:", result);
        fetchCustomers(); // Tải lại danh sách khách hàng
    })
    .catch(error => console.error("Error adding customer:", error));
}

function fetchCustomers() {
    fetch("http://127.0.0.1:8000/api/getCustomer")
        .then(response => response.json())
        .then(data => {
            console.log("Customers:", data);
            renderCustomers(data); // Hàm để hiển thị dữ liệu trên HTML
        })
        .catch(error => console.error("Error fetching customers:", error));
}

function deleteCustomer(customerId) {
    fetch(`http://127.0.0.1:8000/api/deleteCustomer/${customerId}`, {
        method: "DELETE",
    })
    .then(response => response.json())
    .then(result => {
        console.log("Customer deleted:", result);
        fetchCustomers(); // Tải lại danh sách khách hàng
    })
    .catch(error => console.error("Error deleting customer:", error));
}

function updateCustomer(customerId, updatedData) {
    fetch(`${API_BASE_URL}/updateCustomer/${customerId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
    })
    .then(response => response.json())
    .then(result => {
        console.log("Customer updated successfully:", result);
        fetchCustomers(); // Tải lại danh sách khách hàng
        closeEditForm();  // Đóng form chỉnh sửa
    })
    .catch(error => console.error("Error updating customer:", error));
}


function renderCustomers(customers) {
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = ""; // Xóa dữ liệu cũ

    customers.forEach(customer => {
        const row = `
            <tr>
                <td>${customer.BusinessEntityID}</td>
                <td>${customer.PersonType}</td>
                <td>${customer.NameStyle}</td>
                <td>${customer.FirstName}</td>
                <td>${customer.LastName}</td>
                <td>${customer.EmailAddress}</td>
                <td>${customer.AddressLine1}</td>
                <td>${customer.City}</td>
                <td>${customer.StateProvinceName}</td>
                <td>${customer.PostalCode}</td>
                <td>
                    <button onclick="deleteCustomer(${customer.BusinessEntityID})">Xóa</button>
                    <button onclick="editCustomer(${customer.BusinessEntityID})">Sửa</button>
                </td>
            </tr>
        `;
        tableBody.insertAdjacentHTML("beforeend", row);
    });
}


function editCustomer(customerId) {
    document.getElementById('editCustomerForm').style.display = 'block'; // Hiển thị form chỉnh sửa

    // Lấy thông tin khách hàng hiện tại
    fetch(`${API_BASE_URL}/getCustomer/${customerId}`)
        .then(response => response.json())
        .then(customer => {
            // Điền dữ liệu vào form
            document.getElementById('editFirstName').value = customer.FirstName;
            document.getElementById('editLastName').value = customer.LastName;
            document.getElementById('editEmailAddress').value = customer.EmailAddress;
            document.getElementById('editAddressLine1').value = customer.AddressLine1;
            document.getElementById('editCity').value = customer.City;
            document.getElementById('editStateProvinceName').value = customer.StateProvinceName;
            document.getElementById('editPostalCode').value = customer.PostalCode;
        });
}

function closeEditForm() {
    document.getElementById('editCustomerForm').style.display = 'none';
}


