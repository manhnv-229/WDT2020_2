using Dapper;
using MISA.CukCuk.Web.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Web.Data
{
    public class DatabaseConnector<TEntity>
    {
        string connectionString = "User Id=nvmanh;" +
                "Database=MS2_01_NTAnh_CukCuk;" +
                "Host=103.124.92.43;port=3306;" +
                "password=12345678;" +
                "Character Set=utf8";
        string className = typeof(TEntity).Name;
        
        IDbConnection _dbConnection;
        public DatabaseConnector()
        {
            _dbConnection = new MySqlConnection(connectionString);
        }


        /// <summary>
        /// Hàm lấy toàn bộ dữ liệu trong bảng
        /// </summary>
        /// <returns></returns>
        public IEnumerable<TEntity> GetData()
        {
            var sql = $"SELECT * FROM {className}";
            var entities = _dbConnection.Query<TEntity>(sql);
            return entities;
        }

        /// <summary>
        /// Hàm nạp chồng của hàm lấy dữ liệu, có tham số truyền vào
        /// </summary>
        /// <param name="commandText">câu lệnh sql mới cần thực thi</param>
        /// <returns></returns>
        public IEnumerable<TEntity> GetData(string commandText)
        {
            var sql = commandText;
            var entities = _dbConnection.Query<TEntity>(sql);
            return entities;
        }

        /// <summary>
        /// Hàm lấy bản ghi theo Id
        /// </summary>
        /// <param name="id">truyền vào Id</param>
        /// <returns></returns>
        public TEntity GetById(object id)
        {
            var sql = $"SELECT * FROM {className} WHERE {className}Id = '{id.ToString()}'";
            return _dbConnection.Query<TEntity>(sql).FirstOrDefault();
        }

        /// <summary>
        /// Hàm thêm mới bản ghi
        /// </summary>
        /// <param name="entity">đối tượng được thêm mới</param>
        /// <returns></returns>
        public int Insert(TEntity entity)
        {
            var properties = typeof(TEntity).GetProperties();
            var parameters = new DynamicParameters();
            var sqlPropertyBuider = string.Empty;
            var sqlPropertyParamBuider = string.Empty;

            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(entity);
                parameters.Add($"@{propertyName}", propertyValue);
                sqlPropertyBuider += $",{propertyName}";
                sqlPropertyParamBuider += $",@{propertyName}";
            }

            var sql = $"INSERT INTO {className}({sqlPropertyBuider.Substring(1)}) VALUE ({sqlPropertyParamBuider.Substring(1)})";
            return _dbConnection.Execute(sql,parameters);
        }
    }
}
