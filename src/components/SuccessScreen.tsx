import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import logoImage from "@/assets/trust-wallet-logo.svg";
import successIllustration from "@/assets/success-illustration.svg";
import trustWalletIcon from "@/assets/trust-wallet-logo.png";

const SuccessScreen = () => {
  const [currentCard, setCurrentCard] = useState(0);

  const cards = [
    {
      tag: "DID YOU KNOW",
      title: "Extension\n- in a Side Panel",
      description: "Interact without losing context",
      action: "Open Side Panel →",
      visual: "phone"
    },
    {
      tag: "KEEP IT HANDY",
      title: "Pin us to your\nToolbar",
      description: "Access it instantly in one click",
      action: "It's pinned 🎉",
      visual: "pin"
    }
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-12">
        <img src={logoImage} alt="Trust Wallet" className="h-8 mb-auto" />
        
        <div className="flex-1 flex flex-col justify-center max-w-md">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Brilliant,<br />your wallet is ready!
          </h1>
          
          <div className="mt-8">
            <img 
              src={successIllustration} 
              alt="Success" 
              className="w-full max-w-md animate-fade-in"
            />
          </div>
        </div>

        <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors self-start mt-auto">
          <span className="text-sm">Help</span>
        </button>
      </div>

      {/* Right Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-muted/30 flex-col items-center justify-center p-12">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-semibold mb-8 text-white">Start exploring</h2>
          
          {/* Feature card */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            {/* Visual Section */}
            <div className="bg-gradient-to-br from-muted/80 to-muted rounded-t-2xl p-8 h-64 flex items-center justify-center">
              {cards[currentCard].visual === "phone" ? (
                <div className="relative w-full h-full max-w-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-card/50 to-card rounded-xl border border-border/50 flex items-center justify-center p-4">
                    <div className="w-32 h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl border border-primary/30 shadow-lg"></div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full max-w-sm flex items-center justify-center">
                  <div className="bg-card/80 rounded-2xl p-6 border border-border flex items-center gap-4 backdrop-blur-sm">
                    <img src={trustWalletIcon} alt="Trust Wallet" className="w-12 h-12" />
                    <div className="text-white">
                      <h4 className="font-semibold">Pin Trust Wallet</h4>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        Click on extension <span className="text-lg">🧩</span> then pin it <span className="text-lg">📌</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Content Section */}
            <div className="p-6 space-y-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                {cards[currentCard].tag}
              </p>
              <h3 className="text-xl font-semibold whitespace-pre-line">
                {cards[currentCard].title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {cards[currentCard].description}
              </p>
              <button className="text-primary text-sm font-medium hover:underline flex items-center gap-1 mt-2">
                {cards[currentCard].action}
              </button>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-3">
            <button 
              onClick={() => setCurrentCard(Math.max(0, currentCard - 1))}
              disabled={currentCard === 0}
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5 text-primary-foreground" />
            </button>
            <div className="flex gap-2">
              {cards.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentCard ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
            <button 
              onClick={() => setCurrentCard(Math.min(cards.length - 1, currentCard + 1))}
              disabled={currentCard === cards.length - 1}
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>

          <Button 
            variant="trust" 
            size="xl" 
            className="w-full mt-6"
            onClick={() => window.location.href = 'https://example.com/wallet'}
          >
            Open my wallet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
