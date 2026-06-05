"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <h3>Gallery settings</h3>

      <div>
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
      </div>

      <div>
        <label>
          Slug
          <input value={slug} onChange={(e) => setSlug(e.target.value)} />
        </label>
      </div>

      <div>
        <p>Tags</p>

        {availableTags.map((tag) => (
          <label key={tag}>
            <input
              type="checkbox"
              checked={selectedTags.includes(tag)}
              onChange={() => toggleTag(tag)}
            />
            {tag}
          </label>
        ))}
      </div>

      <div>
        <p>Cover</p>

        {coverKey && (
          <img
            src={`${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${coverKey}`}
            alt={title}
            width={160}
            height={160}
          />
        )}

        <input type="file" accept="image/*" onChange={handleCoverUpload} />
      </div>

      <button type="submit" disabled={isSaving}>
        {isSaving ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}