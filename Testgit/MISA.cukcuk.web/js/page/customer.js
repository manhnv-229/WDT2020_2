
$(document).ready(function () {
    loadData();
    $('.btn_add_customer').click(btnAddCustomer_onClick);
    $('.btn_cancel').click(btnCancel_onClick);
    $('#table_customer').on('dblclick','tr',trOnDblClick);
})


/**
 * Hàm load data từ API vào
 * */
function loadData() {
    //thực hiện load dữ liệu
    // 1. lấy dữ liệu:
    $.ajax({
        url: 'http://api.manhnv.net/api/customers',
        method: 'GET', // GET POST PUSH  DELETE
        data: null,
        dataType: 'json',
        contentType: 'application/json'
    }).done(function (response) {
        //console.log(response);
        $('#table_customer tbody').empty(); // xóa những bản ghi thô tạo sẵn trong HTML

        for (var i = 0; i < response.length; i++) {
            var customerCode = response[i]['CustomerCode'];
            var fullName = response[i]['FullName'];
            var gender = response[i]['GenderName'];
            var dob = response[i]['DateOfBirth'];
            var customerGroup = response[i]['CustomerGroupName'];
            var phone = response[i]['PhoneNumber'];
            var email = response[i]['Email'];
            var address = response[i]['Address'];
            var debit = "1.000.000";
            var memberCardCode = response[i]['MemberCardCode'];

            var dateString = formatDate(dob);

            var trHTML = `<tr>  <td>${customerCode}</td>
                                <td>${fullName}</td>
                                <td>${gender}</td>
                                <td>${dateString}</td>
                                <td>${customerGroup}</td>
                                <td>${phone}</td>
                                <td>${email}</td>
                                <td>${address}</td>
                                <td>${debit}</td>
                                <td>${memberCardCode}</td>
                          </tr>`

            $('#table_customer tr:last').after(trHTML);
        }
    }).fail(function (response) {

    })
    // 2. đọc dữ liệu

    // 3. xử lý

    // 4. đẩy dữ liệu vào trang HTML
}

/**
 * Hàm định dạng ngày tháng năm
 * @param {Date} date
 */
function formatDate(date) {
    var date = new Date(date);
    day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    year = date.getFullYear();
    return day + "-" + month + "-" + year;
}

/**
 * Hàm xử lý sự kiện onClick button Add_Customer
 * */
function btnAddCustomer_onClick() {
    $('.dialog').show();
}

/**
 * Hàm xử lý sự kiện onClick button Cancel để ẩn Dialog
 * */
function btnCancel_onClick() {
    $('.dialog').hide();
}


/**
 * Hàm xử lý sự kiện doubleClick vào <tr> trong table để hiện dialog
 * */
function trOnDblClick() {
    $('.dialog').show();
}