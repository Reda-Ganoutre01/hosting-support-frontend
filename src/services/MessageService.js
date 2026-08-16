import api from "@/lib/axios";

class MessageService {
  async getMessagesByTicket(ticketId) {
    return api.get(`/messages/ticket/${ticketId}`);
  }

  async sendMessage(messageData) {
    return api.post("/messages", messageData);
  }
}

export default new MessageService();
