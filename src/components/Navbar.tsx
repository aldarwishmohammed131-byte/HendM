"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale, locales, t } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
export default function Navbar({ locale }:{ locale: Locale }){
  const pathname = usePathname();
  const other = locale==="en"?"ar":"en";
  const switched = pathname?.replace(`/${locale}`,`/${other}`) ?? `/${other}`;
  const cart = useCart();
  return (
    <div className="sticky top-0 z-50 backdrop-blur border-b border-base-border bg-base-bg/70">
      <div className="container-xl flex items-center justify-between h-16">
        <Link href={`/${locale}`} className="text-xl font-semibold tracking-widest">
          <span className="text-base-text">H</span><span className="text-base-gold">end</span><span className="text-base-text">M</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href={`/${locale}/catalog?cat=men`}>{t(locale,"men")}</Link>
          <Link href={`/${locale}/catalog?cat=women`}>{t(locale,"women")}</Link>
          <Link href={`/${locale}/catalog?cat=accessories`}>{t(locale,"accessories")}</Link>
          <Link href={`/${locale}/admin`}>{t(locale,"admin")}</Link>
          <Link href={switched}>{other.toUpperCase()}</Link>
          <Link href={`/${locale}/cart`}>🛒 {cart.items.reduce((a,b)=>a+b.qty,0)}</Link>
        </nav>
        <Link className="md:hidden" href={`/${locale}/cart`}>🛒 {cart.items.reduce((a,b)=>a+b.qty,0)}</Link>
      </div>
    </div>
  );
}
