namespace HipicaAlfaro.Api.Models
{
    public class Horse
    {
        public int HorseId { get; set; }
        public string HorseName { get; set; }
        public int? BarnNum { get; set; }
        public string FoodType { get; set; }
        public string HorseType { get; set; }
        public string Observation { get; set; }
        public string CameraUrl { get; set; }
        public DateTime RegistrationDate { get; set; }
        public int? OwnerId { get; set; }
    }
}
