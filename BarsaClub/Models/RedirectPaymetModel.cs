using System;
using System.Text;
using System.Security.Cryptography;

namespace BarsaClub.Models
{
    public class RedirectPaymetModel
    {
        public String MerchantLogin { get; set; }
        public String SecretKey { get; set; }
        public String Name { get; set; }
        public String Email { get; set; }
        public String Phone { get; set; }
        public Double Sum { get; set; }


        public String GetSignature()
        {
            var sum = String.Format("{0:0.00}", Sum).Replace(',', '.');

            string sCrcBase = $"{MerchantLogin}:{sum}:0:{SecretKey}:Shp_email={Email}:Shp_name={Name}:Shp_phone={Phone}";

            MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
            byte[] bSignature = md5.ComputeHash(Encoding.UTF8.GetBytes(sCrcBase));


            string result = "";
            foreach (var b in bSignature)
            {
                result += b.ToString("x2");
            }

            return result;
        }
    }
}