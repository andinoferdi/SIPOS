import POSInstanceForm from "@/features/portal/components/pos-instance-form";

export default function CreatePOSInstancePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-(--token-gray-900) dark:text-(--token-white)">
          Buat POS Instance
        </h1>
        <p className="mt-1 text-sm text-(--token-gray-500) dark:text-(--token-gray-400)">
          Tambahkan outlet atau counter kasir baru
        </p>
      </div>
      <POSInstanceForm />
    </div>
  );
}
