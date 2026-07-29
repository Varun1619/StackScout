import { ImageResponse } from "next/og";
import { RadarMark } from "../../_icon/RadarMark";

export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(<RadarMark size={512} />, {
    width: 512,
    height: 512,
  });
}
