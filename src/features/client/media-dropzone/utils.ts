export function getKeyFromUrl(url: string) {
  const u = new URL(url)
  return u.pathname.slice(1)
}
