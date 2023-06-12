using Dapper;
using HipicaAlfaro.Api.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace HipicaAlfaro.Api.Controllers
{
    [Route("MenuBar")]
    [ApiController]
    public class MenuBarController : Controller
    {
        private string _connection = @"Server=localhost;Password=1234; Database=horseClubDB; Uid=root;";
        [HttpGet]
        public IActionResult ReadAll()
        {
            try
            {
                IEnumerable<MenuBar> list = null;
                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "select MenuId, MenuName, MenuDate, PriceId from MenuBar;";

                    list = db.Query<MenuBar>(sql);
                }
                return Ok(list);
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
                MenuBar menuBar = null;
                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "SELECT MenuId, MenuName, MenuDate, PriceId FROM MenuBar WHERE MenuId = @MenuId;";
                    menuBar = db.QueryFirstOrDefault<MenuBar>(sql, new { MenuId = id });
                }
                if (menuBar == null)
                {
                    return NotFound();
                }
                return Ok(menuBar);
            }
            catch (Exception ex)
            {
                return BadRequest("Error al obtener las clases");
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, MenuBar menuBar)
        {
            try
            {
                var menuBarToUpdate = ReadById(id);
                if (menuBarToUpdate == null)
                {
                    return NotFound();
                }

                menuBar.MenuId = id;

                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "UPDATE MenuBar SET MenuName = @MenuName, MenuDate = @MenuDate, PriceId = @PriceId WHERE MenuId = @MenuId;";
                    var rowsUpdate = db.Execute(sql, menuBar);
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
                return BadRequest("Error al obtener las clases");
            }
        }
    }
}
