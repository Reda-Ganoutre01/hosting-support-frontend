import api from "@/lib/axios";

class AdminService {
  // Users CRUD
  async getUsers() {
    return api.get("/users");
  }
  async getUserById(id) {
    return api.get(`/users/${id}`);
  }
  async createUser(userData) {
    return api.post("/users", userData);
  }
  async updateUser(id, userData) {
    return api.put(`/users/${id}`, userData);
  }
  async deleteUser(id) {
    return api.delete(`/users/${id}`);
  }

  // Hosting Accounts CRUD
  async getHostingAccounts() {
    return api.get("/hostingAccounts");
  }
  async getHostingAccountById(id) {
    return api.get(`/hostingAccounts/${id}`);
  }
  async createHostingAccount(data) {
    return api.post("/hostingAccounts", data);
  }
  async updateHostingAccount(id, data) {
    return api.put(`/hostingAccounts/${id}`, data);
  }
  async deleteHostingAccount(id) {
    return api.delete(`/hostingAccounts/${id}`);
  }

  // Hosting Plans CRUD
  async getHostingPlans() {
    return api.get("/hostingPlans");
  }
  async createHostingPlan(data) {
    return api.post("/hostingPlans", data);
  }
  async updateHostingPlan(id, data) {
    return api.put(`/hostingPlans/${id}`, data);
  }
  async deleteHostingPlan(id) {
    return api.delete(`/hostingPlans/${id}`);
  }

  // Tickets CRUD
  async getTickets() {
    return api.get("/tickets");
  }
  async updateTicket(id, data) {
    return api.put(`/tickets/${id}`, data);
  }
  async deleteTicket(id) {
    return api.delete(`/tickets/${id}`);
  }

  // FAQs CRUD
  async getFaqs() {
    return api.get("/faqs");
  }
  async createFaq(data) {
    return api.post("/faqs", data);
  }
  async updateFaq(id, data) {
    return api.put(`/faqs/${id}`, data);
  }
  async deleteFaq(id) {
    return api.delete(`/faqs/${id}`);
  }

  // Notifications CRUD
  async getNotifications() {
    return api.get("/notifications");
  }
  async createNotification(data) {
    return api.post("/notifications", data);
  }
  async deleteNotification(id) {
    return api.delete(`/notifications/${id}`);
  }

  // Workflow Logs
  async getWorkflowLogs() {
    return api.get("/workflowLogs");
  }
}

export default new AdminService();
