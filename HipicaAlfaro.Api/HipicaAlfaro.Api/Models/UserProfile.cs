﻿using System.ComponentModel.DataAnnotations;

namespace HipicaAlfaro.Api.Models
{
    public class UserProfile
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string UserType { get; set; }
        public DateTime RegistrationDate { get; set; }
        public string EmailAddress { get; set; }
        public string PsswdUser { get; set; }
        public int? ClubId { get; set; }
    }
}
