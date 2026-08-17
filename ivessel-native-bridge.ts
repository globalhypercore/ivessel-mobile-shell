/**
 * iVessel native bridge
 * ----------------------
 * Paste this into the LOVABLE web app (e.g. src/lib/native.ts) and install
 * the plugins there too:  npm i @capacitor/core @capacitor/geolocation @capacitor/camera
 *
 * When the app runs inside the Capacitor shell, Capacitor.isNativePlatform()
 * is true and these call real device GPS / camera. In a normal browser they
 * fall back to the web APIs, so the same code works on desktop and mobile.
 */
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export const isNative = () => Capacitor.isNativePlatform();

/** Capture the current GPS position. Returns lat/lng/accuracy or throws. */
export async function captureLocation() {
  if (isNative()) {
    const perm = await Geolocation.requestPermissions();
    if (perm.location === 'denied') throw new Error('Location permission denied');
  }
  const pos = await Geolocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  });
  return {
    lat: pos.coords.latitude,
    lng: pos.coords.longitude,
    accuracy: pos.coords.accuracy,
    timestamp: pos.timestamp,
  };
}

/** Take a photo (or pick from library). Returns a data URL you can upload to Supabase. */
export async function capturePhoto(fromLibrary = false) {
  const photo = await Camera.getPhoto({
    quality: 70,
    allowEditing: false,
    resultType: CameraResultType.DataUrl,
    source: fromLibrary ? CameraSource.Photos : CameraSource.Camera,
  });
  return photo.dataUrl; // e.g. attach to an issue / inventory record
}
