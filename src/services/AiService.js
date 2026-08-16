import api from "@/lib/axios";

class AiService {
  async getAiResponseForTicket(ticketId) {
    return api.get(`/aiResponses/ticket/${ticketId}`);
  }

  async generateAiSuggestion(ticketId, prompt) {
    return api.post("/aiResponses", {
      ticketId,
      prompt: prompt || "Générer une réponse de support d'assistance technique pour ce ticket",
      response: "Bonjour, nous avons analysé votre demande d'hébergement. Voici les démarches pour vérifier la configuration DNS et le serveur web.",
      provider: "OpenAI GPT-4",
      confidenceScore: 0.96
    });
  }

  async createFaq(faqData) {
    return api.post("/faqs", faqData);
  }
}

export default new AiService();
