using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API;

public static class ApplicationServicesExtentions
{

 public static IServiceCollection AddApplicationServices(this IServiceCollection services , IConfiguration config){

 services.AddDbContext<DataContext>(option=>{
option.UseSqlite(config.GetConnectionString("DefaultConnection"));
});
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();
services.AddCors();
services.AddScoped<ItokenService,TokenService>();

return services ;

 }
}
