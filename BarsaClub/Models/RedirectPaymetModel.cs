using System;

namespace BarsaClub.Models
{
    public class RedirectPaymetModel
    {
        public String MerchantLogin { get; set; }
        public String Signature { get; set; }
        public String Name { get; set; }
        public String Email { get; set; }
        public String Phone { get; set; }
        public String NameUrlEncoded { get; set; }
        public String EmailUrlEncoded { get; set; }
        public String PhoneUrlEncoded { get; set; }
        public String IncCurrLabel { get; set; }
        public String Sum { get; set; }
    }
}
