"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.scss";

const availableTags = ["Family", "Wedding", "Couple", "Pregnancy"];

type Gallery = {
  id: string;
  title: string;
  slug: string;
  cover_key: string | null;
  tags: string[];
};

type Props = {
  gallery: Gallery;
};

export default function EditGalleryForm({ gallery }: Props) {
  const router = useRouter();

  const [title, setTitle] = useState(gallery.title);
  const [slug, setSlug] = useState(gallery.slug);
  const [coverKey, setCoverKey] = useState(gallery.cover_key || "");
  const [selectedTags, setSelectedTags] = useState<string[]>(gallery.tags || []);
  const [isSaving, setIsSaving] = useState(false);

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((item) => item !== tag)
        : [...prev, tag]
    );
  }

  async function handleCoverUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);
    formData.append("slug", slug);
    formData.append("type", "cover");

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Cover upload failed");
      return;
    }

    setCoverKey(data.key);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSaving(true);

    const res = await fetch(`/api/admin/galleries/${gallery.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        slug,
        coverKey,
        tags: selectedTags,
      }),
    });

    setIsSaving(false);

    if (!res.ok) {
      alert("Failed to update gallery");
      return;
    }

    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className={styles.settingsForm}>
      <div className={styles.formHeader}>
        <div>
          <span className={styles.label}>Settings</span>
          <h3>Gallery settings</h3>
        </div>
        <button type="submit" className={styles.saveButton} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save changes"}
        </button>
      </div>

      <div className={styles.formGrid}>
        <label className={styles.field}>
          <span>Title</span>
          <input
            className={styles.input}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>

        <label className={styles.field}>
          <span>Slug</span>
          <input
            className={styles.input}
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
          />
        </label>
      </div>

      <fieldset className={styles.fieldset}>
        <legend>Tags</legend>

        <div className={styles.tagControls}>
          {availableTags.map((tag) => (
            <label
              key={tag}
              className={`${styles.tagControl} ${
                selectedTags.includes(tag) ? styles.tagControlActive : ""
              }`}
            >
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

      <div className={styles.coverField}>
        <div>
          <span className={styles.label}>Cover</span>
          <p>Upload a vertical cover image for the public gallery card.</p>
        </div>

        {coverKey && (
          <img
            className={styles.coverPreview}
            src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${coverKey}`}
            alt={title}
            width={160}
            height={200}
          />
        )}

        <input
          className={styles.fileInput}
          type="file"
          accept="image/*"
          onChange={handleCoverUpload}
        />
      </div>
    </form>
  );
}
