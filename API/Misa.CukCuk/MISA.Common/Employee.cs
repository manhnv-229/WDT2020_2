using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Common
{
    public class Employee
    {       
        public object EmployeeId { get; set; }
        public string Id
        {
            get
            {
                return EmployeeId.ToString();
            }
            set
            {
                EmployeeId = value;
            }
        }
        public object DepartmentId { get; set; }
        public string DeparId
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
        public object LocationId { get; set; }
        public string LocaId
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
        public object StatusId { get; set; }
        public string StaId
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
        public string EmployeeCode { get; set; }
        public string FullName { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public int Gender { get; set; }
        public string EnumIdentity { get; set; }
        public DateTime? DateIdentity { get; set; }
        public string AddressIdentity { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string TaxCode { get; set; }
        public string Salary { get; set; }
        public DateTime? CompanyAddDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
    }
}
