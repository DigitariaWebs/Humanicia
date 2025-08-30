'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CompagnieCheckout() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: ''
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }

    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2').slice(0, 5);
    }

    // Format CVV
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      // Mock successful payment
      const sessionId = `mock_session_${Date.now()}`;
      router.push(`/checkout/success?session_id=${sessionId}`);
    }, 2000);
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
            Pour briser la solitude de façon continue et bâtir une vraie relation.
          </p>
          <div className="inline-block bg-[var(--color-cta)] text-white px-3 py-1 rounded-full text-xs font-semibold mt-2">
            Le plus populaire
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border border-[var(--color-border)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Nom complet
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Numéro de carte
              </label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  Date d&apos;expiration
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent"
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent"
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--color-brand)] text-white py-3 px-6 rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Traitement du paiement...
                  </div>
                ) : (
                  'Payer $280/mois'
                )}
              </button>

              <button
                type="button"
                onClick={() => router.push('/checkout/cancel')}
                disabled={loading}
                className="w-full border border-[var(--color-border)] text-[var(--color-text)] py-2 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Annuler
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-[var(--color-muted)]">
              🔒 Paiement sécurisé • Mode démonstration
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
