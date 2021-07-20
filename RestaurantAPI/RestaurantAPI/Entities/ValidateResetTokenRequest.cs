using System.ComponentModel.DataAnnotations;

namespace RestaurantAPI.Entities
{
    public class ValidateResetTokenRequest
    {
        [Required]
        public string Token { get; set; }
    }
}