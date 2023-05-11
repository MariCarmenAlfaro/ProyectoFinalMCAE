using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HipicaAlfaro.Api.Models
{
    public class ClassUser
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ClassId { get; set; }
        public int? ClubId { get; set; }
        public UserProfile UserProfile { get; set; }
        public Class Class { get; set; }
    }
}
