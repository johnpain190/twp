import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Smartphone, QrCode } from "lucide-react";
import heroAnimated from "@/assets/hero-animated.svg";
import logoImage from "@/assets/trust-wallet-logo.svg";
import WalletSelection from "./WalletSelection";

const TrustWalletHero = () => {
  const [agreed, setAgreed] = useState(false);
  const [showWalletSelection, setShowWalletSelection] = useState(false);

  if (showWalletSelection) {
    return <WalletSelection onBack={() => setShowWalletSelection(false)} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 lg:px-8 relative overflow-hidden">
      {/* 3D Graphics Left Side */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-full pointer-events-none hidden lg:block">
        <img
          src={heroAnimated}
          alt=""
          loading="eager"
          width="800"
          height="800"
          className="absolute left-[-10%] top-1/2 -translate-y-1/2 w-[800px] h-[800px] object-contain opacity-90 animate-float-pulse"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[500px] lg:ml-auto lg:mr-[10%]">
        {/* Logo */}
        <div className="flex items-center justify-center lg:justify-start mb-12">
          <img src={logoImage} alt="Trust Wallet" width="150" height="32" className="h-8 w-auto" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight text-center lg:text-left">
          Join 200M users in<br />
          securing their financial future
        </h1>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-3 mb-6">
          <Checkbox
            id="terms"
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked as boolean)}
            className="mt-1"
          />
          <label
            htmlFor="terms"
            className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
          >
            I have read and agree to the{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </label>
        </div>

        {/* Action Button */}
        <div className="mb-8">
          <Button
            variant="trust"
            size="xl"
            className="w-full"
            disabled={!agreed}
            onClick={() => setShowWalletSelection(true)}
          >
            Begin wallet recovery
          </Button>
        </div>

        {/* Mobile App Section */}
        <div className="text-center space-y-3 pt-6 border-t border-border/50">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>Have the Trust Wallet mobile app?</span>
            <Smartphone className="w-4 h-4" />
          </div>
          <button className="flex items-center justify-center gap-2 text-primary hover:text-primary/80 transition-colors mx-auto">
            <QrCode className="w-4 h-4" />
            <span className="text-sm font-medium">Scan QR to sync</span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default TrustWalletHero;
