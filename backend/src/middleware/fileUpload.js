const multer = require("multer");
const awsClient = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");
const logger = require("../utils/logger")(module.filename);

const s3 = new awsClient.S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  endpoint: `https://s3.${process.env.AWS_REGION}.amazonaws.com`,
});

const uploadMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const uploadFile = async (file) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${uuidv4()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    Region: process.env.AWS_REGION,
  };
  const s3Command = new awsClient.PutObjectCommand(params);
  await s3.send(s3Command);
  const fileLocation = `https://${params.Bucket}.s3.${params.Region}.amazonaws.com/${params.Key}`;
  return fileLocation;
};

module.exports = { uploadMiddleware, uploadFile };
