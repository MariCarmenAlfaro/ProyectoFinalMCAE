namespace HipicaAlfaro.Api.Models
{
    public class UserExtended
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserType { get; set; }
        public DateTimeOffset RegistrationDate { get; set; }
        public string EmailAddress { get; set; }
        public string PsswdUser { get; set; }
        public int? ClubId { get; set; }

        public int Id { get; set; }
       
        public int ClassId { get; set; }
       

        public string ClassDay { get; set; }
        public string ClassHour { get; set; }
        public string? ClassLevel { get; set; }
      

    }
}
