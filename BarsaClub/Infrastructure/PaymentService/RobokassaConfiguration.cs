using System;
using System.Configuration;

namespace BarsaClub.Infrastructure.Services.Payment
{

    public class RobokassaConfiguration : ConfigurationSection
    {
        [ConfigurationProperty("secretKey", IsRequired = true)]
        public String SecretKey
        {
            get { return (String)base["secretKey"]; }
            set { value = (String)base["secretKey"]; }
        }

        [ConfigurationProperty("merchantLogin", IsRequired = true)]
        public String MerchantLogin
        {
            get { return (String)base["merchantLogin"]; }
            set { value = (String)base["merchantLogin"]; }
        }
    }
}