import { useState } from "react";
import { ChevronLeft, X, QrCode, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import logoImage from "@/assets/trust-wallet-logo.png";
import mobileScreenshot from "@/assets/mobile-wallet-screenshot.png";

interface WalletImportProps {
  onBack: () => void;
  walletName?: string;
}

const WalletImport = ({ onBack, walletName = "Trust Wallet" }: WalletImportProps) => {
  const [name, setName] = useState("Main wallet");
  const [secretPhrase, setSecretPhrase] = useState("");
  const [activeTab, setActiveTab] = useState<"mobile" | "extension">("mobile");

  const handleImport = () => {
    // Handle wallet import logic
    console.log("Importing wallet with name:", name);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 lg:px-8 relative">
      {/* Logo - Top Left */}
      <div className="absolute top-8 left-8 flex items-center gap-3">
        <img src={logoImage} alt="Trust Wallet" className="w-8 h-8" />
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold text-primary">TRUST</span>
          <span className="text-xl font-light text-foreground">WALLET</span>
        </div>
      </div>

      {/* Step indicator and Back button */}
      <div className="absolute top-8 right-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </button>
      </div>

      <div className="absolute top-8 left-8 lg:left-auto lg:right-auto text-sm text-muted-foreground">
        Step 3 of 3
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-start mt-16 lg:mt-0">
        {/* Left Side - Instructions */}
        <div className="hidden lg:flex flex-col">
          <h2 className="text-3xl font-bold mb-8">Import a wallet</h2>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold">
              Locate your Secret Phrase on Trust Wallet
            </h3>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-border">
              <button
                onClick={() => setActiveTab("mobile")}
                className={`pb-2 font-medium transition-colors ${
                  activeTab === "mobile"
                    ? "text-foreground border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Mobile
              </button>
              <button
                onClick={() => setActiveTab("extension")}
                className={`pb-2 font-medium transition-colors ${
                  activeTab === "extension"
                    ? "text-foreground border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Extension
              </button>
            </div>

            {/* Mobile Instructions */}
            {activeTab === "mobile" && (
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-lg p-6 max-w-sm">
                  <img
                    src={mobileScreenshot}
                    alt="Trust Wallet Mobile"
                    className="w-full h-auto rounded"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-foreground">
                    1. On your <span className="font-semibold">Trust Wallet</span> mobile app Homepage
                  </p>
                  <p className="text-sm text-foreground">
                    click on your <span className="font-semibold">Wallet</span>
                  </p>
                </div>

                {/* Navigation Dots */}
                <div className="flex items-center gap-4">
                  <button className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors">
                    <ChevronLeft className="w-5 h-5 text-primary" />
                  </button>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-muted" />
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <div className="w-2 h-2 rounded-full bg-muted" />
                  </div>
                  <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors">
                    <ChevronLeft className="w-5 h-5 text-primary-foreground rotate-180" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Import Form */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Import with Secret Phrase or Private Key
            </h2>
            <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm">
              <QrCode className="w-4 h-4" />
              <span>Import with QR Code</span>
            </button>
          </div>

          {/* Wallet Name Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Wallet Name
            </label>
            <div className="relative">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pr-10 bg-secondary border-border"
                placeholder="Main wallet"
              />
              {name && (
                <button
                  onClick={() => setName("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">You can edit this later</p>
          </div>

          {/* Secret Phrase Textarea */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Enter Secret Phrase or Private Key
            </label>
            <Textarea
              value={secretPhrase}
              onChange={(e) => setSecretPhrase(e.target.value)}
              className="min-h-[200px] bg-secondary border-border resize-none"
              placeholder=""
            />
            <p className="text-xs text-muted-foreground">
              Secret Phrase is typically 12 (sometimes 18, 24) words separated by single spaces
              <br />
              Private Key is a long alphanumeric code
            </p>
          </div>

          {/* Import Button */}
          <Button
            variant="trust"
            size="xl"
            className="w-full"
            onClick={handleImport}
            disabled={!secretPhrase.trim()}
          >
            Import
          </Button>
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

export default WalletImport;
