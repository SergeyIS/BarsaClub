using System;
using System.Web;
using System.Web.Mvc;

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
            
            //todo: check hash



            return View();
        }

        [HttpGet]
        public ActionResult Fail()
        {
            return View();
        }

    }
}