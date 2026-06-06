"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DeletePhotoButton from "./DeletePhotoButton";

type Photo = {
  id: string;
  key: string;
  sort_order: number;
};

type Props = {
  photos: Photo[];
  title: string;
  publicUrl: string;
};

export default function SortablePhotos({ photos, title, publicUrl }: Props) {
  const router = useRouter();

  const [items, setItems] = useState(photos);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  function handleDragStart(photoId: string) {
    setDraggedId(photoId);
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function handleDrop(targetId: string) {
    if (!draggedId || draggedId === targetId) return;

    const draggedIndex = items.findIndex((photo) => photo.id === draggedId);
    const targetIndex = items.findIndex((photo) => photo.id === targetId);

    const updatedItems = [...items];
    const [draggedItem] = updatedItems.splice(draggedIndex, 1);

    updatedItems.splice(targetIndex, 0, draggedItem);

    setItems(updatedItems);
    setDraggedId(null);
  }

  async function saveOrder() {
    setIsSaving(true);

    const res = await fetch("/api/photos/reorder", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        photos: items.map((photo, index) => ({
          id: photo.id,
          sortOrder: index + 1,
        })),
      }),
    });

    setIsSaving(false);

    if (!res.ok) {
      alert("Failed to save order");
      return;
    }

    router.refresh();
  }

  return (
    <div>
      <button type="button" onClick={saveOrder} disabled={isSaving}>
        {isSaving ? "Saving..." : "Save order"}
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {items.map((photo) => (
          <div
            key={photo.id}
            draggable
            onDragStart={() => handleDragStart(photo.id)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(photo.id)}
            style={{
              position: "relative",
              cursor: "grab",
              border: draggedId === photo.id ? "2px solid black" : "1px solid #ddd",
              padding: 8,
            }}
          >
            <DeletePhotoButton photoId={photo.id} />

            <img
              src={`${publicUrl}/${photo.key}`}
              alt={title}
              style={{
                width: "100%",
                height: 160,
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}