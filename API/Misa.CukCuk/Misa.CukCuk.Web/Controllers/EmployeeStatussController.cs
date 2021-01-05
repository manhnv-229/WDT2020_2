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
    public class EmployeeStatussController : BaseEntityController<EmployeeStatus>
    {
        public EmployeeStatussController(IEmployeeBL employeeBL)
        {
            _employeeBL = employeeBL;
        }

        public override IActionResult Post(EmployeeStatus employeeStatus)
        {
            var notNull = "trạng thái công việc không được phép để trống!";
            var messNV = "trạng thái công việc";

            if (employeeStatus.StatusName.Trim() == string.Empty)
            {
                return BadRequest("Tên  " + notNull);
            }
            if (_employeeBL.CheckNameDupticate<EmployeeStatus>(employeeStatus.StatusName) == true)
            {
                return BadRequest(new
                {
                    Message = "Trùng Tên " + messNV,
                    Status = 400,
                    Data = employeeStatus.StatusName
                });
            }
            else
            {
                _employeeBL.Insert<EmployeeStatus>(employeeStatus);
                return Ok(new
                {
                    Message = "Thêm mới " + messNV + " thành công!",
                    Status = 200,
                    Data = employeeStatus
                });
            }
        }

        public override IActionResult Put(EmployeeStatus employeeStatus)
        {
            var notNull = "trạng thái công việc không được phép để trống!";
            var messNV = "trạng thái công việc";

            if (employeeStatus.StatusName.Trim() == string.Empty)
            {
                return BadRequest("Tên " + notNull);
            }
            else
            {
                _employeeBL.Update<EmployeeStatus>(employeeStatus);
                return Ok(new
                {
                    Message = "Sửa thông tin " + messNV + " thành công!",
                    Status = 200,
                    Data = employeeStatus
                });
            }
        }
    }
}
