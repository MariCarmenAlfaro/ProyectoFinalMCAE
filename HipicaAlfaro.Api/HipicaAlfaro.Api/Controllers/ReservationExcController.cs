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
            try
            {
                IEnumerable<ReservationExc> list = null;
                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "SELECT ReservationId, ReservationName, EmailAddress, NumPeople, DateExcursion, ExcursionType, checked FROM reservationExc;";
                    list = db.Query<ReservationExc>(sql);
                }
                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest("Error al obtener las reservas");
            }
        }

        [HttpGet("{id}")]
        public IActionResult ReadById(int id)
        {
            try
            {
                ReservationExc reservation = null;
                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "SELECT ReservationId, ReservationName, EmailAddress, NumPeople, DateExcursion, ExcursionType, Checked FROM reservationExc WHERE ReservationId = @ReservationId;";
                    reservation = db.QueryFirstOrDefault<ReservationExc>(sql, new { ReservationId = id });
                }
                if (reservation == null)
                {
                    return NotFound();
                }
                return Ok(reservation);
            }
            catch (Exception ex)
            {
                return BadRequest("Error al obtener la reserva");
            }
        }

        [HttpPost]
        public IActionResult Create(ReservationExc reservation)
        {
            try
            {
                int result = 0;
                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "INSERT INTO reservationExc (ReservationName, EmailAddress, NumPeople, DateExcursion, ExcursionType) VALUES (@ReservationName, @EmailAddress, @NumPeople, @DateExcursion, @ExcursionType);";
                    result = db.Execute(sql, reservation);
                }
                return Ok(result > 0);
            }
            catch (Exception ex)
            {
                return BadRequest("Error al insertar la reserva");
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, ReservationExc reservation)
        {
            try
            {
                var reservationToUpdate = ReadById(id);
                if (reservationToUpdate == null)
                {
                    return NotFound();
                }

                reservation.ReservationId = id;

                using (var db = new MySqlConnection(_connection))
                {
                    var sql = "UPDATE reservationExc SET ReservationName = @ReservationName, EmailAddress = @EmailAddress, NumPeople = @NumPeople, DateExcursion = @DateExcursion, ExcursionType = @ExcursionType, Checked=@Checked WHERE ReservationId = @ReservationId;";
                    var rowsUpdated = db.Execute(sql, reservation);
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
                return BadRequest("Error al modificar la reserva");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
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
            catch (Exception ex)
            {
                return BadRequest("Error al eliminar la reserva");
            }
        }
    }
}
