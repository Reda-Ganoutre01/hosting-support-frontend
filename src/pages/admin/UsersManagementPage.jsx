import React, { useState, useEffect, useMemo } from "react";
import AppLayout from "@/components/layout/AppLayout.jsx";
import AdminService from "@/services/AdminService";
import { useToast } from "@/context/ToastContext";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

import {
  Users,
  UserCheck,
  UserX,
  ShieldCheck,
  Search,
  Plus,
  RefreshCw,
  Edit,
  Trash2,
  Eye,
  X,
  Mail,
  Phone,
  User as UserIcon,
  Lock,
  CheckCircle2,
  XCircle,
  Filter,
  MoreVertical,
  Shield,
  KeyRound,
  ExternalLink
} from "lucide-react";

export default function UsersManagementPage() {
  const toast = useToast();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    phone: "",
    role: "USER",
    password: "",
    enabled: true
  });

  const [showPassword, setShowPassword] = useState(false);

  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await AdminService.getUsers();
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error("Error loading users:", err);
      toast.error("Failed to load clients and users from backend server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filtered users calculation
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        (u.fullName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.userName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.phone || "").toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === "ALL" || u.role === roleFilter;

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" && u.enabled) ||
        (statusFilter === "DISABLED" && !u.enabled);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = users.length;
    const active = users.filter((u) => u.enabled).length;
    const admins = users.filter((u) => u.role === "ADMIN").length;
    const disabled = users.filter((u) => !u.enabled).length;
    return { total, active, admins, disabled };
  }, [users]);

  // Open Create Modal
  const handleOpenCreate = () => {
    setFormData({
      fullName: "",
      userName: "",
      email: "",
      phone: "",
      role: "USER",
      password: "",
      enabled: true
    });
    setShowPassword(false);
    setIsCreateOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      fullName: user.fullName || "",
      userName: user.userName || "",
      email: user.email || "",
      phone: user.phone || "",
      role: user.role || "USER",
      password: "",
      enabled: user.enabled !== false
    });
    setShowPassword(false);
    setIsEditOpen(true);
  };

  // Open View Modal
  const handleOpenView = (user) => {
    setSelectedUser(user);
    setIsViewOpen(true);
  };

  // Open Delete Modal
  const handleOpenDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  // Submit Create User
  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.userName) {
      toast.error("Please fill in all required fields (Full Name, Username, Email).");
      return;
    }
    if (!formData.password) {
      toast.error("Please enter a password for the new user.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await AdminService.createUser(formData);
      toast.success(`User "${formData.fullName}" created successfully!`);
      setIsCreateOpen(false);
      fetchUsers();
    } catch (err) {
      console.error("Create user error:", err);
      const serverErr = err.response?.data;
      const errMsg = typeof serverErr === "string" ? serverErr : serverErr?.message || "Failed to create user. Ensure email/username are unique.";
      toast.error(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  // Submit Edit User
  const handleEditUser = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.userName) {
      toast.error("Please fill in required fields (Full Name, Username, Email).");
      return;
    }

    setSubmitting(true);
    try {
      const payload = { ...formData };
      if (!payload.password) {
        delete payload.password; // keep unchanged password if empty
      }
      await AdminService.updateUser(selectedUser.id, payload);
      toast.success(`User "${formData.fullName}" updated successfully!`);
      setIsEditOpen(false);
      fetchUsers();
    } catch (err) {
      console.error("Update user error:", err);
      const serverErr = err.response?.data;
      const errMsg = typeof serverErr === "string" ? serverErr : serverErr?.message || "Failed to update user.";
      toast.error(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  // Quick Toggle Status
  const handleToggleStatus = async (user) => {
    try {
      const updatedStatus = !user.enabled;
      await AdminService.updateUser(user.id, {
        fullName: user.fullName,
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        enabled: updatedStatus
      });
      toast.success(`User status updated to ${updatedStatus ? "Active" : "Disabled"}.`);
      fetchUsers();
    } catch (err) {
      console.error("Toggle status error:", err);
      const serverErr = err.response?.data;
      const errMsg = typeof serverErr === "string" ? serverErr : serverErr?.message || "Failed to update status.";
      toast.error(errMsg);
    }
  };

  // Submit Delete User
  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    setSubmitting(true);
    try {
      await AdminService.deleteUser(selectedUser.id);
      toast.success(`User "${selectedUser.fullName || selectedUser.userName}" deleted successfully.`);
      setIsDeleteOpen(false);
      fetchUsers();
    } catch (err) {
      console.error("Delete user error:", err);
      toast.error("Failed to delete user. User may have associated records.");
    } finally {
      setSubmitting(false);
    }
  };

  // Get Initials for Avatar
  const getInitials = (name, username) => {
    const text = name || username || "U";
    const parts = text.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return text.substring(0, 2).toUpperCase();
  };

  // Avatar Gradient Selector
  const getAvatarGradient = (id) => {
    const gradients = [
      "from-blue-600 to-indigo-600",
      "from-purple-600 to-pink-600",
      "from-emerald-500 to-teal-600",
      "from-amber-500 to-orange-600",
      "from-cyan-500 to-blue-600",
      "from-violet-600 to-purple-600"
    ];
    return gradients[(id || 0) % gradients.length];
  };

  return (
    <AppLayout breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Clients & Users" }]}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-border">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                <Users className="h-6 w-6" />
              </div>
              Clients & Users Management
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              View, create, edit and manage platform clients, support staff, and admin accounts.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchUsers}
              disabled={loading}
              className="gap-2 border-border shadow-xs hover:bg-accent"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin text-blue-600" : ""}`} />
              Refresh
            </Button>
            <Button
              onClick={handleOpenCreate}
              className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-blue-500/20 transition-all duration-200"
            >
              <Plus className="h-4 w-4" />
              Add New User
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card text-card-foreground border border-border/70 rounded-2xl p-5 shadow-xs relative overflow-hidden group hover:border-blue-500/40 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Accounts</p>
                <h3 className="text-2xl font-extrabold text-foreground mt-1">{stats.total}</h3>
              </div>
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Users className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
              <span className="font-semibold text-blue-600 dark:text-blue-400">100%</span> total registered users
            </div>
          </div>

          <div className="bg-card text-card-foreground border border-border/70 rounded-2xl p-5 shadow-xs relative overflow-hidden group hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Active Clients</p>
                <h3 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{stats.active}</h3>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <UserCheck className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
              <span className="font-semibold text-emerald-600">
                {stats.total ? Math.round((stats.active / stats.total) * 100) : 0}%
              </span> active status rate
            </div>
          </div>

          <div className="bg-card text-card-foreground border border-border/70 rounded-2xl p-5 shadow-xs relative overflow-hidden group hover:border-purple-500/40 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Admins & Staff</p>
                <h3 className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 mt-1">{stats.admins}</h3>
              </div>
              <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
              Full administrative privileges
            </div>
          </div>

          <div className="bg-card text-card-foreground border border-border/70 rounded-2xl p-5 shadow-xs relative overflow-hidden group hover:border-amber-500/40 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Disabled / Suspended</p>
                <h3 className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">{stats.disabled}</h3>
              </div>
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <UserX className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
              Inactive or restricted accounts
            </div>
          </div>
        </div>

        {/* Filters & Search Control Bar */}
        <div className="bg-card border border-border/80 rounded-2xl p-4 shadow-xs space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, email, username or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2 bg-background border border-input rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-background border border-input rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                <option value="ALL">All Roles</option>
                <option value="ADMIN">ADMIN Only</option>
                <option value="USER">USER (Client) Only</option>
              </select>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-background border border-input rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active Only</option>
              <option value="DISABLED">Disabled Only</option>
            </select>

            {(searchQuery || roleFilter !== "ALL" || statusFilter !== "ALL") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setRoleFilter("ALL");
                  setStatusFilter("ALL");
                }}
                className="text-xs text-blue-600 hover:text-blue-700"
              >
                Reset Filters
              </Button>
            )}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-card border border-border/80 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/40 text-muted-foreground text-xs uppercase font-semibold border-b border-border">
                <tr>
                  <th className="px-6 py-4">User Details</th>
                  <th className="px-6 py-4">Contact Info</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  Array.from({ length: 5 }).map((_, idx) => (
                    <tr key={idx} className="animate-pulse">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-muted"></div>
                          <div className="space-y-2">
                            <div className="h-4 w-32 bg-muted rounded"></div>
                            <div className="h-3 w-20 bg-muted rounded"></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div className="h-4 w-40 bg-muted rounded"></div>
                          <div className="h-3 w-24 bg-muted rounded"></div>
                        </div>
                      </td>
                      <td className="px-6 py-4"><div className="h-6 w-16 bg-muted rounded-full"></div></td>
                      <td className="px-6 py-4"><div className="h-6 w-16 bg-muted rounded-full"></div></td>
                      <td className="px-6 py-4 text-right"><div className="h-8 w-20 bg-muted rounded ml-auto"></div></td>
                    </tr>
                  ))
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="max-w-xs mx-auto text-center space-y-3">
                        <div className="p-3 rounded-full bg-muted w-fit mx-auto text-muted-foreground">
                          <Users className="h-8 w-8" />
                        </div>
                        <h4 className="text-base font-semibold text-foreground">No users found</h4>
                        <p className="text-xs text-muted-foreground">
                          {searchQuery || roleFilter !== "ALL" || statusFilter !== "ALL"
                            ? "Try adjusting your search query or filter criteria."
                            : "There are currently no users in the system."}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-muted/30 transition-colors group"
                    >
                      {/* User Avatar & Name */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-10 w-10 rounded-full bg-gradient-to-br ${getAvatarGradient(
                              user.id
                            )} text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0`}
                          >
                            {getInitials(user.fullName, user.userName)}
                          </div>
                          <div>
                            <div className="font-semibold text-foreground group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                              {user.fullName || "Unnamed User"}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              @{user.userName || `user_${user.id}`}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs text-foreground">
                            <Mail className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            <span className="truncate max-w-[200px]">{user.email}</span>
                          </div>
                          {user.phone && (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Phone className="h-3.5 w-3.5 shrink-0" />
                              <span>{user.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="px-6 py-4">
                        {user.role === "ADMIN" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                            <Shield className="h-3.5 w-3.5" />
                            ADMIN
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30">
                            <UserIcon className="h-3.5 w-3.5" />
                            USER (Client)
                          </span>
                        )}
                      </td>

                      {/* Status Badge & Toggle */}
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleStatus(user)}
                          title="Click to toggle user active status"
                          className="inline-flex items-center gap-1.5 cursor-pointer group/status"
                        >
                          {user.enabled !== false ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 group-hover/status:bg-emerald-500/25 transition-all">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 group-hover/status:bg-rose-500/25 transition-all">
                              <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                              Disabled
                            </span>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenView(user)}
                            className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-blue-600 hover:bg-blue-500/10"
                            title="View Client Details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenEdit(user)}
                            className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-indigo-600 hover:bg-indigo-500/10"
                            title="Edit User Details"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenDelete(user)}
                            className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-rose-600 hover:bg-rose-500/10"
                            title="Delete User"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-6 py-3 bg-muted/20 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <div>
              Showing <span className="font-semibold text-foreground">{filteredUsers.length}</span> of{" "}
              <span className="font-semibold text-foreground">{users.length}</span> total clients & users
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span> Live Backend Sync
            </div>
          </div>
        </div>
      </div>

      {/* CREATE USER MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-card text-card-foreground border border-border rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-600/10 text-blue-600">
                  <UserIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Add New Client / User</h3>
                  <p className="text-xs text-muted-foreground">Create a new user account with role & permissions</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-accent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Reda Mansouri"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Username *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. reda_dev"
                    value={formData.userName}
                    onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. reda@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Phone Number</label>
                  <input
                    type="text"
                    placeholder="e.g. +212 6 00 00 00 00"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Role *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  >
                    <option value="USER">USER (Client)</option>
                    <option value="ADMIN">ADMIN (Administrator)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Password *</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-3 pr-10 py-2 bg-background border border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.enabled}
                    onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
                <span className="text-xs font-medium text-foreground">Account Active Status</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <Button variant="outline" type="button" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                  {submitting ? "Saving..." : "Create User"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT USER MODAL */}
      {isEditOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-card text-card-foreground border border-border rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-600/10 text-indigo-600">
                  <Edit className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Edit User Details</h3>
                  <p className="text-xs text-muted-foreground">Updating profile for #{selectedUser.id}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditOpen(false)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-accent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleEditUser} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Username *</label>
                  <input
                    type="text"
                    required
                    value={formData.userName}
                    onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Role *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500/30"
                  >
                    <option value="USER">USER (Client)</option>
                    <option value="ADMIN">ADMIN (Administrator)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">
                    New Password <span className="text-muted-foreground font-normal">(Optional)</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Leave blank to keep unchanged"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3 py-2 bg-background border border-input rounded-xl text-sm focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.enabled}
                    onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
                <span className="text-xs font-medium text-foreground">Account Active Status</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <Button variant="outline" type="button" onClick={() => setIsEditOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
                >
                  {submitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW USER DETAILS MODAL */}
      {isViewOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-card text-card-foreground border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-6 relative">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-base font-bold flex items-center gap-2">
                <Eye className="h-4 w-4 text-blue-600" /> Client Profile Details
              </h3>
              <button
                onClick={() => setIsViewOpen(false)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-accent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col items-center text-center space-y-3 pt-2">
              <div
                className={`h-20 w-20 rounded-full bg-gradient-to-br ${getAvatarGradient(
                  selectedUser.id
                )} text-white flex items-center justify-center font-extrabold text-2xl shadow-md`}
              >
                {getInitials(selectedUser.fullName, selectedUser.userName)}
              </div>
              <div>
                <h4 className="text-xl font-bold text-foreground">{selectedUser.fullName || "Unnamed User"}</h4>
                <p className="text-sm text-muted-foreground">@{selectedUser.userName}</p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                {selectedUser.role === "ADMIN" ? (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                    Administrator
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30">
                    Standard Client
                  </span>
                )}

                {selectedUser.enabled !== false ? (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                    Active Account
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                    Disabled
                  </span>
                )}
              </div>
            </div>

            <div className="bg-muted/40 rounded-xl p-4 space-y-3 text-xs border border-border">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <KeyRound className="h-3.5 w-3.5" /> User ID:
                </span>
                <span className="font-mono font-semibold text-foreground">#{selectedUser.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> Email:
                </span>
                <span className="font-semibold text-foreground">{selectedUser.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" /> Phone:
                </span>
                <span className="font-semibold text-foreground">{selectedUser.phone || "Not provided"}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsViewOpen(false);
                  handleOpenEdit(selectedUser);
                }}
                className="gap-2"
              >
                <Edit className="h-3.5 w-3.5" /> Edit Profile
              </Button>
              <Button size="sm" onClick={() => setIsViewOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {isDeleteOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-card text-card-foreground border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 relative">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-3 rounded-full bg-rose-500/10">
                <Trash2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Delete Client / User</h3>
                <p className="text-xs text-muted-foreground">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Are you sure you want to permanently delete account{" "}
              <strong className="text-foreground">{selectedUser.fullName || selectedUser.userName}</strong> (
              {selectedUser.email})?
            </p>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                disabled={submitting}
                onClick={handleDeleteUser}
                className="gap-2 bg-rose-600 hover:bg-rose-700"
              >
                {submitting ? "Deleting..." : "Yes, Delete User"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
