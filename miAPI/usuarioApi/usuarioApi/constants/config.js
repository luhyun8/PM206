import { Platform } from 'react-native';
import Constants from 'expo-constants';

let cachedActiveHost = null;

const getExpoHostIp = () => {
  const hostUri =
    Constants.expoConfig?.hostUri ||
    Constants.manifest2?.extra?.expoGo?.debuggerHost ||
    Constants.experienceUrl ||
    '';

  if (hostUri) {
    const ip = hostUri.split(':')[0].replace('http://', '').replace('https://', '');
    if (ip && ip !== 'localhost' && ip !== '127.0.0.1') {
      return ip;
    }
  }
  return null;
};

export const getApiUrl = () => {
  if (Platform.OS === 'web') {
    return 'http://localhost:5000/v1/usuarios/';
  }

  if (cachedActiveHost) {
    return `http://${cachedActiveHost}:5000/v1/usuarios/`;
  }

  const expoIp = getExpoHostIp();
  if (expoIp) {
    return `http://${expoIp}:5000/v1/usuarios/`;
  }

  return 'http://192.168.0.214:5000/v1/usuarios/';
};

export const API_URL = getApiUrl();

export async function fetchApi(path = '/', options = {}) {
  if (Platform.OS === 'web') {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const url = `http://localhost:5000/v1/usuarios${cleanPath}`;
    return await fetch(url, options);
  }

  const expoIp = getExpoHostIp();
  const candidateIPs = [
    cachedActiveHost,
    expoIp,
    '192.168.0.214',
    '10.151.24.127',
    '10.0.2.2',
    'localhost',
  ].filter(Boolean);

  const uniqueIPs = [...new Set(candidateIPs)];

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  let lastError = null;

  for (const ip of uniqueIPs) {
    const url = `http://${ip}:5000/v1/usuarios${cleanPath}`;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeoutId);

      cachedActiveHost = ip;
      return res;
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error(`No fue posible conectar con el servidor API. (IPs probadas: ${uniqueIPs.join(', ')})`);
}
