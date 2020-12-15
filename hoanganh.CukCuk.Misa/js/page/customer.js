$(document).ready(function () {

    dialog = $(".m-dialog").dialog({
        autoOpen: false,
        width: 700,
        modal: true,
    });
    // Lấy dữ liệu
    loadData();

    initEvent();
})

/**
 * 
 * Load date từ api
 * */
function loadData() {
    $.ajax({
        url: 'http://api.manhnv.net/api/customers',
        method: 'GET',
        data: null,
        contentType: 'application/json'
    }).done(function (response) {
        for (var i = 0; i < response.length; ++i) {
            var date = fomatDate(response[i].DateOfBirth);
        $('#tbListData tbody').empty();
        var trHtml = `<tr class="el-table__row first">
                        <td rowspan="1" colspan="1" style="width: 100px;">
                            <div class="cell">${response[i].CustomerCode}</div>
                        </td>
                        <td rowspan="1" colspan="1" style="width: 143px;">
                            <div class="cell">${response[i].FullName}</div>
                        </td>
                        <td rowspan="1" colspan="1" style="width: 58px;"><div class="cell">${response[i].GenderName}</div></td>
                        <td rowspan="1" colspan="1" style="width: 100px;"><div class="cell text-align-center">${date}</div></td>
                        <td rowspan="1" colspan="1" style="width: 72px;"><div class="cell">${response[i].CustomerGroupName}</div></td>
                        <td rowspan="1" colspan="1" style="width: 119px;"><div class="cell">${response[i].PhoneNumber}</div></td>
                        <td rowspan="1" colspan="1" style="width: 192px;"><div class="cell">${response[i].Email}</div></td>
                        <td rowspan="1" colspan="1" style="width: 232px;"><div class="cell">${response[i].Address}</div></td>
                        <td rowspan="1" colspan="1" class="text-align-right" style="width: 55px;"><div class="cell">${response[i].DebitAmount || ""}</div></td>
                        <td rowspan="1" colspan="1" style="width: 98px;"><div class="cell">${response[i].MemberCardCode}</div></td>
                        <td rowspan="1" colspan="1" style="width: 32px;"><div class="cell"></div></td>
                    </tr>`;
        $('#tbListData tr:last').after(trHtml);
        }
    }).fail(function (response) {

    })
}

/**
    * 
    * Hàm fomat date
    * @param {any} date
    * @author Hoàng anh (14/12/2020)
    */
function fomatDate(date) {
    dateFomat = new Date(date);
    day = dateFomat.getDate();
    month = dateFomat.getMonth() + 1;
    year = dateFomat.getFullYear();
    return day + "/" + month + "/" + year;
}

function initEvent() {

    $('#btnAdd').click(function () {
        dialog.dialog('open');
    })

    $('#btnCancel').click(function () {
        dialog.dialog('close');
    })

    $('#tbListData').on('dblclick', 'tr', function () {
        // load dữ liệu chi tiết:

        // Hiển thị dialog thông tin chi tiết:
        dialog.dialog('open');
    })
}
