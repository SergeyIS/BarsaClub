using System;
using System.IO;

namespace BarsaClub.Infrastructure.Services.Email.Models
{
    public class MessageBuilderContext
    {
        public String Title { get; set; }
        public String Name { get; set; }
        public String Email { get; set; }
        public String Phone { get; set; }
        public String Description { get; set; }
        public StreamReader TemplateFile { get; set; }

    }
}
