"use client";
import LottieAnimation from "@/components/ui/LottieAnimation";
import useLottieAnimation from "@/hooks/useLottieAnimation";
import SearchParamsProvider from "@/components/SearchParamsProvider";

const RenderLottieContent = ({
  cid,
  textColor,
}: {
  cid: string;
  textColor?: string | null;
}) => {
  const isValidHexColor = (color: string) =>
    /^#?([0-9A-F]{3}){1,2}$/i.test(color);
  const formatHexColor = (color: string) =>
    color.startsWith("#") ? color : `#${color}`;
  const validTextColor = isValidHexColor(textColor || "")
    ? formatHexColor(textColor || "#000000")
    : "#000000";

  const textStyle = { color: validTextColor };

  // Utilisation correcte du hook
  const { animationData, loading, error } = useLottieAnimation(cid);

  if (loading) return <p style={textStyle}>Loading animation...</p>;
  if (error) return <p style={textStyle}>Error loading animation: {error}</p>;
  if (!animationData)
    return <p style={textStyle}>No animation data available</p>;

  return (
    <div className="w-full h-full flex justify-center items-center">
      <LottieAnimation animationData={animationData} />
    </div>
  );
};

const RenderLottiePage = () => {
  return (
    <SearchParamsProvider>
      {({ cid, textColor }) => {
        if (!cid)
          return <p style={{ color: "#000000" }}>Missing CID in URL parameters.</p>;

        // Passez les paramètres à un composant enfant qui utilise le hook
        return <RenderLottieContent cid={cid} textColor={textColor} />;
      }}
    </SearchParamsProvider>
  );
};

export default RenderLottiePage;
