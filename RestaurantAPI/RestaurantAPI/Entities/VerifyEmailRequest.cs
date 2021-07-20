using System.ComponentModel.DataAnnotations;

namespace RestaurantAPI.Entities
{
    public class VerifyEmailRequest
    {
        [Required]
        public string Token { get; set; }
    }
}