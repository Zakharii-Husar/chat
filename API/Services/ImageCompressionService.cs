using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

namespace API.Services
{
    public class ImageCompressionService : IImageCompressionService
    {
        public byte[] CompressImage(byte[] imageData)
        {
            using (var inputStream = new MemoryStream(imageData))
            {
                using (var outputStream = new MemoryStream())
                {
                    // Get the image format based on the imageData
                    var format = GetImageFormat(imageData);
                    if (format == null)
                    {
                        throw new ArgumentException("Unsupported image format.");
                    }

                    // Set compression quality based on format
                    var quality = format.Equals(ImageFormat.Jpeg) ? 50L : 100L;

                    using (var image = System.Drawing.Image.FromStream(inputStream))
                    {
                        var encoderParameters = new EncoderParameters(1);
                        encoderParameters.Param[0] = new EncoderParameter(Encoder.Quality, quality);

                        var codecInfo = GetEncoderInfo(format);

                        image.Save(outputStream, codecInfo, encoderParameters);
                    }
                    return outputStream.ToArray();
                }
            }
        }

        private ImageFormat GetImageFormat(byte[] imageData)
        {
            using var ms = new MemoryStream(imageData);
            using var image = Image.FromStream(ms);
            return image.RawFormat;
        }

        private ImageCodecInfo GetEncoderInfo(ImageFormat format)
        {
            var codecs = ImageCodecInfo.GetImageEncoders();
            return codecs.FirstOrDefault(codec => codec.FormatID == format.Guid);
        }
    }
}

