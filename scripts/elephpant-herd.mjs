const API_BASE = 'https://www.elephpant.me';

export async function fetchMyHerdUnique(token) {
  const trimmed = token?.trim();
  if (!trimmed) return null;

  try {
    const res = await fetch(`${API_BASE}/api/me/herd`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${trimmed}`,
      },
    });
    if (res.status !== 200) return null;
    const data = await res.json();
    const unique = data?.stats?.unique;
    return typeof unique === 'number' && unique >= 0 ? unique : null;
  } catch {
    return null;
  }
}

export function herdCountPayload(unique) {
  return JSON.stringify({ unique, at: Date.now() });
}
