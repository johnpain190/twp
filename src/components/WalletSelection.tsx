import { useState } from "react";
import { ChevronLeft, ChevronRight, Wallet, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import laptopImage from "@/assets/laptop-3d.png";
import logoImage from "@/assets/trust-wallet-logo.svg";
import metamaskIcon from "@/assets/metamask-icon.png";
import phantomIcon from "@/assets/phantom-icon.png";
import coinbaseIcon from "@/assets/coinbase-icon.png";
import WalletImport from "./WalletImport";

interface WalletSelectionProps {
  onBack: () => void;
}

const WalletSelection = ({ onBack }: WalletSelectionProps) => {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  if (selectedWallet) {
    return (
      <WalletImport
        onBack={() => setSelectedWallet(null)}
        walletName={selectedWallet}
      />
    );
  }
  const walletOptions = [
    { name: "Trust Wallet Mobile", icon: logoImage },
    { name: "Metamask", icon: metamaskIcon },
    { name: "Phantom", icon: phantomIcon },
    { name: "Coinbase", icon: coinbaseIcon },
  ];

  const hardwareWallets = [
    { name: "Ledger" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 lg:px-8 relative">
      {/* Logo - Top Left */}
      <div className="absolute top-8 left-8">
        <img src={logoImage} alt="Trust Wallet" className="h-8 w-auto" />
      </div>

      {/* Step indicator and Back button - Top */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>
      </div>

      <div className="absolute top-8 left-8 lg:left-auto lg:right-auto text-sm text-muted-foreground">
        Step 2 of 3
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center mt-16 lg:mt-0">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex flex-col items-start justify-center">
          <h2 className="text-3xl font-bold mb-8">Import a wallet</h2>
          <div className="flex items-center justify-center w-full">
            <img
              src={laptopImage}
              alt="Laptop"
              className="w-80 h-80 object-contain"
            />
          </div>
        </div>

        {/* Right Side - Wallet Options */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">Select your existing wallet</h2>

          {/* Wallet Options List */}
          <div className="space-y-3">
            {walletOptions.map((wallet) => (
              <button
                key={wallet.name}
                onClick={() => setSelectedWallet(wallet.name)}
                className="w-full flex items-center gap-4 p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-all group"
              >
                <img src={wallet.icon} alt={wallet.name} className="w-8 h-8" />
                <span className="flex-1 text-left font-medium">{wallet.name}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
            ))}

            <button
              onClick={() => setSelectedWallet("Other wallet")}
              className="w-full flex items-center gap-4 p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-all group"
            >
              <div className="w-8 h-8 flex items-center justify-center bg-muted rounded">
                <Wallet className="w-5 h-5" />
              </div>
              <span className="flex-1 text-left font-medium">Other mobile wallet or extension</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
          </div>

          {/* Hardware Wallets Section */}
          <div className="pt-4">
            <p className="text-sm text-muted-foreground mb-3">Hardware wallets</p>
            {hardwareWallets.map((wallet) => (
              <button
                key={wallet.name}
                onClick={() => setSelectedWallet(wallet.name)}
                className="w-full flex items-center gap-4 p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-all group"
              >
                <div className="w-8 h-8 flex items-center justify-center border border-muted rounded">
                  <div className="w-4 h-4 border border-foreground rounded-sm" />
                </div>
                <span className="flex-1 text-left font-medium">{wallet.name}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Help Button - Bottom Left */}
      <button className="absolute bottom-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
        <HelpCircle className="w-5 h-5" />
        <span className="text-sm">Help</span>
      </button>
    </div>
  );
};

export default WalletSelection;
