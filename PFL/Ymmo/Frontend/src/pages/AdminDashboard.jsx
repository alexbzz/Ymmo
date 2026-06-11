import React, { useMemo, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useAdminDashboard } from '../hooks/useAdminDashboard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { adminAPI } from '../services/api';

const ROLE_OPTIONS = ['CLIENT', 'AGENT', 'ADMIN'];

export const AdminDashboard = () => {
  const { user } = useAuth();
  const { data, loading, error, refetch } = useAdminDashboard();
  const [savingUserId, setSavingUserId] = useState(null);
  const [adminError, setAdminError] = useState(null);
  const [adminSuccess, setAdminSuccess] = useState(null);
  const [draftRoles, setDraftRoles] = useState({});

  const overview = data.overview?.totals || {};
  const users = data.users || [];

  const roleStats = useMemo(() => ([
    { label: 'Utilisateurs', value: overview.users || 0 },
    { label: 'Clients', value: overview.clients || 0 },
    { label: 'Agents', value: overview.agents || 0 },
    { label: 'Admins', value: overview.admins || 0 },
    { label: 'Biens', value: overview.properties || 0 },
    { label: 'Transactions', value: overview.transactions || 0 },
    { label: 'Favoris', value: overview.favorites || 0 },
  ]), [overview]);

  const handleRoleDraft = (id, role) => {
    setDraftRoles((current) => ({ ...current, [id]: role }));
  };

  const handleRoleUpdate = async (id) => {
    setSavingUserId(id);
    setAdminError(null);
    setAdminSuccess(null);

    try {
      const role = draftRoles[id];
      if (!role) {
        return;
      }

      await adminAPI.updateUserRole(id, role);
      setAdminSuccess('Rôle mis à jour avec succès.');
      await refetch();
    } catch (err) {
      setAdminError(err.message);
    } finally {
      setSavingUserId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce compte ? Cette action est irréversible.')) {
      return;
    }

    setSavingUserId(id);
    setAdminError(null);
    setAdminSuccess(null);

    try {
      await adminAPI.deleteUser(id);
      setAdminSuccess('Compte supprimé avec succès.');
      await refetch();
    } catch (err) {
      setAdminError(err.message);
    } finally {
      setSavingUserId(null);
    }
  };

  return (
    <main className="page-container" id="main-content">
      <h1 style={{ marginTop: 0 }}>Administration</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Espace réservé aux administrateurs : supervision globale, gestion des comptes et contrôle des rôles.
      </p>

      {loading && !error && <LoadingSpinner label="Chargement du tableau de bord admin..." />}

      {error && (
        <div className="alert alert-error" role="alert" aria-live="polite">
          {error}
        </div>
      )}

      {adminError && (
        <div className="alert alert-error" role="alert" aria-live="polite">
          {adminError}
        </div>
      )}

      {adminSuccess && (
        <div className="alert alert-success" role="status" aria-live="polite">
          {adminSuccess}
        </div>
      )}

      {!loading && !error && (
        <>
          <section aria-labelledby="admin-stats-title">
            <h2 id="admin-stats-title">Vue d’ensemble</h2>
            <div className="dashboard-stats" role="list" aria-label="Statistiques administrateur">
              {roleStats.map((item) => (
                <div key={item.label} className="stat-box" role="listitem">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="admin-users-title" style={{ marginTop: '2rem' }}>
            <h2 id="admin-users-title">Gestion des comptes</h2>
            <p style={{ color: '#666' }}>
              L’administrateur peut modifier les rôles et supprimer les comptes utilisateurs.
            </p>

            {users.length === 0 ? (
              <div className="alert alert-info" role="status">
                Aucun utilisateur à afficher.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }} aria-label="Tableau des utilisateurs">
                  <thead>
                    <tr>
                      {['Nom', 'E-mail', 'Rôle', 'Activité', 'Profil', 'Actions'].map((header) => (
                        <th key={header} scope="col" style={{ textAlign: 'left', padding: '0.875rem 0.75rem', borderBottom: '2px solid #ddd', background: '#f8f9fa' }}>
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((account) => {
                      const currentDraft = draftRoles[account.id] || account.role;
                      const isCurrentUser = account.id === user?.id;
                      const canDelete = !isCurrentUser && account.role !== 'ADMIN' && account._count.transactions === 0;

                      return (
                        <tr key={account.id}>
                          <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>
                            {account.firstName} {account.lastName}
                            {isCurrentUser && <span style={{ marginLeft: '0.5rem', color: '#666' }}>(vous)</span>}
                          </td>
                          <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>{account.email}</td>
                          <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee', minWidth: 180 }}>
                            <select
                              className="form-select"
                              value={currentDraft}
                              onChange={(event) => handleRoleDraft(account.id, event.target.value)}
                              disabled={isCurrentUser}
                              aria-label={`Modifier le rôle de ${account.email}`}
                            >
                              {ROLE_OPTIONS.map((role) => (
                                <option key={role} value={role}>
                                  {role}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>
                            <div>{account._count.transactions} transactions</div>
                            <div>{account._count.favorites} favoris</div>
                          </td>
                          <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>
                            {account.agent ? (
                              <>
                                <div>{account.agent.agencyName}</div>
                                <small style={{ color: '#666' }}>Licence {account.agent.licenseNumber}</small>
                              </>
                            ) : (
                              '—'
                            )}
                          </td>
                          <td style={{ padding: '0.75rem', borderBottom: '1px solid #eee' }}>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => handleRoleUpdate(account.id)}
                              disabled={isCurrentUser || savingUserId === account.id || currentDraft === account.role}
                              aria-busy={savingUserId === account.id}
                              style={{ marginRight: '0.5rem' }}
                            >
                              Mettre à jour
                            </button>
                            <button
                              type="button"
                              className="btn"
                              onClick={() => handleDelete(account.id)}
                              disabled={!canDelete || savingUserId === account.id}
                              aria-busy={savingUserId === account.id}
                              style={{ background: '#e74c3c', color: '#fff' }}
                            >
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section style={{ marginTop: '2rem' }} aria-labelledby="admin-notes-title">
            <h2 id="admin-notes-title">Avantages admin</h2>
            <div className="properties-grid" role="list" aria-label="Avantages administrateur">
              <article className="stat-box" role="listitem" style={{ textAlign: 'left' }}>
                <h3 style={{ marginTop: 0 }}>Pilotage global</h3>
                <p>Accès à la vision d’ensemble des utilisateurs, biens et transactions.</p>
              </article>
              <article className="stat-box" role="listitem" style={{ textAlign: 'left' }}>
                <h3 style={{ marginTop: 0 }}>Gestion des rôles</h3>
                <p>Promotion ou rétrogradation des comptes sans passer par la base de données.</p>
              </article>
              <article className="stat-box" role="listitem" style={{ textAlign: 'left' }}>
                <h3 style={{ marginTop: 0 }}>Contrôle renforcé</h3>
                <p>Le rôle admin conserve les droits agent et client, avec des outils supplémentaires.</p>
              </article>
            </div>
          </section>

          <div style={{ marginTop: '1.5rem', color: '#666' }}>
            Rôle actuel : {user?.role || 'ADMIN'}
          </div>
        </>
      )}
    </main>
  );
};
