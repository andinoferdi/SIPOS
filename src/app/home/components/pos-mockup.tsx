"use client";

import { useEffect, useState } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

const MENU_ITEMS = [
  { id: "p1", name: "Es Kopi Susu", price: 22000, emoji: "☕" },
  { id: "p2", name: "Americano", price: 18000, emoji: "🫖" },
  { id: "p3", name: "Matcha Latte", price: 25000, emoji: "🍃" },
  { id: "p4", name: "Croissant", price: 30000, emoji: "🥐" },
  { id: "p5", name: "Roti Bakar", price: 20000, emoji: "🍞" },
  { id: "p6", name: "Nasi Ayam", price: 28000, emoji: "🍱" },
] as const;

const SEQUENCE = ["p1", "p3", "p4"] as const;

const FMT = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

type Phase = "idle" | "adding" | "paying" | "receipt" | "reset";

export default function PosMockup() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [seqIndex, setSeqIndex] = useState(0);

  const total = cart.reduce((s, item) => s + item.price * item.qty, 0);
  const tax = Math.round(total * 0.1);
  const grandTotal = total + tax;

  useEffect(() => {
    const t = setTimeout(() => setPhase("adding"), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase === "adding") {
      if (seqIndex >= SEQUENCE.length) {
        const t = setTimeout(() => setPhase("paying"), 800);
        return () => clearTimeout(t);
      }

      const itemId = SEQUENCE[seqIndex];
      setActiveItem(itemId);

      const t = setTimeout(() => {
        const menuItem = MENU_ITEMS.find((m) => m.id === itemId);
        if (!menuItem) return;

        setCart((prev) => {
          const existing = prev.find((c) => c.id === itemId);
          if (existing) {
            return prev.map((c) =>
              c.id === itemId ? { ...c, qty: c.qty + 1 } : c
            );
          }
          return [
            ...prev,
            { id: menuItem.id, name: menuItem.name, price: menuItem.price, qty: 1 },
          ];
        });

        setActiveItem(null);
        setSeqIndex((i) => i + 1);
      }, 600);

      return () => clearTimeout(t);
    }

    if (phase === "paying") {
      const t = setTimeout(() => setPhase("receipt"), 1400);
      return () => clearTimeout(t);
    }

    if (phase === "receipt") {
      const t = setTimeout(() => setPhase("reset"), 2800);
      return () => clearTimeout(t);
    }

    if (phase === "reset") {
      setCart([]);
      setSeqIndex(0);
      setActiveItem(null);
      const t = setTimeout(() => setPhase("adding"), 1000);
      return () => clearTimeout(t);
    }
  }, [phase, seqIndex]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-soft surface-elevated shadow-2xl">
      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-soft bg-(--token-gray-50) px-4 py-2.5 dark:bg-(--token-white-5)">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
          <p className="text-[10px] font-semibold text-(--token-gray-500) dark:text-(--token-gray-400)">
            SIPOS — Kasir Utama
          </p>
        </div>
        <p className="text-[10px] text-(--token-gray-400)">Shift 08.00–16.00</p>
      </div>

      <div className="grid grid-cols-[1fr_176px] divide-x divide-soft">
        {/* Product grid */}
        <div className="p-3">
          <p className="mb-2.5 text-[9px] font-semibold uppercase tracking-widest text-(--token-gray-400)">
            Pilih Produk
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            {MENU_ITEMS.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col items-center rounded-xl border px-1.5 py-2 text-center transition-all duration-300 ${
                  activeItem === item.id
                    ? "scale-95 border-primary-400 bg-primary-50 dark:bg-(--token-white-5)"
                    : "border-soft"
                }`}
              >
                <span className="text-base leading-none">{item.emoji}</span>
                <p className="mt-1 text-[9px] font-semibold leading-tight text-(--token-gray-700) dark:text-(--token-gray-300)">
                  {item.name}
                </p>
                <p className="mt-0.5 text-[8px] font-medium text-primary-600 dark:text-primary-400">
                  {FMT.format(item.price)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Order panel */}
        <div className="flex flex-col">
          <div className="border-b border-soft px-3 py-2">
            <p className="text-[9px] font-semibold uppercase tracking-widest text-(--token-gray-400)">
              Keranjang
            </p>
          </div>

          <div className="min-h-[100px] flex-1 space-y-2 p-3">
            {cart.length === 0 ? (
              <p className="pt-4 text-center text-[9px] text-(--token-gray-400)">
                Belum ada item
              </p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-1"
                >
                  <div>
                    <p className="text-[9px] font-semibold leading-tight text-(--token-gray-800) dark:text-(--token-gray-200)">
                      {item.name}
                    </p>
                    <p className="text-[8px] text-(--token-gray-400)">
                      x{item.qty}
                    </p>
                  </div>
                  <p className="shrink-0 text-[9px] font-semibold text-(--token-gray-700) dark:text-(--token-gray-300)">
                    {FMT.format(item.price * item.qty)}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Summary & Pay */}
          <div className="space-y-1.5 border-t border-soft p-3">
            <div className="flex justify-between text-[9px] text-(--token-gray-500)">
              <span>Subtotal</span>
              <span>{FMT.format(total)}</span>
            </div>
            <div className="flex justify-between text-[9px] text-(--token-gray-500)">
              <span>Pajak 10%</span>
              <span>{FMT.format(tax)}</span>
            </div>
            <div className="my-1 border-t border-soft" />
            <div className="flex justify-between text-[10px] font-bold text-(--token-gray-900) dark:text-(--token-white)">
              <span>Total</span>
              <span>{FMT.format(grandTotal)}</span>
            </div>

            <button
              type="button"
              className={`mt-1.5 w-full rounded-lg py-2 text-[10px] font-bold text-white transition-all duration-300 ${
                phase === "receipt"
                  ? "bg-green-500"
                  : phase === "paying"
                    ? "animate-pulse bg-primary-500"
                    : "bg-primary-600"
              }`}
            >
              {phase === "receipt"
                ? "✓ Lunas"
                : phase === "paying"
                  ? "Memproses..."
                  : "Bayar Sekarang"}
            </button>
          </div>
        </div>
      </div>

      {/* Receipt overlay */}
      {phase === "receipt" && (
        <div className="absolute inset-0 flex items-center justify-center bg-(--token-gray-900)/70 backdrop-blur-sm">
          <div className="w-44 rounded-2xl border border-soft surface-elevated p-5 text-center shadow-2xl">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <svg
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-sm font-bold text-(--token-gray-900) dark:text-(--token-white)">
              Pembayaran Berhasil
            </p>
            <p className="mt-1 text-[11px] font-semibold text-primary-600 dark:text-primary-400">
              {FMT.format(grandTotal)}
            </p>
            <div className="mt-3 space-y-1 rounded-lg bg-(--token-gray-100) p-2 dark:bg-(--token-white-5)">
              <p className="text-[9px] text-(--token-gray-500)">
                Transaksi #TRX-{Math.floor(Math.random() * 9000) + 1000}
              </p>
              <p className="text-[9px] text-(--token-gray-400)">
                Struk siap dikirim
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}