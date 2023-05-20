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
        public string Lunes { get; set; }
        public string Martes { get; set; }
        public string Miercoles { get; set; }
        public string Jueves { get; set; }
        public string Viernes { get; set; }
        public string Sabado { get; set; }
    }
}
