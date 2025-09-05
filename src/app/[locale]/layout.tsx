import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Locale, locales } from "@/lib/i18n";
export default function LocaleLayout({ params, children }:{ params:{locale:string}, children:React.ReactNode }){
  const locale = (locales as readonly string[]).includes(params.locale) ? params.locale as Locale : "en";
  return (
    <html lang={locale} dir={locale==="ar"?"rtl":"ltr"}>
      <body>
        <Navbar locale={locale}/>
        <main className="container-xl py-10">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
