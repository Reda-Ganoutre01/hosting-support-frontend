import api from "@/lib/axios";

class SettingService {
  async getMaintenanceStatus() {
    return api.get("/settings/maintenance");
  }

  async setMaintenanceMode(enabled) {
    return api.put("/settings/maintenance", { enabled });
  }
}

export default new SettingService();