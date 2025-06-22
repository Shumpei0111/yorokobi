import { NextRequest, NextResponse } from "next/server";
import Negotiator from "negotiator";
import { defaultLanguage, availableLanguages } from "@/app/i18n/settings";
import { env } from "@/env.mjs";

const getNegotiatedLanguage = (
  headers: Negotiator.Headers
): string | undefined => {
  return new Negotiator({ headers }).language([...availableLanguages]);
};

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - images (image files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images).*)",
  ],
};

export function middleware(request: NextRequest) {
  const headers = {
    "accept-language": request.headers.get("accept-language") ?? "",
    "basic-auth": request.headers.get("authorization") ?? "",
  };

  if (env.ENABLE_BASIC_AUTH) {
    const authHeader = headers["basic-auth"];

    if (!authHeader) {
      return new Response("Unauthorized", {
        status: 401,
        headers: {
          "WWW-Authenticate": "Basic realm=Authorization Required",
          "Cache-Control": "no-store",
          "Content-Type": "text/plain;charset=UTF-8",
        },
      });
    }

    const authValue = authHeader.split(" ")[1];
    const [user, password] = atob(authValue).split(":");
    if (user !== env.BASIC_AUTH_USER || password !== env.BASIC_AUTH_PASSWORD) {
      return new Response("Unauthorized", {
        status: 401,
        headers: {
          "WWW-Authenticate": "Basic realm=Authorization Required",
          "Cache-Control": "no-store",
          "Content-Type": "text/plain;charset=UTF-8",
        },
      });
    }
  }

  const preferredLanguage = getNegotiatedLanguage(headers) || defaultLanguage;
  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = availableLanguages.every(
    (lang) => !pathname.startsWith(`/${lang}/`) && pathname !== `/${lang}`
  );

  /**
   * MEMO: リダイレクトとリライトの処理
   * --------------------------------------------------------------------------
   * pathnameIsMissingLocale が true の場合、以下の処理が行われます：
   * preferredLanguage が defaultLanguage と同じであれば、パスの先頭にデフォルトの言語をつけてリライトします。
   * preferredLanguage が defaultLanguage と異なる場合は、ユーザーを preferredLanguage を含む新しいパスにリダイレクトします。
   *
   * この処理により、ユーザーがロケールを指定していない場合に、デフォルトの言語でページを表示するようにしています。
   */
  if (pathnameIsMissingLocale) {
    if (preferredLanguage !== defaultLanguage) {
      return NextResponse.redirect(
        new URL(`/${preferredLanguage}${pathname}`, request.url)
      );
    } else {
      const newPathname = `/${defaultLanguage}${pathname}`;
      return NextResponse.rewrite(new URL(newPathname, request.url));
    }
  }

  return NextResponse.next();
}
