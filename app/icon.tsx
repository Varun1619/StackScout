import { ImageResponse } from "next/og";
import { RadarMark } from "./_icon/RadarMark";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<RadarMark size={32} />, size);
}
