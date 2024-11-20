export default function BetaIndicator() {
  const version = "v1.0.0"; // Remplacez par la version réelle de l'application

  return (
    <div className="w-full bg-first-hover text-background px-4 py-2 text-xs md:text-sm flex justify-center items-center">
      <span>Veltyr is currently in <strong>Beta,</strong></span>
      <span className="ml-1">Version: {version}</span>
    </div>
  );
}
