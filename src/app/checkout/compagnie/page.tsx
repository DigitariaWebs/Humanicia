'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function CompagnieCheckout() {
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
      const response = await fetch("/api/checkout/compagnie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          priceId:
            process.env.NEXT_PUBLIC_STRIPE_COMPAGNIE_PRICE_ID ||
            "price_compagnie_demo",
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
            Forfait Compagnie
          </h1>
          <p className="text-[var(--color-cta)] text-lg font-semibold">
            $280<span className="text-sm font-normal">/mois</span>
          </p>
          <p className="text-[var(--color-muted)] text-sm mt-2">
            Pour briser la solitude de façon continue et bâtir une vraie
            relation.
          </p>
          <div className="inline-block bg-[var(--color-cta)] text-white px-3 py-1 rounded-full text-xs font-semibold mt-2">
            Le plus populaire
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[var(--color-border)]">
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-[var(--color-text)] mb-4">
                Vous allez être redirigé vers Stripe pour finaliser votre
                paiement en toute sécurité.
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
                  "Procéder au paiement - $280/mois"
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
