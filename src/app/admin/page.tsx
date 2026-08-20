'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { LogOut, Image as ImageIcon, Mail, Plus, Trash2, Edit, Loader2, Eye, EyeOff, X } from 'lucide-react';
import type { PortfolioItem, ContactSubmission } from '@/types';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'messages'>('portfolio');
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [messages, setMessages] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [portfolioRes, messagesRes] = await Promise.all([
        supabase.from('portfolio_items').select('*').order('display_order', { ascending: true }),
        supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
      ]);
      if (portfolioRes.data) setPortfolioItems(portfolioRes.data);
      if (messagesRes.data) setMessages(messagesRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = async () => {
    document.cookie = "admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    await supabase.auth.signOut();
    window.location.href = '/admin/login';
  };

  const handleDelete = async (id: string) => {
    const item = portfolioItems.find((p) => p.id === id);
    if (!item) return;

    // Delete image from storage if it's a Supabase URL
    if (item.image_url.includes('supabase')) {
      const path = item.image_url.split('/portfolio/')[1];
      if (path) {
        await supabase.storage.from('portfolio').remove([path]);
      }
    }

    await supabase.from('portfolio_items').delete().eq('id', id);
    setPortfolioItems((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirm(null);
  };

  const handleToggleRead = async (id: string, currentRead: boolean) => {
    await supabase.from('contact_submissions').update({ is_read: !currentRead }).eq('id', id);
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, is_read: !currentRead } : m));
  };

  const handleDeleteMessage = async (id: string) => {
    await supabase.from('contact_submissions').delete().eq('id', id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const handleUploadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const imageFile = formData.get('image') as File;

    try {
      let imageUrl = editingItem?.image_url || '';

      if (imageFile && imageFile.size > 0) {
        // Validate file
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(imageFile.type)) {
          alert('Type de fichier non autorisé. Utilisez JPEG, PNG ou WebP.');
          setUploading(false);
          return;
        }
        if (imageFile.size > 5 * 1024 * 1024) {
          alert('Le fichier est trop volumineux. Maximum 5 Mo.');
          setUploading(false);
          return;
        }

        const fileName = `${Date.now()}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
        const { error: uploadError } = await supabase.storage
          .from('portfolio')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage.from('portfolio').getPublicUrl(fileName);
        imageUrl = urlData.publicUrl;
      }

      if (editingItem) {
        // Update existing
        await supabase.from('portfolio_items').update({
          title,
          description: description || null,
          category: category || null,
          image_url: imageUrl,
        }).eq('id', editingItem.id);
      } else {
        // Insert new
        if (!imageUrl) {
          alert('Veuillez sélectionner une image.');
          setUploading(false);
          return;
        }
        await supabase.from('portfolio_items').insert({
          title,
          description: description || null,
          category: category || null,
          image_url: imageUrl,
          display_order: portfolioItems.length,
        });
      }

      setShowForm(false);
      setEditingItem(null);
      fetchData();
    } catch (err) {
      console.error('Error:', err);
      alert('Une erreur est survenue.');
    } finally {
      setUploading(false);
    }
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="min-h-screen bg-dark">
      {/* Admin Header */}
      <div className="bg-dark-card border-b border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold text-sm">2M</span>
              </div>
              <span className="font-semibold text-text">Administration 2MKA</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-text-muted hover:text-red-400 transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'portfolio' ? 'bg-primary text-white' : 'bg-dark-card text-text-muted hover:text-text'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Portfolio
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all relative ${
              activeTab === 'messages' ? 'bg-primary text-white' : 'bg-dark-card text-text-muted hover:text-text'
            }`}
          >
            <Mail className="w-4 h-4" />
            Messages
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : activeTab === 'portfolio' ? (
          /* Portfolio Tab */
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Portfolio</h2>
              <button
                onClick={() => { setEditingItem(null); setShowForm(true); }}
                className="btn-primary flex items-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" />
                Ajouter une photo
              </button>
            </div>

            {/* Upload/Edit Form Modal */}
            {showForm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setShowForm(false); setEditingItem(null); }} />
                <div className="relative glass-card p-8 w-full max-w-lg">
                  <button
                    onClick={() => { setShowForm(false); setEditingItem(null); }}
                    className="absolute top-4 right-4 text-text-muted hover:text-text"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <h3 className="text-xl font-bold mb-6">
                    {editingItem ? 'Modifier la photo' : 'Ajouter une photo'}
                  </h3>
                  <form onSubmit={handleUploadSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">Titre *</label>
                      <input
                        name="title"
                        type="text"
                        className="form-input"
                        placeholder="Titre de la réalisation"
                        defaultValue={editingItem?.title || ''}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">Description</label>
                      <textarea
                        name="description"
                        className="form-input min-h-[100px]"
                        placeholder="Description du projet"
                        defaultValue={editingItem?.description || ''}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">Catégorie</label>
                      <input
                        name="category"
                        type="text"
                        className="form-input"
                        placeholder="Ex: Tableau électrique, Rénovation..."
                        defaultValue={editingItem?.category || ''}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text mb-2">
                        Image {editingItem ? '(laisser vide pour garder l’actuelle)' : '*'}
                      </label>
                      <input
                        name="image"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="form-input file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-primary/20 file:text-primary file:font-medium file:cursor-pointer"
                      />
                      <p className="text-xs text-text-muted mt-1">JPEG, PNG ou WebP. Maximum 5 Mo.</p>
                    </div>
                    <button
                      type="submit"
                      disabled={uploading}
                      className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                      {uploading ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> Enregistrement...</>
                      ) : (
                        editingItem ? 'Mettre à jour' : 'Ajouter'
                      )}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Portfolio Grid */}
            {portfolioItems.length === 0 ? (
              <div className="glass-card p-12 text-center">
                <ImageIcon className="w-12 h-12 text-text-muted mx-auto mb-4" />
                <p className="text-text-muted">Aucune photo dans le portfolio.</p>
                <p className="text-text-muted text-sm mt-1">Cliquez sur "Ajouter une photo" pour commencer.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioItems.map((item) => (
                  <div key={item.id} className="glass-card overflow-hidden group">
                    <div className="relative aspect-[4/3]">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Action Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button
                          onClick={() => { setEditingItem(item); setShowForm(true); }}
                          className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary hover:bg-primary/40 transition"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(item.id)}
                          className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/40 transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      {item.category && (
                        <span className="text-xs text-primary font-medium uppercase tracking-wider">{item.category}</span>
                      )}
                      <h3 className="text-sm font-semibold text-text mt-1">{item.title}</h3>
                    </div>

                    {/* Delete Confirmation */}
                    {deleteConfirm === item.id && (
                      <div className="p-4 bg-red-500/10 border-t border-red-500/20">
                        <p className="text-sm text-red-400 mb-3">Supprimer cette photo ?</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="flex-1 bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-600 transition"
                          >
                            Supprimer
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="flex-1 bg-dark-lighter text-text px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-dark-border transition"
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
            <h2 className="text-2xl font-bold mb-6">Messages ({messages.length})</h2>
            {messages.length === 0 ? (
              <div className="glass-card p-12 text-center">
                <Mail className="w-12 h-12 text-text-muted mx-auto mb-4" />
                <p className="text-text-muted">Aucun message reçu.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`glass-card p-6 ${!msg.is_read ? 'border-l-4 border-l-primary' : ''}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-semibold text-text">{msg.name}</span>
                          {!msg.is_read && (
                            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">Nouveau</span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-text-muted mb-3">
                          <a href={`mailto:${msg.email}`} className="hover:text-primary transition-colors">{msg.email}</a>
                          {msg.phone && (
                            <a href={`tel:${msg.phone}`} className="hover:text-primary transition-colors">{msg.phone}</a>
                          )}
                        </div>
                        <p className="text-text-muted text-sm leading-relaxed">{msg.message}</p>
                        <p className="text-xs text-text-muted mt-3">
                          {new Date(msg.created_at).toLocaleDateString('fr-FR', {
                            day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleRead(msg.id, msg.is_read)}
                          className="p-2 text-text-muted hover:text-primary transition-colors"
                          title={msg.is_read ? 'Marquer comme non lu' : 'Marquer comme lu'}
                        >
                          {msg.is_read ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="p-2 text-text-muted hover:text-red-400 transition-colors"
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
