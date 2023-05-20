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
            IEnumerable<Suggestions> list = null;
            using (var db = new MySqlConnection(_connection))
            {
                var sql = "SELECT id, commentType, userName, emailUser, peticion FROM suggestions;";

                list = db.Query<Suggestions>(sql);
            }
            return Ok(list);

        }

        [HttpGet("{id}")]
        public IActionResult ReadById(int id)
        {
            Suggestions classItem = null;
            using (var db = new MySqlConnection(_connection))
            {
                var sql = "SELECT id, commentType, userName, emailUser, peticion FROM suggestions WHERE id = @Id;";
                classItem = db.QueryFirstOrDefault<Suggestions>(sql, new { id });
            }
            if (classItem == null)
            {
                return NotFound();
            }
            return Ok(classItem);
        }

        [HttpPost]
        public IActionResult Create(Suggestions suggestions)
        {
            int result = 0;
            using (var db = new MySqlConnection(_connection))
            {
                var sql = "INSERT INTO suggestions (commentType, userName, emailUser, peticion,clubId) VALUES (@CommentType, @UserName, @EmailUser, @Peticion, @ClubId);";

                result = db.Execute(sql, suggestions);
            }
            return Ok(result > 0);
        }

        [HttpPut]
        public bool Update(int id, Suggestions suggestions)
        {
            var sugggestionUpdate = ReadById(id);
            if (sugggestionUpdate == null)
            {
                return false;
            }
            suggestions.Id = id;

            using (var db = new MySqlConnection(_connection))
            {
                var sql = "UPDATE suggestins SET commentType = @CommentType, userName = @UserName, emailUser = @EmailUser, peticion=@Peticion WHERE id = @Id;";
                var rowsUpdate = db.Execute(sql, suggestions);
                return rowsUpdate > 0;
            }

        }

        [HttpDelete("{id}")]
        public ActionResult<bool> Delete(int id)
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
    }

}
