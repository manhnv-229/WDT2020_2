
$(document).ready(function () {
    //dialog
    dialog = $(".addCustomer-dialog").dialog({
        autoOpen: false,
        width: 800,
        modal: true,
    });
    loadData();
    loadNumber();
    $('.content-header-right-button.button2').click(addCustomerClick);
    $('#dialog-Cancel').click(dialogCancelClick);
});
function loadData() {
    //Thực hiện load dữ liệu lên table
    //1. Lấy dữ liệu về:
    $.ajax({
        url: 'http://api.manhnv.net/api/customers',
        method: 'GET',
        data: null,
        dataType: 'json',
        contentType: 'application/json'
    }).done(function (response) {
        console.log(response);
        var number = response.length;
        for (var i = 0; i < response.length; i++) {
            var item = response[i];
            var CustomerCode = item['CustomerCode'];
            var FullName = item['FullName'];
            var Gender = item['GenderName'];
            var Address = item['Address'];
            var DateOfBirth = item['DateOfBirth'];
            var Email = item['Email'];
            var PhoneNumber = item['PhoneNumber'];
            var CustomerGroupName = item['CustomerGroupName'];
            var stringDate = formatDate(DateOfBirth);
            var trHTML =
                `<tr>
                    <td>${CustomerCode}</td>
                    <td>${FullName}</td>
                    <td>${Gender}</td>
                    <td>${stringDate}</td>
                    <td>${PhoneNumber}</td>
                    <td>${Address}</td>
                    <td>${Email}</td>
                    <td>${CustomerGroupName}</td>
                </tr>`
            $('#contentTable tr:last').after(trHTML);
        }
    }).fail(function (response) {

    })
     //2. Đọc dữ liệu
    //3. Xử lý dữ liệu
    //4. Đẩy dữ liệu 
}

//Định dạng lại ngày theo kiểu ngày/tháng/năm
//biến date
function formatDate(date) { 
    date = new Date(date); //gắn lại giá trị của biến date theo định dạng thời gian Date
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


function loadNumber() {
    $("#number").text('10');
}


function addCustomerClick() {
    dialog.dialog('open');
}

function dialogCancelClick() {
    dialog.dialog('close');
}
  
