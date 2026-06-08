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
  const [uploadedCount, setUploadedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [currentFileName, setCurrentFileName] = useState("");

  function setPhotoUploadLock(isLocked: boolean) {
    window.dispatchEvent(
      new CustomEvent("gallery-photo-upload", {
        detail: { isUploading: isLocked },
      })
    );
  }

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) return;

    setIsUploading(true);
    setUploadedCount(0);
    setTotalCount(files.length);
    setCurrentFileName(files[0]?.name || "");
    setPhotoUploadLock(true);

    try {
      for (const file of files) {
        setCurrentFileName(file.name);

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
          alert(`Photo save failed: ${file.name}`);
          continue;
        }

        setUploadedCount((count) => count + 1);
      }

      router.refresh();
    } finally {
      setIsUploading(false);
      setCurrentFileName("");
      setPhotoUploadLock(false);
      event.target.value = "";
    }
  }

  const progress = totalCount > 0 ? Math.round((uploadedCount / totalCount) * 100) : 0;

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
        disabled={isUploading}
        onChange={handleUpload}
      />

      {isUploading && (
        <div className={styles.progressArea}>
          <div className={styles.progressHeader}>
            <span>Uploading {uploadedCount} / {totalCount}</span>
            <span>{progress}%</span>
          </div>
          <div className={styles.progressTrack} aria-hidden="true">
            <div
              className={styles.progressBar}
              style={{ width: `${progress}%` }}
            />
          </div>
          {currentFileName && (
            <p className={styles.status}>{currentFileName}</p>
          )}
        </div>
      )}
    </div>
  );
}
