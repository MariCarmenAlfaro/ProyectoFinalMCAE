namespace HipicaAlfaro.Api.Models
{
    public class Suggestions
    {
        public int Id {get; set;}
        public string CommentType { get; set;}
        public string UserName { get; set;}
        public string emailUser { get; set;}
        public string Peticion { get; set; }
        public string? ClubId { get; set; }
    }
}
