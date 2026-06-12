import { Composition } from "remotion";
import { SsottaExplainer } from "./SsottaExplainer";

export function RemotionRoot() {
  return (
    <Composition
      id="SsottaExplainer"
      component={SsottaExplainer}
      durationInFrames={1260}
      fps={30}
      width={1280}
      height={720}
    />
  );
}
