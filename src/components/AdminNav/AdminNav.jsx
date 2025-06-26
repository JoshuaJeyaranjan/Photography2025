import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminNav.scss';

function AdminNav() {
  return (
    <aside className="admin-nav">
      <div className="admin-nav-header">
        <h3>Admin Panel</h3>
      </div>
      <nav className="admin-nav-links">
        <NavLink to="/admin" end>Dashboard</NavLink>
        <NavLink to="/admin/orders">Orders</NavLink>
      </nav>
    </aside>
  );
}

export default AdminNav;