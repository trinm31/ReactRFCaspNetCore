using System.ComponentModel.DataAnnotations;

namespace RestaurantAPI.Entities
{
    public class ForgotPasswordRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
    
}