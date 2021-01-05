$(document).ready(function () {
    loadData();
    hideAdd();
    $('.conten__title--add').click(showAdd);
    $('#cancel, .modal__cancel').click(hideAdd);
    $('#upImg').click(addImg);
});

/**
 * Load data
 */
function loadData() {
    // thực hiện load dữ liệu
    // 1. lấy dữ liệu:
    $.ajax({
        url: 'http://api.manhnv.net/api/customers',
        method: 'GET',
        data: 'null',
        contentType: 'aplication/json'
    }).done(function (respone) {
        console.log(respone);
        for (var i = 0; i <= respone.length; i++) {
            var item = respone[i];
            var dob = item['DateOfBirth']
            var dateStr = formatDate(dob);
            var trHTML = `<tr>
                            <td>${item['CustomerCode']}</td>
                            <td>${item['FullName']}</td>
                            <td>${item['GenderName']}</td>
                            <td>${dateStr}</td>
                            <td>${item['CustomerCode']}</td>
                            <td>${item['PhoneNumber']}</td>
                            <td>${item['Email']}</td>
                            <td>${item['Address']}</td>
                            <td>${item['MemberCardCode']}</td>
                            <td>${item['Address']}</td>
                        </tr>`;
            $('#misaTable tr:last').after(trHTML);

        }


    }).fail(function (respone) {

    })

    // 2. đọc dữ liệu

    // 3. xử lý dữ liệu

    // 4. đẩy dữ liệu vào html
}

/**
 * 
 * @param {date} date 
 * định dạng ngày tháng
 */
function formatDate(date) {
    date = new Date(date);
    console.log(date);
    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getYear() + 1900;

    return day + '/' + month + '/' + year;
}

/**
 * Hiển thị modal thêm khách hàng
 */
function showAdd() {
    $('.modal').addClass('show');  
};

/**
 * ẩn modal thêm khách hàng
 */
function hideAdd() {
    $('.modal').removeClass('show');  
};

function addImg() {
    $('.custom-file-input').click();
    
    var fileName = '';
    $('input[type="file"]').change(function (e) {
        $('#image_show').html('');
        var fileName = '';
        $('.custom-file-lable').html(fileName);
    
        for (var i = 0; i < e.target.files.length; i++) {
            fileName += e.target.files[i].name + ' ';
            var url = URL.createObjectURL(e.target.files[i]);
            $('#image_show').append('<img class="img_view" src="' + url + '" alt="' + e.target.files[i].name + '">'); 
            $('#upImg').attr('src', url);
    
        }
        $('.custom-file-lable').html(fileName);
    });
}
