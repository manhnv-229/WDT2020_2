using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.Common
{
    public class ServiceResult
    {
        /// <summary>
        /// Dữ liệu trả về
        /// </summary>
        public object Data { get; set; }

        /// <summary>
        /// Câu thông báo
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// Mã kết quả
        /// </summary>
        public string StatusCode { get; set; }
    }
}
