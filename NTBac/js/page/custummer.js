var arrDepartment = [];
var arrLocation = [];
var arrStatus = [];
var dataEdit;
$(document).ready(function () {
    loadDataEmployees();
    loadDataEmployeeDepartments();
    loadDataEmployeeLocations();
    loadDataEmployeeStatuss();
    $('.conten__title--add').click(function() {
        showAdd();
        addDataEmployees();
        $('#txtEmployeeCode').focus();
    });
    $('.modal__cancel, #cancel').click(hideModal);
    $('#upImgAdd, #upImgSave').click(addImg);
    $('#btnAdd').click(validateData);
    $('#btnsearch').click(function() {
        location.reload()
    });

    $('#department').change(loadDataSearch) | $('#location').change(loadDataSearch) | $('#txtSearch').keyup(loadDataSearch)


    $('#misaTable').on('click', '#btnEdit', function() {
        showSave();
        $('#txtEmployeeCodeEdit').focus();
        dataEdit = $(this).attr("value");
        editEmployee(dataEdit);
    });

    $('#misaTable').on('click', '#btnDelete', function() {
        showDelete();
        var idDelete = $(this).attr("value");

        if($('#btn__respome-ok').click(function() {
            deleteData(idDelete);
        }));   
        
        if($('#btn__respome-no').click(function() {
            hideModal();
        }));  
    });

    $('#saveDate').click(validateDataSave);

    $( function() {
        $( "#txtDobEdit, #txtDateIdentityEdit, #txtWorkCompanyEdit, #txtDob, #txtDateIdentity, #txtWorkCompany" ).datepicker();
    } );

    $(function(){
        $('.form-group').delegate('*', 'focus blur', function() {
          var elem = $(this);
          setTimeout(function() {
            elem.toggleClass('focused', elem.is(':focus'));
          }, 0);
        });
    });
    
});

/**
 * Lấy dữ liệu khách hàng
 */
function loadDataEmployees() {
    $.ajax({
        url: 'http://localhost:52313/api/v1/Employees',
        method: 'GET',
        data: 'null',
        contentType: 'aplication/json'
    }).done(function (respone) {    
        showTable(respone);

    }).fail(function (respone) {

    })
}

/**
 * Tìm kiếm nhân viên
 * @param {EmployeeCode or Name or PhoneNumber)} search 
 */
function loadDataSearchEmployees(search) {
    var txtSearch = 'http://localhost:52313/api/v1/Employees/SearchByName?keyName='.concat(search);
    $.ajax({
        url: txtSearch,
        method: 'GET',
        data: 'null',
        contentType: 'aplication/json'
    }).done(function (respone) {
        showTable(respone);

    }).fail(function (respone) {
        console.info(respone);
    })  
}


/**
 * Tìm kiếm theo Tên, số điện thoại, mã và phòng ban, vị trí công việc nhân viên
 * @param {DepartmentId and LocationId} search 
 */
function loadDataSearchEmployeesByAll(keyName, departmentId, locationId) {

    var txtSearch = 'http://localhost:52313/api/v1/Employees/SearchByAll?keyName='.concat(keyName, '&departmentId=', departmentId, '&locationId=', locationId);
    console.log(txtSearch);
    $.ajax({
        url: txtSearch,
        method: 'GET',
        data: 'null',
        contentType: 'aplication/json'
    }).done(function (respone) {
        showTable(respone);

    }).fail(function (respone) {
        console.info(respone);
    }) 
}


/**
 * Tìm kiếm theo tên và phòng ban hoặc tên và vị trí công việc 
 * hoặc phòng ban và vị trí công việc nhân viên
 * @param {DepartmentId and LocationId} search 
 */
function loadDataSearchEmployeesByNameDepartmentIdLocationId(keyName, departmentId, locationId) {

    var txtSearch = 'http://localhost:52313/api/v1/Employees/SearchByNameDepartIdLocationId?keyName='.concat(keyName, '&departmentId=', departmentId, '&locationId=', locationId);
    $.ajax({
        url: txtSearch,
        method: 'GET',
        data: 'null',
        contentType: 'aplication/json'
    }).done(function (respone) {
        showTable(respone);

    }).fail(function (respone) {
        console.info(respone);
    }) 
}

/**
 * Load dữ liệu tìm kiếm
 */
function loadDataSearch() {
    var textSearch = $('#txtSearch').val();
    var textDepartmentId = $('#department').val();
    var textLocationId = $('#location').val();

    var okAll = ((textSearch && textDepartmentId && textLocationId) != '');
    var okSearch = (((textSearch && textDepartmentId) != '') | ((textSearch && textLocationId) != '') | ((textDepartmentId && textLocationId) != ''));

    if(okAll) {
        loadDataSearchEmployeesByAll(textSearch, textDepartmentId, textLocationId);
        return;
    } 
    if(okSearch) {
        loadDataSearchEmployeesByNameDepartmentIdLocationId(textSearch, textDepartmentId, textLocationId);
        return;
    } 
    if(!textSearch && !textDepartmentId && !textLocationId) {
        loadDataEmployees();
        return;
    }
    if(!textDepartmentId && !textLocationId) {
        loadDataSearchEmployees(textSearch);
        return;
    }
    if(!textLocationId && !textSearch) {
        loadDataSearchEmployees(textDepartmentId);
        return;
    }
    if(!textDepartmentId && !textSearch) {
        loadDataSearchEmployees(textLocationId);
        return;
    }

}

/**
 * Lấy dữ liệu nhóm khách hàng
 */
function loadDataEmployeeDepartments() {
    $.ajax({
        url: 'http://localhost:52313/api/v1/EmployeeDepartments',
        method: 'GET',
        data: 'null',
        contentType: 'aplication/json'
    }).done(function (respone) {
        for (var i = 0; i < respone.length; i++) {
            arrDepartment[i] = respone[i]; 
            var item = respone[i]; 
            
            var departmentName = item['departmentName'];
            var departmentId = item['departmentId'];
            var optionHTML = `<option value="${departmentId}">${departmentName}</option>`;
            $('select#txtDepartment').append(optionHTML);
            $('select#txtDepartmentEdit').append(optionHTML);
            $('select#department option:last').after(optionHTML);
        }


    }).fail(function (respone) {
        console.info(respone);
    })
}

function loadDataEmployeeLocations() {
    $.ajax({
        url: 'http://localhost:52313/api/v1/EmployeeLocations',
        method: 'GET',
        data: 'null',
        contentType: 'aplication/json'
    }).done(function (respone) {
        for (var i = 0; i < respone.length; i++) {
            arrLocation[i] = respone[i]; 

            var item = respone[i]; 
            
            var locationName = item['locationName'];
            var locationId = item['locationId'];
            var optionHTML = `<option value="${locationId}">${locationName}</option>`;
            $('select#txtLocation').append(optionHTML);
            $('select#txtLocationEdit').append(optionHTML);
            $('select#location option:last').after(optionHTML);
        }
    }).fail(function (respone) {
        console.info(respone);
    })
}

function loadDataEmployeeStatuss() {
    $.ajax({
        url: 'http://localhost:52313/api/v1/EmployeeStatuss',
        method: 'GET',
        data: 'null',
        contentType: 'aplication/json'
    }).done(function (respone) {
        for (var i = 0; i < respone.length; i++) {
            arrStatus[i] = respone[i]; 
            var item = respone[i]; 
            
            var statusName = item['statusName'];
            var statusId = item['statusId'];
            var optionHTML = `<option value="${statusId}">${statusName}</option>`;
            $('select#txtStatus').append(optionHTML);
            $('select#txtStatusEdit').append(optionHTML);
        }
    }).fail(function (respone) {
        console.info(respone);
    })
}

/**
 * 
 * @param {Object} customer 
 * Thêm mới dữ liệu
 */
function addData(employee) {

    console.log(employee)

    $.ajax({
        url: 'http://localhost:52313/api/v1/Employees',
        method: 'POST',
        data: JSON.stringify(employee),
        headers: {
            'Content-Type': 'application/json',
        }
    }).done(function (respone) {
        var message = respone.message;
        $('#success').text(message);
        $('#data').text('');
        var employyCode = respone.data['employeeCode'];
        hideModal();
        showSuccess();
        $('#btn__ok').click(function() {
            hideModal();
            loadDataSearchEmployees(employyCode);
        });

    }).fail(function (respone) {
        console.info(respone);
        if(respone.responseJSON) {
            var message = respone.responseJSON.message;
            var data = respone.responseJSON.data;
        }
        else {
            var message = respone.responseText;
        }
        $('#success').text(message);
        $('#data').text(data);
        showSuccess();
        $('#btn__ok').click(function() {
            hideModalSuccess();
            showAdd();
            $('#txtEmployeeCode').focus();
        });

    })
}

function saveData(employee) {
    $.ajax({
        url: 'http://localhost:52313/api/v1/Employees',
        method: 'PUT',
        data: JSON.stringify(employee),
        headers: {
            'Content-Type': 'application/json',
        }
    }).done(function (respone) {
        var message = respone.message;
        $('#success').text(message);
        $('#data').text('');
        var employyCode = respone.data['employeeCode'];
        hideModal();
        showSuccess();
        $('#btn__ok').click(function() {
            hideModal();
            loadDataSearchEmployees(employyCode);
        });

    }).fail(function (respone) {
        console.info(respone);
        console.info(dataEdit);
        if(respone.responseJSON) {
            var message = respone.responseJSON.message;
            var data = respone.responseJSON.data;
        }
        else {
            var message = respone.responseText;
        }
        $('#success').text(message);
        $('#data').text(data);
        showSuccess();
        $('#btn__ok').click(function() {
            hideModalSuccess();
            editEmployee(dataEdit);
            showAdd();
            $('#txtEmployeeCodeEdit').focus();
        });
    })
}

function deleteData(idDelete) {
    $.ajax({
        url: 'http://localhost:52313/api/v1/Employees?idData='.concat(idDelete),
        method: 'DELETE',
        data: 'null',
        headers: {
            'Content-Type': 'application/json',
        }
    }).done(function (respone) {
        var message = respone.message;
        $('#success').text(message);

        hideModal();
        showSuccess();
        $('#btn__ok').click(function() {
            hideModal();
            loadDataSearch();
        });

    }).fail(function (respone) {
        console.info(respone);
    })
}

function editEmployee(dataEdit) {
    var txtEdit = 'http://localhost:52313/api/v1/Employees/SearchByName?keyName='.concat(dataEdit);
    $.ajax({
        url: txtEdit,
        method: 'GET',
        data: 'null',
        contentType: 'aplication/json'
    }).done(function (respone) {

        var employeeId = respone[0].employeeId;
        var departmentId = respone[0].departmentId;
        var locationId = respone[0].locationId;
        var statusId = respone[0].statusId;
        var employeeCode = respone[0].employeeCode;
        var fullName = respone[0].fullName;
        var gender = respone[0].gender;
        var dob = formatDate(respone[0].dateOfBirth);
        var enumIdentity = respone[0].enumIdentity;
        var dateIdentity = formatDate(respone[0].dateIdentity);
        var addressIdentity = respone[0].addressIdentity;
        var email = respone[0].email;
        var phoneNumber = respone[0].phoneNumber;
        var taxCode = respone[0].taxCode;
        var price = respone[0].salary;
        var workCompany = formatDate(respone[0].companyAddDate);

        $('#txtEmployeeIdEdit').val(employeeId);
        $('#txtEmployeeCodeEdit').val(employeeCode);
        $('#txtFullNameEdit').val(fullName);
        $('#txtDobEdit').val(dob);
        $('#txtIdentityEdit').val(enumIdentity);
        $('#txtDateIdentityEdit').val(dateIdentity);
        $('#txtAddressIdentityEdit').val(addressIdentity);
        $('#txtEmailEdit').val(email);
        $('#txtPhoneNumberEdit').val(phoneNumber);
        $('#txtTaxCodeEdit').val(taxCode);
        $('#txtWorkCompanyEdit').val(workCompany);

        if(price == null ? price = 0 : price)

        var salary = formatCurrency(price);
        $('#txtSalaryEdit').val(salary);

        if(gender == 1) {
            $("#txtGenderEdit").val("1");
        }
        if(gender == 2) {
            $("#txtGenderEdit").val("2");
        }
        if(gender == 0) {
            $("#txtGenderEdit").val("0");
        }

        for (var j = 0; j < arrDepartment.length; j++) {
            var EdepartmentId = arrDepartment[j].departmentId;
            if(EdepartmentId == departmentId) {
                $('#txtDepartmentEdit').val(departmentId);
            }
        }

        for (var j = 0; j < arrLocation.length; j++) {
            var ElocationId = arrLocation[j].locationId;
            if(ElocationId == locationId) {
                $("#txtLocationEdit").val(locationId);
            }
        }

        for (var j = 0; j < arrStatus.length; j++) {
            var EstatusId = arrStatus[j].statusId;
            if(EstatusId == statusId) {
                $("#txtStatusEdit").val(statusId);
            }
        }

    }).fail(function (respone) {
        console.info(respone);
    })
}

function addDataEmployees() {
    $.ajax({
        url: 'http://localhost:52313/api/v1/Employees/SearchByDataCodeMax',
        method: 'GET',
        data: 'null',
        contentType: 'aplication/json'
    }).done(function (respone) {    
        var employeeCode = respone[0].employeeCode;
        var employeeCodeNew = employeeCode.substr(2);
        employeeCodeNew++;

        $('#txtEmployeeCode').val('NV' + employeeCodeNew);

    }).fail(function (respone) {
        console.info(respone);
    })
}

/**
 * Validate thêm mới dữ liệu
 */
function validateData() {
    
    var employeeCode = $('#txtEmployeeCode').val();
    var fullName = $('#txtFullName').val();
    var dob = new Date($('#txtDob').val());
    var gender = $('#txtGender').find(':selected').val();
    var identity = $('#txtIdentity').val();
    var dateIdentity = new Date($('#txtDateIdentity').val());
    var addressIdentity = $('#txtAddressIdentity').val();
    var email = $('#txtEmail').val();
    var phoneNumber = $('#txtPhoneNumber').val();
    var location = $('#txtLocation').find(':selected').val();
    var department = $('#txtDepartment').find(':selected').val();
    var status = $('#txtStatus').find(':selected').val();
    var taxCode = $('#txtTaxCode').val();
    var salary = $('#txtSalary').val().replace(/[,VNĐ]/g,'');
    var workCompany = new Date($('#txtWorkCompany').val());

    if (!employeeCode) {
        $('#message-code').css('display', 'inline-block');
        $('#txtEmployeeCode').css('border-color', '#ff0000');
    }
    else {
        $('#message-code').css('display', 'none');
        $('#txtEmployeeCode').css('border-color', '#e5e5e5');
    }

    if (!fullName) {
        $('#message-name').css('display', 'inline-block');
        $('#txtFullName').css('border-color', '#ff0000');
    }
    else {
        $('#message-name').css('display', 'none');
        $('#txtFullName').css('border-color', '#e5e5e5');
    }

    if (!phoneNumber) {
        $('#message-phone').css('display', 'inline-block');
        $('#txtPhoneNumber').css('border-color', '#ff0000');
    }
    else {
        $('#message-phone').css('display', 'none');
        $('#txtPhoneNumber').css('border-color', '#e5e5e5');
    }

    if (!identity) {
        $('#message-identity').css('display', 'inline-block');
        $('#txtIdentity').css('border-color', '#ff0000');
    }
    else {
        $('#message-identity').css('display', 'none');
        $('#txtIdentity').css('border-color', '#e5e5e5');
    }

    if (!email) {
        $('#message-email').css('display', 'inline-block');
        $('#txtEmail').css('border-color', '#ff0000');
    }
    else {
        $('#message-email').css('display', 'none');
        $('#txtEmail').css('border-color', '#e5e5e5');
    }
    if (!department) {
        $('#message-department').css('display', 'inline-block');
        $('#txtDepartment').css('border-color', '#ff0000');
    }
    else {
        $('#message-department').css('display', 'none');
        $('#txtDepartment').css('border-color', '#e5e5e5');
    }
    if (!location) {
        $('#message-location').css('display', 'inline-block');
        $('#txtLocation').css('border-color', '#ff0000');
    }
    else {
        $('#message-location').css('display', 'none');
        $('#txtLocation').css('border-color', '#e5e5e5');
    }
    if (!status) {
        $('#message-status').css('display', 'inline-block');
        $('#txtStatus').css('border-color', '#ff0000');
    }
    else {
        $('#message-status').css('display', 'none');
        $('#txtStatus').css('border-color', '#e5e5e5');
    }

    if (!employeeCode | !fullName | !phoneNumber | !email | !identity) {

        return;
    }

    else {
        var employee =
        {
            "Id": "",
            "employeeCode": employeeCode,
            "fullName": fullName,
            "dateofBirth": dob,
            "gender": gender,
            "enumIdentity": identity,
            "dateIdentity": dateIdentity,
            "addressIdentity": addressIdentity,
            "email": email,
            "phoneNumber": phoneNumber,
            "locaId": location,
            "deparId": department,
            "staId": status,
            "taxCode": taxCode,
            "salary": salary,
            "companyAddDate": workCompany,
            "createdBy": "",
            "modifiedBy": ""
        };

        addData(employee);
    }
}

/**
 * Validate cập nhật dữ liệu
 */
function validateDataSave() {
    
    var txtEmployeeId = $('#txtEmployeeIdEdit').val();
    var employeeCode = $('#txtEmployeeCodeEdit').val();
    var fullName = $('#txtFullNameEdit').val();
    var dob = new Date($('#txtDobEdit').val());
    var gender = $('#txtGenderEdit').find(':selected').val();
    var identity = $('#txtIdentityEdit').val();
    var dateIdentity = new Date($('#txtDateIdentityEdit').val());
    var addressIdentity = $('#txtAddressIdentityEdit').val();
    var email = $('#txtEmailEdit').val();
    var phoneNumber = $('#txtPhoneNumberEdit').val();
    var location = $('#txtLocationEdit').find(':selected').val();
    var department = $('#txtDepartmentEdit').find(':selected').val();
    var status = $('#txtStatusEdit').find(':selected').val();
    var taxCode = $('#txtTaxCodeEdit').val();
    var salary = $('#txtSalaryEdit').val().replace(/[,VNĐ]/g,'');
    var workCompany = new Date($('#txtWorkCompanyEdit').val());

    if (!employeeCode) {
        $('#message-codeEdit').css('display', 'inline-block');
        $('#txtEmployeeCodeEdit').css('border-color', '#ff0000');
    }
    else {
        $('#message-codeEdit').css('display', 'none');
        $('#txtEmployeeCodeEdit').css('border-color', '#e5e5e5');
    }

    if (!fullName) {
        $('#message-nameEdit').css('display', 'inline-block');
        $('#txtFullNameEdit').css('border-color', '#ff0000');
    }
    else {
        $('#message-nameEdit').css('display', 'none');
        $('#txtFullNameEdit').css('border-color', '#e5e5e5');
    }

    if (!phoneNumber) {
        $('#message-phoneEdit').css('display', 'inline-block');
        $('#txtPhoneNumberEdit').css('border-color', '#ff0000');
    }
    else {
        $('#message-phoneEdit').css('display', 'none');
        $('#txtPhoneNumberEdit').css('border-color', '#e5e5e5');
    }

    if (!identity) {
        $('#message-identityEdit').css('display', 'inline-block');
        $('#txtIdentityEdit').css('border-color', '#ff0000');
    }
    else {
        $('#message-identityEdit').css('display', 'none');
        $('#txtIdentityEdit').css('border-color', '#e5e5e5');
    }

    if (!email) {
        $('#message-emailEdit').css('display', 'inline-block');
        $('#txtEmailEdit').css('border-color', '#ff0000');
    }
    else {
        $('#message-emailEdit').css('display', 'none');
        $('#txtEmailEdit').css('border-color', '#e5e5e5');
    }
    if (!department) {
        $('#message-departmentEdit').css('display', 'inline-block');
        $('#txtDepartmentEdit').css('border-color', '#ff0000');
    }
    else {
        $('#message-departmentEdit').css('display', 'none');
        $('#txtDepartmentEdit').css('border-color', '#e5e5e5');
    }
    if (!location) {
        $('#message-locationEdit').css('display', 'inline-block');
        $('#txtLocationEdit').css('border-color', '#ff0000');
    }
    else {
        $('#message-locationEdit').css('display', 'none');
        $('#txtLocationEdit').css('border-color', '#e5e5e5');
    }
    if (!status) {
        $('#message-statusEdit').css('display', 'inline-block');
        $('#txtStatusEdit').css('border-color', '#ff0000');
    }
    else {
        $('#message-statusEdit').css('display', 'none');
        $('#txtStatusEdit').css('border-color', '#e5e5e5');
    }

    if (!employeeCode | !fullName | !phoneNumber | !email | !identity) {

        return;
    }

    else {
        var employee =
        {
            "Id": txtEmployeeId,
            "employeeCode": employeeCode,
            "fullName": fullName,
            "dateofBirth": dob,
            "gender": gender,
            "enumIdentity": identity,
            "dateIdentity": dateIdentity,
            "addressIdentity": addressIdentity,
            "email": email,
            "phoneNumber": phoneNumber,
            "locaId": location,
            "deparId": department,
            "staId": status,
            "taxCode": taxCode,
            "salary": salary,
            "companyAddDate": workCompany,
            "createdBy": "",
            "modifiedBy": ""
        };

        saveData(employee);
    }
}

function showTable(respone) {
    $("#misaTable").find("tr:gt(0)").remove();
    for (var i = 0; i <= respone.length; i++) {
        var item = respone[i];
        var departmentId;
        var departmentName;
        var locationId;
        var locationName;
        var statusId;
        var statusName;

        var employeeId = item['employeeId'];
        var employeeCode = item['employeeCode'];
        var fullName = item['fullName'];
        var phoneNumber = item['phoneNumber'];
        var email = item['email'];
        var gender = item['gender'];

        if(gender == 1) {
            gender = 'Nam';
        }
        if(gender == 2) {
            gender = 'Nữ';
        }
        if(gender == 0) {
            gender = 'Khác';
        }
        var dob = item['dateOfBirth'];
        var dateStr = formatDate(dob);

        var price = item['salary'];
        if(price == null | price == '') {
            price = '0';
        } 
        var salary = formatCurrency(price);

        var EdepartmentId = item['departmentId'];
        var ElocationId = item['locationId'];
        var EstatusId = item['statusId'];

        for (var j = 0; j < arrDepartment.length; j++) {
            departmentId = arrDepartment[j].departmentId;
            if(departmentId == EdepartmentId) {
                departmentName = arrDepartment[j].departmentName;
            }
        }

        for (var j = 0; j < arrLocation.length; j++) {
            locationId = arrLocation[j].locationId;
            if(locationId == ElocationId) {
                locationName = arrLocation[j].locationName;
            }
        }

        for (var j = 0; j < arrStatus.length; j++) {
            statusId = arrStatus[j].statusId;
            if(statusId == EstatusId) {
                statusName = arrStatus[j].statusName;
            }
        }

        var trHTML = `<tr>
                        <td>  
                            <button id="btnEdit" value="${employeeId}">Sửa</button>
                            <button id="btnDelete"  value="${employeeId}">Xóa</button>
                        </td>
                        <td>${employeeCode}</td>
                        <td>${fullName}</td>
                        <td>${gender}</td>
                        <td>${dateStr}</td>
                        <td>${phoneNumber}</td>
                        <td>${email}</td>
                        <td>${locationName}</td>
                        <td>${departmentName}</td>
                        <td>${salary}</td>
                        <td>${statusName}</td>
                    </tr>`;
        $('#misaTable tr:last').after(trHTML);
    }
}

/**
 * 
 * @param {date} date 
 * định dạng ngày tháng
 */
function formatDate(date) {
    date = new Date(date);
    day = date.getDate() + 1;
    month = date.getMonth() + 1;
    year = date.getYear() + 1900;

    return month + '/' + day + '/' + year;
}


$('#txtSalary, #txtSalaryEdit').focus(function(){
    $('#txtSalary, #txtSalaryEdit').val('');
    console.log(this.value.replace(/[,VNĐ]/g,''))
})
$('#txtSalary, #txtSalaryEdit').on('input', function(e){        
    $(this).val(formatCurrency(this.value.replace(/[,VNĐ]/g,'')));
}).on('keypress',function(e){
    if(!$.isNumeric(String.fromCharCode(e.which))) e.preventDefault();
}).on('paste', function(e){    
    var cb = e.originalEvent.clipboardData || window.clipboardData;      
    if(!$.isNumeric(cb.getData('text'))) e.preventDefault();
});

/**
 * Format Salary
 * @param {salary} number 
 */
function formatCurrency(number){
    var n = number.split(',').reverse().join("");
    var n2 = n.replace(/\d\d\d(?!$)/g, "$&,");    
    return  n2.split('').reverse().join('') + 'VNĐ';
}

/**
 * Hiển thị modal thêm khách hàng
 */
function showAdd() {
    $('.modal.modal-add').addClass('show');
};

function showSave() {
    $('.modal.modal-save').addClass('show');
};

function showDelete() {
    $('.modal.modal-delete').addClass('show');
};

function showSuccess() {
    $('.modal.modal-success').addClass('show');
};

/**
 * ẩn modal thêm khách hàng
 */
function hideModal() {
    $('.modal-add, .modal-save, .modal-delete, .modal-success').removeClass('show');
};

function hideModalSuccess() {
    $('.modal-success').removeClass('show');
}

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
