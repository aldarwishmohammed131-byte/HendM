import Image from "next/image";
import { prisma } from "@/lib/db";
import { Locale, t } from "@/lib/i18n";
import AddToCart from "./parts/AddToCart";
export default async function ProductPage({ params }:{ params:{ locale:Locale, slug:string } }){
  const locale = params.locale ?? "en";
  const product = await prisma.product.findUnique({ where:{ slug: params.slug }, include:{ images:true } });
  if(!product) return <div>Not found</div>;
  const title = locale==="ar"? product.titleAr : product.title;
  const desc  = locale==="ar"? product.descriptionAr : product.description;
  const img = product.images?.[0]?.url || "/demo/placeholder.svg";
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="relative aspect-[3/4] card overflow-hidden"><Image src={img} alt={title} fill className="object-cover"/></div>
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-base-sub mt-3">{desc}</p>
        <div className="mt-6 text-xl">{t(locale,"price")}: {product.price} {t(locale,"currency")}</div>
        <div className="mt-6"><AddToCart product={product} locale={locale}/></div>
      </div>
    </div>
  );
}
