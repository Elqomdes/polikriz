export function makeFileBase(name: string, model: string, country: string | undefined, date: Date = new Date()) {
  const ymd = date.toISOString().slice(0,10).replace(/-/g,"");
  const parts = [slug(name), slug(model)];
  if (country) parts.push(slug(country));
  parts.push(ymd);
  return parts.filter(Boolean).join("-");
}

function slug(s: string) {
  return s.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
}


