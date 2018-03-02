using System;
using System.IO;
using System.Net;
using System.Web.Mvc;
using BarsaClub.Models;
using BarsaClub.Infrastructure.Services.Email;
using BarsaClub.Infrastructure.Services.Payment;
using BarsaClub.Infrastructure.Services.Email.Models;

namespace BarsaClub.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult TrialWorkout(TrialWorkoutModel model)
        {
            if(model == null || String.IsNullOrEmpty(model.DateField) || String.IsNullOrEmpty(model.Email) ||
                String.IsNullOrEmpty(model.LevelSelect) || String.IsNullOrEmpty(model.NameField) ||
                String.IsNullOrEmpty(model.Phone))
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            //sending email notification
            try
            {
                using (var messageTemplateFile = MessageBuilder.GetMessageTemplate("trialworkout"))
                {
                    try
                    {
                        var messageContext = new MessageBuilderContext()
                        {
                            TemplateFile = messageTemplateFile,
                            Title = "Пробная тренировка",
                            Name = model.NameField,
                            Email = model.Email,
                            Phone = model.Phone,
                            Description = $"Дата: {model.DateField}, Уровень: {model.LevelSelect}"
                        };
                        var messageBuilder = new MessageBuilder(messageContext);

                        EmailSender.SendMessageAsync(messageBuilder.GetMessage());
                    }
                    catch
                    {
                        //todo: write log
                    }
                }
            }
            catch (FileNotFoundException e)
            {
                //todo: write log
            }
            catch (Exception e)
            {
                //todo: write log
            }

            return View("TrialWorkoutSuccess", model);
        }

        [HttpPost]
        public ActionResult Pay(PayModel model)
        {
            if (model == null || String.IsNullOrEmpty(model.Email) || String.IsNullOrEmpty(model.Name) ||
                String.IsNullOrEmpty(model.Phone) || model.Sum < 0)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            var robokassa = new RobokassaService(model.Name, model.Email, model.Phone, model.Sum);

            var redirectModel = new RedirectPaymetModel()
            {
                Signature = robokassa.Signature,
                MerchantLogin = robokassa.MerchantLogin,
                Email = robokassa.Email,
                EmailUrlEncoded = robokassa.EmailUrlEncoded,
                Name = robokassa.Name,
                NameUrlEncoded = robokassa.NameUrlEncoded,
                Phone = robokassa.Phone,
                PhoneUrlEncoded = robokassa.PhoneUrlEncoded,
                Sum = robokassa.Sum
            };

            return View("PayPlatformRedirect", redirectModel);
        }

    }
}