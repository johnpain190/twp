import { Loader2 } from "lucide-react";
import logoImage from "@/assets/trust-wallet-logo.svg";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <img src={logoImage} alt="Trust Wallet" className="h-8 mb-12" />
      <Loader2 className="w-12 h-12 text-primary animate-spin" />
    </div>
  );
};

export default LoadingScreen;
