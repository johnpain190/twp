import { useState, useMemo } from "react";
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
import importIllustration from "@/assets/import-illustration.svg";

// Trust Wallet GIFs
import trustWallet1 from "@/assets/trust-wallet-1.gif";
import trustWallet2 from "@/assets/trust-wallet-2.gif";
import trustWallet3 from "@/assets/trust-wallet-3.gif";

// Metamask GIFs
import metamask1 from "@/assets/metamask-mobile-1.gif";
import metamask2 from "@/assets/metamask-mobile-2.gif";
import metamask3 from "@/assets/metamask-mobile-3.gif";

// Phantom GIFs
import phantom1 from "@/assets/phantom-mobile-1.gif";
import phantom2 from "@/assets/phantom-mobile-2.gif";
import phantom3 from "@/assets/phantom-mobile-3.gif";

// Coinbase GIFs
import coinbase1 from "@/assets/coinbase-mobile-1.gif";
import coinbase2 from "@/assets/coinbase-mobile-2.gif";
import coinbase3 from "@/assets/coinbase-mobile-3.gif";

// Generic Wallet GIFs
import generic1 from "@/assets/generic-wallet-1.gif";
import generic2 from "@/assets/generic-wallet-2.gif";
import generic3 from "@/assets/generic-wallet-3.gif";

// Ledger Static Image
import ledgerIllustration from "@/assets/ledger-illustration.svg";

interface WalletImportProps {
  onBack: () => void;
  walletName?: string;
}

const WalletImport = ({ onBack, walletName = "Trust Wallet" }: WalletImportProps) => {
  const [phraseType, setPhraseType] = useState<"12" | "18" | "21" | "24" | "private">("12");
  const [words, setWords] = useState<string[]>(Array(12).fill(""));
  const [showWords, setShowWords] = useState<boolean[]>(Array(12).fill(false));
  const [currentStep, setCurrentStep] = useState(0);

  // Get wallet-specific tutorial data
  const walletTutorial = useMemo(() => {
    const normalizedName = walletName.toLowerCase();
    
    if (normalizedName.includes("trust")) {
      return {
        name: "Trust Wallet",
        steps: [
          {
            image: trustWallet1,
            text: "1. On your Trust Wallet mobile app Homepage click on your Wallet"
          },
          {
            image: trustWallet2,
            text: "2. Click on the settings icon next to your wallet name"
          },
          {
            image: trustWallet3,
            text: "3. Select 'Back up manually' to view your Secret Recovery Phrase"
          }
        ]
      };
    } else if (normalizedName.includes("metamask")) {
      return {
        name: "Metamask",
        steps: [
          {
            image: metamask1,
            text: "1. Open Metamask mobile app and go to Settings"
          },
          {
            image: metamask2,
            text: "2. Navigate to Security & Privacy section"
          },
          {
            image: metamask3,
            text: "3. Tap 'Reveal Secret Recovery Phrase' to view your phrase"
          }
        ]
      };
    } else if (normalizedName.includes("phantom")) {
      return {
        name: "Phantom",
        steps: [
          {
            image: phantom1,
            text: "1. Open Phantom mobile app and tap your profile"
          },
          {
            image: phantom2,
            text: "2. Go to Settings and select your account"
          },
          {
            image: phantom3,
            text: "3. Tap 'Show Recovery Phrase' in Security & Privacy"
          }
        ]
      };
    } else if (normalizedName.includes("coinbase")) {
      return {
        name: "Coinbase",
        steps: [
          {
            image: coinbase1,
            text: "1. Open Coinbase Wallet mobile app and tap Settings"
          },
          {
            image: coinbase2,
            text: "2. Select your wallet from the list"
          },
          {
            image: coinbase3,
            text: "3. Navigate to 'Add & manage wallets' to access your recovery phrase"
          }
        ]
      };
    } else if (normalizedName.includes("ledger")) {
      return {
        name: "Ledger",
        steps: [
          {
            image: ledgerIllustration,
            text: "Connect your Ledger device to your computer and enter your PIN"
          }
        ],
        isStatic: true
      };
    } else if (normalizedName.includes("other")) {
      return {
        name: "Generic Wallet",
        steps: [
          {
            image: generic1,
            text: "1. Open your wallet application"
          },
          {
            image: generic2,
            text: "2. Navigate to Settings and select your account"
          },
          {
            image: generic3,
            text: "3. Find 'Security & Privacy' to reveal your Secret Phrase"
          }
        ]
      };
    }
    
    // Default/fallback for other wallets
    return {
      name: walletName,
      steps: [
        {
          image: importIllustration,
          text: "1. Open your wallet application"
        },
        {
          image: importIllustration,
          text: "2. Navigate to Settings or Security"
        },
        {
          image: importIllustration,
          text: "3. Find and reveal your Secret Recovery Phrase"
        }
      ]
    };
  }, [walletName]);

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

  const handlePaste = (index: number, e: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <div className="min-h-screen flex relative">
      {/* Left Side - Grey Gradient with Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-muted/50 to-muted flex-col justify-between p-12 relative">
        {/* Logo - Top Left */}
        <div className="absolute top-8 left-8">
          <img src={logoImage} alt="Trust Wallet" className="h-8 w-auto" />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center space-y-6 max-w-md">
          <p className="text-sm text-muted-foreground">Step 3 of 3</p>
          <h2 className="text-3xl font-bold">Import a wallet</h2>
          
          {/* Tutorial Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Locate your Secret Phrase on {walletTutorial.name}
            </h3>
            
            {/* Mobile Tab */}
            <div className="flex gap-6 border-b border-border">
              <button className="pb-2 font-medium text-foreground border-b-2 border-primary">
                Mobile
              </button>
            </div>

            {/* Tutorial Step */}
            <div className="bg-card border border-border rounded-lg p-4 max-w-sm">
              <img
                src={walletTutorial.steps[currentStep].image}
                alt={`Step ${currentStep + 1}`}
                className="w-full h-auto rounded mb-4"
              />
            </div>
            
            <p className="text-sm text-foreground">
              {walletTutorial.steps[currentStep].text}
            </p>

            {/* Navigation - Only show for non-static tutorials */}
            {!walletTutorial.isStatic && walletTutorial.steps.length > 1 && (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5 text-primary" />
                </button>
                <div className="flex gap-2">
                  {walletTutorial.steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === currentStep ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentStep(Math.min(walletTutorial.steps.length - 1, currentStep + 1))}
                  disabled={currentStep === walletTutorial.steps.length - 1}
                  className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5 text-primary-foreground rotate-180" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Help Button - Bottom Left */}
        <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors self-start">
          <HelpCircle className="w-5 h-5" />
          <span className="text-sm">Help</span>
        </button>
      </div>

      {/* Right Side - Import Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 lg:px-12 relative">
        {/* Mobile Logo */}
        <div className="absolute top-8 left-8 lg:hidden">
          <img src={logoImage} alt="Trust Wallet" className="h-8 w-auto" />
        </div>

        <div className="w-full max-w-xl space-y-6 mt-16 lg:mt-0">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>
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
            {phraseType === "private" ? (
              <div className="relative">
                <textarea
                  value={words[0]}
                  onChange={(e) => handleWordChange(0, e.target.value)}
                  onPaste={(e) => handlePaste(0, e)}
                  className="w-full min-h-[120px] p-4 pr-12 bg-secondary border border-border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Enter your private key"
                  style={{ fontFamily: 'monospace' }}
                />
                <button
                  type="button"
                  onClick={() => toggleShowWord(0)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showWords[0] ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
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
                      placeholder=""
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
            )}
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
    </div>
  );
};

export default WalletImport;
