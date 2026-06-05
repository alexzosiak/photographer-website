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

    const res = await fetch("/api/galleries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        slug,
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

        <button type="submit" className={styles.button}>
          Create
        </button>
      </form>

      <div className={styles.coverUpload}>
        <h2>Upload cover</h2>
        <p>Cover will be uploaded for the current slug.</p>
        <input
          className={styles.fileInput}
          type="file"
          accept="image/*"
          onChange={async (event) => {
            const file = event.target.files?.[0];

            if (!file) return;

            const formData = new FormData();

            formData.append("file", file);
            formData.append("slug", slug || "test-gallery");
            formData.append("type", "cover");

            const res = await fetch("/api/upload", {
              method: "POST",
              body: formData,
            });

            const data = await res.json();

            console.log(data);
            alert(JSON.stringify(data, null, 2));
          }}
        />
      </div>
    </section>
  );
}
