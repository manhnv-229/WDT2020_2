using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Common
{
    public class EmployeeStatus
    {
        public object StatusId { get; set; }
        public string Id
        {
            get
            {
                return StatusId.ToString();
            }
            set
            {
                StatusId = value;
            }
        }
        public string StatusName { get; set; }
        public string Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
    }
}
