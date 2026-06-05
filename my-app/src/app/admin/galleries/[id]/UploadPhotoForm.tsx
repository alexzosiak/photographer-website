"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./UploadPhotoForm.module.scss";

type Props = {
  galleryId: string;
  slug: string;
};

export default function UploadPhotoForm({ galleryId, slug }: Props) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
  const files = Array.from(event.target.files || []);

  if (files.length === 0) return;

  setIsUploading(true);

  for (const file of files) {
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
      alert(`Upload failed: ${file.name}`);
      continue;
    }

    await fetch("/api/photos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        galleryId,
        key: uploadData.key,
      }),
    });
  }

  setIsUploading(false);
  router.refresh();
}

 

  return (
    <div className={styles.upload}>
      <div>
        <h3 className={styles.title}>Upload photo</h3>
        <p className={styles.text}>Add a new image to this gallery.</p>
      </div>

      <input
        className={styles.input}
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
      />

      {isUploading && <p className={styles.status}>Uploading...</p>}
    </div>
  );
}
