using Dapper;
using HipicaAlfaro.Api.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace HipicaAlfaro.Api.Controllers
{
    [Route("ReservationExc")]
    [ApiController]
    public class ReservationExcController : Controller
    {
        private readonly string _connection = @"Server=localhost;Password=1234; Database=horseClubDB; Uid=root;";

        [HttpGet]
        public IActionResult ReadAll()
        {
            IEnumerable<ReservationExc> list = null;
            using (var db = new MySqlConnection(_connection))
            {
                var sql = "SELECT ReservationId, ReservationName, EmailAddress, NumPeople, DateExcursion, ExcursionType FROM reservationExc;";
                list = db.Query<ReservationExc>(sql);
            }
            return Ok(list);
        }

        [HttpGet("{id}")]
        public IActionResult ReadById(int id)
        {
            ReservationExc reservation = null;
            using (var db = new MySqlConnection(_connection))
            {
                var sql = "SELECT ReservationId, ReservationName, EmailAddress, NumPeople, DateExcursion, ExcursionType FROM reservationExc WHERE ReservationId = @ReservationId;";
                reservation = db.QueryFirstOrDefault<ReservationExc>(sql, new { ReservationId = id });
            }
            if (reservation == null)
            {
                return NotFound();
            }
            return Ok(reservation);
        }

        [HttpPost]
        public IActionResult Create(ReservationExc reservation)
        {
            int result = 0;
            using (var db = new MySqlConnection(_connection))
            {
                var sql = "INSERT INTO reservationExc (ReservationName, EmailAddress, NumPeople, DateExcursion, ExcursionType) VALUES (@ReservationName, @EmailAddress, @NumPeople, @DateExcursion, @ExcursionType);";
                result = db.Execute(sql, reservation);
            }
            return Ok(result > 0);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, ReservationExc reservation)
        {
            var reservationToUpdate = ReadById(id);
            if (reservationToUpdate == null)
            {
                return NotFound();
            }

            reservation.ReservationId = id;

            using (var db = new MySqlConnection(_connection))
            {
                var sql = "UPDATE reservationExc SET ReservationName = @ReservationName, EmailAddress = @EmailAddress, NumPeople = @NumPeople, DateExcursion = @DateExcursion, ExcursionType = @ExcursionType WHERE ReservationId = @ReservationId;";
                var rowsUpdated = db.Execute(sql, reservation);
                return Ok(rowsUpdated > 0);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var reservationToDelete = ReadById(id);
            if (reservationToDelete == null)
            {
                return NotFound();
            }

            using (var db = new MySqlConnection(_connection))
            {
                var sql = "DELETE FROM reservationExc WHERE ReservationId = @ReservationId;";
                var rowsDeleted = db.Execute(sql, new { ReservationId = id });
                return Ok(rowsDeleted > 0);
            }
        }
    }
}
