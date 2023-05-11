using System.ComponentModel.DataAnnotations;

namespace HipicaAlfaro.Api.Models
{
    public class Class
    {
        public int ClassId { get; set; }
        public string ClassDay { get; set; }
        public string ClassHour { get; set; }
        public string? ClassLevel { get; set; }
        public int? ClubId { get; set; }
    }
}
