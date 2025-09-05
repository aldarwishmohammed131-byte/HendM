export const locales = ["en","ar"] as const;
export type Locale = typeof locales[number];
export const t = (locale:Locale, key:string) => {
  const dict: Record<string, Record<string,string>> = {
    en:{men:"Men",women:"Women",accessories:"Accessories",catalog:"Catalog",addToCart:"Add to Cart",price:"Price",size:"Size",color:"Color",checkout:"Checkout",cart:"Cart",admin:"Admin",currency:"USD"},
    ar:{men:"رجال",women:"نساء",accessories:"إكسسوارات",catalog:"الكتالوج",addToCart:"أضف للسلة",price:"السعر",size:"المقاس",color:"اللون",checkout:"إتمام الشراء",cart:"السلة",admin:"الإدارة",currency:"دولار"}
  };
  return dict[locale]?.[key] ?? key;
};
