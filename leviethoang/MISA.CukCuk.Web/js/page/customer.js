$(document).ready(function () {
    alert('welcome to misa');
    $.ajax({
        url: 'http://api.manhnv.net/api/customers',
        method: 'GET',
        data: null,
       
        contentType: 'application/json'
    }).done(function (response) {
        console.log(response)
        for (var i = 0; i < response.length; i++) {
            var item = response[i];
            var customerCode = item['CustomerCode']; 
            var trHTML = `<tr>
                                <td>${customerCode}</td>
<td>${customerCode}</td>
<td>${customerCode}</td>
<td>${customerCode}</td>
<td>${customerCode}</td>
<td>${customerCode}</td>
<td>${customerCode}</td>
<td>${customerCode}</td>
                          </tr>`
            $('#bang tr:last').after(trHTML);
            
        }
    }).fail(function (response) {
        
    })
})