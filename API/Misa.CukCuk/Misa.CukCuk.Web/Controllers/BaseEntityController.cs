using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.BL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Misa.CukCuk.Web.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class BaseEntityController<TEntity> : ControllerBase
    {
        protected IEmployeeBL _employeeBL;

        /// <summary>
        /// Lấy toàn bộ dữ liệu
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<TEntity> Get()
        {
            return _employeeBL.Get<TEntity>();
        }

        /// <summary>
        /// Tìm kiễm dữ liệu theo Mã, Tên hoặc Số điện thoại
        /// </summary>
        /// <param name="keyName"></param>
        /// <returns></returns>
        [HttpGet("SearchByName")]
        public virtual IEnumerable<TEntity> Get([FromQuery] string keyName)
        {
            return _employeeBL.Get<TEntity>(keyName);
        }

        /// <summary>
        /// Thêm mới dữ liệu
        /// </summary>
        /// <param name="data">Object dữ liệu</param>
        /// <returns></returns>
        [HttpPost]
        public virtual IActionResult Post(TEntity data)
        {
            return Ok(_employeeBL.Insert<TEntity>(data));
        }

        /// <summary>
        /// Sửa dữ liệu
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPut]
        public virtual IActionResult Put(TEntity data)
        {
            return Ok(_employeeBL.Update<TEntity>(data));
        }

        /// <summary>
        /// Xóa dữ liệu
        /// </summary>
        /// <param name="idData"></param>
        /// <returns></returns>
        [HttpDelete]
        public virtual IActionResult Delete([FromQuery] string idData)
        {
            _employeeBL.Delete<TEntity>(idData);
            return Ok(new
            {
                Message = "Xóa nhân viên thành công!",
                Status = 200
            });
        }
    }
}
