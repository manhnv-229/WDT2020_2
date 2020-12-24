using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.CukCuk.Web.Data;
using MISA.CukCuk.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseEntityController<BEntity> : ControllerBase
    {

        protected DatabaseConnector<BEntity> _dbConnector;
        public BaseEntityController()
        {
            _dbConnector = new DatabaseConnector<BEntity>();
        }
        // GET: api/<CustomersController1>
        [HttpGet]
        public virtual IEnumerable<BEntity> Get()
        {
            //var databaseConnector = new DatabaseConnector<BEntity>();
            var customers = _dbConnector.GetData();
            return customers;

        }

        // GET api/<CustomersController1>/5
        [HttpGet("GetById/{customerId}")]
        public BEntity Get(Guid customerId)
        {
            //var databaseConnector = new DatabaseConnector<BEntity>();
            var customer = _dbConnector.GetById(customerId);
            return customer;
        }

        // POST api/<CustomersController1>
        [HttpPost]
        public int Post([FromBody] BEntity customer)
        {
            //Post dữ liệu:
            var effectRows = _dbConnector.Insert(customer);
            return effectRows;
        }
    }
}
