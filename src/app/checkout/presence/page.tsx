'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function PresenceCheckout() {
  const [loading, setLoading] = useState(false);
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

  const handleCheckout = async () => {
    if (!user) return;

    setLoading(true);

    try {
      const response = await fetch("/api/checkout/presence", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          priceId:
            process.env.NEXT_PUBLIC_STRIPE_PRESENCE_PRICE_ID ||
            "price_presence_demo",
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
            Forfait Présence
          </h1>
          <p className="text-[var(--color-cta)] text-lg font-semibold">
            $360<span className="text-sm font-normal">/mois</span>
          </p>
          <p className="text-[var(--color-muted)] text-sm mt-2">
            L&apos;équilibre parfait entre la chaleur d&apos;une voix et la
            force d&apos;une présence réelle.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[var(--color-border)]">
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-[var(--color-text)] mb-4">
                Choisissez votre méthode de paiement :
              </p>
            </div>

            {/* Interac e-transfer option */}
            <div className="border border-[var(--color-border)] rounded-lg p-4 bg-gray-50">
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
                  Veuillez inclure votre nom et &quot;Forfait Présence&quot; dans la note.
                </p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-[var(--color-text)] mb-4">
                Ou payez en ligne avec Stripe :
              </p>
            </div>

            <div className="pt-4 space-y-3">
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
                  "Procéder au paiement - $360/mois"
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
