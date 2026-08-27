import api from "@/lib/axios";

class AiService {
  async getAiResponseForTicket(ticketId) {
    return api.get(`/aiResponses/ticket/${ticketId}`);
  }

  async generateAiSuggestion(ticketId, prompt) {
    return api.post("/aiResponses", {
      ticketId: (ticketId && ticketId > 0) ? ticketId : null,
      prompt: prompt || "Question support technique"
    });
  }

  async createFaq(faqData) {
    return api.post("/faqs", faqData);
  }
}

export default new AiService();
