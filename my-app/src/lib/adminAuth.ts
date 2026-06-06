import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requireAdminAuth() {
  const cookieStore = await cookies();

  const isLoggedIn = cookieStore.get("admin_auth")?.value === "true";

  if (!isLoggedIn) {
    redirect("/admin/login");
  }
}