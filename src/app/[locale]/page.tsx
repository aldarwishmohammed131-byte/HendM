import Link from "next/link";
import { prisma } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import { Locale, t } from "@/lib/i18n";
export default async function Page({ params }:{ params:{ locale: Locale } }){
  const locale = params.locale ?? "en";
  const featured = await prisma.product.findMany({ take:8, orderBy:{createdAt:"desc"}, include:{images:true} });
  return (
    <div className="space-y-10">
      <section className="card p-8 md:p-12 bg-gradient-to-br from-base-card to-black/30">
        <h1 className="text-3xl md:text-5xl font-extrabold">HendM — {locale==="ar"?"أناقة مستقبلية":"Futuristic Elegance"}</h1>
        <p className="mt-4 text-base-sub max-w-2xl">{locale==="ar"?"تسوّق تشكيلات رجالية ونسائية وإكسسوارات.":"Shop men, women, and accessories."}</p>
        <div className="mt-6 flex gap-3">
          <Link href={`/${locale}/catalog`} className="btn btn-gold">{t(locale,"catalog")}</Link>
          <Link href={`/${locale}/cart`} className="btn btn-ghost">🛒 {t(locale,"cart")}</Link>
        </div>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featured.map((p)=> (<ProductCard key={p.id} p={p} locale={locale}/>))}
      </section>
    </div>
  );
}
