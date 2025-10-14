import { NextRequest } from "next/server";

type RestCountry = {
  timezones?: string[];
  name?: { common?: string };
  cca3?: string;
};

type WorldTimeApi = {
  datetime?: string;
  timezone?: string;
};

async function fetchJson<T = unknown>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { ...init, headers: { ...(init?.headers || {}), "user-agent": "polikriz-app" } });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

function pickPrimaryTimezone(country: RestCountry | null): string | undefined {
  const tzs = Array.isArray(country?.timezones) ? country?.timezones : undefined;
  if (!tzs || tzs.length === 0) return undefined;
  const first = tzs.find((t) => t.includes("/")) || tzs[0];
  return first;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const country = searchParams.get("country");
    const iso3 = searchParams.get("iso3");
    if (!country) {
      return new Response("country param required", { status: 400 });
    }

    // 1) Resolve country -> primary timezone via RestCountries
    // Prefer ISO3 alpha lookup if provided (more reliable), fallback to name search
    let match: RestCountry | null = null;
    if (iso3 && iso3.length === 3) {
      try {
        const rcAlpha = await fetchJson<RestCountry | RestCountry[]>(`https://restcountries.com/v3.1/alpha/${encodeURIComponent(iso3)}`);
        match = Array.isArray(rcAlpha) && rcAlpha.length > 0 ? rcAlpha[0] : (rcAlpha as RestCountry);
      } catch {
        // ignore and fallback to name
      }
    }
    if (!match) {
      const rc = await fetchJson<RestCountry[]>(`https://restcountries.com/v3.1/name/${encodeURIComponent(country)}?fields=name,timezones,cca3`);
      match = Array.isArray(rc) && rc.length > 0 ? rc[0] : null;
    }
    const timezone = pickPrimaryTimezone(match);
    if (!timezone) {
      return new Response("timezone not found", { status: 404 });
    }

    // 2) Get current time from WorldTimeAPI (no api key required)
    const wt = await fetchJson<WorldTimeApi>(`https://worldtimeapi.org/api/timezone/${encodeURIComponent(timezone)}`);
    const datetime: string | undefined = wt.datetime;
    if (!datetime) {
      return new Response("time not available", { status: 502 });
    }

    return Response.json({ datetime, timezone });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return new Response(msg, { status: 500 });
  }
}


