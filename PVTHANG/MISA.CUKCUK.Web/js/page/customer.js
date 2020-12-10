$(document).ready(function () {
    var customer = new Customer();
})

class Customer {
    constructor() {
        this.loadData();
        this.initEvent();
    }

    initEvent() {
        $(".icon-refresh").click(this.loadData.bind(this));
        $(".add-employee").click(this.addOnClick.bind(this));
        $(".dialog__add__header .icon, .button--cancel").click(this.cancelOnClick.bind(this));
        $(".content .table tbody").on("dblclick", "tr", this.trOnClick);
        $("#dial").dialog({
            autoOpen: false,
            resizable: false,
            width: "auto",
            height: "auto",
            modal: true,
        });

    }

    loadData() {
        var self = this;
        $.ajax({
            url: 'http://api.manhnv.net/api/customers',
            method: 'GET',
            data: null,
            dataType: 'json',
            contentType: 'application/json'
        }).done(function (res) {
            $(".content table tbody").empty();
            $.each(res, function (index, item) {
                var trHTML = `  <tr>
                                <td>`+ item.CustomerCode + `</td>
                                <td>`+ item.FullName + `</td>
                                <td>`+ item.GenderName + `</td>
                                <td>`+ self.formatDate(item.DateOfBirth) + `</td>
                                <td>`+ item.CustomerGroupName + `</td>
                                <td>`+ item.PhoneNumber + `</td>
                                <td>`+ item.Email + `</td>
                                <td>`+ item.Address + `</td>
                                <td>`+ self.formatMoney(item.DebitAmount) + `</td>
                                <td>`+ item.MemberCardCode + `</td>
                            </tr>`
                $(".content table tbody").append(trHTML);
            })
        }).fail(function () {
            alert('fail');
        })

    }

    /**
     * @param {Date} date
     */
    formatDate(date) {
        var date = new Date(date);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getYear() + 1900;
        if (day < 10) {
            day = '0' + day;
        } if (month < 10) {
            month = '0' + month;
        }
        return day + '/' + month + '/' + year;
    }

    /**
     * @param {Int32Array} money
     */
    formatMoney(money) {
        var ret = "";
        var count = 0;
        while (money > 0) {
            ++count;
            ret = (money % 10) + "" + ret;
            money = Math.floor(money / 10);
            if (count === 3) {
                ret = '.' + ret;
                count = 0;
            }
        }
        if (ret.length == 0) ret = "0";
        return ret;
    }

    addOnClick() {
        this.showDialogAdd();
    }

    cancelOnClick() {
        this.hideDialogAdd();
    }

    trOnClick() {
        $("#dial").dialog("open");
        var customerCode = $(this).children()[0].textContent;
        $.ajax({
            url: 'http://api.manhnv.net/api/customers',
            method: 'GET',
            data: null,
            dataType: 'json',
            contentType: 'application/json'
        }).done(function (res) {
            $.each(res, function (index, item) {
                if (item.CustomerCode == customerCode) {
                    $("#customerCode").val(item.CustomerCode);
                    $("#customerName").val(item.FullName);
                    $("#memberCardCode").val(item.MemberCardCode);
                    $("#customerGroupName").val(item.CustomerGroupName);
                    $("#email").val(item.Email);
                    $("#phoneNumber").val(item.PhoneNumber);
                    $("#companyName").val(item.CompanyName);
                    $("#taxCode").val(item.CompanyTaxCode);
                    $("#address").val(item.Address);

                    {   //chuyển thời gian về dạng yyyy-mm-dd
                        var date = new Date(item.DateOfBirth);
                        var day = date.getDate();
                        var month = date.getMonth() + 1;
                        var year = date.getYear() + 1900; if (day < 10) {
                            day = '0' + day;
                        } if (month < 10) {
                            month = '0' + month;
                        }
                    }
                    $("#dateOfBirth").val(year + "-" + month + "-" + day);

                    if (item.Gender == 0 || item.Gender == 1) {
                        $("[name='gender']")[item.Gender].setAttribute("checked", "checked");
                    }
                }
            })
        }).fail(function () {
            alert('fail');
        })
    }

    showDialogAdd() {
        $("#dial").dialog("open");
    }

    hideDialogAdd() {
        $("#dial").dialog("close");
    }
}
