namespace HipicaAlfaro.Api.Models
{
    public class PriceForService
    {
        public int PayId { get; set; }
        public int UserId { get; set; }
        public DateTime PayDate { get; set; }
        public int PriceId { get; set; }
        public string PayMethod { get; set; }

        public string TypeService { get; set; }

        public float Price { get; set; }
    }
}
