"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <main>
      <h1>Create Gallery</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Family Session"
            />
          </label>
        </div>

        <div>
          <label>
            Slug
            <input
              value={slug}
              onChange={(event) => setSlug(event.target.value)}
              placeholder="family-session"
            />
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

        <button type="submit">Create</button>
      </form>
      <input
  type="file"
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
    </main>
  );
}