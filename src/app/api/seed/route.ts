import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(req:Request){
  const token = new URL(req.url).searchParams.get("token");
  if(!token || token !== process.env.SEED_TOKEN){
    return NextResponse.json({ok:false,error:"Unauthorized"},{status:401});
  }
  const count = await prisma.product.count();
  if(count>0) return NextResponse.json({ok:true,alreadySeeded:true});
  await prisma.product.create({ data:{
    slug:"lux-suit-aurum", title:"Aurum Prestige Suit", titleAr:"بذلة أوروم بريستيج",
    description:"Handcrafted luxury suit.", descriptionAr:"بدلة فاخرة مصمّمة بإتقان.",
    price:899, currency:"USD", category:"men",
    images:{create:[{url:"/demo/men/suit-1.svg"},{url:"/demo/men/suit-1b.svg"}]},
    sizes:["S","M","L","XL"], colors:["black","navy","charcoal"]
  }});
  await prisma.product.create({ data:{
    slug:"noir-dress-stellar", title:"Stellar Noir Dress", titleAr:"فستان ستيلار نوير",
    description:"Cinematic evening gown.", descriptionAr:"فستان سهرة سينمائي.",
    price:649, currency:"USD", category:"women",
    images:{create:[{url:"/demo/women/dress-1.svg"},{url:"/demo/women/dress-1b.svg"}]},
    sizes:["XS","S","M","L"], colors:["black","gold"]
  }});
  await prisma.product.create({ data:{
    slug:"halo-sunglasses-alpha", title:"Halo Alpha Sunglasses", titleAr:"نظارات هالو ألفا",
    description:"Polarized lenses.", descriptionAr:"عدسات مستقطبة.",
    price:199, currency:"USD", category:"accessories",
    images:{create:[{url:"/demo/accessories/sunglasses-1.svg"}]},
    sizes:[], colors:["black","gold"]
  }});
  return NextResponse.json({ok:true,seeded:true});
}
