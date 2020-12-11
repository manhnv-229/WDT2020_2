$(document).ready(function() {
    //alert('welcome to misa!');
    dialog = $(".dialog__add").dialog({
        autoOpen: false,
        width: 700,
        modal: true,
    });
    
    loadData()
   
    $('#btnAdd').click(btnAddOnClick)
    $('.btn-cancel-dialog').click(btnCancelOnClick)

    $('.grid').on('dblclick', 'tr', trOnDbClick)
})


/**
 * Load du lieu
 * Author: Moo// 09/12/2020
 */

function loadData() {
    $.ajax({
        url: 'http://api.manhnv.net/api/customers',
        method: 'GET',
        data: null,
        // dataType: 'json',   //DEFAULT
        contentType: 'application/json'

    }).done( function(response){
        $('.grid tbody').empty();

        for (let i = 0; i < response.length; i++) {
            var item = response[i];
            var customerCode = item['CustomerCode']
            var gender = item['GenderName']
            var fullName = item['FullName']
            var dateOfBirth = item['DateOfBirth']
            var groupName = item['CustomerGroupName']
            var phoneNumber = item['PhoneNumber']
            var email = item['Email']
            var address = item['Address']
            var memberCardCode = item['MemberCardCode']

            var dateString = formatDate(dateOfBirth);
            var trHTML = `<tr>
                            <td>${customerCode}</td>
                            <td>${fullName}</td>
                            <td>${gender}</td> 
                            <td>${dateString}</td> 
                            <td>${groupName}</td> 
                            <td>${phoneNumber}</td> 
                            <td>${email}</td> 
                            <td>${address}</td> 
                            <td></td> 
                            <td>${memberCardCode}</td> 
                        </tr>`
            $('.grid tr:last').after(trHTML);
            
        }
    }).fail(function (response) {

    })
}


/**
 * Ham dinh dang ngay thang nam
 * @param {Date} date ngay truyen vao
 * Author: Moo// 09/12/2000
 */

function formatDate(date){
    var date = new Date(date)
    day = date.getDate()
    if (day < 10){
        day = `0${day}`
    }
    month = date.getMonth() + 1
    if (month < 10){
        month = `0${month}`
    }
    year = date.getFullYear()
    return `${day}/${month}/${year}`
}


function btnAddOnClick(){
    dialog.dialog( "open" );
}

function btnCancelOnClick() {
    dialog.dialog( "close" );
}

function trOnDbClick(){
    dialog.dialog( "open" );
}