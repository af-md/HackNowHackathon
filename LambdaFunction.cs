using System;
using System.Threading.Tasks;
using Amazon;
using Amazon.Lambda.Core;
using Amazon.S3.Util;
using Amazon.TranscribeService;
using Amazon.TranscribeService.Model;
// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]
namespace HelloWorld
{

    public class Function
    {
        private string _sourceBucket = "";
        private string _writeBucket = "";
        private string _accessKey = "";
        private string _secreteKey = "";
        private RegionEndpoint _endpoint = RegionEndpoint.EUWest2;
        private string _prefix = "";
        private IAmazonTranscribeService _amazonTranscribeServiceClient;

        public async Task FunctionHandler(S3EventNotification eventNotification, ILambdaContext context)
        {
            // Create a transcribe job and get the result
            _amazonTranscribeServiceClient = new AmazonTranscribeServiceClient(_accessKey, _secreteKey);
            
            var objectKey = eventNotification.Records[0].S3.Object.Key;

            if (objectKey == null) return;
            try
            {
                var transcribeJobName = "Job-";
                var fileLocation = "https://" + _sourceBucket + _prefix + objectKey; 
                Console.WriteLine(_amazonTranscribeServiceClient.ToString());
                var transcriptionRequest = new StartTranscriptionJobRequest()
                {
                    TranscriptionJobName = transcribeJobName,
                    MediaFormat = MediaFormat.Wav.ToString(), 
                    Media =
                    {
                        MediaFileUri = fileLocation 
                    },
                    LanguageCode = LanguageCode.EnGB.ToString(),
                    OutputBucketName = _writeBucket
                };

                var result = await _amazonTranscribeServiceClient.StartTranscriptionJobAsync(transcriptionRequest);
                
                var upper = 1;
                for (var i = 0; i < upper; i++)
                {
                    if (result.TranscriptionJob.TranscriptionJobStatus.ToString() != "Completed" ||
                        result.TranscriptionJob.TranscriptionJobStatus.ToString() != "Failed")
                    {
                        Console.WriteLine("Wait");
                        //add timer to wait
                    }
                    else Console.WriteLine(result.TranscriptionJob.TranscriptionJobStatus.ToString());
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
