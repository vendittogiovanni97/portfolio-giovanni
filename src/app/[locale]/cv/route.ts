import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { locale } = await params;
  const fileName = locale === "en" ? "CV_Giovanni_Venditto_EN.pdf" : "CV_Giovanni_Venditto_IT.pdf";
  return NextResponse.redirect(new URL(`/documents/${fileName}`, request.url));
}
