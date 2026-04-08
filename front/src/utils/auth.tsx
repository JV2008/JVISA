import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"?: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string | string[];
  "nome"?: string;
}
export function getToken() {
  return localStorage.getItem("token");
}

export function getUser(tokenExterno?: string) {
  const token = tokenExterno || getToken();

  if (!token) return null;

  try {
    const decoded = jwtDecode<CustomJwtPayload>(token);

    return {
      email:
        decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ],
      role:
        decoded[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ],

      nome:
        decoded["nome"],
    };
  } catch (error) {
    console.error("Erro ao decodificar:", error);
    return null;
  }


}

export function isAuthenticated() {
  return !!getToken();
}

export function logout() {
  localStorage.removeItem("token");
}