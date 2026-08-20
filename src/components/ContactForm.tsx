'use client';

import { useState } from 'react';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Veuillez entrer une adresse email valide.');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Une erreur est survenue.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Une erreur est survenue.');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-xl font-semibold text-text mb-2">Message envoyé !</h3>
        <p className="text-text-muted">Merci pour votre message. Nous vous répondrons dans les plus brefs délais.</p>
        <button
          onClick={() => setStatus('idle')}
          className="btn-secondary mt-6"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-text mb-2">
          Nom complet <span className="text-primary">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          className="form-input"
          placeholder="Votre nom"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          maxLength={100}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-text mb-2">
          Email <span className="text-primary">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          className="form-input"
          placeholder="votre@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          maxLength={254}
        />
      </div>

      <div>
        <label htmlFor="contact-phone" className="block text-sm font-medium text-text mb-2">
          Téléphone
        </label>
        <input
          id="contact-phone"
          type="tel"
          className="form-input"
          placeholder="+33 6 XX XX XX XX"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          maxLength={20}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-text mb-2">
          Message <span className="text-primary">*</span>
        </label>
        <textarea
          id="contact-message"
          className="form-input min-h-[150px] resize-y"
          placeholder="Décrivez votre projet ou votre demande..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          maxLength={2000}
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Envoi en cours...</>
        ) : (
          <><Send className="w-5 h-5" /> Envoyer le message</>
        )}
      </button>
    </form>
  );
}
