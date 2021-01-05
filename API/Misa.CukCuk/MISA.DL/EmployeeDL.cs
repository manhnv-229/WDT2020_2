using Dapper;
using MISA.Common;
using MISA.DL.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace MISA.DL
{
    public class EmployeeDL : DbConnector, IEmployeeDL
    {
        DbConnector dbConnector;
        public EmployeeDL()
        {
            dbConnector = new DbConnector();
        }

        public IEnumerable<T> Get<T>()
        {
            return dbConnector.GetAllData<T>();
        }

        public IEnumerable<T> GetAllDataCodeMax<T>()
        {
            return dbConnector.GetAllDataCodeMax<T>();
        }

        public IEnumerable<T> Get<T>(string name)
        {
            return dbConnector.GetDataByName<T>(name);
        }

        public IEnumerable<T> GetDataByEmployeeAll<T>(string keyName, string departmentId, string locationId)
        {
            return dbConnector.GetDataByEmployeeAll<T>(keyName, departmentId, locationId);
        }

        public IEnumerable<T> GetDataByNameDepartmentIdLocationId<T>(string keyName, string departmentId, string locationId)
        {
            return dbConnector.GetDataByNameDepartmentIdLocationId<T>(keyName, departmentId, locationId);
        }

        public int Insert<T>(T Entity)
        {
            return dbConnector.Insert<T>(Entity);
        }

        public int Update<T>(T Entity)
        {
            return dbConnector.Update<T>(Entity);
        }

        public int Delete<T>(string Id)
        {
            return dbConnector.Delete<T>(Id);
        }

        public bool CheckEmployeeCodeDupticate(string employeeCode)
        {
            DynamicParameters dynamicParameters = new DynamicParameters();
            dynamicParameters.Add($"@EmployeeCode", employeeCode);
            var rowCustomer = dbConnection.Query<Employee>("Proc_CheckEmployeeByCode", dynamicParameters, commandType: CommandType.StoredProcedure);

            if (rowCustomer.Count() > 0)
                return true;
            return false;
        }

        public bool CheckEmployeeCodeUpdateDupticate(string employeeId, string employeeCode)
        {
            DynamicParameters dynamicParameters = new DynamicParameters();
            dynamicParameters.Add($"@EmployeeId", employeeId);
            dynamicParameters.Add($"@EmployeeCode", employeeCode);
            var rowCustomer = dbConnection.Query<Employee>("Proc_CheckEmployeeByCodeUpdate", dynamicParameters, commandType: CommandType.StoredProcedure);

            if (rowCustomer.Count() > 0)
                return true;
            return false;
        }

        public bool CheckEmployeeEnumIdentityDupticate(string employeeEnumIdentity)
        {
            DynamicParameters dynamicParameters = new DynamicParameters();
            dynamicParameters.Add($"@EnumIdentity", employeeEnumIdentity);
            var rowCustomer = dbConnection.Query<Employee>("Proc_CheckEmployeeByEnumIdentity", dynamicParameters, commandType: CommandType.StoredProcedure);

            if (rowCustomer.Count() > 0)
                return true;
            return false;
        }

        public bool CheckEmployeeEnumIdentityUpdateDupticate(string employeeId, string employeeEnumIdentity)
        {
            DynamicParameters dynamicParameters = new DynamicParameters();
            dynamicParameters.Add($"@EmployeeId", employeeId);
            dynamicParameters.Add($"@EnumIdentity", employeeEnumIdentity);
            var rowCustomer = dbConnection.Query<Employee>("Proc_CheckEmployeeByEnumIdentityUpdate", dynamicParameters, commandType: CommandType.StoredProcedure);

            if (rowCustomer.Count() > 0)
                return true;
            return false;
        }

        public bool CheckEmployeeEmailDupticate(string email)
        {
            DynamicParameters dynamicParameters = new DynamicParameters();
            dynamicParameters.Add($"@Email", email);
            var rowCustomer = dbConnection.Query<Employee>("Proc_CheckEmployeeByEmail", dynamicParameters, commandType: CommandType.StoredProcedure);

            if (rowCustomer.Count() > 0)
                return true;
            return false;
        }

        public bool CheckEmployeeEmailUpdateDupticate(string employeeId, string email)
        {
            DynamicParameters dynamicParameters = new DynamicParameters();
            dynamicParameters.Add($"@EmployeeId", employeeId);
            dynamicParameters.Add($"@Email", email);
            var rowCustomer = dbConnection.Query<Employee>("Proc_CheckEmployeeByEmailUpdate", dynamicParameters, commandType: CommandType.StoredProcedure);

            if (rowCustomer.Count() > 0)
                return true;
            return false;
        }

        public bool CheckPhoneNumberDupticate(string phoneNumber)
        {
            DynamicParameters dynamicParameters = new DynamicParameters();
            dynamicParameters.Add($"@PhoneNumber", phoneNumber);
            var rowCustomer = dbConnection.Query<Employee>("Proc_CheckEmployeeByPhoneNumber", dynamicParameters, commandType: CommandType.StoredProcedure);

            if (rowCustomer.Count() > 0)
                return true;
            return false;
        }

        public bool CheckPhoneNumberUpdateDupticate(string employeeId, string phoneNumber)
        {
            DynamicParameters dynamicParameters = new DynamicParameters();
            dynamicParameters.Add($"@EmployeeId", employeeId);
            dynamicParameters.Add($"@PhoneNumber", phoneNumber);
            var rowCustomer = dbConnection.Query<Employee>("Proc_CheckEmployeeByPhoneNumberUpdate", dynamicParameters, commandType: CommandType.StoredProcedure);

            if (rowCustomer.Count() > 0)
                return true;
            return false;
        }

        public bool CheckNameDupticate<T>(string name)
        {
            var tableName = typeof(T).Name;
            var storeName = $"proc_Check{tableName}ByName";
            DynamicParameters dynamicParameters = new DynamicParameters();
            dynamicParameters.Add($"@keyName", name);
            var rowCustomer = dbConnection.Query<T>(storeName, dynamicParameters, commandType: CommandType.StoredProcedure);

            if (rowCustomer.Count() > 0)
                return true;
            return false;
        }
    }
}
