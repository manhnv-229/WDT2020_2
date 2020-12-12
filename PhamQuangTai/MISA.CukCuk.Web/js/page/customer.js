$(document).ready(function () {
    loadData();
    var dialog = $( ".dialog-info" ).dialog({
        autoOpen: false,
        height: 680,
        width: 800,
        modal: true,
    });
    $("#addCustomer").click(function () {
        dialog.dialog('open');
    });
    $('.dialog-info .dialog-body-footer .dialog-footer .col-right .cancel').click(function() {
        dialog.dialog('close');
    });
});

function loadData () {
    $.ajax({
        url: 'http://api.manhnv.net/api/customers',
        method: 'GET',
        data: null,
        dataType: 'json',
        contentType: 'application/json'
    }).done(function (res) {
        console.log(res);
        var temp = $("#table-tbody");
        temp.empty();
        for (var i = 0; i < res.length; i++)   {
            temp.append(`<div class="tbody-tr">
                            <div class="tbody-td">${i+1}</div>
                            <div class="tbody-td">${res[i]['FullName']}</div>
                            <div class="tbody-td">${res[i]['GenderName']}</div>
                            <div class="tbody-td">${formatDate(res[i]['DateOfBirth'])}</div>
                            <div class="tbody-td">${res[i]['']}</div>
                            <div class="tbody-td">${res[i]['']}</div>
                            <div class="tbody-td">${res[i]['']}</div>
                            <div class="tbody-td">${res[i]['']}</div>
                            <div class="tbody-td">${res[i]['']}</div>
                            <div class="tbody-td">${res[i]['']}</div>
                        </div>`);
        }
        for (var i = 0; i < res.length; i++)   {
            temp.append(`<div class="tbody-tr">
                            <div class="tbody-td">${i+1}</div>
                            <div class="tbody-td">${res[i]['FullName']}</div>
                            <div class="tbody-td">${res[i]['GenderName']}</div>
                            <div class="tbody-td">${formatDate(res[i]['DateOfBirth'])}</div>
                            <div class="tbody-td">${res[i]['']}</div>
                            <div class="tbody-td">${res[i]['']}</div>
                            <div class="tbody-td">${res[i]['']}</div>
                            <div class="tbody-td">${res[i]['']}</div>
                            <div class="tbody-td">${res[i]['']}</div>
                            <div class="tbody-td">${res[i]['']}</div>
                        </div>`);
        }
    }).fail(function (res) {
        // console.log("");
    })
}

/**
 * Hàm định dạng ngày tháng
 * @param {date} date ngày/tháng/năm 
 * @author quangtai (12/09/2020)
 */

function formatDate (date) {
    var newDate = new Date(date);
    var dd = newDate.getDate();
    var mm = newDate.getMonth() + 1;
    var yyyy = newDate.getFullYear();
    return `${dd<10? '0'+dd : dd}/${mm<10? '0'+mm : mm}/${yyyy}`;
}