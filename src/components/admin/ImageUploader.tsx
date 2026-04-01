'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  className?: string;
}

export default function ImageUploader({ label, value, onChange, className = "" }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPEG, PNG, WebP).');
      return;
    }

    // Validate size (e.g., 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File is too large. Max size is 5MB.');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      // 1. Get presigned URL from our API
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to get upload authorization');
      }

      const { uploadUrl, publicUrl } = await res.json();

      // 2. Upload directly to R2
      const uploadRes = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadRes.ok) {
        throw new Error('Failed to upload image to storage');
      }

      // 3. Update parent state with the new public URL
      onChange(publicUrl);
    } catch (err: any) {
      console.error('Upload error:', err);
      setUploadError(err.message || 'An unexpected error occurred during upload.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = () => {
    onChange('');
    setUploadError(null);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-bold text-neutral-700 uppercase tracking-wider">
        {label}
      </label>
      
      <div className="relative group">
        {value ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border-2 border-neutral-200 bg-neutral-100">
            <Image
              src={value}
              alt="Uploaded preview"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white backdrop-blur-sm transition-colors"
                title="Change image"
              >
                <Upload size={20} />
              </button>
              <button
                type="button"
                onClick={removeImage}
                className="p-2 bg-red-500/50 hover:bg-red-500/80 rounded-full text-white backdrop-blur-sm transition-colors"
                title="Remove image"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex flex-col items-center justify-center aspect-video w-full rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 hover:bg-neutral-100 hover:border-neutral-400 transition-all gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isUploading ? (
              <>
                <Loader2 className="animate-spin text-neutral-400" size={32} />
                <span className="text-sm text-neutral-500 font-medium">Uploading to R2...</span>
              </>
            ) : (
              <>
                <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                  <ImageIcon className="text-neutral-400" size={24} />
                </div>
                <div className="text-center px-4">
                  <span className="block text-sm font-bold text-neutral-700">Click to upload</span>
                  <span className="block text-xs text-neutral-400 mt-1">PNG, JPG, WEBP up to 5MB</span>
                </div>
              </>
            )}
          </button>
        )}
      </div>

      {uploadError && (
        <p className="text-xs font-semibold text-red-500 mt-1 bg-red-50 p-2 rounded-lg border border-red-100">
          ⚠️ {uploadError}
        </p>
      )}

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
