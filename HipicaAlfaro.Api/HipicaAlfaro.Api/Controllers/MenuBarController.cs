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
            IEnumerable<MenuBar> list = null;
            using (var db = new MySqlConnection(_connection))
            {
                var sql = "select MenuId, MenuName, MenuDate, PriceId from MenuBar;";

                list = db.Query<MenuBar>(sql);
            }
            return Ok(list);

        }
        [HttpGet("{id}")]
        public IActionResult ReadById(int id)
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

        //[HttpPost]
        //public IActionResult Create(MenuBar menuBar)
        //{
        //    int result = 0;
        //    using (var db = new MySqlConnection(_connection))
        //    {
        //        var sql = "INSERT INTO MenuBar (MenuName, MenuDate, MenuPriceId) VALUES (@MenuName, @MenuDate, @MenuPriceId);";

        //        result = db.Execute(sql, menuBar);
        //    }
        //    return Ok(result > 0);
        //}

        [HttpPut("{id}")]
        public bool Update(int id, MenuBar menuBar)
        {
            var menuBarToUpdate = ReadById(id);
            if (menuBarToUpdate == null)
            {
                return false;
            }

            menuBar.MenuId = id;

            using (var db = new MySqlConnection(_connection))
            {
                var sql = "UPDATE MenuBar SET MenuName = @MenuName, MenuDate = @MenuDate, PriceId = @PriceId WHERE MenuId = @MenuId;";
                var rowsUpdate = db.Execute(sql, menuBar);
                return rowsUpdate > 0;
            }

        }

        //[HttpDelete("{id}")]
        //public ActionResult<bool> Delete(int id)
        //{
        //    var menuBarToDelete = ReadById(id);
        //    if (menuBarToDelete == null)
        //    {
        //        return NotFound();
        //    }
        //    using (var db = new MySqlConnection(_connection))
        //    {
        //        var sql = "DELETE FROM MenuBar WHERE MenuId = @MenuId;";
        //        int rowsDelete = db.Execute(sql, new { MenuId = id });
        //        if (rowsDelete == 1)
        //        {
        //            return Ok(true);
        //        }
        //        else
        //        {
        //            return Ok(false);
        //        }
        //    }
        //}

    }
}
