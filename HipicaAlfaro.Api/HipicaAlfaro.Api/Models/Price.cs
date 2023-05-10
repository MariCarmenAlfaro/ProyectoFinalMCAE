using System.ComponentModel.DataAnnotations;

namespace HipicaAlfaro.Api.Models
{
    public class Prices
    {
        public int PriceId { get; set; }

        public string TypeService { get; set; }

        public float Price { get; set; }
    }
}
