using Dapper;
using HipicaAlfaro.Api.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace HipicaAlfaro.Api.Controllers
{
    [Route("Horse")]
    [ApiController]
    public class HorseController : ControllerBase
    {
        private readonly string _connection = @"Server=localhost;Password=1234;Database=horseClubDB;Uid=root;";

        [HttpGet]
        public IActionResult ReadAll()
        {
            try
            {
                IEnumerable<Horse> list = null;
                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "SELECT horseId, horseName, barnNum, foodType, horseType, observation, cameraUrl, registrationDate, ownerId FROM horses order by registrationDate;";

                    list = db.Query<Horse>(sql);
                }
                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest("Error al obtener los caballos");
            }
        }

        [HttpGet("{id}")]
        public IActionResult ReadById(int id)
        {
            try
            {
                Horse horse = null;
                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "SELECT horseId, horseName, barnNum, foodType, horseType, observation, cameraUrl, registrationDate, ownerId FROM horses WHERE horseId = @HorseId;";
                    horse = db.QueryFirstOrDefault<Horse>(sql, new { HorseId = id });
                }
                if (horse == null)
                {
                    return NotFound();
                }
                return Ok(horse);
            }
            catch (Exception ex)
            {
                return BadRequest("Error al obtener el caballo");
            }
        }

        [HttpPost]
        public IActionResult Create(Horse horse)
        {
            try
            {
                int result = 0;
                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "INSERT INTO horses (horseName, barnNum, foodType, horseType, observation, cameraUrl, registrationDate, ownerId) VALUES (@HorseName, @BarnNum, @FoodType, @HorseType, @Observation, @CameraUrl, @RegistrationDate, @OwnerId);";

                    result = db.Execute(sql, horse);
                }
                return Ok(result > 0);
            }
            catch (Exception ex)
            {
                return BadRequest("Error al crear el caballo");
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Horse horse)
        {
            try
            {
                var horseToUpdate = ReadById(id);
                if (horseToUpdate == null)
                {
                    return NotFound();
                }

                horse.HorseId = id;

                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "UPDATE horses SET horseName = @HorseName, barnNum = @BarnNum, foodType = @FoodType, horseType = @HorseType, observation = @Observation, cameraUrl = @CameraUrl, registrationDate = @RegistrationDate, ownerId = @OwnerId WHERE horseId = @HorseId;";
                    var rowsUpdate = db.Execute(sql, horse);
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
                return BadRequest("Error al modificar al caballo");
            }
        }

        [HttpDelete("{id}")]
        public ActionResult<bool> Delete(int id)
        {
            try
            {
                var horseToDelete = ReadById(id);
                if (horseToDelete == null)
                {
                    return NotFound();
                }
                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "DELETE FROM horses WHERE horseId = @HorseId;";
                    int rowsDelete = db.Execute(sql, new { HorseId = id });
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
                return BadRequest("Error al eliminar al caballo");
            }
        }
        [HttpGet("owner/{id}")]
        public IActionResult ReadByOwnerId(int id)
        {
            try
            {
                IEnumerable<Horse> list = null;
                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "SELECT horseId, horseName, barnNum, foodType, horseType, observation, cameraUrl, registrationDate, ownerId FROM horses WHERE ownerId = @id;";

                    list = db.Query<Horse>(sql, new { id });
                }
                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest("Error al obtener al dueño");
            }
        }


    }
}
