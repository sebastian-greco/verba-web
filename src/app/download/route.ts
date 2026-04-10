import { NextResponse } from "next/server";

const LATEST_JSON_URL = "https://updates.verbaspeech.app/latest.json";
const TRUSTED_HOST = "updates.verbaspeech.app";

type LatestDownloadMetadata = {
  dmgUrl?: string;
};

export async function GET(): Promise<Response> {
  try {
    const response = await fetch(LATEST_JSON_URL, {
      cache: "no-store",
    });

    if (!response.ok) {
      return new Response("Latest download unavailable", { status: 503 });
    }

    const metadata = (await response.json()) as LatestDownloadMetadata;

    if (!metadata.dmgUrl) {
      return new Response("Latest download unavailable", { status: 503 });
    }

    const downloadUrl = new URL(metadata.dmgUrl);
    if (
      downloadUrl.protocol !== "https:" ||
      downloadUrl.hostname !== TRUSTED_HOST ||
      !downloadUrl.pathname.endsWith(".dmg")
    ) {
      return new Response("Latest download unavailable", { status: 503 });
    }

    return NextResponse.redirect(downloadUrl.toString(), 302);
  } catch {
    return new Response("Latest download unavailable", { status: 503 });
  }
}
