using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using PhotinoStaticFileServer.Services;

namespace PhotinoStaticFileServer;

internal static class Bootstrapper
{
    public static void ConfigureServices(HostBuilderContext ctx, IServiceCollection services)
    {
        services.AddSingleton<ServiceWorkerInfo>();
    }

    public static void ConfigureAppConfiguration(HostBuilderContext ctx, IConfigurationBuilder configuration)
    {

    }

    public static void ConfigureLogging(HostBuilderContext ctx, ILoggingBuilder logging)
    {

    }
}