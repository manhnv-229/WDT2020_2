using Microsoft.AspNetCore.Mvc;
using MS2_28.BL.Interfaces;
using MS2_28.Models;
using MS2_Models.Enum;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MS2_28.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        IEmployeeBL _employeeBL;

        public EmployeesController(IEmployeeBL employeeBL)
        {
            _employeeBL = employeeBL;
        }

        #region Post

        [HttpPost]
        public IActionResult Post([FromBody] Employee employee)
        {
            var result = _employeeBL.InsertEmployee(employee);
            return switchAction(result);
        }

        #endregion

        #region Get

        [HttpGet]
        public IActionResult GetAll()
        {
            var result = _employeeBL.GetEmployees();
            return switchAction(result);
        }

        [HttpGet]
        [Route("search")]
        public IActionResult GetEmployeeSearch([FromQuery] string codePhoneName, string jobId, string departmentId)
        {
            jobId = jobId == null ? "" : jobId;
            departmentId = departmentId == null ? "" : departmentId;

            var result = _employeeBL.GetEmployeeSearch(codePhoneName, jobId, departmentId);
            return switchAction(result);
        }

        [HttpGet]
        [Route("id={id}")]
        public IActionResult Get(string id)
        {
            var result = _employeeBL.GetEmployeeById(id);
            return switchAction(result);
        }

        [HttpGet]
        [Route("max-code")]
        public IActionResult GetMaxCode()
        {
            var result = _employeeBL.GetEmployeeCodeMax();
            return switchAction(result);
        }
        #endregion

        #region Put

        [HttpPut]
        public IActionResult Put([FromBody] Employee employee)
        {
            var result = _employeeBL.UpdateEmployee(employee);
            return switchAction(result);
        }

        #endregion

        #region Delete
        [HttpDelete]
        [Route("id={employeeId}")]
        public IActionResult Delete(string employeeId)
        {
            var result = _employeeBL.DeleteEmployee(employeeId);
            return switchAction(result);
        }

        [HttpGet]
        [Route("code={code}")]
        public IActionResult GetByCode(string code)
        {
            var result = _employeeBL.GetEmployeeByCode(code);
            return switchAction(result);
        }
        #endregion

        //private method
        private IActionResult switchAction(ServiceResult serviceResult)
        {
            switch (serviceResult.MISACode)
            {
                case MISAServiceCode.BadRequest:
                    return BadRequest(serviceResult);
                case MISAServiceCode.Success:
                    return Ok(serviceResult);
                case MISAServiceCode.Excaption:
                    return StatusCode(500);
                default:
                    return Ok();
            }
        }
    }
}