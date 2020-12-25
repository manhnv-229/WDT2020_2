$(document).ready(function () {

    dialog = $(".m-dialog").dialog({
        autoOpen: false,
        width: 700,
        modal: true,
    });

    //loadData();
    reload();
    initEvens();
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
        url: 'http://api.manhnv.net/api/customers',
        method: 'GET',
    }).done(function (response) {
        console.log(response);
        debugger;
        // 2. Bước 2: xử lý dữ liệu

        // 3. Bước 3: Build html và append lên UI:
        $('#tbListData tbody').empty();
        for (var i = 0; i < response.length; i++) {
            console.log(response[i]);
            var DOB = formatDate(response[i].DateOfBirth);
            var trHtml = `<tr class="el-table__row first">
                        <td rowspan="1" colspan="1" style="width: 100px;">
                            <div class="cell">${response[i].CustomerCode}</div>
                        </td>
                        <td rowspan="1" colspan="1" style="width: 143px;">
                            <div class="cell">${response[i].FullName}</div>
                        </td>
                        <td rowspan="1" colspan="1" style="width: 58px;"><div class="cell">${response[i].GenderName}</div></td>
                        <td rowspan="1" colspan="1" style="width: 100px;"><div class="cell text-align-center">${DOB}</div></td>
                        <td rowspan="1" colspan="1" style="width: 72px;"><div class="cell">${response[i].CustomerGroupName}</div></td>
                        <td rowspan="1" colspan="1" style="width: 119px;"><div class="cell">${response[i].PhoneNumber}</div></td>
                        <td rowspan="1" colspan="1" style="width: 192px;"><div class="cell">${response[i].Email}</div></td>
                        <td rowspan="1" colspan="1" style="width: 232px;"><div class="cell">${response[i].Address}</div></td>
                        <td rowspan="1" colspan="1" class="text-align-right" style="width: 55px;"><div class="cell">${response[i].DebitAmount || ""}</div></td>
                        <td rowspan="1" colspan="1" style="width: 98px;"><div class="cell">${response[i].MemberCardCode}</div></td>
                        <td rowspan="1" colspan="1" style="width: 32px;"><div class="cell"></div></td>
                    </tr>`;
            $('#tbListData >tbody:last-child').append(trHtml);

            
        }

    }).fail(function (response) {

    })

}

function addCustomer() {
    $("#btnSave").click(function () {
        var customerCode = $("#txtCustomerCode").val();
        var fullName = $("#txtFullName").val();
        var memberCardCode = $("#txtMemberCardCode").val();
        var customerGroupName = $("#cbxCustomerGroup").children("option").filter(":selected").text();
        var dob = formatDate($("#dtDateOfBirth").val());
        var gender = $("#cbxGender").children("option").filter(":selected").text();
        var email = $("#txtEmail").val();
        var phoneNumber = $("#txtPhoneNumber").val();
        var address = $("#txtAdrress").val();
        var trHTML = `<tr>
                        <td>${customerCode}</td>
                        <td>${fullName}</td>
                        <td>${gender}</td>
                        <td>${dob}</td>
                        <td>${customerGroupName}</td>
                        <td>${phoneNumber}</td>
                        <td>${email}</td>
                        <td>${address}</td>
                        <td>${"Chưa rõ"}</td>
                        <td>${memberCardCode}</td>
                        </tr>`;
        $("#tbListData tbody").append(trHTML);
        $(".m-dialog").hide();
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