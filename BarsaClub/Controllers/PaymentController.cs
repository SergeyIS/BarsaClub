using System;
using System.IO;
using System.Net;
using System.Web.Mvc;
using BarsaClub.Infrastructure.Services.Email;
using BarsaClub.Infrastructure.Services.Email.Models;

namespace BarsaClub.Controllers
{
    public class PaymentController : Controller
    {
        [HttpGet]
        [ValidateInput(false)]
        public ActionResult Success()
        {
            var sum = HttpContext.Request.QueryString.Get("out_summ");
            var email = HttpContext.Request.QueryString.Get("Shp_email");
            var name = HttpContext.Request.QueryString.Get("Shp_name");
            var phone = HttpContext.Request.QueryString.Get("Shp_phone");

            if(String.IsNullOrEmpty(sum) || String.IsNullOrEmpty(email) || String.IsNullOrEmpty(name) || 
                String.IsNullOrEmpty(phone))
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);

            //todo: check hash

            //sending email notification
            try
            {
                using (var messageTemplateFile = MessageBuilder.GetMessageTemplate("payment"))
                {
                    try
                    {
                        var messageContext = new MessageBuilderContext()
                        {
                            TemplateFile = messageTemplateFile,
                            Title = "Оплата абонемента",
                            Name = name,
                            Email = email,
                            Phone = phone,
                            Description = $"Стоимость абонемента: {sum}р."
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

            return View();
        }

        [HttpGet]
        public ActionResult Fail()
        {
            return View();
        }
    }
}