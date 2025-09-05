import { NextResponse } from "next/server";
export function middleware(request:any){
  if(request.nextUrl.pathname === "/"){
    const url = request.nextUrl.clone(); url.pathname = "/ar";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
export const config = { matcher: ["/"] };
