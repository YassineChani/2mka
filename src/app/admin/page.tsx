'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  ImageIcon,
  Plus,
  Trash2,
  Edit,
  Mail,
  Eye,
  EyeOff,
  LogOut,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { PortfolioItem, ContactSubmission } from '@/types';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'messages'>('portfolio');
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [messages, setMessages] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [portfolioRes, messagesRes] = await Promise.all([
        fetch('/api/admin/portfolio').then((r) => r.json()),
        fetch('/api/admin/messages').then((r) => r.json()),
      ]);

      if (portfolioRes.items) setPortfolioItems(portfolioRes.items);
      if (messagesRes.messages) setMessages(messagesRes.messages);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = async () => {
    await fetch('/api/admin-logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  const handleDeletePortfolio = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/portfolio?id=${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setPortfolioItems((prev) => prev.filter((p) => p.id !== id));
        setDeleteConfirm(null);
        showNotification('success', 'Photo supprimée avec succès !');
      } else {
        showNotification('error', data.error || 'Erreur lors de la suppression.');
      }
    } catch {
      showNotification('error', 'Erreur de connexion.');
    }
  };

  const handleToggleRead = async (id: string, currentRead: boolean) => {
    try {
      const res = await fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_read: !currentRead }),
      });
      if (res.ok) {
        setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, is_read: !currentRead } : m)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        showNotification('success', 'Message supprimé avec succès.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (editingItem) {
      formData.append('id', editingItem.id);
      formData.append('existing_image_url', editingItem.image_url);
    }

    try {
      const res = await fetch('/api/admin/portfolio', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        showNotification('error', data.error || 'Erreur lors de l’enregistrement.');
        setUploading(false);
        return;
      }

      showNotification('success', editingItem ? 'Photo modifiée avec succès !' : 'Photo ajoutée au portfolio avec succès !');
      setShowForm(false);
      setEditingItem(null);
      fetchData();
    } catch (err) {
      console.error('Error submitting portfolio item:', err);
      showNotification('error', 'Une erreur est survenue lors de l’envoi.');
    } finally {
      setUploading(false);
    }
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="min-h-screen bg-dark">
      {/* Admin Header */}
      <div className="bg-dark-card border-b border-dark-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold text-sm">2M</span>
              </div>
              <span className="font-semibold text-text text-lg">Administration 2MKA</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-text-muted hover:text-red-400 transition-colors text-sm px-3 py-1.5 rounded-lg hover:bg-red-500/10 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      {/* Floating Notification */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 animate-bounce">
          <div
            className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl border ${
              notification.type === 'success'
                ? 'bg-green-950/90 text-green-300 border-green-700/50 backdrop-blur-md'
                : 'bg-red-950/90 text-red-300 border-red-700/50 backdrop-blur-md'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all cursor-pointer ${
              activeTab === 'portfolio'
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'bg-dark-card text-text-muted hover:text-text hover:bg-dark-lighter'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Catalogue Réalisations
            <span className="ml-1 text-xs bg-black/30 px-2 py-0.5 rounded-full">
              {portfolioItems.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all relative cursor-pointer ${
              activeTab === 'messages'
                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                : 'bg-dark-card text-text-muted hover:text-text hover:bg-dark-lighter'
            }`}
          >
            <Mail className="w-4 h-4" />
            Demandes Clients
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold animate-pulse">
                {unreadCount} nouveau{unreadCount > 1 ? 'x' : ''}
              </span>
            )}
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="w-10 h-10 animate-spin text-primary mb-3" />
            <p className="text-text-muted text-sm">Chargement des données...</p>
          </div>
        ) : activeTab === 'portfolio' ? (
          /* Portfolio Tab */
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-text">Catalogue Photos</h2>
                <p className="text-sm text-text-muted mt-1">
                  Les photos ajoutées ici s&apos;affichent immédiatement sur la page Réalisations du site.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setShowForm(true);
                }}
                className="btn-primary flex items-center gap-2 text-sm shadow-lg shadow-primary/20"
              >
                <Plus className="w-4 h-4" />
                Ajouter une photo
              </button>
            </div>

            {/* Upload/Edit Modal */}
            {showForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                  className="absolute inset-0 bg-black/75 backdrop-blur-sm"
                  onClick={() => {
                    setShowForm(false);
                    setEditingItem(null);
                  }}
                />
                <div className="relative glass-card p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto border border-primary/30">
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingItem(null);
                    }}
                    className="absolute top-4 right-4 text-text-muted hover:text-text p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <h3 className="text-xl font-bold mb-6 text-text flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    {editingItem ? 'Modifier la réalisation' : 'Ajouter une réalisation'}
                  </h3>

                  <form onSubmit={handleUploadSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text mb-1">
                        Titre du projet *
                      </label>
                      <input
                        name="title"
                        type="text"
                        className="form-input"
                        placeholder="Ex: Installation Tableau Électrique"
                        defaultValue={editingItem?.title || ''}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text mb-1">
                        Catégorie
                      </label>
                      <input
                        name="category"
                        type="text"
                        className="form-input"
                        placeholder="Ex: Rénovation, Tableau électrique, Éclairage..."
                        defaultValue={editingItem?.category || ''}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        className="form-input min-h-[90px]"
                        placeholder="Courte description des travaux réalisés..."
                        defaultValue={editingItem?.description || ''}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text mb-1">
                        Photo {editingItem ? '(optionnel si inchangée)' : '*'}
                      </label>
                      <input
                        name="image"
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/jpg"
                        className="form-input file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-primary/20 file:text-primary file:font-medium file:cursor-pointer"
                        required={!editingItem}
                      />
                      <p className="text-xs text-text-muted mt-1">JPEG, PNG ou WebP. Max 10 Mo.</p>
                    </div>

                    {editingItem?.image_url && (
                      <div className="mt-2">
                        <p className="text-xs text-text-muted mb-1">Photo actuelle :</p>
                        <img
                          src={editingItem.image_url}
                          alt={editingItem.title}
                          className="w-24 h-16 object-cover rounded-lg border border-dark-border"
                        />
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={uploading}
                        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {uploading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Enregistrement en cours...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            {editingItem ? 'Mettre à jour' : 'Publier la photo'}
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Portfolio Grid */}
            {portfolioItems.length === 0 ? (
              <div className="glass-card p-12 text-center">
                <ImageIcon className="w-14 h-14 text-text-muted mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold text-text mb-1">Aucune photo dans le portfolio</h3>
                <p className="text-text-muted text-sm mb-6">
                  Commencez dès maintenant par ajouter vos photos de chantier.
                </p>
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setShowForm(true);
                  }}
                  className="btn-primary inline-flex items-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter ma première photo
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioItems.map((item) => (
                  <div key={item.id} className="glass-card overflow-hidden group flex flex-col">
                    <div className="relative aspect-[4/3] bg-dark-lighter overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Action buttons */}
                      <div className="absolute top-3 right-3 flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingItem(item);
                            setShowForm(true);
                          }}
                          className="w-9 h-9 rounded-lg bg-dark-card/90 backdrop-blur-sm border border-white/10 flex items-center justify-center text-text hover:text-primary transition"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(item.id)}
                          className="w-9 h-9 rounded-lg bg-dark-card/90 backdrop-blur-sm border border-white/10 flex items-center justify-center text-text hover:text-red-400 transition"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {item.category && (
                          <span className="text-xs text-primary font-medium uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded">
                            {item.category}
                          </span>
                        )}
                        <h3 className="text-base font-semibold text-text mt-2">{item.title}</h3>
                        {item.description && (
                          <p className="text-sm text-text-muted mt-1 line-clamp-2">{item.description}</p>
                        )}
                      </div>
                    </div>

                    {/* Delete Confirmation */}
                    {deleteConfirm === item.id && (
                      <div className="p-4 bg-red-950/40 border-t border-red-500/30">
                        <p className="text-xs text-red-300 mb-2 font-medium">Confirmer la suppression ?</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDeletePortfolio(item.id)}
                            className="flex-1 bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-500 transition"
                          >
                            Oui, supprimer
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="flex-1 bg-dark-lighter text-text px-3 py-1.5 rounded-lg text-xs hover:bg-dark-border transition"
                          >
                            Annuler
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Messages Tab */
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-text">Messages des Clients</h2>
                <p className="text-sm text-text-muted mt-1">
                  Tous les formulaires soumis par les clients depuis la page Contact.
                </p>
              </div>
            </div>

            {messages.length === 0 ? (
              <div className="glass-card p-12 text-center">
                <Mail className="w-14 h-14 text-text-muted mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold text-text mb-1">Aucun message pour le moment</h3>
                <p className="text-text-muted text-sm">
                  Les demandes envoyées via le formulaire de contact apparaîtront ici automatiquement.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`glass-card p-6 transition-all ${
                      !msg.is_read ? 'border-l-4 border-l-primary bg-primary/5' : ''
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="font-bold text-text text-lg">{msg.name}</span>
                          {!msg.is_read ? (
                            <span className="text-xs bg-primary text-white px-2.5 py-0.5 rounded-full font-semibold">
                              Nouveau
                            </span>
                          ) : (
                            <span className="text-xs bg-white/10 text-text-muted px-2 py-0.5 rounded-full">
                              Lu
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-text-muted mb-4 flex-wrap">
                          <a
                            href={`mailto:${msg.email}`}
                            className="text-primary hover:underline flex items-center gap-1"
                          >
                            ✉️ {msg.email}
                          </a>
                          {msg.phone && (
                            <a
                              href={`tel:${msg.phone}`}
                              className="text-text-muted hover:text-text flex items-center gap-1"
                            >
                              📞 {msg.phone}
                            </a>
                          )}
                          <span className="text-xs text-text-muted">
                            📅 {new Date(msg.created_at).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>

                        <div className="bg-dark/60 p-4 rounded-xl border border-dark-border">
                          <p className="text-text leading-relaxed whitespace-pre-wrap text-sm">
                            {msg.message}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center sm:flex-col gap-2 shrink-0">
                        <button
                          onClick={() => handleToggleRead(msg.id, msg.is_read)}
                          className="p-2.5 rounded-lg bg-dark-lighter hover:bg-dark-border text-text-muted hover:text-primary transition"
                          title={msg.is_read ? 'Marquer comme non lu' : 'Marquer comme lu'}
                        >
                          {msg.is_read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="p-2.5 rounded-lg bg-dark-lighter hover:bg-red-500/20 text-text-muted hover:text-red-400 transition"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
