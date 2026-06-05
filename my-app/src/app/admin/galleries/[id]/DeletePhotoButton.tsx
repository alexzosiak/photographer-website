"use client";

import { useRouter } from "next/navigation";

type Props = {
  photoId: string;
};

export default function DeletePhotoButton({ photoId }: Props) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = confirm("Delete this photo from gallery?");

    if (!confirmed) return;

    const res = await fetch(`/api/photos/${photoId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete photo");
      return;
    }

    router.refresh();
  }

  return (
    <button type="button" onClick={handleDelete}>
      ×
    </button>
  );
}