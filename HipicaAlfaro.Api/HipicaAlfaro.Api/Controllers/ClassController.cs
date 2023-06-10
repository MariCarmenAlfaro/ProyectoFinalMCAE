using Dapper;
using HipicaAlfaro.Api.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using MySqlX.XDevAPI.Common;

namespace HipicaAlfaro.Api.Controllers
{
    [Route("Class")]
    [ApiController]
    public class ClassController : Controller
    {
        private string _connection = @"Server=localhost;Password=1234; Database=horseClubDB; Uid=root;";


        [HttpGet("orderBy")]
        public IActionResult ReadAllOrderBy()
        {
            try
            {
                List<Class> result = new List<Class>();
                using (var db = new MySqlConnection(_connection))
                {
                    var sql = @"SELECT
                       
                        classHour,
                        GROUP_CONCAT(IF(classDay = 'Lunes', classLevel, NULL)) AS Lunes,
                        GROUP_CONCAT(IF(classDay = 'Martes', classLevel, NULL)) AS Martes,
                        GROUP_CONCAT(IF(classDay = 'Miércoles', classLevel, NULL)) AS Miércoles,
                        GROUP_CONCAT(IF(classDay = 'Jueves', classLevel, NULL)) AS Jueves,
                        GROUP_CONCAT(IF(classDay = 'Viernes', classLevel, NULL)) AS Viernes,
                        GROUP_CONCAT(IF(classDay = 'Sábado', classLevel, NULL)) AS Sábado
                    FROM classes
                    GROUP BY classHour
                    ORDER BY classHour";

                    var queryResult = db.Query(sql);

                    foreach (dynamic row in queryResult)
                    {
                        Class classResult = new Class
                        {
                            ClassHour = row.classHour,
                            Lunes = row.Lunes,
                            Martes = row.Martes,
                            Miercoles = row.Miércoles,
                            Jueves = row.Jueves,
                            Viernes = row.Viernes,
                            Sabado = row.Sábado
                        };

                        result.Add(classResult);
                    }
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Error al obtener las clases");
            }
        }

        [HttpGet("{id}")]
        public IActionResult ReadById(int id)
        {
            try
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
            catch (Exception ex)
            {
                return BadRequest("Error al obtener la clase de usuario por ID.");
            }
        }
        [HttpGet("userByClassId")]
        public IActionResult GetClass(string classDay, string classHour)
        {
            try
            {
                List<UserExtended> classesList = new List<UserExtended>();

                using (var db = new MySqlConnection(_connection))
                {
                    var sql = @"select classUser.id, classes.classId, userProfile.userId, userprofile.userName, userprofile.emailAddress from classes  inner join classUser on classes.classId = classUser.classId inner join userprofile on classUser.userId = userprofile.userId where classHour = @ClassHour and classDay = @ClassDay;
";
                    classesList = db.Query<UserExtended>(sql, new { ClassDay = classDay, ClassHour = classHour }).ToList();
                }
                if (classesList.Count == 0)
                {
                    classesList = new List<UserExtended>();
                }
                return Ok(classesList);
            }
            catch (Exception ex)
            {
                return BadRequest("Error al obtener las clases.");
            }
        }
        [HttpGet("filterByLevel")]
        public IActionResult GetClassesByLevel(string classLevel)
        {
            try
            {
                List<Class> classesList = new List<Class>();

                using (var db = new MySqlConnection(_connection))
                {
                    var sql = @"SELECT classId, classDay, classHour, classLevel FROM classes where classLevel like @classLevel;;
";
                    classesList = db.Query<Class>(sql, new { ClassLevel = classLevel }).ToList();
                }
                if (classesList.Count == 0)
                {
                    return NotFound();
                }
                return Ok(classesList);
            }
            catch (Exception ex)
            {
                return BadRequest("Error al obtener las clases.");
            }
        }

        [HttpPost]
        public IActionResult Create(Class classes)
        {
            try
            {
                int result = 0;
                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "INSERT INTO classes (classDay, classHour, classLevel) VALUES (@ClassDay, @ClassHour, @ClassLevel);";

                    result = db.Execute(sql, classes);
                }
                return Ok(result > 0);
            }
            catch (Exception ex)
            {
                return BadRequest("Error al insertar la clase.");
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
            catch (Exception ex)
            {
                return BadRequest("Error al eliminar la clase");
            }
        }

    }
}