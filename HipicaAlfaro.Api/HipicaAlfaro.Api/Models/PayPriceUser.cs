namespace HipicaAlfaro.Api.Models
{
    public class PayPriceUser
    {
        public string PayId { get; set; }
        public string UserId { get; set; }
        public DateTime PayDate { get; set; }
        public string PayMethod { get; set; }
        public int PriceId { get; set; }
        public bool IsPaid { get; set; }
        public decimal Price { get; set; }
        public string TypeService { get; set; }
        public string UserName { get; set; }
        public string EmailAddress { get; set; }
    }
}
