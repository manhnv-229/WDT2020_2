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
    public class EmployeeLocationsController : BaseEntityController<EmployeeLocation>
    {
        public EmployeeLocationsController(IEmployeeBL employeeBL)
        {
            _employeeBL = employeeBL;
        }

        public override IActionResult Post(EmployeeLocation employeeLocation)
        {
            var notNull = "vị trí không được phép để trống!";
            var messNV = "vị trí";

            if (employeeLocation.LocationName.Trim() == string.Empty)
            {
                return BadRequest("Tên  " + notNull);
            }
            if (_employeeBL.CheckNameDupticate<EmployeeLocation>(employeeLocation.LocationName) == true)
            {
                return BadRequest(new
                {
                    Message = "Trùng Tên " + messNV,
                    Status = 400,
                    Data = employeeLocation.LocationName
                });
            }
            else
            {
                _employeeBL.Insert<EmployeeLocation>(employeeLocation);
                return Ok(new
                {
                    Message = "Thêm mới " + messNV + " thành công!",
                    Status = 200,
                    Data = employeeLocation
                });
            }
        }

        public override IActionResult Put(EmployeeLocation employeeLocation)
        {
            var notNull = "vị trí không được phép để trống!";
            var messNV = "vị trí!";

            if (employeeLocation.LocationName.Trim() == string.Empty)
            {
                return BadRequest("Tên " + notNull);
            }
            else
            {
                _employeeBL.Update<EmployeeLocation>(employeeLocation);
                return Ok(new
                {
                    Message = "Sửa thông tin " + messNV + " thành công!",
                    Status = 200,
                    Data = employeeLocation
                });
            }
        }
    }
}
