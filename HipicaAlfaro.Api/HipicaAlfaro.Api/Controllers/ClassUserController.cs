using Dapper;
using HipicaAlfaro.Api.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace HipicaAlfaro.Api.Controllers
{
    [Route("ClassUser")]
    [ApiController]
    public class ClassUserController : Controller
    {
        private string _connection = @"Server=localhost;Password=1234; Database=horseClubDB; Uid=root;";


        [HttpGet("{id}")]
        public IActionResult ReadById(int id)
        {
            try
            {
                ClassUser classUser = null;
                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "SELECT Id, UserId, ClassId FROM ClassUser WHERE Id = @Id;";
                    classUser = db.QueryFirstOrDefault<ClassUser>(sql, new { Id = id });
                }
                if (classUser == null)
                {
                    return NotFound();
                }
                return Ok(classUser);
            }
            catch (Exception ex)
            {
                return BadRequest("Error al obtener las clases");
            }
        }

        [HttpPost]
        public IActionResult Create(ClassUser classUser)
        {
            try
            {
                int result = 0;
                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "INSERT INTO ClassUser (UserId, ClassId) VALUES (@UserId, @ClassId);";

                    result = db.Execute(sql, classUser);
                }
                return Ok(result > 0);
            }
            catch (Exception ex)
            {
                return BadRequest("Error al insertar las clases");
            }
        }

        [HttpDelete("{id}")]
        public ActionResult<bool> Delete(int id)
        {
            try
            {
                var classUserToDelete = ReadById(id);
                if (classUserToDelete == null)
                {
                    return NotFound();
                }
                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "DELETE FROM ClassUser WHERE Id = @Id;";
                    int rowsDelete = db.Execute(sql, new { Id = id });
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
            catch (Exception ex)
            {
                return BadRequest("Error al eliminar las clases");
            }
        }
    }
}