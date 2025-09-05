"use client";
import { useCart } from "@/lib/cart";
import { Locale, t } from "@/lib/i18n";
export default function AddToCart({ product, locale }:{ product:any, locale:Locale }){
  const cart = useCart();
  const img = product?.images?.[0]?.url || "/demo/placeholder.svg";
  return (
    <button className="btn btn-gold" onClick={()=>cart.add({ id:product.id, slug:product.slug, title:product.title, titleAr:product.titleAr, price:product.price, currency:product.currency, image:img, qty:1 })}>
      {t(locale,"addToCart")}
    </button>
  );
}
