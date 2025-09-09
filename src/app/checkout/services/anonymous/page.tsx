'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function AnonymousServiceCheckout() {
  const [loading, setLoading] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<'30' | '60'>('30');
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/?auth=required");
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-brand)]"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  const prices = {
    '30': { label: '30 minutes' },
    '60': { label: '1 heure' }
  };

  const handleCheckout = async () => {
    if (!user) return;

    setLoading(true);

    try {
      const response = await fetch("/api/checkout/services/anonymous", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          duration: selectedDuration,
        }),
      });

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setLoading(false);
      // Handle error - could show a toast or error message
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-cinzel font-bold text-[var(--color-brand)] mb-2">
            Appels anonymes
          </h1>
          <p className="text-[var(--color-muted)] text-sm mt-2">
            Parle librement, en toute discrétion.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[var(--color-border)]">
          <div className="space-y-4">
            {/* Duration Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-[var(--color-text)] mb-3">
                Choisissez la durée :
              </h3>
              
              <div className="space-y-2">
                <label className="flex items-center space-x-3 p-3 border border-[var(--color-border)] rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="duration"
                    value="30"
                    checked={selectedDuration === '30'}
                    onChange={(e) => setSelectedDuration(e.target.value as '30' | '60')}
                    className="text-[var(--color-brand)]"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-[var(--color-text)]">30 minutes</span>
                      <span className="text-[var(--color-cta)] font-semibold">20$</span>
                    </div>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-3 border border-[var(--color-border)] rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="duration"
                    value="60"
                    checked={selectedDuration === '60'}
                    onChange={(e) => setSelectedDuration(e.target.value as '30' | '60')}
                    className="text-[var(--color-brand)]"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-[var(--color-text)]">1 heure</span>
                      <span className="text-[var(--color-cta)] font-semibold">35$</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="pt-4 border-t border-[var(--color-border)]">
              <p className="text-[var(--color-text)] mb-4 text-center">
                Choisissez votre méthode de paiement :
              </p>

              {/* Interac e-transfer option */}
              <div className="border border-[var(--color-border)] rounded-lg p-4 bg-gray-50 mb-4">
                <h3 className="font-semibold text-[var(--color-text)] mb-2">
                  Virement Interac e-transfer
                </h3>
                <p className="text-sm text-[var(--color-muted)] mb-3">
                  Envoyez votre paiement directement à Éric Thomas via Interac e-transfer.
                </p>
                <div className="bg-white rounded p-3 border">
                  <p className="text-sm font-medium text-[var(--color-text)]">
                    Adresse email : <span className="font-mono">humanicia@gmail.com</span>
                  </p>
                  <p className="text-xs text-[var(--color-muted)] mt-1">
                    Veuillez inclure votre nom et &quot;Appels anonymes - {prices[selectedDuration].label}&quot; dans la note.
                  </p>
                </div>
              </div>

              <div className="text-center mb-4">
                <p className="text-[var(--color-text)]">
                  Ou payez en ligne avec Stripe :
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-[var(--color-brand)] text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Redirection vers Stripe...
                    </div>
                  ) : (
                    `Procéder au paiement - ${prices[selectedDuration].label}`
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/checkout/cancel")}
                  disabled={loading}
                  className="w-full border border-[var(--color-border)] text-[var(--color-text)] py-2 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-[var(--color-muted)]">
              🔒 Paiement sécurisé par Stripe
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => router.back()}
            className="text-[var(--color-brand)] hover:underline text-sm"
          >
            ← Retour
          </button>
        </div>
      </div>
    </div>
  );
}
