using Dapper;
using HipicaAlfaro.Api.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Org.BouncyCastle.Asn1.Ocsp;

namespace HipicaAlfaro.Api.Controllers
{
    [Route("User")]
    [ApiController]
    public class UserProfileController : Controller
    {
        private string _connection = @"Server=localhost;Password=1234; Database=horseClubDB; Uid=root;";
        [HttpGet]
        public IActionResult ReadAll()
        {
            IEnumerable<UserProfile> list = null;
            using (var db = new MySqlConnection(_connection))
            {
                var sql = "select userId, userName, userType, registrationDate, emailAddress,psswdUser from UserProfile;";

                list = db.Query<UserProfile>(sql);
            }
            return Ok(list);

        }
        [HttpGet("{id}")]
        public IActionResult ReadById(int id)
        {
            UserProfile userProfile = null;
            using (var db = new MySqlConnection(_connection))
            {
                var sql = "SELECT userId, userName, userType, registrationDate, emailAddress, psswdUser FROM UserProfile WHERE userId = @UserId;";
                userProfile = db.QueryFirstOrDefault<UserProfile>(sql, new { UserId = id });
            }
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpPost]
        public IActionResult Create(UserProfile userProfile)
        {
            int result = 0;
            using (var db = new MySqlConnection(_connection))
            {
                var sql = "INSERT INTO UserProfile (userName, userType, registrationDate, emailAddress, psswdUser) VALUES (@UserName, @UserType, @RegistrationDate, @EmailAddress, @PsswdUser);";

                result = db.Execute(sql, userProfile);
            }
            return Ok(result > 0);
        }

        [HttpPut("{id}")]
        public bool Update(int id, UserProfile userProfile)
        {
            var userProfileToUpdate = ReadById(id);
            if (userProfileToUpdate == null)
            {
                return false;
            }

            userProfile.UserId = id;

            using (var db = new MySqlConnection(_connection))
            {
                var sql = "UPDATE UserProfile SET userName = @UserName, userType = @UserType, registrationDate = @RegistrationDate, emailAddress = @EmailAddress, psswdUser = @PsswdUser WHERE userId = @UserId;";
                var rowsUpdate = db.Execute(sql, userProfile);
                return rowsUpdate > 0;
            }

        }

        [HttpDelete("{id}")]
        public ActionResult<bool> Delete(int id)
        {
            var userProfileToDelete = ReadById(id);
            if (userProfileToDelete == null)
            {
                return NotFound();
            }
            using (var db = new MySqlConnection(_connection))
            {
                var sql = "DELETE FROM UserProfile WHERE userId = @UserId;";
                int rowsDelete = db.Execute(sql, new { UserId = id });
                if (rowsDelete == 1)
                {
                    return Ok(true);
                }
                else
                {
                    return Ok(false);
                }
            }
        }
        [HttpPost("/login")]
        public ActionResult<UserProfile> AuthenticateLogin(string emailAddress, string password)
        {
            using (var db = new MySqlConnection(_connection))
            {
                var sql = "SELECT * FROM userProfile WHERE emailAddress = @EmailAddress AND psswdUser = @Password";
                var userProfile = db.QuerySingleOrDefault<UserProfile>(sql, new { EmailAddress = emailAddress, Password = password });

                if (userProfile == null)
                    return BadRequest("Correo electrónico o contraseña incorrectos");

                return Ok(userProfile);
            }
        }

        [HttpGet("/extended/{id}")]
        public ActionResult<UserExtended> ReadByIdExtended(int id)
        {
            using (var conexion = new MySqlConnection(_connection))
            {
                conexion.Open();
                var query = @"SELECT *
                     FROM userProfile 
                     LEFT JOIN classUser ON userProfile.userId = classUser.userId 
                     LEFT JOIN classes ON classUser.classId = classes.classId 
                     WHERE userProfile.userId = @id";

                var resultado = conexion.Query<UserExtended, ClassUser, Class, UserExtended>(
                    query,
                    (usuario, classUser, classes) =>
                    {
                        usuario.ClassUsers = classUser;
                        usuario.Classes = classes;
                        return usuario;
                    },
                    new { userId = id }
                    
                ).Distinct().FirstOrDefault();

                return resultado;
            }
        }
    }
}
