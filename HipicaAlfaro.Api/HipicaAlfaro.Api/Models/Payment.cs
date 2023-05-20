using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HipicaAlfaro.Api.Models
{
    public class Payment
    {
        public int PayId { get; set; }
        public int UserId { get; set; }
        public DateTime PayDate { get; set; }
        public int PriceId { get; set; }
        public string PayMethod { get; set; }
        public bool IsPaid { get; set; }
        //public UserProfile UserProfile { get; set; }
        //public Prices Price { get; set; }
    }
}
