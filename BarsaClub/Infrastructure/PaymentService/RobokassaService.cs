using System;
using System.Text;
using System.Web;
using System.Security.Cryptography;
using NickBuhro.Translit;

namespace BarsaClub.Infrastructure.Services.Payment
{
    public class RobokassaService
    {
        public RobokassaService(String name, String email, String phone, Double sum)
        {
            if (String.IsNullOrEmpty(name) || String.IsNullOrEmpty(email) || String.IsNullOrEmpty(phone) || sum < 0)
                throw new ArgumentException();

            this.name = name;
            this.latinName = Transliteration.CyrillicToLatin(name, Language.Russian);
            this.email = email;
            this.phone = phone;
            this.sum = String.Format("{0:0.00}", sum).Replace(',', '.');
        }
        public static void Configure(RobokassaConfiguration configurator)
        {
            if (configurator == null)
                throw new ArgumentNullException();

            if (String.IsNullOrEmpty(configurator.MerchantLogin) || String.IsNullOrEmpty(configurator.SecretKey))
                throw new ArgumentException();

            _configurator = configurator;
        }
        private String CalculateSignature()
        {
            //base string for calculating
            string sCrcBase = $"{_configurator.MerchantLogin}:{sum}:0:{_configurator.SecretKey}:" +
                $"Shp_email={email}:Shp_name={latinName}:Shp_phone={phone}";

            var md5 = new MD5CryptoServiceProvider();
            byte[] bSignature = md5.ComputeHash(Encoding.UTF8.GetBytes(sCrcBase));


            var sb = new StringBuilder();
            foreach (var b in bSignature)
            {
                sb.Append(b.ToString("x2"));
            }

            signature = sb.ToString();

            return signature;
        }

        public String MerchantLogin
        {
            get { return _configurator.MerchantLogin; }
        }
        public String SecretKey
        {
            get { return _configurator.SecretKey; }
        }
        public String Name
        {
            get { return name; }
        }
        public String Email
        {
            get { return email; }
        }
        public String Phone
        {
            get { return phone; }
        }
        public String Sum
        {
            get { return sum; }
        }
        public String Signature
        {
            get
            {
                if (String.IsNullOrEmpty(signature))
                    CalculateSignature();

                return signature;
            }
        }
        public String NameUrlEncoded
        {
            get { return HttpUtility.UrlEncode(latinName); }
        }
        public String EmailUrlEncoded
        {
            get { return HttpUtility.UrlEncode(email); }
        }
        public String PhoneUrlEncoded
        {
            get { return HttpUtility.UrlEncode(phone); }
        }


        private String sum;
        private String name;
        private String latinName;
        private String email;
        private String phone;
        private String signature;
        private static RobokassaConfiguration _configurator;
    }
}