using Dapper;
using HipicaAlfaro.Api.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Collections.Generic;

namespace HipicaAlfaro.Api.Controllers
{
    [Route("Price")]
    [ApiController]
    public class PriceController : ControllerBase
    {
        private string _connection = @"Server=localhost;Password=1234;Database=horseClubDB;Uid=root;";

        [HttpGet]
        public IActionResult ReadAll()
        {
            try
            {
                IEnumerable<Prices> list = null;
                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "SELECT priceId, typeService, price FROM prices;";
                    list = db.Query<Prices>(sql);
                }
                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest("Error al obtener los precios");
            }
        }

        [HttpGet("{id}")]
        public IActionResult ReadById(int id)
        {
            try
            {
                Prices price = null;
                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "SELECT priceId, typeService, price FROM prices WHERE priceId = @PriceId;";
                    price = db.QueryFirstOrDefault<Prices>(sql, new { PriceId = id });
                }
                if (price == null)
                {
                    return NotFound();
                }
                return Ok(price);
            }
            catch (Exception ex)
            {
                return BadRequest("Error al obtener el precio");
            }
        }

        [HttpPost]
        public IActionResult Create(Prices price)
        {
            try
            {
                int result = 0;
                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "INSERT INTO prices (typeService, price) VALUES (@TypeService, @price);";
                    result = db.Execute(sql, price);
                }
                return Ok(result > 0);
            }
            catch (Exception ex)
            {
                return BadRequest("Error al insertar el precio");
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Prices price)
        {
            try
            {
                var priceToUpdate = ReadById(id);
                if (priceToUpdate == null)
                {
                    return NotFound();
                }

                price.PriceId = id;

                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "UPDATE prices SET typeService = @TypeService, price = @price WHERE priceId = @PriceId;";
                    var rowsUpdated = db.Execute(sql, price);
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
                return BadRequest("Error al modificar el precio");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var priceToDelete = ReadById(id);
                if (priceToDelete == null)
                {
                    return NotFound();
                }
                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "DELETE FROM prices WHERE priceId = @PriceId;";
                    int rowsDeleted = db.Execute(sql, new { PriceId = id });
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
                return BadRequest("Error al eliminar el precio");
            }
        }
    }
}
