$(document).ready(function () {

    dialog = $(".m-dialog").dialog({
        autoOpen: false,
        width: 700,
        modal: true,
    });

    loadData();

    initEvens();

}) 

function initEvens() {
 
    $('#btnAdd').click(function () {
        dialog.dialog('open');
    })

    $('#btnCancel').click(function () {
        dialog.dialog('close');
    })

    $('#table__list').on('dblclick', 'tr', function () {
        dialog.dialog('open');
    })
}

function btnAddOnClick() {
    dialog.dialog('open');
}
    /**
     * Load du lieu
     * */
    function loadData() {
        $.ajax({
            url: 'http://api.manhnv.net/api/customers',
            method: 'GET',
            data: null,
            contentType: 'application/json'
        }).done(function (response) {
            $('#table__list tbody').empty();
            for (var i = 0; i < response.length; i++) {
                var item = response[i];
                var customerCode = item['CustomerCode'];
                var fullName = item['FullName'];
                var gender = item['Gender'];
                var dob = item['DateOfBirth'];
                var groupName = item['GroupName'];
                var phone = item['PhoneNumber'];
                var email = item['Email'];
                var address = item['Address'];
                var date = formatDate(dob);

                var html = `<tr> 
                            <td>${customerCode}</td>
                            <td>${fullName}</td>
                            <td>${gender}</td>
                            <td>${date}</td>
                            <td>${groupName}</td>
                            <td>${phone}</td>
                            <td>${email}</td>
                            <td>${address}</td>
                        </tr>`;
                $('table tr:last').after(html)
            }
            console.log(response)

        }).fail(function (response) {

        })
    }
    //doc du lieu

    //xu ly du lieu

    //day du lieu vao html

    /**
     * Ham dinh dang ngay thang
     * @param {any} date
     * Author: nhung
     */
    function formatDate(date) {
        var date = new Date(date);
        day = date.getDate();
        month = date.getMonth() + 1; //Index tinh tu 0
        year = date.getFullYear();  //getYear(): tra ve nam tinh tu 1900
        return day + '/' + month + '/' + year;
    }
    
