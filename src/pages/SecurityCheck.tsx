import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

// Toggle this to enable/disable Turnstile verification
const ENABLE_TURNSTILE = false;

declare global {
  interface Window {
    turnstile: {
      render: (element: string | HTMLElement, options: {
        sitekey: string;
        callback: (token: string) => void;
      }) => void;
    };
  }
}

const SecurityCheck = () => {
  const navigate = useNavigate();
  const turnstileRef = useRef<HTMLDivElement>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If Turnstile is disabled, go directly to the app
    if (!ENABLE_TURNSTILE) {
      navigate("/app");
      return;
    }
    const loadTurnstile = () => {
      if (window.turnstile && turnstileRef.current) {
        window.turnstile.render(turnstileRef.current, {
          sitekey: "1x00000000000000000000AA", // Dummy test site key
          callback: handleTurnstileCallback,
        });
      }
    };

    // Load Cloudflare Turnstile script
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    script.onload = loadTurnstile;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleTurnstileCallback = async (token: string) => {
    setIsVerifying(true);
    setError(null);

    try {
      const response = await fetch("https://api.profitsimulator.me/WALLET/verify-turnstile.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (data.success) {
        navigate("/app");
      } else {
        setError("Verification failed. Please try again.");
        setIsVerifying(false);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-3xl font-bold">Security Check</h1>
          <p className="mt-2 text-muted-foreground">
            Please complete the verification to continue
          </p>
        </div>

        <div className="bg-card p-8 rounded-lg border shadow-sm">
          {isVerifying ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Verifying...</p>
            </div>
          ) : (
            <div ref={turnstileRef} className="flex justify-center" />
          )}
          
          {error && (
            <p className="mt-4 text-sm text-destructive">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityCheck;
