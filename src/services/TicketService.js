import api from "@/lib/axios";

class TicketService {
  async getTickets() {
    return api.get("/tickets");
  }

  async getTicketById(id) {
    return api.get(`/tickets/${id}`);
  }

  async createTicket(ticketData) {
    return api.post("/tickets", ticketData);
  }

  async updateTicket(id, ticketData) {
    return api.put(`/tickets/${id}`, ticketData);
  }
}

export default new TicketService();
