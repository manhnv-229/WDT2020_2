

$(document).ready(function () {

    dialog = $(".m-dialog").dialog({
        autoOpen: false,
        width: 700,
        modal: true,
    });

    loadData();
    reload();
    initEvens();
    //formatDate();
    addCustomer();
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
        url: 'https://localhost:44384/api/Customers',
        method: 'GET',
    }).done(function (response) {
        // 2. Bước 2: xử lý dữ liệu

        // 3. Bước 3: Build html và append lên UI:
        $('#tbListData tbody').empty();
        for (var i = 0; i < response.length; i++) {
            console.log(response[i].GenderName);
            //var DOB = formatDate(response[i].DateOfBirth);
            //var gender = formatGender(response[i].GenderName);
            var trHtml = `<tr class="el-table__row first">
                        <td rowspan="1" colspan="1" style="width: 190px;"><div class="cell">${response[i].StaffCode}</div></td>
                        <td rowspan="1" colspan="1" style="width: 133px;"><div class="cell">${response[i].FullName}</div></td>
                        <td rowspan="1" colspan="1" style="width: 48px;"><div class="cell">${formatGender(response[i].GenderName)}</div></td>
                        <td rowspan="1" colspan="1" style="width: 90px;"><div class="cell text-align-center">${formatDate(response[i].DOB)}</div></td>
                        <td rowspan="1" colspan="1" style="width: 62px;"><div class="cell">${response[i].PhoneNumber}</div></td>
                        <td rowspan="1" colspan="1" style="width: 109px;"><div class="cell">${response[i].Email}</div></td>
                        <td rowspan="1" colspan="1" style="width: 182px;"><div class="cell">${response[i].Positon}</div></td>
                        <td rowspan="1" colspan="1" style="width: 222px;"><div class="cell">${response[i].Room}</div></td>
                        <td rowspan="1" colspan="1" style="width: 88px;"><div class="cell">${response[i].Work}</div></td>
                    </tr>`;
            $('#tbListData >tbody:last-child').append(trHtml);
        }

    }).fail(function (response) {

    })




}

function addCustomer() {
    $("#btnSave").click(function () {
        var staffCode = $("#txtStaffCode").val();
        var fullName = $("#txtFullName").val();
        var dob = formatDate($("#dtDateOfBirth").val());
        var gender = $("#cbxGender").children("option").filter(":selected").text();
        var CCCD = $("#txtCCCD").val();
        var CCCDDate = formatDate($("#dtCCCDDate").val());
        var address = $("#txtAdrress").val();
        var email = $("#txtEmail").val();
        var phoneNumber = $("#txtPhoneNumber").val();
        var position = $("#cbxPosition").children("option").filter(":selected").text();
        var room = $("#cbxRoom").children("option").filter(":selected").text();
        var taxNumber = $("#txtTaxNumber").val();
        var salary = $("#txtSalary").val();
        var joinedDate = formatDate($("#dtJoinDate").val());
        var work = $("#cbxWork").children("option").filter(":selected").text();
        if (!staffCode || !fullName || !email || !CCCD || !phoneNumber) {
            alert("Không được bỏ trống!");
            return;
        }
        var staff = {
            "StaffCode": staffCode,
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
            url: 'https://localhost:44384/api/Staff',
            method: 'POST',
            data: JSON.stringify(staff),
            contentType: 'application/json'
        }).done(function (res) {
            console.info(res);
        }).fail(function (res) {
            console.info(res);
        })
        $(".m-dialog").hide();
    })

}

function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
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
    })

    $('#btnCancel').click(function () {
        dialog.dialog('close');
    })
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
    if (gender = 1) {

        return "Nam";
    }
    else if (gender = 0) {
        return "Nữ";
    }
    //else return "Khác";
}