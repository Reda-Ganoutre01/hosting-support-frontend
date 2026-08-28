import api from "@/lib/axios";

class NotificationService {
  async getNotifications() {
    return api.get("/notifications");
  }

  async getNotificationsByUser(userId) {
    return api.get(`/notifications/user/${userId}`);
  }

  async createNotification(data) {
    return api.post("/notifications", data);
  }

  async updateNotification(id, data) {
    return api.put(`/notifications/${id}`, data);
  }

  async deleteNotification(id) {
    return api.delete(`/notifications/${id}`);
  }
}

export default new NotificationService();
