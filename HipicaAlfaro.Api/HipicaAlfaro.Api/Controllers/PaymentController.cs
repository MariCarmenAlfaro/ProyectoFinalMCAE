using Dapper;
using HipicaAlfaro.Api.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

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
            try
            {
            IEnumerable<Payment> list = null;
            using (var db = new MySqlConnection(_connection))
            {
                var sql = "SELECT PayId, UserId, PayDate, PriceId, PayMethod FROM payments;";

                list = db.Query<Payment>(sql);
            }
            return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest("Error al obtener los pagos");
            }
        }
        [HttpGet("pricePaymentUser")]
        public IActionResult ReadAllWithUserAndPrice()
        {
            try
            {
                IEnumerable<PayPriceUser> list = null;
            using (var db = new MySqlConnection(_connection))
            {
                var sql = "Select payId, payments.userId, payDate, payMethod, prices.priceId, prices.price, prices.typeService, userprofile.userName, userprofile.emailAddress from payments inner join prices on payments.priceId =  prices.priceId inner join userprofile on payments.userId= userprofile.userId order by payDate desc;";

                list = db.Query<PayPriceUser>(sql);
            }
            return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest("Error al obtener los pagos");
            }
        }

        [HttpGet("{id}")]
        public IActionResult ReadById(int id)
        {
            try
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
            catch (Exception ex)
            {
                return BadRequest("Error al obtener el pago");
            }
        }

        [HttpPost]
        public IActionResult Create(Payment payment)
        {
            try
            {
                int result = 0;
            using (var db = new MySqlConnection(_connection))
            {
                var sql = "INSERT INTO payments (UserId, PayDate, PriceId, PayMethod) VALUES (@UserId, @PayDate, @PriceId, @PayMethod);";

                result = db.Execute(sql, payment);
            }
            return Ok(result > 0);
            }
            catch (Exception ex)
            {
                return BadRequest("Error al crear los pagos");
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Payment payment)
        {
            try
            {
                var paymentToUpdate = ReadById(id);
            if (paymentToUpdate == null)
            {
                    return NotFound();
                }

            payment.PayId = id;

            using (var db = new MySqlConnection(_connection))
            {
                var sql = "UPDATE payments SET UserId = @UserId, PayDate = @PayDate, PriceId = @PriceId, PayMethod = @PayMethod WHERE PayId = @PayId;";
                var rowsUpdate = db.Execute(sql, payment);
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
                return BadRequest("Error al modificar los pagos");
            }
        }
    }
}
