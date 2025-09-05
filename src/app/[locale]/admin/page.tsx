import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
async function addProduct(formData: FormData){
  "use server";
  const data = {
    title: String(formData.get("title")||""),
    titleAr: String(formData.get("titleAr")||""),
    slug: String(formData.get("slug")||""),
    price: Number(formData.get("price")||0),
    category: String(formData.get("category")||"men"),
    description: String(formData.get("description")||""),
    descriptionAr: String(formData.get("descriptionAr")||""),
    image: String(formData.get("image")||"/demo/placeholder.svg")
  };
  if(!data.title || !data.slug) return;
  await prisma.product.create({ data: { ...data, images:{create:[{url:data.image}]}, currency:"USD", sizes:[], colors:[] } as any });
  revalidatePath("/en/admin"); revalidatePath("/ar/admin");
}
export default async function Admin(){
  const products = await prisma.product.findMany({ include:{images:true}, orderBy:{id:"desc"} });
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <form action={addProduct} className="card p-6 space-y-3">
        <h1 className="text-xl font-semibold">Add Product</h1>
        <input name="title" placeholder="Title EN" className="w-full px-4 py-2 rounded-xl bg-base-card border border-base-border"/>
        <input name="titleAr" placeholder="Title AR" className="w-full px-4 py-2 rounded-xl bg-base-card border border-base-border"/>
        <input name="slug" placeholder="slug" className="w-full px-4 py-2 rounded-xl bg-base-card border border-base-border"/>
        <input name="price" type="number" placeholder="price" className="w-full px-4 py-2 rounded-xl bg-base-card border border-base-border"/>
        <input name="category" placeholder="men|women|accessories" className="w-full px-4 py-2 rounded-xl bg-base-card border border-base-border"/>
        <input name="image" placeholder="/path/to/image" className="w-full px-4 py-2 rounded-xl bg-base-card border border-base-border"/>
        <textarea name="description" placeholder="Description EN" className="w-full px-4 py-2 rounded-xl bg-base-card border border-base-border"></textarea>
        <textarea name="descriptionAr" placeholder="Description AR" className="w-full px-4 py-2 rounded-xl bg-base-card border border-base-border"></textarea>
        <button className="btn btn-gold">Create</button>
      </form>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Products</h2>
        {products.map(p=>(
          <div key={p.id} className="card p-4 flex items-center justify-between">
            <div><div className="font-semibold">{p.title} / {p.titleAr}</div><div className="text-base-sub text-sm">{p.slug} — ${p.price} — {p.category}</div></div>
            <img src={p.images?.[0]?.url ?? "/demo/placeholder.svg"} className="w-20 h-20 object-cover rounded-xl border border-base-border"/>
          </div>
        ))}
      </div>
    </div>
  );
}
