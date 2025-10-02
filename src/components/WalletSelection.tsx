import { useState } from "react";
import { ChevronLeft, ChevronRight, HelpCircle } from "lucide-react";
import logoImage from "@/assets/trust-wallet-logo.svg";
import importIllustration from "@/assets/import-illustration.svg";
import trustIcon from "@/assets/trust-icon.svg";
import metamaskIcon from "@/assets/metamask-icon.svg";
import phantomIcon from "@/assets/phantom-icon.svg";
import coinbaseIcon from "@/assets/coinbase-icon.svg";
import otherWalletIcon from "@/assets/other-wallet-icon.svg";
import ledgerIcon from "@/assets/ledger-icon.svg";
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
    { name: "Trust Wallet Mobile", icon: trustIcon },
    { name: "Metamask", icon: metamaskIcon },
    { name: "Phantom", icon: phantomIcon },
    { name: "Coinbase", icon: coinbaseIcon },
  ];

  const hardwareWallets = [
    { name: "Ledger", icon: ledgerIcon },
  ];

  return (
    <div className="min-h-screen flex relative">
      {/* Left Side - Grey Gradient with Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-muted/50 to-muted flex-col justify-between p-12 relative">
        {/* Logo - Top Left */}
        <div className="absolute top-8 left-8">
          <img src={logoImage} alt="Trust Wallet" width="150" height="32" className="h-8 w-auto" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center space-y-6">
          <p className="text-sm text-muted-foreground">Step 2 of 3</p>
          <h2 className="text-3xl font-bold">Import a wallet</h2>
          
          {/* Animated Illustration */}
          <div className="flex items-center justify-center pt-12">
            <img
              src={importIllustration}
              alt="Import wallet"
              loading="lazy"
              width="384"
              height="384"
              className="w-96 h-96 object-contain"
            />
          </div>
        </div>

        {/* Help Button - Bottom Left */}
        <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors self-start">
          <HelpCircle className="w-5 h-5" />
          <span className="text-sm">Help</span>
        </button>
      </div>

      {/* Right Side - Wallet Selection */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 lg:px-12 relative">
        {/* Mobile Logo */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 lg:hidden">
          <img src={logoImage} alt="Trust Wallet" width="150" height="32" className="h-8 w-auto" />
        </div>

        <div className="w-full max-w-xl space-y-6 mt-16 lg:mt-0">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>
          <h2 className="text-2xl font-bold mb-6">Select your existing wallet</h2>

          {/* Wallet Options List */}
          <div className="space-y-3">
            {walletOptions.map((wallet) => (
              <button
                key={wallet.name}
                onClick={() => setSelectedWallet(wallet.name)}
                className="w-full flex items-center gap-4 p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-all group"
              >
                <img src={wallet.icon} alt={wallet.name} width="32" height="32" className="w-8 h-8" />
                <span className="flex-1 text-left font-medium">{wallet.name}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
            ))}

            <button
              onClick={() => setSelectedWallet("Other wallet")}
              className="w-full flex items-center gap-4 p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-all group"
            >
              <img src={otherWalletIcon} alt="Other wallet" width="40" height="40" className="w-10 h-10" />
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
                <img src={wallet.icon} alt={wallet.name} width="40" height="40" className="w-10 h-10" />
                <span className="flex-1 text-left font-medium">{wallet.name}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletSelection;
