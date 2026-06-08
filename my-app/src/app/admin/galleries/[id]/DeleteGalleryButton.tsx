"use client";

import { useRouter } from "next/navigation";

type Props = {
  galleryId: string;
};

export default function DeleteGalleryButton({ galleryId }: Props) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = confirm(
      "Delete this gallery? Cover and photos will be removed from R2."
    );

    if (!confirmed) return;

    const res = await fetch(`/api/admin/galleries/${galleryId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete gallery");
      return;
    }

    router.push("/admin/galleries");
    router.refresh();
  }

  return (
    <button type="button" onClick={handleDelete}>
      Delete gallery
    </button>
  );
}
