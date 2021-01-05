using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.BL.Interfaces;
using MISA.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Misa.CukCuk.Web.Controllers
{
    public class EmployeeDepartmentsController : BaseEntityController<EmployeeDepartment>
    {
        public EmployeeDepartmentsController(IEmployeeBL employeeBL)
        {
            _employeeBL = employeeBL;
        }

        public override IActionResult Post(EmployeeDepartment employeeDepartment)
        {
            var notNull = "phòng ban không được phép để trống!";
            var messNV = "phòng ban";

            if (employeeDepartment.DepartmentName.Trim() == string.Empty)
            {
                return BadRequest("Tên  " + notNull);
            }
            if (_employeeBL.CheckNameDupticate<EmployeeDepartment>(employeeDepartment.DepartmentName) == true)
            {
                return BadRequest(new
                {
                    Message = "Trùng Tên " + messNV,
                    Status = 400,
                    Data = employeeDepartment.DepartmentName
                });
            }
            else
            {
                _employeeBL.Insert<EmployeeDepartment>(employeeDepartment);
                return Ok(new
                {
                    Message = "Thêm mới " + messNV + " thành công!",
                    Status = 200,
                    Data = employeeDepartment
                });
            }
        }

        public override IActionResult Put(EmployeeDepartment employeeDepartment)
        {
            var notNull = "phòng ban không được phép để trống!";
            var messNV = "phòng ban!";

            if (employeeDepartment.DepartmentName.Trim() == string.Empty)
            {
                return BadRequest("Tên " + notNull);
            }
            else
            {
                _employeeBL.Update<EmployeeDepartment>(employeeDepartment);
                return Ok(new
                {
                    Message = "Sửa thông tin " + messNV + " thành công!",
                    Status = 200,
                    Data = employeeDepartment
                });
            }
        }
    }
}
