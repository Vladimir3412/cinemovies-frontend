import Cookies from "js-cookie";
import { AUTH_CONFIG, GLOBAL_DICTIONARY } from "@/shared/config";

export function setAccessToken(token: string) {
  Cookies.set(GLOBAL_DICTIONARY.ACCESS_TOKEN, token, {
    expires: AUTH_CONFIG.ACCESS_TOKEN_LIFETIME,
  });
}

export function getAccessToken() {
  return Cookies.get(GLOBAL_DICTIONARY.ACCESS_TOKEN);
}

export function removeAccessToken() {
  Cookies.remove(GLOBAL_DICTIONARY.ACCESS_TOKEN);
}
