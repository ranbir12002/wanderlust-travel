import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2Client, R2_BUCKET_NAME, R2_PUBLIC_URL } from "@/lib/r2";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { filename, contentType } = await req.json();

    if (!filename || !contentType) {
      return NextResponse.json(
        { message: "Filename and content type are required" },
        { status: 400 }
      );
    }

    if (!r2Client) {
      return NextResponse.json(
        { message: "R2 client not configured" },
        { status: 500 }
      );
    }

    // Generate a unique file name to prevent accidental overwrites
    const ext = filename.split(".").pop();
    const uniqueFilename = `${crypto.randomBytes(16).toString("hex")}.${ext}`;

    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: uniqueFilename,
      ContentType: contentType,
      // Explicitly disable checksum algorithm to avoid the CRC32 issue
      // and ensure the signature doesn't include unexpected parameters
      ChecksumAlgorithm: undefined,
    });

    // Request a presigned URL that is valid for 1 hour (3600 seconds)
    // We limit signableHeaders to prevent the SDK from requiring checksums (CRC32, etc.) 
    // which can cause CORS preflight failures in the browser.
    const signedUrl = await getSignedUrl(r2Client, command, { 
      expiresIn: 3600,
      signableHeaders: new Set(['host', 'content-type']),
    });
    
    // Construct the public, read-only URL the frontend will save into the database
    // Ensure pub URL config is available, fallback to a placeholder text if strictly local
    const publicUrl = R2_PUBLIC_URL 
      ? `${R2_PUBLIC_URL}/${uniqueFilename}`
      : `https://your-r2-public-url.dev/${uniqueFilename}`;

    return NextResponse.json({
      uploadUrl: signedUrl,
      publicUrl: publicUrl,
    });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return NextResponse.json(
      { message: "Failed to generate upload URL" },
      { status: 500 }
    );
  }
}
