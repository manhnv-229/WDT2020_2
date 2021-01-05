using MISA.BL.Interfaces;
using MISA.DL.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.BL
{
    public class EmployeeBL : IEmployeeBL
    {
        IEmployeeDL _employeeDL;
        public EmployeeBL(IEmployeeDL employeeDL)
        {
            _employeeDL = employeeDL;
        }

        public IEnumerable<T> Get<T>()
        {
            return _employeeDL.Get<T>();
        }

        public IEnumerable<T> GetAllDataCodeMax<T>()
        {
            return _employeeDL.GetAllDataCodeMax<T>();
        }

        public IEnumerable<T> Get<T>(string name)
        {
            return _employeeDL.Get<T>(name);
        }

        public IEnumerable<T> GetDataByEmployeeAll<T>(string keyName, string departmentId, string locationId)
        {
            return _employeeDL.GetDataByEmployeeAll<T>(keyName, departmentId, locationId);
        }

        public IEnumerable<T> GetDataByNameDepartmentIdLocationId<T>(string keyName, string departmentId, string locationId)
        {
            return _employeeDL.GetDataByNameDepartmentIdLocationId<T>(keyName, departmentId, locationId);
        }

        public int Insert<T>(T Entity)
        {
            var affect = _employeeDL.Insert<T>(Entity);
            return affect;
        }

        public int Update<T>(T Entity)
        {
            var affect = _employeeDL.Update<T>(Entity);
            return affect;
        }

        public int Delete<T>(string Id)
        {
            return _employeeDL.Delete<T>(Id);
        }

        public bool CheckEmployeeCodeDupticate(string employeeCode)
        {
            if (_employeeDL.CheckEmployeeCodeDupticate(employeeCode) == true)
            {
                return true;
            }
            return false;
        }

        public bool CheckEmployeeCodeUpdateDupticate(string employeeId, string employeeCode)
        {
            if (_employeeDL.CheckEmployeeCodeUpdateDupticate(employeeId, employeeCode) == true)
            {
                return true;
            }
            return false;
        }

        public bool CheckEmployeeEnumIdentityDupticate(string employeeEnumIdentity)
        {
            if (_employeeDL.CheckEmployeeEnumIdentityDupticate(employeeEnumIdentity) == true)
            {
                return true;
            }
            return false;
        }

        public bool CheckEmployeeEnumIdentityUpdateDupticate(string employeeId, string employeeEnumIdentity)
        {
            if (_employeeDL.CheckEmployeeEnumIdentityUpdateDupticate(employeeId, employeeEnumIdentity) == true)
            {
                return true;
            }
            return false;
        }

        public bool CheckEmployeeEmailDupticate(string email)
        {
            if (_employeeDL.CheckEmployeeEmailDupticate(email) == true)
            {
                return true;
            }
            return false;
        }

        public bool CheckEmployeeEmailUpdateDupticate(string employeeId, string email)
        {
            if (_employeeDL.CheckEmployeeEmailUpdateDupticate(employeeId, email) == true)
            {
                return true;
            }
            return false;
        }

        public bool CheckPhoneNumberDupticate(string phoneNumber)
        {
            if (_employeeDL.CheckPhoneNumberDupticate(phoneNumber) == true)
            {
                return true;
            }
            return false;
        }

        public bool CheckPhoneNumberUpdateDupticate(string employeeId, string phoneNumber)
        {
            if (_employeeDL.CheckPhoneNumberUpdateDupticate(employeeId, phoneNumber) == true)
            {
                return true;
            }
            return false;
        }

        public bool CheckNameDupticate<T>(string name)
        {
            if (_employeeDL.CheckNameDupticate<T>(name) == true)
            {
                return true;
            }
            return false;
        }
    }
}
