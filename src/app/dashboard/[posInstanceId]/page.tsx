import Link from "next/link";
import { redirect } from "next/navigation";
import { requireServerAuthUser } from "@/lib/auth/server";
import { getPortalInstanceById, PortalServiceError } from "@/lib/portal/service";

type DashboardInstancePageProps = {
  params: Promise<{ posInstanceId: string }>;
};

export default async function DashboardInstancePage({ params }: DashboardInstancePageProps) {
  const user = await requireServerAuthUser();
  const { posInstanceId } = await params;
  let instance: Awaited<ReturnType<typeof getPortalInstanceById>>;

  try {
    instance = await getPortalInstanceById(user, posInstanceId);
  } catch (error) {
    if (error instanceof PortalServiceError) {
      if (error.code === "instance_not_found") {
        redirect("/portal");
      }
      if (error.code === "forbidden") {
        redirect("/portal");
      }
    }

    throw error;
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-soft surface-elevated p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400">
          Dashboard Instance
        </p>
        <h1 className="mt-2 text-2xl font-bold text-(--token-gray-900) dark:text-(--token-white)">
          {instance.name}
        </h1>
        <p className="mt-2 text-sm text-(--token-gray-500) dark:text-(--token-gray-400)">
          Type: {instance.type === "TABLE_SERVICE" ? "Table Service" : "Tab Service"}
        </p>
        <p className="text-sm text-(--token-gray-500) dark:text-(--token-gray-400)">
          {instance.type === "TABLE_SERVICE"
            ? `Total meja aktif: ${instance.total_table}`
            : "Mode tab aktif tanpa meja."}
        </p>

        <div className="mt-4">
          <Link
            href="/portal"
            className="inline-flex items-center rounded-lg border border-soft px-3 py-2 text-sm font-medium text-(--token-gray-700) transition-colors hover:bg-(--token-gray-100) dark:text-(--token-gray-300) dark:hover:bg-(--token-white-5)"
          >
            Kembali ke Portal
          </Link>
        </div>
      </div>
    </section>
  );
}
