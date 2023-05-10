using Dapper;
using HipicaAlfaro.Api.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace HipicaAlfaro.Api.Controllers
{
    [Route("Class")]
    [ApiController]
    public class ClassController : Controller
    {
        private string _connection = @"Server=localhost;Password=1234; Database=horseClubDB; Uid=root;";

        [HttpGet]
        public IActionResult ReadAll()
        {
            IEnumerable<Class> list = null;
            using (var db = new MySqlConnection(_connection))
            {
                var sql = "SELECT classDay, classHour, classLevel FROM classes;";

                list = db.Query<Class>(sql);
            }
            return Ok(list);

        }

        [HttpGet("{id}")]
        public IActionResult ReadById(int id)
        {
            Class classItem = null;
            using (var db = new MySqlConnection(_connection))
            {
                var sql = "SELECT classId, classDay, classHour, classLevel FROM classes WHERE classId = @ClassId;";
                classItem = db.QueryFirstOrDefault<Class>(sql, new { ClassId = id });
            }
            if (classItem == null)
            {
                return NotFound();
            }
            return Ok(classItem);
        }

        [HttpPost]
        public IActionResult Create(Class classes)
        {
            int result = 0;
            using (var db = new MySqlConnection(_connection))
            {
                var sql = "INSERT INTO classes (classDay, classHour, classLevel) VALUES (@ClassDay, @ClassHour, @ClassLevel);";

                result = db.Execute(sql, classes);
            }
            return Ok(result > 0);
        }

        [HttpPut("{id}")]
        public bool Update(int id, Class classes)
        {
            var classToUpdate = ReadById(id);
            if (classToUpdate == null)
            {
                return false;
            }

            classes.ClassId = id;

            using (var db = new MySqlConnection(_connection))
            {
                var sql = "UPDATE classes SET classDay = @ClassDay, classHour = @ClassHour, classLevel = @ClassLevel WHERE classId = @ClassId;";
                var rowsUpdate = db.Execute(sql, classes);
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
                var sql = "DELETE FROM classes WHERE classId = @ClassId;";
                int rowsDelete = db.Execute(sql, new { ClassId = id });
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