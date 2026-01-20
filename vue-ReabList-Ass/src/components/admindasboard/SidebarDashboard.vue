<template>
    <!-- Sidebar -->
    <aside id="sidebar">
        <div class="sidebar-brand">
            <i data-lucide="shield-check" class="me-2"></i>
            ADMIN<span>PANEL</span>
        </div>

        <div class="nav-label">Management</div>
        <nav class="nav flex-column">
            <a href="#" class="nav-link active" data-section="dashboard">
                <i data-lucide="layout-grid"></i> Dashboard
            </a>
            <a href="#" class="nav-link" data-section="users">
                <i data-lucide="users"></i> Users Directory
            </a>
            <a href="#" class="nav-link" data-section="tasks">
                <i data-lucide="check-square"></i> Global Tasks
            </a>
            <a href="#" class="nav-link" data-section="categories">
                <i data-lucide="tag"></i> Taxonomy
            </a>
        </nav>

        <div class="nav-label">Operations</div>
        <nav class="nav flex-column">
            <a href="#" class="nav-link" data-section="reports">
                <i data-lucide="alert-triangle"></i> Reports Center
            </a>
            <a href="#" class="nav-link" data-section="announcements">
                <i data-lucide="megaphone"></i> Broadcast
            </a>
            <a href="#" class="nav-link" data-section="logs">
                <i data-lucide="file-text"></i> Audit Trails
            </a>
            <a href="#" class="nav-link" data-section="performance">
                <i data-lucide="activity"></i> Performance
            </a>
            <a href="#" class="nav-link" data-section="settings">
                <i data-lucide="settings"></i> System Config
            </a>
        </nav>

        <div class="mt-auto p-4">
            <button class="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
                style="border-radius: 0.75rem; font-weight: 700;">
                <i data-lucide="log-out" size="18"></i> Logout
            </button>
        </div>
    </aside>
</template>
<style scoped>
#sidebar {
    width: var(--sidebar-width);
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background: #ffffff;
    border-right: 1px solid var(--border-color);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1050;
    display: flex;
    flex-direction: column;
}

.sidebar-brand {
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0 2rem;
    font-weight: 800;
    font-size: 1.25rem;
    color: var(--brand-primary);
}

.nav-label {
    font-size: 0.7rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #94A3B8;
    padding: 1.5rem 2rem 0.5rem;
}

.nav-link {
    padding: 0.85rem 2rem;
    color: #64748B;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: all 0.2s;
    font-size: 0.95rem;
}

.nav-link:hover {
    background-color: var(--brand-light);
    color: var(--brand-primary);
}

.nav-link.active {
    background-color: var(--brand-light);
    color: var(--brand-primary);
    border-right: 4px solid var(--brand-primary);
}
</style>