using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        [Required]
        public required string UserName { get; set; }
        public  byte[]? PasswordSalt {get;set;}
        public  byte[]? PasswordHash {get;set;}
    }
}