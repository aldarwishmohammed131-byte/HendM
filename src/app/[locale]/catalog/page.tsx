import { prisma } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import { Locale } from "@/lib/i18n";
export default async function Catalog({ params, searchParams }:{ params:{locale:Locale}, searchParams:{cat?:string} }){
  const locale = params.locale ?? "en";
  const where = searchParams.cat ? { category: searchParams.cat } : {};
  const products = await prisma.product.findMany({ where, include:{images:true} });
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((p)=> <ProductCard key={p.id} p={p} locale={locale}/>)}
    </div>
  );
}
