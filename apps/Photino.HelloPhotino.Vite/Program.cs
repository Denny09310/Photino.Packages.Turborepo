using System.Text;
using PhotinoNET;
using PhotinoNET.Ipc;
using PhotinoNET.Server;

namespace Photino.HelloPhotino.Vite;

internal class Program
{
    // Window title declared here for visibility
    private const string WINDOW_TITLE = "Photino Vite";

    [STAThread]
    public static void Main(string[] args)
    {
        var builder = PhotinoApplicationBuilder.CreateBuilder(out string baseUrl, args);

        var app = builder.Build();

        // Creating a new PhotinoWindow instance with the fluent API
        var window = app
            // Set the embedded root file provider of photino
            .UsePhotinoFiles()
            // Instruct the window to load the base url where the server is running
            .UseWebView(baseUrl)
            // Set the title of the application
            .SetTitle(WINDOW_TITLE)
            .SetIconFile("Assets/photino.ico")
            // Set the size of the window
            .SetUseOsDefaultSize(false)
            .SetSize(950, 650)
            // Center window in the middle of the screen
            .Center()
            // Register a custom scheme handler for app://
            .RegisterCustomSchemeHandler("app", (object sender, string scheme, string url, out string contentType) =>
            {
                contentType = "text/javascript";
                return new MemoryStream(Encoding.UTF8.GetBytes(@"
                        (() =>{
                            window.setTimeout(() => {
                                alert(`🎉 Dynamically inserted JavaScript.`);
                            }, 1000);
                        })();
                    "));
            })
            // Most event handlers can be registered after the
            // PhotinoWindow was instantiated by calling a registration 
            // method like the following RegisterWebMessageReceivedHandler.
            // This could be added in the PhotinoWindowOptions if preferred.
            .RegisterWebMessageReceivedHandler((object? sender, string message) =>
            {
                if (sender is not PhotinoWindow window) return;

                // The message argument is coming in from sendMessage.
                // "window.external.sendMessage(message: string)"
                string response = $"Received message: \"{message}\"";

                // To avoid duplication I'll not emit the message coming from 'test-channel'
                if (message.StartsWith("test-channel")) return;

                // Send a message back the to JavaScript event handler.
                // "window.external.receiveMessage(callback: Function)"
                window.SendWebMessage(response);
            })
            // A more granular way to register an handler is through the IPC
            // you specify a key and only for the messages sent with the specified this handler will fire
            // you receive even the photino window as parameter already casted
            .RegisterChannelHandler("test-channel", (PhotinoChannel channel, string message) =>
            {

                string response = $"Received message through channel: {channel.Name}. \r\n" +
                                  $"The message is: {message} 👌";

                // The key of the channel is inferred by the registration
                // There's even the property 'Window' in the channel to take advantage 
                // of the window owner properties if necessary 
                channel.Emit(response);
            });

        window.WaitForClose();
    }
}
