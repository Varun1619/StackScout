import { ImageResponse } from "next/og";
import { RadarMark } from "../../_icon/RadarMark";

export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(<RadarMark size={192} />, {
    width: 192,
    height: 192,
  });
}
