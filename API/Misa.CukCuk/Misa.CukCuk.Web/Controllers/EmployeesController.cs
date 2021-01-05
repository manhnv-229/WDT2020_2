using Microsoft.AspNetCore.Mvc;
using MISA.BL.Interfaces;
using MISA.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Misa.CukCuk.Web.Controllers
{
    public class EmployeesController : BaseEntityController<Employee>
    {
        public EmployeesController(IEmployeeBL employeeBL)
        {
            _employeeBL = employeeBL;
        }

        [HttpGet("SearchByDataCodeMax")]
        public IEnumerable<Employee> GetAllDataCodeMax()
        {
            return _employeeBL.GetAllDataCodeMax<Employee>();
        }

        [HttpGet("SearchByAll")]
        public virtual IEnumerable<Employee> GetDataByEmployeeAll([FromQuery] string keyName, [FromQuery] string departmentId, [FromQuery] string locationId)
        {
            return _employeeBL.GetDataByEmployeeAll<Employee>(keyName, departmentId, locationId);
        }

        [HttpGet("SearchByNameDepartIdLocationId")]
        public virtual IEnumerable<Employee> GetDataByNameDepartmentIdLocationId([FromQuery] string keyName, [FromQuery] string departmentId, [FromQuery] string locationId)
        {
            return _employeeBL.GetDataByNameDepartmentIdLocationId<Employee>(keyName, departmentId, locationId);
        }

        public override IActionResult Post(Employee employee)
        {
            var notNull = "nhân viên không được phép để trống!";
            var messNV = "nhân viên";

            if (employee.EmployeeCode.Trim() == string.Empty)
            {
                return BadRequest("Mã " + notNull);
            }
            if (employee.FullName.Trim() == string.Empty)
            {
                return BadRequest("Họ tên " + notNull);
            }
            if (employee.EnumIdentity.Trim() == string.Empty)
            {
                return BadRequest("Số CMTND/ Căn cước " + notNull);
            }
            if (employee.PhoneNumber.Trim() == string.Empty)
            {
                return BadRequest("Số điện thoại " + notNull);
            }
            if (employee.LocaId.Trim() == string.Empty)
            {
                return BadRequest("Vị trí làm việc của " + notNull);
            }
            if (employee.DeparId.Trim() == string.Empty)
            {
                return BadRequest("Phòng ban làm việc của " + notNull);
            }
            if (employee.StaId.Trim() == string.Empty)
            {
                return BadRequest("Tình trạng làm việc của " + notNull);
            }
            if (_employeeBL.CheckEmployeeCodeDupticate(employee.EmployeeCode) == true)
            {
                return BadRequest(new
                {
                    Message = "Trùng mã " + messNV,
                    Status = 400,
                    Data = employee.EmployeeCode
                });
            }
            if (_employeeBL.CheckEmployeeEnumIdentityDupticate(employee.EnumIdentity) == true)
            {
                return BadRequest(new
                {
                    Message = "Trùng số CMTND/ Căn cước công dân " + messNV,
                    Status = 400,
                    Data = employee.EnumIdentity
                });
            }
            if (_employeeBL.CheckEmployeeEmailDupticate(employee.Email) == true)
            {
                return BadRequest(new
                {
                    Message = "Trùng Email " + messNV,
                    Status = 400,
                    Data = employee.Email
                });
            }
            if (_employeeBL.CheckPhoneNumberDupticate(employee.PhoneNumber) == true)
            {
                return BadRequest(new
                {
                    Message = "Trùng số điện thoại " + messNV,
                    Status = 400,
                    Data = employee.PhoneNumber
                });
            }
            else
            {
                _employeeBL.Insert<Employee>(employee);
                return Ok(new
                {
                    Message = "Thêm mới " + messNV + " thành công!",
                    Status = 200,
                    Data = employee
                });
            }
        }

        public override IActionResult Put(Employee employee)
        {
            var notNull = "nhân viên không được phép để trống!";
            var messNV = "nhân viên";

            if (employee.EmployeeCode.Trim() == string.Empty)
            {
                return BadRequest("Mã " + notNull);
            }
            if (employee.FullName.Trim() == string.Empty)
            {
                return BadRequest("Họ tên " + notNull);
            }
            if (employee.EnumIdentity.Trim() == string.Empty)
            {
                return BadRequest("Số CMTND/ Căn cước công dân " + notNull);
            }
            if (employee.Email.Trim() == string.Empty)
            {
                return BadRequest("Email " + notNull);
            }
            if (employee.PhoneNumber.Trim() == string.Empty)
            {
                return BadRequest("Số điện thoại " + notNull);
            }
            if (employee.LocaId.Trim() == string.Empty)
            {
                return BadRequest("Vị trí làm việc của " + notNull);
            }
            if (employee.DeparId.Trim() == string.Empty)
            {
                return BadRequest("Phòng ban làm việc của " + notNull);
            }
            if (employee.StaId.Trim() == string.Empty)
            {
                return BadRequest("Tình trạng công việc của " + notNull);
            }
            if (_employeeBL.CheckEmployeeCodeUpdateDupticate(employee.Id, employee.EmployeeCode) == true)
            {
                return BadRequest(new
                {
                    Message = "Trùng mã " + messNV,
                    Status = 400,
                    Data = employee.EmployeeCode
                });
            }
            if (_employeeBL.CheckEmployeeEnumIdentityUpdateDupticate(employee.Id, employee.EnumIdentity) == true)
            {
                return BadRequest(new
                {
                    Message = "Trùng số CMTND/ Căn cước công dân " + messNV,
                    Status = 400,
                    Data = employee.EnumIdentity
                });
            }
            if (_employeeBL.CheckEmployeeEmailUpdateDupticate(employee.Id, employee.Email) == true)
            {
                return BadRequest(new
                {
                    Message = "Trùng Email " + messNV,
                    Status = 400,
                    Data = employee.Email
                });
            }
            if (_employeeBL.CheckPhoneNumberUpdateDupticate(employee.Id, employee.PhoneNumber) == true)
            {
                return BadRequest(new
                {
                    Message = "Trùng số điện thoại " + messNV,
                    Status = 400,
                    Data = employee.PhoneNumber
                });
            }
            else
            {
                _employeeBL.Update<Employee>(employee);
                return Ok(new
                {
                    Message = "Sửa thông tin " + messNV + " thành công!",
                    Status = 200,
                    Data = employee
                });
            }
        }
    }
}
