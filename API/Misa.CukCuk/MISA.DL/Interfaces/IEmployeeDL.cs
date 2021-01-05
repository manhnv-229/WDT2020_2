using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.DL.Interfaces
{
    public interface IEmployeeDL
    {
        IEnumerable<T> Get<T>();
        IEnumerable<T> GetAllDataCodeMax<T>();
        IEnumerable<T> Get<T>(string name);
        IEnumerable<T> GetDataByEmployeeAll<T>(string keyName, string departmentId, string locationId);
        IEnumerable<T> GetDataByNameDepartmentIdLocationId<T>(string keyName, string departmentId, string locationId);
        int Insert<T>(T Entity);
        int Update<T>(T Entity);
        public int Delete<T>(string Id);

        /// <summary>
        /// Check trùng mã nhân viên
        /// </summary>
        /// <param name="employeeCode"></param>
        /// <returns></returns>
        bool CheckEmployeeCodeDupticate(string employeeCode);

        /// <summary>
        /// Check trùng số CMTND/ Căn cước nhân viên
        /// </summary>
        /// <param name="employeeEnumIdentity"></param>
        /// <returns></returns>
        bool CheckEmployeeEnumIdentityDupticate(string employeeEnumIdentity);

        /// <summary>
        /// Check trùng Email nhân viên
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        bool CheckEmployeeEmailDupticate(string email);

        /// <summary>
        /// Check trùng số điện thoại nhân viên
        /// </summary>
        /// <param name="phoneNumber"></param>
        /// <returns></returns>
        bool CheckPhoneNumberDupticate(string phoneNumber);

        /// <summary>
        /// Check trùng tên phòng ban
        /// </summary>
        /// <param name="departmentName"></param>
        /// <returns></returns>
        bool CheckNameDupticate<T>(string Name);

        /// <summary>
        /// Check trùng mã nhân viên khi Update
        /// </summary>
        /// <param name="employeeId"></param>
        /// <param name="employeeCode"></param>
        /// <returns></returns>
        bool CheckEmployeeCodeUpdateDupticate(string employeeId, string employeeCode);

        /// <summary>
        /// Check trùng Email Update
        /// </summary>
        /// <param name="employeeId"></param>
        /// <param name="email"></param>
        /// <returns></returns>
        bool CheckEmployeeEmailUpdateDupticate(string employeeId, string email);

        /// <summary>
        /// Check trùng số CMND/ Căn cước Update
        /// </summary>
        /// <param name="employeeId"></param>
        /// <param name="employeeEnumIdentity"></param>
        /// <returns></returns>
        bool CheckEmployeeEnumIdentityUpdateDupticate(string employeeId, string employeeEnumIdentity);

        /// <summary>
        /// Check trùng số điện thoại Update
        /// </summary>
        /// <param name="employeeId"></param>
        /// <param name="phoneNumber"></param>
        /// <returns></returns>
        bool CheckPhoneNumberUpdateDupticate(string employeeId, string phoneNumber);
    }
}
