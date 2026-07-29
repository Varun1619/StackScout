import { ImageResponse } from "next/og";
import { RadarMark } from "./_icon/RadarMark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(<RadarMark size={180} />, size);
}
