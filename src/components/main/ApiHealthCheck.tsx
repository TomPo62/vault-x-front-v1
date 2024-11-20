"use client";
import { useEffect, useState } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { BsFillCloudLightningRainFill } from "react-icons/bs";
import axios from "axios";

export default function ApiHealthCheck() {
  const [health, setHealth] = useState<boolean | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await axios.get("https://ipfs-api.bakiverse.com/");
        if (res.status === 200) {
          setHealth(true);
        } else {
          setHealth(false);
        }
      } catch (err) {
        setHealth(false);
        console.error(err);
      }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 5000);
    return () => clearInterval(interval);
  }, []);

  const getTooltipText = () => {
    if (health === null) return "Checking Veltyr API...";
    return health ? "Veltyr API is OK!" : "Veltyr API is Down...";
  };

  return (
    <div
      className="fixed z-[9999] bottom-[16px] left-[16px] text-primary text-lg flex items-center transition-one border border-first-hover rounded-full bg-background p-2"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Icône */}
      {health ? (
        <AiFillThunderbolt className="text-green-500" />
      ) : (
        <BsFillCloudLightningRainFill className="text-red-500" />
      )}

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute top-1/2 left-[40px] transform -translate-y-1/2 px-3 py-1 bg-background border border-primary text-primary text-sm rounded shadow-lg whitespace-nowrap transition-one">
          {getTooltipText()}
        </div>
      )}
    </div>
  );
}
