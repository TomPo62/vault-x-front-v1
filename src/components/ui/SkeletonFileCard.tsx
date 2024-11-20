export default function SkeletonFileCard() {
  return (
    <div className="p-8 rounded-lg shadow-md bg-background text-primary animate-pulse w-full mx-auto">
      <div className="h-6 bg-gray-700 rounded w-11/12 mb-2"></div> {/* Titre étendu à 11/12 */}
      <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>    {/* MIME étendu à 3/4 */}
      <div className="h-4 bg-gray-700 rounded w-2/3 mb-2"></div>    {/* Taille étendue à 2/3 */}
      <div className="h-4 bg-gray-700 rounded w-11/12 mb-4"></div>  {/* CID étendu à 11/12 */}
      <div className="flex items-center justify-around gap-2">
        <div className="bg-gray-700 h-8 w-24 rounded"></div>        {/* Bouton étendu à w-24 */}
        <div className="bg-gray-700 h-8 w-10 rounded"></div>        {/* Icônes légèrement agrandies */}
        <div className="bg-gray-700 h-8 w-10 rounded"></div>
      </div>
    </div>
  );
}
