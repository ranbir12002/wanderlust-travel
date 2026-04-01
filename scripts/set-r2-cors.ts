import { S3Client, PutBucketCorsCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import path from "path";

// Load .env.local specifically
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucketName = process.env.R2_BUCKET_NAME;

if (!accountId || !accessKeyId || !secretAccessKey || !bucketName) {
  console.error("❌ Missing R2 environment variables in .env.local");
  console.log("Expected: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME");
  process.exit(1);
}

const client = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

async function setCors() {
  console.log(`🔧 Setting CORS policy for bucket: ${bucketName}...`);
  
  const corsRule = {
    CORSRules: [
      {
        AllowedHeaders: ["*"],
        AllowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
        AllowedOrigins: ["http://localhost:3000", "https://localhost:3000"],
        ExposeHeaders: ["ETag"],
        MaxAgeSeconds: 3600,
      },
    ],
  };

  try {
    const command = new PutBucketCorsCommand({
      Bucket: bucketName,
      CORSConfiguration: corsRule,
    });

    await client.send(command);
    console.log(`✅ Successfully updated CORS policy!`);
    console.log(`✅ Allowed Origins: ${corsRule.CORSRules[0].AllowedOrigins.join(", ")}`);
    console.log(`\nNext time you upload, the CORS error should be gone.`);
  } catch (error) {
    console.error("❌ Failed to update CORS policy:", error);
    process.exit(1);
  }
}

setCors();
