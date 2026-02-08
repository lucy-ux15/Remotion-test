import { Composition } from "remotion";
import { LaborRxVideo } from "./compositions/LaborRxVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="LaborRxVideo"
      component={LaborRxVideo}
      durationInFrames={1980}
      fps={60}
      width={1920}
      height={1080}
    />
  );
};
