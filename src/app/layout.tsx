import "./styles/globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "HendM", description: "Luxury fashion e-commerce" };
export default function RootLayout({ children }:{ children: React.ReactNode }){
  return (<html lang="en"><body>{children}</body></html>);
}
