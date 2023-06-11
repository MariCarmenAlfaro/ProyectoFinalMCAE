using Dapper;
using HipicaAlfaro.Api.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Text;
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
            try
            {
                IEnumerable<UserProfile> list = null;
                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "select userId, userName, userType, registrationDate, emailAddress,psswdUser from UserProfile order by registrationDate;";

                    list = db.Query<UserProfile>(sql);
                }
                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest("Error al obtener el perfil");
            }

        }
        [HttpGet("{id}")]
        public IActionResult ReadById(int id)
        {
            try
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
            catch (Exception ex)
            {
                return BadRequest("Error al obtener el perfil de usuario por ID.");
            }
        }

        [HttpPost]
        public IActionResult Create(UserProfile userProfile)
        {

            try
            {
                if (userProfile == null)
                {
                    return BadRequest("El perfil de usuario es requerido.");
                }
                //Generar el caracter introducido codificarlo 
                var contrasenya = userProfile.PsswdUser;
                SHA256 sha256 = SHA256.Create();
                //Genera la secuencia en bytes
                byte[] hash = sha256.ComputeHash(Encoding.UTF8.GetBytes(contrasenya));
                //El hash se convierte en hexadecimal
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
                    }).SingleOrDefault();
                }

                if (insertedId == null)
                {
                    return BadRequest("No se pudo crear el perfil de usuario.");
                }

                return Ok(new { InsertedId = insertedId });
            }
            catch (Exception ex)
            {
                return BadRequest("Ocurrió un error al crear el perfil de usuario.");
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, UserProfile userProfile)
        {
            try
            {
                var userProfileToUpdate = ReadById(id);
                if (userProfileToUpdate == null)
                {
                    return NotFound(); 
                }

                userProfile.UserId = id;

                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "UPDATE UserProfile SET userName = @UserName, userType = @UserType, registrationDate = @RegistrationDate, emailAddress = @EmailAddress, psswdUser = @PsswdUser WHERE userId = @UserId;";
                    var rowsUpdated = db.Execute(sql, userProfile);
                    if (rowsUpdated > 0)
                    {
                        return Ok(true);
                    }
                    else
                    {
                        return Ok(false);
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Error al obtener el perfil de usuario por ID.");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var userProfileToDelete = ReadById(id);
                if (userProfileToDelete == null)
                {
                    return NotFound();
                }

                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "DELETE FROM UserProfile WHERE userId = @UserId;";
                    int rowsDeleted = db.Execute(sql, new { UserId = id });
                    if (rowsDeleted == 1)
                    {
                        return Ok(true);
                    }
                    else
                    {
                        return Ok(false);
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Error al eliminar el perfil de usuario.");
            }
        }

        [HttpPost("/login")]
        public ActionResult<UserProfile> AuthenticateLogin(string emailAddress, string password)
        {
            try
            {
                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "SELECT userId, userName, userType, registrationDate, emailAddress, psswdUser FROM userProfile WHERE emailAddress = @EmailAddress and userType not like 'Inactivo';";
                    var userProfile = db.QuerySingleOrDefault<UserProfile>(sql, new { EmailAddress = emailAddress });

                    if (userProfile == null)
                    {
                        return BadRequest("Correo electrónico o contraseña no válidos");
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
            catch (Exception ex)
            {
                return BadRequest("Error al autenticar el susuario.");
            }
        }

        [HttpGet("userExtendedClasses/{id}")]
        public IActionResult ReadByUserIdExtended(int id)
        {
            try
            {
                using (var conexion = new MySqlConnection(_connection))
                {
                    var query = "SELECT userProfile.userId as UserId, userProfile.userName as UserName, userProfile.userType as UserType, userProfile.registrationDate as RegistrationDate, userProfile.emailAddress as EmailAddress, userProfile.psswdUser as PsswdUser, userProfile.clubId as ClubId, classUser.id as Id, classUser.userId as UserId, classUser.classId as ClassId, classUser.clubId as ClubId, classes.classId as ClassId, classes.classDay as ClassDay, classes.classHour as ClassHour, classes.classLevel as ClassLevel, classes.clubId as ClubId FROM userProfile LEFT JOIN classUser ON userProfile.userId = classUser.userId LEFT JOIN classes ON classUser.classId = classes.classId WHERE userProfile.userId = @id;";

                    var resultados = conexion.Query<UserExtended>(query, new { id }).ToList();

                    if (resultados.Count == 0)
                    {
                        return Ok(new List<UserExtended>());
                    }

                    return Ok(resultados);
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Error al obtener los datos extendidos del usuario.");
            }
        }


        [HttpGet("priceForServiceUser/{id}")]
        public IActionResult ReadPriceForServiceByUserId(int id)
        {
            try
            {
                using (var conexion = new MySqlConnection(_connection))
                {
                    var query = "SELECT payId, payDate, payMethod, typeService, price, prices.priceId FROM payments INNER JOIN prices ON payments.priceId = prices.priceId WHERE payments.userId = @id order by payDate desc;";

                    var resultado = conexion.Query<PriceForService>(query, new { id }).ToList();

                    return Ok(resultado);
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Error al obtener los precios de servicio del usuario.");
            }
        }

    }

}

