/**
 * Client-side helper to upload files to Cloudflare R2 via presigned URLs.
 */
export async function uploadToR2(file: File): Promise<string> {
  try {
    // 1. Get the presigned URL from our API
    const authResponse = await fetch("/api/admin/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: file.name,
        contentType: file.type,
      }),
    });

    if (!authResponse.ok) {
      const errorData = await authResponse.json();
      throw new Error(errorData.message || "Failed to get upload authorization");
    }

    const { uploadUrl, publicUrl } = await authResponse.json();

    // 2. Upload the file directly to R2 using the presigned URL
    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload file to storage");
    }

    // 3. Return the public URL for saving in the database
    return publicUrl;
  } catch (error) {
    console.error("R2 Upload Error:", error);
    throw error;
  }
}
