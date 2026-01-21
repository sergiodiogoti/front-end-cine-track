const TOKEN_KEY = '@cineTrack:token';
const ROLES_KEY = '@cineTrack:roles';

export const saveAuth = (token: string, roles: string[]) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ROLES_KEY, JSON.stringify(roles));
};

export const getToken = (): string | null =>
  localStorage.getItem(TOKEN_KEY);

export const getRoles = (): string[] => {
  const raw = localStorage.getItem(ROLES_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLES_KEY);
};
