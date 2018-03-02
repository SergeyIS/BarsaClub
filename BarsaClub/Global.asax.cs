using System;
using System.IO;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Configuration;
using BarsaClub.Infrastructure.Services.Email;
using BarsaClub.Infrastructure.Services.Payment;

namespace BarsaClub
{
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            try
            {
                AreaRegistration.RegisterAllAreas();
                RouteConfig.RegisterRoutes(RouteTable.Routes);

                //email sending configuration
                var emailConfig = (EmailConfiguration)ConfigurationManager.GetSection("emailConfiguration");
                EmailSender.Configure(emailConfig);

                //setting templates for emails
                var paymentPath = ConfigurationManager.AppSettings.Get("paymentTmplPath");
                var trialWorkoutPath = ConfigurationManager.AppSettings.Get("trialWorkoutTmplPath");

                MessageBuilder.SetMessageTemplate("payment", new StreamReader(paymentPath));
                MessageBuilder.SetMessageTemplate("trialworkout", new StreamReader(trialWorkoutPath));

                //robokassa configuration
                var robokassaConfig = (RobokassaConfiguration)ConfigurationManager.GetSection("robokassaConfiguration");
                RobokassaService.Configure(robokassaConfig);
            }
            catch(Exception e)
            {
                //todo: write log
                Environment.Exit(0);
            }            
        }
    }
}
