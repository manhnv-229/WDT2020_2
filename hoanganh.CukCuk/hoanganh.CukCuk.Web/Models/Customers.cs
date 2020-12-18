﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hoanganh.CukCuk.Web.Models
{
    public class Customers
    {
        public Guid CustomerId { get; set; }

        public string CustomerCode { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public DateTime? DateOfBirth { get; set; }
        public int? Gender { get; set; }
    }
}
