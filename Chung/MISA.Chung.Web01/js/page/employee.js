

$(document).ready(function () {

    dialog = $(".m-dialog").dialog({
        autoOpen: false,
        width: 700,
        modal: true,
    });
    dialogUpdate = $(".m-dialog").dialog({
        autoOpen: false,
        width: 700,
        modal: true,
    });

    search();
    loadData();
    reload();
    initEvens();
    formatDate();
    addEmployee();
    clickEven();
})

/**
 * Thực hiện load dữ liệu
 * Author: NVMANH (07/12/2020)
 * */

function loadData() {
    // load dữ liệu:
    // 1. Bước 1: gọi service lấy dữ liệu: (api.manhnv.net/api/customes)
    debugger;
    $.ajax({
        url: 'https://localhost:44302/api/v1/Employees',
        method: 'GET',
    }).done(res => loadTable(res)).fail(function (response) {
        
    })
}

function addEmployee() {
    $("#btnSave").click(function () {
        var employeeCode = $("#txtEmployeeCode").val();
        console.log(employeeCode);
        var fullName = $("#txtFullName").val();
        console.log(fullName);
        var dob = $("#dtDateOfBirth").val();
        console.log(dob);
        var gender = $("#cbxGender").val();
        console.log(gender);
        var CCCD = $("#txtCCCD").val();
        console.log(CCCD);
        var CCCDDate = $("#dtCCCDDate").val();
        console.log(CCCDDate);
        var address = $("#txtAddress").val();
        console.log(address);
        var email = $("#txtEmail").val();
        console.log(email);
        var phoneNumber = $("#txtPhoneNumber").val();
        console.log(phoneNumber);
        var position = $("#cbxPosition").val();
        console.log(position);
        var room = $("#cbxRoom").val();
        console.log(room);
        var taxNumber = $("#txtTaxNumber").val();
        console.log(taxNumber);
        var salary = $("#txtSalary").val();
        console.log(salary);
        var joinedDate = $("#dtJoinDate").val();
        console.log(joinedDate);
        var work = $("#txtWork").val();
        console.log(work);
        var employee = {
            "EmployeeCode": employeeCode,
            "FullName": fullName,
            "CCCD": CCCD,
            "CCCDDate": CCCDDate,
            "DOB": dob,
            "GenderName": gender,
            "Email": email,
            "PhoneNumber": phoneNumber,
            "Position": position,
            "TaxNumber": taxNumber,
            "Salary": salary,
            "Room": room,
            "JoinDate": joinedDate,
            "Work": work,
            "Address": address
        }
        $.ajax({
            url: 'https://localhost:44302/api/v1/Employees',
            method: 'POST',
            data: JSON.stringify(employee),
            contentType: 'application/json'
        }).done(function (res) {
            alert(res.messenger);
            $(".m-dialog").hide();
            dialog.dialog('close');
        }).fail(function (res) {
            console.log(res);
            alert(res.responseJSON.title);
        })
        
    })

}

function updateEmployee() {
    $('#btnUpdate').dblclick(function () {
        var employeeCode = $("#txtEmployeeCode").val();
        console.log(employeeCode);
        var fullName = $("#txtFullName").val();
        console.log(fullName);
        var dob = $("#dtDateOfBirth").val();
        console.log(dob);
        var gender = $("#cbxGender").val();
        console.log(gender);
        var CCCD = $("#txtCCCD").val();
        console.log(CCCD);
        var CCCDDate = $("#dtCCCDDate").val();
        console.log(CCCDDate);
        var address = $("#txtAddress").val();
        console.log(address);
        var email = $("#txtEmail").val();
        console.log(email);
        var phoneNumber = $("#txtPhoneNumber").val();
        console.log(phoneNumber);
        var position = $("#cbxPosition").val();
        console.log(position);
        var room = $("#cbxRoom").val();
        console.log(room);
        var taxNumber = $("#txtTaxNumber").val();
        console.log(taxNumber);
        var salary = $("#txtSalary").val();
        console.log(salary);
        var joinedDate = $("#dtJoinDate").val();
        console.log(joinedDate);
        var work = $("#txtWork").val();
        console.log(work);

        var employee = {
            "employeeId": employeeId,
            "id": employeeId,
            "employeeCode": employeeCode,
            "fullName": fullName,
            "CCCD": CCCD,
            "CCCDDate": CCCDDate,
            "Address": Address,
            "dateOfBirth": dob,
            "gender": gender,
            "email": email,
            "phoneNumber": phoneNumber,
            "position": position,
            "taxNumber": taxNumber,
            "salary": salary,
            "room": room,
            "work": work,
            "joinDate": joinDate
        }

        $.ajax({
            url: 'https://localhost:44302/api/v1/Employees',
            method: 'PUT',
            data: JSON.stringify(employee),
            contentType: 'application/json'
        }).done(function (res) {
            alert(res.messenger);
            $(".m-dialog").hide();
            dialogUpdate.dialog('close');

        }).fail(function (res) {
            alert(res.responseJSON.messenger.join('\n'));
        })

    })
}

function search() {
    $('#txtSearchCodePhoneName').keypress(event => {
        if (event.keyCode == 13 || event.which == 13) {
            var codephonename = $('#txtSearchCodePhoneName').val();
            var position = $('#position').find('option:select').val();
            var roomId = $('#room').find('option:select').val();
            $.ajax({
                url: 'https://localhost:44302/api/v1/Employees/search',
                data: {
                    'codePhoneName': codephonename,
                    'jobId': position,
                    'departmentId': roomId
                },
                method: 'GET',
            }).done(response => loadTable(response))
        }
    })

    $('#cbxJobSearch').keypress(event => {
        if (event.keyCode == 13 || event.which == 13) {
            var codephonename = $('#txtSearchCodePhoneName').val();
            var position = $('#position').find('option:select').val();
            var roomId = $('#room').find('option:select').val();
            $.ajax({
                url: 'https://localhost:44302/api/v1/Employees/search',
                data: {
                    'codePhoneName': codephonename,
                    'jobId': position,
                    'departmentId': roomId
                },
                method: 'GET',
            }).done(response => loadTable(response))
        }
    })
}



function reload() {
    $('#btnRefresh').click(function () {
        location.reload();
    });
}
/**
 * Thực hiện gán các sự kiện
 * Author: NVMANH (07/12/2020)
 * */
function initEvens() {
    // Gán các sự kiện:
    $('#btnAdd').click(function () {
        dialog.dialog('open');
        $('#btnUpdate').hide();
        $('#btnSave').show();
        $.ajax({
            url: 'https://localhost:44302/api/v1/Employees/max-code',
            method: 'GET'
        }).done(res => {
            $("#txtEmployeeCode").val(res.data.toString());
        })
    });
    
    $('#btnCancel').click(function () {
        dialog.dialog('close');
    })
}

function loadTable(response) {
    $('#tbListData tbody').empty();
    var data = response.data;
    var listId = [];
    for (var i = 0; i < response.data.length; i++) {
        listId.push(data[i].employeeId);
        var trHtml = `<tr class="el-table__row first">
                            <td rowspan="1" colspan="1"><div class="cell">${data[i].employeeCode}</div></td>
                            <td rowspan="1" colspan="1"><div class="cell">${data[i].fullName}</div></td>
                            <td rowspan="1" colspan="1"><div class="cell">${formatGender(data[i].genderName)}</div></td>
                            <td rowspan="1" colspan="1"><div class="cell text-align-center">${formatDate(data[i].dob)}</div></td>
                            <td rowspan="1" colspan="1"><div class="cell">${data[i].phoneNumber}</div></td>
                            <td rowspan="1" colspan="1"><div class="cell">${data[i].email}</div></td>
                            <td rowspan="1" colspan="1"><div class="cell">${formatPositon(data[i].position)}</div></td>
                            <td rowspan="1" colspan="1"><div class="cell">${formatRoom(data[i].room)}</div></td>
                            <td rowspan="1" colspan="1"><div class="cell">${data[i].salary}</div></td>
                            <td rowspan="1" colspan="1"><div class="cell">${data[i].work}</div></td>
                        </tr>`;
        $('#tbListData >tbody:last-child').append(trHtml);
    }
}

function clickEven() {
    var listId = [];
    $('#tbListData tbody').mousedown(function (event) {
        selectRow = this.rowIndex;
        var employeeCode = this.cells[0].textContent;
        console.log(employeeCode);
        if (event.ctrlKey) {
            console.log(this);
            var conf = confirm("Xóa nhân viên " + listId[this.rowIndex - 1]);
            if (conf == true) {
                $.ajax({
                    url: 'https://localhost:44302/api/v1/Employees/id=' + employeeCode,
                    method: 'DELETE',
                }).done(res => loadTable(res)).fail(function (response) {

                })
            }
        }
    })

    $('#tbListData tbody').on('click', 'tr', function () {
        selectRow = this.rowIndex;
        var employeeCode = this.cells[0].textContent + "";
        console.log(employeeCode);
        $.ajax({
            url: 'https://localhost:44302/api/v1/Employees/code=' + employeeCode,
            method: 'GET',
        }).done(res => {
            dialogUpdate.dialog('open');

            $('#btnUpdate').show();
            $('#btnSave').hide();

            var data = res.data;
            console.log(data);
            $("#txtEmployeeCode").val(data.employeeCode);
            $("#txtFullName").val(data.employeeName);
            dob = data.dob;
            if (dob != null) {
                $("#dtDateOfBirth").val(formatDateTable(dob));
            }
            $("#txtCCCD").val(data.CCCD);
            if (data.CCCD != null) {
                $("#dtCCCDDate").val(formatDateTable(data.CCCDDate));
            }
            $("#txtAddress").val(data.address);
            $("#txtEmail").val(data.email);
            $("#txtPhoneNumber").val(data.phoneNumber);

            $("#cbxPosition").value = data.position;

            $("#cbxRoom").value = data.room;

            $("#txtTaxNumber").val(data.taxNumber);
            $("#txtSalary").val(data.salary);

            if (data.joinDate != null) {
                $("#dtJoinDate").val(formatDateTable(data.joinDate))
            }

            $("#txtWork").val(data.work);


        }).fail(res => console.log(res))
    });
}

function formatDateTable(date) {
    var date = new Date(date),
        month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

/**
 * Hàm thực hiện định dạng ngày tháng (ngày/tháng/năm)
 * @param {Number} date ngày truyền vào
 * Author: NVMANH (07/12/2020)
 */
function formatDate(date) {
    var date = new Date(date);
    // lấy ngày:
    var day = date.getDate();

    // lấy tháng:
    var month = date.getMonth() + 1;

    // lấy năm:
    var year = date.getFullYear();
    return day + '/' + month + '/' + year;
}

function formatGender(gender) {
    console.log(gender);
    if (gender == 0) {

        return "Nam";
    }
    else if (gender == 1) {
        return "Nữ";
    }
    else return "Khác";
}
function formatPositon(position) {
    if (position == 3) {

        return "Giám đốc";
    }
    if (position == 1) {

        return "Thu ngân";
    }

    if (position == 2) {

        return "Nhân viên Marketing";
    }
}

function formatRoom(room) {
    if (room == 3) {

        return "Phòng nhân sự";
    }
    if (room == 1) {

        return "Phòng đào tạo";
    }

    if (room == 2) {

        return "Phòng công nghệ";
    }
    if (room == 4) {

        return "Phòng Marketing";
    }
    //else return "Khác";
}