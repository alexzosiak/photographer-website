import { pool } from "@/lib/db";

export type GalleryListItem = {
  id: string;
  title: string;
  slug: string;
  cover_key: string | null;
  coverUrl: string | null;
  tags: string[];
};

export type GalleryDetails = {
  id: string;
  title: string;
  slug: string;
  cover_key: string | null;
  tags?: string[];
};

export type GalleryPhoto = {
  id: string;
  key: string;
  sort_order: number;
};

function getPublicR2Url() {
  return process.env.R2_PUBLIC_URL || process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "";
}

export async function getGalleries(): Promise<GalleryListItem[]> {
  const result = await pool.query(`
    SELECT
      g.id,
      g.title,
      g.slug,
      g.cover_key,
      g.created_at,
      COALESCE(
        json_agg(t.name) FILTER (WHERE t.name IS NOT NULL),
        '[]'
      ) AS tags
    FROM galleries g
    LEFT JOIN gallery_tags gt ON gt.gallery_id = g.id
    LEFT JOIN tags t ON t.id = gt.tag_id
    GROUP BY g.id
    ORDER BY g.created_at DESC;
  `);

  const publicR2Url = getPublicR2Url();

  return result.rows.map((gallery) => ({
    ...gallery,
    coverUrl:
      gallery.cover_key && publicR2Url
        ? `${publicR2Url}/${gallery.cover_key}`
        : null,
  }));
}

export async function getGalleryBySlug(slug: string): Promise<{
  gallery: GalleryDetails;
  photos: GalleryPhoto[];
} | null> {
  const galleryResult = await pool.query(
    `
    SELECT *
    FROM galleries
    WHERE slug = $1
    `,
    [slug]
  );

  if (galleryResult.rows.length === 0) {
    return null;
  }

  const gallery = galleryResult.rows[0];

  const photosResult = await pool.query(
    `
    SELECT *
    FROM photos
    WHERE gallery_id = $1
    ORDER BY sort_order ASC
    `,
    [gallery.id]
  );

  return {
    gallery,
    photos: photosResult.rows,
  };
}

export async function getGalleryById(id: string): Promise<{
  gallery: GalleryDetails & { tags: string[] };
  photos: GalleryPhoto[];
} | null> {
  const galleryResult = await pool.query(
    `
    SELECT
      g.*,
      COALESCE(
        json_agg(t.name) FILTER (WHERE t.name IS NOT NULL),
        '[]'
      ) AS tags
    FROM galleries g
    LEFT JOIN gallery_tags gt ON gt.gallery_id = g.id
    LEFT JOIN tags t ON t.id = gt.tag_id
    WHERE g.id = $1
    GROUP BY g.id
    `,
    [id]
  );

  if (galleryResult.rows.length === 0) {
    return null;
  }

  const photosResult = await pool.query(
    `
    SELECT *
    FROM photos
    WHERE gallery_id = $1
    ORDER BY sort_order ASC
    `,
    [id]
  );

  return {
    gallery: galleryResult.rows[0],
    photos: photosResult.rows,
  };
}
