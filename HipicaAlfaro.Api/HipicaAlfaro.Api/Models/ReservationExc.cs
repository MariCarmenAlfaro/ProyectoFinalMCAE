using System.ComponentModel.DataAnnotations;

namespace HipicaAlfaro.Api.Models
{
    public class ReservationExc
    {
        public int ReservationId { get; set; }
        public string ReservationName { get; set; }
        public string EmailAddress { get; set; }
        public int NumPeople { get; set; }
        public DateTime DateExcursion { get; set; }
        public string ExcursionType { get; set; }
    }
}
