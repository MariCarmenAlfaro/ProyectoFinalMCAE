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

        //[HttpGet]
        //public IActionResult ReadAll()
        //{
        //    IEnumerable<ClassUser> list = null;
        //    using (var db = new MySqlConnection(_connection))
        //    {
        //        var sql = "SELECT Id, UserId, ClassId FROM ClassUser;";

        //        list = db.Query<ClassUser>(sql);
        //    }
        //    return Ok(list);
        //}

        [HttpGet("{id}")]
        public IActionResult ReadById(int id)
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

        [HttpPost]
        public IActionResult Create(ClassUser classUser)
        {
            int result = 0;
            using (var db = new MySqlConnection(_connection))
            {
                var sql = "INSERT INTO ClassUser (UserId, ClassId) VALUES (@UserId, @ClassId);";

                result = db.Execute(sql, classUser);
            }
            return Ok(result > 0);
        }

        //[HttpPut("{id}")]
        //public bool Update(int id, ClassUser classUser)
        //{
        //    var classUserToUpdate = ReadById(id);
        //    if (classUserToUpdate == null)
        //    {
        //        return false;
        //    }

        //    classUser.Id = id;

        //    using (var db = new MySqlConnection(_connection))
        //    {
        //        var sql = "UPDATE ClassUser SET UserId = @UserId, ClassId = @ClassId WHERE Id = @Id;";
        //        var rowsUpdate = db.Execute(sql, classUser);
        //        return rowsUpdate > 0;
        //    }
        //}

        [HttpDelete("{id}")]
        public ActionResult<bool> Delete(int id)
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
    }
}