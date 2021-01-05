using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Common
{
    public class EmployeeDepartment
    {
        public object DepartmentId { get; set; }
        public string Id
        {
            get
            {
                return DepartmentId.ToString();
            }
            set
            {
                DepartmentId = value;
            }
        }
        public string DepartmentName { get; set; }
        public string Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
    }
}
