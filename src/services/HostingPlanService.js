import api from "@/lib/axios";

class HostingPlanService {
  async getHostingPlans() {
    return api.get("/hostingPlans");
  }

  async getHostingAccounts() {
    return api.get("/hostingAccounts");
  }

  async createHostingAccount(data) {
    return api.post("/hostingAccounts", data);
  }

  async renewHostingAccount(id) {
    return api.put(`/hostingAccounts/${id}`, { status: "ACTIVE" });
  }

  async cancelHostingAccount(id) {
    return api.put(`/hostingAccounts/${id}`, { status: "SUSPENDED" });
  }
}

export default new HostingPlanService();
