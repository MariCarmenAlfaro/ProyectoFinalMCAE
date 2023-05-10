using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HipicaAlfaro.Api.Models
{
    public class MenuBar
    {
        public int MenuId { get; set; }
        public string MenuName { get; set; }
        public string MenuDate { get; set; }
        public int? MenuPriceId { get; set; }
        public Prices Price { get; set; }
    }
}
