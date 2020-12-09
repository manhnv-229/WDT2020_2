
$(document).ready(function () {

    //Định nghĩa Dialog
    dialog = $(".dialog__content").dialog({
        autoOpen: false,
        height: 600,
        width: 750,
        modal: true,

    });
    loadData();

    $("#btnAdd").click(btnAddOnClick);
    $("#btncancel").click(btnCancelOnClick);
    debugger
    $("#tbListData").on('dblclick', 'tr', dbclick);

})

function btnAddOnClick() {
    //$('.dialog').show();
    dialog.dialog('open');
}
function btnCancelOnClick() {
    //$('.dialog').closest();
    dialog.dialog('close');
}

function dbclick() {
    dialog.dialog('open');

}
/**
 *Load dữ liệu
 *Author: Nguyen Dang Tung(9/12/2020)
 */
function loadData() {
    //Thực hiện load dữ liệu:
    //1. Lấy dữ liệu
    //2. Đọc dữ liệu
    //3. Xử lý dữ liệu
    //4. Đẩy dữ liệu vào trang HTML
    $.ajax({
        url: 'http://api.manhnv.net/api/customers', //Địa chỉ API lấy dữ liệu
        method: 'GET',//Phương thức Get, Set, Put, Delete...
        data: null,
        dataType: 'json',
        connectType: 'application/json'
    }).done(function (response) {
        console.log(response);
        $('#tbListData tbody').empty();
        for (var i = 0; i < response.length; i++) {
            var item = response[i];
            var customerCode = item['CustomerCode'];
            var fullName = item['FullName'];
            var gender = item['GenderName'];
            var dob = item['DateOfBirth'];
            var groupName = item['CustomerGroupName'];
            var phone = item['PhoneNumber'];
            var email = item['Email'];
            var address = item['Address'];
            var debitAmount = item['DebitAmount'];
            var memberCard = item['MemberCardCode'];

            var dateString = formatDate(dob);
            var money = formatMoney(1000000);
            var trHTML = `<tr>
                            <td>${customerCode}</td>
                            <td>${fullName}</td>
                            <td>${gender}</td>
                            <td>${dateString}</td>
                            <td>${groupName}</td>
                            <td>${phone}</td>
                            <td>${email}</td>
                            <td>${address}</td>
                            <td>${money}</td>
                            <td>${memberCard}</td>
                          </tr>`;
            $('#tbListData tr:last').after(trHTML)

        }
    }).fail(function (response) {

    })
}
/**
 * Hàm định dạng ngày tháng
 * @param {dob} date ngày truyền vào
 * Author: Nguyen Dang Tung(9/12/2020)
 */

function formatDate(date) {
    var date = new Date(date);
    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    return day + '/' + month + '/' + year;
}

/**
 * Hàm định dạng số thành tiền
 * @param {any} number
 * Author: Nguyen Dang Tung(9/12/2020)
 */
function formatMoney(number) {
    number = number.toLocaleString('it-VN', { style: 'currency', currency: 'VND' });
    return number;
}

