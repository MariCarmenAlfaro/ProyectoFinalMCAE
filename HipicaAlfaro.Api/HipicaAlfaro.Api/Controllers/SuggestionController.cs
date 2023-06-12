using Dapper;
using HipicaAlfaro.Api.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace HipicaAlfaro.Api.Controllers
{
    [Route("Suggestion")]
    [ApiController]
    public class SuggestionController : ControllerBase
    {

        private string _connection = @"Server=localhost;Password=1234; Database=horseClubDB; Uid=root;";

        [HttpGet]
        public IActionResult ReadAll()
        {
            try
            {
                IEnumerable<Suggestions> list = null;
                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "SELECT id, commentType, userName, emailUser, peticion, checked FROM suggestions;";

                    list = db.Query<Suggestions>(sql);
                }
                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest("Error al obtener las sugerencias");
            }

        }

        [HttpGet("{id}")]
        public IActionResult ReadById(int id)
        {
            try
            {
                Suggestions sugerencia = null;
                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "SELECT id, commentType, userName, emailUser, peticion, checked FROM suggestions WHERE id = @Id;";
                    sugerencia = db.QueryFirstOrDefault<Suggestions>(sql, new { id });
                }
                if (sugerencia == null)
                {
                    return NotFound();
                }
                return Ok(sugerencia);
            }
            catch (Exception ex)
            {
                return BadRequest("Error al obtener la sugerencia");
            }
        }

        [HttpPost]
        public IActionResult Create(Suggestions suggestions)
        {
            try
            {
                int result = 0;
                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "INSERT INTO suggestions (commentType, userName, emailUser, peticion,clubId) VALUES (@CommentType, @UserName, @EmailUser, @Peticion, @ClubId);";

                    result = db.Execute(sql, suggestions);
                }
                return Ok(result > 0);
            }
            catch (Exception ex)
            {
                return BadRequest("Error al insertar la sugerencia");
            }
        }

        [HttpPut]
        public IActionResult Update(int id, Suggestions suggestions)
        {
            try
            {
                var sugggestionUpdate = ReadById(id);
                if (sugggestionUpdate == null)
                {
                    return NotFound();
                }
                suggestions.Id = id;

                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "UPDATE suggestions SET commentType = @CommentType, userName = @UserName, emailUser = @EmailUser, peticion=@Peticion, checked= @Checked WHERE id = @Id;";
                    var rowsUpdate = db.Execute(sql, suggestions);
                    if (rowsUpdate > 0)
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
                return BadRequest("Error al modificar la sugerencia");
            }
        }

        [HttpDelete("{id}")]
        public ActionResult<bool> Delete(int id)
        {
            try
            {
                var classToDelete = ReadById(id);
                if (classToDelete == null)
                {
                    return NotFound();
                }
                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "DELETE FROM suggestions WHERE id = @Id;";
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
                return BadRequest("Error al eliminar la sugerencia");
            }
        }
    }

}
