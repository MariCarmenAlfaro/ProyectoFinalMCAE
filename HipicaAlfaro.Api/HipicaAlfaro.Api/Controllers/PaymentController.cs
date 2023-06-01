using Dapper;
using HipicaAlfaro.Api.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace HipicaAlfaro.Api.Controllers
{
    [Route("Payment")]
    [ApiController]
    public class PaymentController : Controller
    {
        private string _connection = @"Server=localhost;Password=1234;Database=horseClubDB;Uid=root;";

        [HttpGet]
        public IActionResult ReadAll()
        {
            IEnumerable<Payment> list = null;
            using (var db = new MySqlConnection(_connection))
            {
                var sql = "SELECT PayId, UserId, PayDate, PriceId, PayMethod FROM payments;";
 
                list = db.Query<Payment>(sql);
            }
            return Ok(list);
        }
        [HttpGet("precioPagoUser")]
        public IActionResult ReadAllWithUserAndPrice()
        {
            IEnumerable<PayPriceUser> list = null;
            using (var db = new MySqlConnection(_connection))
            {
                var sql = "Select payId, payments.userId, payDate, payMethod, prices.priceId, prices.price, prices.typeService, userprofile.userName, userprofile.emailAddress from payments inner join prices on payments.priceId =  prices.priceId inner join userprofile on payments.userId= userprofile.userId order by payDate desc;";

                list = db.Query<PayPriceUser>(sql);
            }
            return Ok(list);
        }

        [HttpGet("{id}")]
        public IActionResult ReadById(int id)
        {
            Payment payment = null;
            using (var db = new MySqlConnection(_connection))
            {
                var sql = "SELECT PayId, UserId, PayDate, PriceId, PayMethod FROM payments WHERE PayId = @PayId;";
                payment = db.QueryFirstOrDefault<Payment>(sql, new { PayId = id });
            }
            if (payment == null)
            {
                return NotFound();
            }
            return Ok(payment);
        }

        [HttpPost]
        public IActionResult Create(Payment payment)
        {
            int result = 0;
            using (var db = new MySqlConnection(_connection))
            {
                var sql = "INSERT INTO payments (UserId, PayDate, PriceId, PayMethod) VALUES (@UserId, @PayDate, @PriceId, @PayMethod);";

                result = db.Execute(sql, payment);
            }
            return Ok(result > 0);
        }

        [HttpPut("{id}")]
        public bool Update(int id, Payment payment)
        {
            var paymentToUpdate = ReadById(id);
            if (paymentToUpdate == null)
            {
                return false;
            }

            payment.PayId = id;

            using (var db = new MySqlConnection(_connection))
            {
                var sql = "UPDATE payments SET UserId = @UserId, PayDate = @PayDate, PriceId = @PriceId, PayMethod = @PayMethod WHERE PayId = @PayId;";
                var rowsUpdate = db.Execute(sql, payment);
                return rowsUpdate > 0;
            }
        }

        [HttpDelete("{id}")]
        public ActionResult<bool> Delete(int id)
        {
            var paymentToDelete = ReadById(id);
            if (paymentToDelete == null)
            {
                return NotFound();
            }
            using (var db = new MySqlConnection(_connection))
            {
                var sql = "DELETE FROM payments WHERE PayId = @PayId;";
                int rowsDelete = db.Execute(sql, new { PayId = id });
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
