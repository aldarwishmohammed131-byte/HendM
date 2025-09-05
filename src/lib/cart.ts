import { create } from "zustand";
export type CartItem = { id:number; slug:string; title:string; titleAr:string; price:number; currency:string; image:string; qty:number; };
type CartState = { items:CartItem[]; add:(i:CartItem)=>void; remove:(id:number)=>void; clear:()=>void; };
export const useCart = create<CartState>((set)=>({
  items:[],
  add:(i)=>set(s=>{
    const e=s.items.find(x=>x.id===i.id);
    if(e) return {items:s.items.map(x=>x.id===i.id?{...x,qty:x.qty+i.qty}:x)};
    return {items:[...s.items,i]};
  }),
  remove:(id)=>set(s=>({items:s.items.filter(x=>x.id!==id)})),
  clear:()=>set({items:[]})
}));
