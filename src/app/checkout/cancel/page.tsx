import Link from 'next/link';

export default function CheckoutCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
      <div className="max-w-md mx-auto text-center p-8">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-cinzel font-bold text-[var(--color-brand)] mb-4">
          Paiement annulé
        </h1>

        <p className="text-[var(--color-cta)] mb-6">
          Aucun problème ! Vous pouvez réessayer quand vous voulez ou choisir un autre forfait.
        </p>

        <div className="space-y-3">
          <Link
            href="/#pricing"
            className="block w-full bg-[var(--color-brand)] text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
          >
            Retour aux tarifs
          </Link>

          <Link
            href="/"
            className="block w-full border border-[var(--color-brand)] text-[var(--color-brand)] py-3 px-6 rounded-lg font-semibold hover:bg-[var(--color-brand)] hover:text-white transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
