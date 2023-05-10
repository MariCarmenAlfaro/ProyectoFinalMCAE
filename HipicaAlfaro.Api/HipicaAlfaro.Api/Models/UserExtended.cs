namespace HipicaAlfaro.Api.Models
{
    public class UserExtended : UserProfile
    {
        public ClassUser ClassUsers { get; set; }
        public Class Classes { get; set; }

    }
}
