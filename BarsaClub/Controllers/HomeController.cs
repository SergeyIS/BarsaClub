using BarsaClub.Models;
using System;
using System.Collections.Generic;
using System.Linq;
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
    }
}