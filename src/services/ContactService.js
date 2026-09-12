import api from "@/lib/axios";

export const ContactService = {
  async getContacts() {
    const res = await api.get("/contacts");
    return res.data;
  },

  async createContact(payload) {
    const res = await api.post("/contacts", payload);
    return res.data;
  },

  async deleteContact(id) {
    await api.delete(`/contacts/${id}`);
  }
};