import { useState } from "react";
import { ChevronLeft, X, HelpCircle, Eye, EyeOff, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import logoImage from "@/assets/trust-wallet-logo.svg";
import mobileScreenshot from "@/assets/mobile-wallet-screenshot.png";

interface WalletImportProps {
  onBack: () => void;
  walletName?: string;
}

const WalletImport = ({ onBack, walletName = "Trust Wallet" }: WalletImportProps) => {
  const [phraseType, setPhraseType] = useState<"12" | "18" | "21" | "24" | "private">("12");
  const [words, setWords] = useState<string[]>(Array(12).fill(""));
  const [showWords, setShowWords] = useState<boolean[]>(Array(12).fill(false));
  const [activeTab, setActiveTab] = useState<"mobile" | "extension">("mobile");

  const phraseConfig = {
    "12": { count: 12, label: "I have a 12-word phrase" },
    "18": { count: 18, label: "I have an 18-word phrase" },
    "21": { count: 21, label: "I have a 21-word phrase" },
    "24": { count: 24, label: "I have a 24-word phrase" },
    "private": { count: 1, label: "I have a Private Key" },
  };

  const handlePhraseTypeChange = (value: typeof phraseType) => {
    setPhraseType(value);
    const count = phraseConfig[value].count;
    setWords(Array(count).fill(""));
    setShowWords(Array(count).fill(false));
  };

  const handleWordChange = (index: number, value: string) => {
    const newWords = [...words];
    newWords[index] = value;
    setWords(newWords);
  };

  const handlePaste = (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const pastedWords = pastedText.trim().split(/\s+/);
    
    if (phraseType === "private") {
      handleWordChange(0, pastedText.trim());
      return;
    }

    if (pastedWords.length > 1) {
      const newWords = [...words];
      pastedWords.forEach((word, i) => {
        if (index + i < newWords.length) {
          newWords[index + i] = word;
        }
      });
      setWords(newWords);
    } else {
      handleWordChange(index, pastedText);
    }
  };

  const toggleShowWord = (index: number) => {
    const newShowWords = [...showWords];
    newShowWords[index] = !newShowWords[index];
    setShowWords(newShowWords);
  };

  const handleImport = () => {
    console.log("Words:", words);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 lg:px-8 relative">
      {/* Logo - Top Left */}
      <div className="absolute top-8 left-8">
        <img src={logoImage} alt="Trust Wallet" className="h-8 w-auto" />
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
          <h2 className="text-2xl font-bold">
            Import with Secret Phrase or Private Key
          </h2>

          {/* Phrase Type Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Phrase Length
            </label>
            <Select value={phraseType} onValueChange={handlePhraseTypeChange}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">{phraseConfig["12"].label}</SelectItem>
                <SelectItem value="18">{phraseConfig["18"].label}</SelectItem>
                <SelectItem value="21">{phraseConfig["21"].label}</SelectItem>
                <SelectItem value="24">{phraseConfig["24"].label}</SelectItem>
                <SelectItem value="private">{phraseConfig["private"].label}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Info Box */}
          <div className="flex items-start gap-3 p-4 bg-primary/10 border-l-4 border-primary rounded">
            <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground">
              {phraseType === "private"
                ? "You can paste your entire Private Key into the field."
                : "You can paste your entire phrase into any input field."}
            </p>
          </div>

          {/* Word Inputs */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              {phraseType === "private" ? "Private Key" : "Secret Recovery Phrase"}
            </label>
            <div className={phraseType === "private" ? "" : "grid grid-cols-3 gap-3"}>
              {words.map((word, index) => (
                <div key={index} className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    {index + 1}.
                  </span>
                  <Input
                    type={showWords[index] ? "text" : "password"}
                    value={word}
                    onChange={(e) => handleWordChange(index, e.target.value)}
                    onPaste={(e) => handlePaste(index, e)}
                    className="pl-10 pr-10 bg-secondary border-border"
                    placeholder={phraseType === "private" ? "" : ""}
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowWord(index)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showWords[index] ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Import Button */}
          <Button
            variant="trust"
            size="xl"
            className="w-full"
            onClick={handleImport}
            disabled={words.some(w => !w.trim())}
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
