using Dapper;
using HipicaAlfaro.Api.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Org.BouncyCastle.Asn1.Ocsp;
using System.Net.Mail;
using System.Text;
using System.Data.SqlClient;
using System.Security.Cryptography;
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
            var contrasenya = userProfile.PsswdUser;
            SHA256 sha256 = SHA256.Create();
            byte[] hash = sha256.ComputeHash(Encoding.UTF8.GetBytes(contrasenya));
            var hexHash = BitConverter.ToString(hash).Replace("-", "");
            var insertedId = 0;
            using (var db = new MySqlConnection(_connection))
            {
                var sql = @"INSERT INTO UserProfile (userName, userType, registrationDate, emailAddress, psswdUser)
                             VALUES (@UserName, @UserType, @RegistrationDate, @EmailAddress, @PsswdUser);
                                SELECT LAST_INSERT_ID();";
                insertedId = db.Query<int>(sql, new
                {
                    UserName = userProfile.UserName,
                    UserType = userProfile.UserType,
                    RegistrationDate = userProfile.RegistrationDate,
                    EmailAddress = userProfile.EmailAddress,
                    PsswdUser = hexHash
                }).Single();  // Obtiene el ID insertado
            }

            return Ok(new { InsertedId = insertedId });
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
                var sql = "SELECT * FROM userProfile WHERE emailAddress = @EmailAddress";
                var userProfile = db.QuerySingleOrDefault<UserProfile>(sql, new { EmailAddress = emailAddress });

                if (userProfile == null)
                {
                    return BadRequest("Correo electrónico o contraseña incorrectos");
                }

                string hexHash = userProfile.PsswdUser;

                // Comparar la versión hash de la contraseña proporcionada por el usuario con la versión hash almacenada en la base de datos
                SHA256 sha256 = SHA256.Create();
                byte[] hash = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                string hexInputHash = BitConverter.ToString(hash).Replace("-", "");

                if (hexInputHash != hexHash)
                {
                    // La contraseña es incorrecta
                    return BadRequest("Correo electrónico o contraseña incorrectos");
                }
                else
                {
                    // La contraseña es correcta
                    return Ok(userProfile);
                }
            }
        }


        [HttpGet("userExtendedClasses/{id}")]
        public ActionResult<List<UserExtended>> ReadByUserIdExtended(int id)
        {
            using (var conexion = new MySqlConnection(_connection))
            {
                var query = "SELECT userProfile.userId as UserId, userProfile.userName as UserName, userProfile.userType as UserType, userProfile.registrationDate as RegistrationDate, userProfile.emailAddress as EmailAddress, userProfile.psswdUser as PsswdUser, userProfile.clubId as ClubId, classUser.id as Id, classUser.userId as UserId, classUser.classId as ClassId, classUser.clubId as ClubId, classes.classId as ClassId, classes.classDay as ClassDay, classes.classHour as ClassHour, classes.classLevel as ClassLevel, classes.clubId as ClubId FROM userProfile LEFT JOIN classUser ON userProfile.userId = classUser.userId LEFT JOIN classes ON classUser.classId = classes.classId WHERE userProfile.userId = @id;";

                var resultados = conexion.Query<UserExtended>(query, new { id }).ToList();

                return resultados;
            }
        }
        [HttpGet("priceForServiceUser/{id}")]
        public ActionResult <List<PriceForService>> ReadPriceForServiceByUserId(int id)
        {
            using (var conexion = new MySqlConnection(_connection))
            {

                var query = "select payId, payDate, payMethod, typeService, price, prices.priceId from  payments inner join prices on payments.priceId = prices.priceId where payments.userId=@id;";

                var resultado = conexion.Query<PriceForService>(query, new { id }).ToList();



                return resultado;
            }
        }
    }

}

