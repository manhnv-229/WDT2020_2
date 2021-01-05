using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Common
{
    public class EmployeeLocation
    {
        public object LocationId { get; set; }
        public string Id
        {
            get
            {
                return LocationId.ToString();
            }
            set
            {
                LocationId = value;
            }
        }
        public string LocationName { get; set; }
        public string Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
    }
}
