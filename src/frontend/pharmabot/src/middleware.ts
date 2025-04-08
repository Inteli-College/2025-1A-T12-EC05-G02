import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token"); // Ensure token is checked in cookies

  // Verifica se o token existe
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login"; // Redireciona para a página de login
    return NextResponse.redirect(url);
  }

  // Validação adicional do token pode ser feita aqui, como verificar expiração
  return NextResponse.next();
}

// Define as rotas protegidas
export const config = {
    matcher: ["/((?!login).*)"], // Protege todas as rotas, exceto a rota de login
};
