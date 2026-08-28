import api from "@/lib/axios";

class HostingPlanService {
  // Hosting Plans
  async getHostingPlans() {
    return api.get("/hostingPlans");
  }

  async createHostingPlan(planData) {
    return api.post("/hostingPlans", planData);
  }

  async updateHostingPlan(id, planData) {
    return api.put(`/hostingPlans/${id}`, planData);
  }

  async deleteHostingPlan(id) {
    return api.delete(`/hostingPlans/${id}`);
  }

  // Hosting Accounts
  async getHostingAccounts() {
    return api.get("/hostingAccounts");
  }

  async getHostingAccountsByUser(userId) {
    return api.get(`/hostingAccounts/user/${userId}`);
  }

  async getRevenueAnalytics() {
    return api.get("/hostingAccounts/analytics");
  }

  async createHostingAccount(data) {
    return api.post("/hostingAccounts", data);
  }

  async updateHostingAccount(id, data) {
    return api.put(`/hostingAccounts/${id}`, data);
  }

  async renewHostingAccount(id) {
    return api.put(`/hostingAccounts/${id}`, { status: "ACTIVE" });
  }

  async cancelHostingAccount(id) {
    return api.put(`/hostingAccounts/${id}`, { status: "SUSPENDED" });
  }

  async deleteHostingAccount(id) {
    return api.delete(`/hostingAccounts/${id}`);
  }

  // FAQs
  async getFaqs() {
    return api.get("/faqs");
  }

  async createFaq(faqData) {
    return api.post("/faqs", faqData);
  }

  async updateFaq(id, faqData) {
    return api.put(`/faqs/${id}`, faqData);
  }

  async deleteFaq(id) {
    return api.delete(`/faqs/${id}`);
  }

  // Workflow Logs
  async getWorkflowLogs() {
    return api.get("/workflowLogs");
  }
}

export default new HostingPlanService();

