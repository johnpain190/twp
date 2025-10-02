import { Button } from "@/components/ui/button";
import logoImage from "@/assets/trust-wallet-logo.svg";

const SuccessScreen = () => {
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
            <svg
              viewBox="0 0 300 200"
              className="w-full max-w-sm"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Wallet illustration */}
              <defs>
                <linearGradient id="walletGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--primary) / 0.6)" />
                </linearGradient>
              </defs>
              
              {/* Floating elements */}
              <circle cx="160" cy="40" r="12" fill="hsl(var(--primary))" opacity="0.8" className="animate-float" />
              <circle cx="220" cy="60" r="8" fill="hsl(var(--primary))" opacity="0.6" className="animate-float" style={{ animationDelay: '0.5s' }} />
              <circle cx="180" cy="30" r="6" fill="hsl(var(--primary))" opacity="0.4" className="animate-float" style={{ animationDelay: '1s' }} />
              
              {/* Main wallet card */}
              <rect x="50" y="80" width="180" height="100" rx="12" fill="url(#walletGradient)" />
              <rect x="55" y="85" width="170" height="90" rx="10" fill="hsl(var(--background))" opacity="0.1" />
              
              {/* Shield icon on wallet */}
              <circle cx="140" cy="130" r="20" fill="hsl(var(--background))" opacity="0.2" />
              <path
                d="M140 115 L150 120 L150 135 C150 140 145 142 140 145 C135 142 130 140 130 135 L130 120 Z"
                fill="hsl(var(--primary-foreground))"
              />
            </svg>
          </div>
        </div>

        <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors self-start mt-auto">
          <span className="text-sm">Help</span>
        </button>
      </div>

      {/* Right Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-muted/30 flex-col items-center justify-center p-12">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-semibold mb-8">Start exploring</h2>
          
          {/* Feature card */}
          <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
            <div className="bg-muted rounded-xl h-48 flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-br from-muted to-background rounded-xl flex items-center justify-center">
                <div className="text-6xl">🔒</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">DID YOU KNOW</p>
              <h3 className="text-xl font-semibold">
                Extension<br />- in a Side Panel
              </h3>
              <p className="text-sm text-muted-foreground">
                Interact without losing context
              </p>
              <button className="text-primary text-sm font-medium hover:underline flex items-center gap-1 mt-2">
                Open Side Panel →
              </button>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-3">
            <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors">
              <span className="text-primary-foreground">←</span>
            </button>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="w-2 h-2 rounded-full bg-muted"></div>
            </div>
            <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors">
              <span className="text-primary-foreground">→</span>
            </button>
          </div>

          <Button variant="trust" size="xl" className="w-full mt-6">
            Open my wallet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
