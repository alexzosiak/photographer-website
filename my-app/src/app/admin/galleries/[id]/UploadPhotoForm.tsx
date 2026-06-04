"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  galleryId: string;
  slug: string;
};

export default function UploadPhotoForm({ galleryId, slug }: Props) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();

    formData.append("file", file);
    formData.append("slug", slug);
    formData.append("type", "photo");

    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const uploadData = await uploadRes.json();

    if (!uploadRes.ok) {
      alert("Upload failed");
      setIsUploading(false);
      return;
    }

    const photoRes = await fetch("/api/photos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        galleryId,
        key: uploadData.key,
      }),
    });

    if (!photoRes.ok) {
      alert("Photo saved to R2, but failed to save in database");
      setIsUploading(false);
      return;
    }

    setIsUploading(false);
    router.refresh();
  }

  return (
    <div>
      <h3>Upload photo</h3>

      <input type="file" accept="image/*" onChange={handleUpload} />

      {isUploading && <p>Uploading...</p>}
    </div>
  );
}