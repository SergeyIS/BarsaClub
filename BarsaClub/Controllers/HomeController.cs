using BarsaClub.Models;
using NickBuhro.Translit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

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
            return View("TrialWorkoutSuccess", model);
        }

        [HttpPost]
        public ActionResult Pay(PayModel model)
        {
            if (model == null)
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);

            
            var redirectModel = new RedirectPaymetModel()
            {
                SecretKey = "fgB83iufhdgfrvrehv",
                MerchantLogin = "barsatest",
                Email = model.Email,
                Name = Transliteration.CyrillicToLatin(model.Name, Language.Russian),
                Phone = model.Phone,
                Sum = model.Sum
            };

            return View("PayPlatformRedirect", redirectModel);
        }

    }
}