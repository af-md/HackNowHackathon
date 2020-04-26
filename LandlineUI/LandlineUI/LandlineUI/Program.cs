using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Linq;

namespace LandlineUI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var dbClient = new MongoClient("mongodb+srv://adam2:ZiVHBr3zjNlVFbWk@landline-e216g.mongodb.net/test?retryWrites=true&w=majority");

            var dbList = dbClient.ListDatabases().ToList();


            var database = dbClient.GetDatabase("Landline");
            var collection = database.GetCollection<BsonDocument>("test");

            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
