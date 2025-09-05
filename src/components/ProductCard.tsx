"use client";
import Image from "next/image";
import Link from "next/link";
import { Locale, t } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
export default function ProductCard({ p, locale }:{ p:any, locale:Locale }){
  const cart = useCart();
  const title = locale==="ar"? p.titleAr : p.title;
  const img = p.images?.[0]?.url || "/demo/placeholder.svg";
  return (
    <div className="card overflow-hidden">
      <Link href={`/${locale}/product/${p.slug}`}>
        <div className="relative aspect-[3/4]"><Image src={img} alt={title} fill className="object-cover"/></div>
      </Link>
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="px-3 py-1 rounded-full bg-base-border/40 text-sm">{p.price} {t(locale,"currency")}</span>
        </div>
        <button className="btn btn-gold w-full mt-3"
          onClick={()=>cart.add({id:p.id,slug:p.slug,title:p.title,titleAr:p.titleAr,price:p.price,currency:p.currency,image:img,qty:1})}>
          {t(locale,"addToCart")}
        </button>
      </div>
    </div>
  );
}
