"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { Locale, t } from "@/lib/i18n";
export default function CartPage({ params }:{ params:{ locale:Locale } }){
  const locale = params.locale ?? "en";
  const { items, remove, clear } = useCart();
  const total = items.reduce((a,b)=>a+b.price*b.qty,0);
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">{t(locale,"cart")}</h1>
      <div className="space-y-4">
        {items.map(it=>(
          <div key={it.id} className="card p-4 flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden"><Image src={it.image} alt={it.title} fill className="object-cover"/></div>
            <div className="flex-1">
              <div className="font-medium">{locale==="ar"? it.titleAr : it.title}</div>
              <div className="text-base-sub text-sm">{it.qty} × {it.price}</div>
            </div>
            <button className="btn" onClick={()=>remove(it.id)}>✕</button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="text-xl font-semibold">{t(locale,"price")}: {total}</div>
        <div className="flex gap-3">
          <button className="btn" onClick={clear}>Reset</button>
          <Link href={`/${locale}/checkout`} className="btn btn-gold">{t(locale,"checkout")}</Link>
        </div>
      </div>
    </div>
  );
}
