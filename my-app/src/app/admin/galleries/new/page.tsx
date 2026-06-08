"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.scss";

const availableTags = ["Family", "Wedding", "Couple", "Pregnancy"];

export default function NewGalleryPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [coverKey, setCoverKey] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((item) => item !== tag)
        : [...prev, tag]
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const currentSlug = slug.trim();

    let nextCoverKey = coverKey;

    if (coverFile && !nextCoverKey) {
      if (!currentSlug) {
        alert("Enter a slug before creating the gallery");
        return;
      }

      const formData = new FormData();

      formData.append("file", coverFile);
      formData.append("slug", currentSlug);
      formData.append("type", "cover");

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        alert("Cover upload failed");
        return;
      }

      nextCoverKey = uploadData.key;
      setCoverKey(uploadData.key);
    }

    const res = await fetch("/api/galleries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        slug: currentSlug,
        coverKey: nextCoverKey,
        tags: selectedTags,
      }),
    });

    if (!res.ok) {
      alert("Failed to create gallery");
      return;
    }

    router.push("/admin/galleries");
    router.refresh();
  }

  return (
    <section className={styles.page}>
      <Link href="/admin/galleries" className={styles.backLink}>
        ← Back to galleries
      </Link>
      <h1 className={styles.title}>Create Gallery</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.field}>
          <span>Title</span>
          <input
            className={styles.input}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Family Session"
          />
        </label>

        <label className={styles.field}>
          <span>Slug</span>
          <input
            className={styles.input}
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
            placeholder="family-session"
          />
        </label>

        <fieldset className={styles.fieldset}>
          <legend>Tags</legend>

          <div className={styles.tags}>
            {availableTags.map((tag) => (
              <label key={tag} className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => toggleTag(tag)}
                />
                <span>{tag}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className={styles.coverUpload}>
          <h2>Cover</h2>
          <p>Choose a cover image. It will upload when you create the gallery.</p>
          <input
            className={styles.fileInput}
            type="file"
            accept="image/*"
            onChange={(event) => {
              setCoverFile(event.target.files?.[0] || null);
              setCoverKey("");
            }}
          />
        </div>

        {coverKey && (
          <p>
            Cover uploaded: <strong>{coverKey}</strong>
          </p>
        )}

        <button type="submit" className={styles.button}>
          Create
        </button>
      </form>
    </section>
  );
}
