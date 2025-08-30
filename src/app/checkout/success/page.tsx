'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // In a real application, you might want to verify the session with Stripe
      // For now, we'll just show a success message
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
      <div className="max-w-md mx-auto text-center p-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-cinzel font-bold text-[var(--color-brand)] mb-4">
          Paiement réussi !
        </h1>

        <p className="text-[var(--color-cta)] mb-6">
          Merci pour votre confiance. Votre abonnement a été activé avec succès.
        </p>

        {sessionId && (
          <p className="text-sm text-gray-600 mb-6">
            Session ID: {sessionId}
          </p>
        )}

        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-[var(--color-brand)] text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            Retour à l&apos;accueil
          </Link>

          <Link
            href="/agent"
            className="block w-full border border-[var(--color-brand)] text-[var(--color-brand)] py-3 px-6 rounded-lg font-semibold hover:bg-[var(--color-brand)] hover:text-white transition-colors"
          >
            Rencontrer votre agent
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccess() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
