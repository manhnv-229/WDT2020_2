using Dapper;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.DL
{
    public class DbConnector
    {
        protected string ConnectionString = "User Id=nvmanh;Password=12345678;Host=103.124.92.43;Port=3306;Database=MS2_03_NTBac_CukCuk;Character Set=utf8";

        protected IDbConnection dbConnection;
        public DbConnector()
        {
            dbConnection = new MySqlConnection(ConnectionString);
        }

        public IEnumerable<T> GetAllData<T>()
        {
            var tableName = typeof(T).Name;
            var storeName = $"proc_Get{tableName}s";
            var Entity = dbConnection.Query<T>(storeName, commandType: CommandType.StoredProcedure);
            return Entity;
        }

        public IEnumerable<T> GetAllDataCodeMax<T>()
        {
            var tableName = typeof(T).Name;
            var storeName = $"proc_Get{tableName}CodeMax";
            var Entity = dbConnection.Query<T>(storeName, commandType: CommandType.StoredProcedure);
            return Entity;
        }

        public IEnumerable<T> GetDataById<T>(string customerId)
        {
            var tableName = typeof(T).Name;
            var storeName = $"proc_Get{tableName}ById";
            DynamicParameters dynamicParameters = new DynamicParameters();
            dynamicParameters.Add($"@IdContains", customerId);
            var Entity = dbConnection.Query<T>(storeName, dynamicParameters, commandType: CommandType.StoredProcedure);
            return Entity;
        }

        public IEnumerable<T> GetDataByName<T>(string name)
        {
            var tableName = typeof(T).Name;
            var storeName = $"proc_Get{tableName}ByName";
            DynamicParameters dynamicParameters = new DynamicParameters();
            dynamicParameters.Add($"@KeyName", name);
            var Entity = dbConnection.Query<T>(storeName, dynamicParameters, commandType: CommandType.StoredProcedure);
            return Entity;
        }

        public IEnumerable<T> GetDataByEmployeeAll<T>(string keyName, string departmentId, string locationId)
        {
            var tableName = typeof(T).Name;
            var storeName = $"proc_Get{tableName}ByAll";
            DynamicParameters dynamicParameters = new DynamicParameters();
            dynamicParameters.Add($"@KeyName", keyName);
            dynamicParameters.Add($"@DepartmentId", departmentId);
            dynamicParameters.Add($"@LocationId", locationId);
            var Entity = dbConnection.Query<T>(storeName, dynamicParameters, commandType: CommandType.StoredProcedure);
            return Entity;
        }

        public IEnumerable<T> GetDataByNameDepartmentIdLocationId<T>(string keyName, string departmentId, string locationId)
        {
            var tableName = typeof(T).Name;
            var storeName = $"proc_Get{tableName}ByNameDepartmentIdLocationId";
            DynamicParameters dynamicParameters = new DynamicParameters();
            dynamicParameters.Add($"@KeyName", keyName);
            dynamicParameters.Add($"@DepartmentId", departmentId);
            dynamicParameters.Add($"@LocationId", locationId);
            var Entity = dbConnection.Query<T>(storeName, dynamicParameters, commandType: CommandType.StoredProcedure);
            return Entity;
        }

        public int Insert<T>(T Entity) 
        {
            var tableName = typeof(T).Name;
            var storeName = $"proc_Insert{tableName}";
            DynamicParameters dynamicParameters = new DynamicParameters();

            var properties = typeof(T).GetProperties();
            foreach(var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(Entity);
                dynamicParameters.Add($"@{propertyName}", propertyValue);
            }

            var affectRow = dbConnection.Execute(storeName, dynamicParameters, commandType: CommandType.StoredProcedure);
            return affectRow;
        }

        public int Update<T>(T Entity)
        {
            var tableName = typeof(T).Name;
            var storeName = $"Proc_Update{tableName}";
            DynamicParameters dynamicParameters = new DynamicParameters();

            var properties = typeof(T).GetProperties();
            foreach(var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(Entity);
                dynamicParameters.Add($"@{propertyName}", propertyValue);
            }
            
            var affectRow = dbConnection.Execute(storeName, dynamicParameters, commandType: CommandType.StoredProcedure);
            return affectRow;
        }

        public int Delete<T>(string Id)
        {
            var tableName = typeof(T).Name;
            var storeName = $"proc_Delete{tableName}";
            DynamicParameters dynamicParameters = new DynamicParameters();
            dynamicParameters.Add($"@IdContains", Id);
            var Entity = dbConnection.Execute(storeName, dynamicParameters, commandType: CommandType.StoredProcedure);
            return Entity;
        }
    }
}
