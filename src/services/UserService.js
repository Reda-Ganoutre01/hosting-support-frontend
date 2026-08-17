import api from "@/lib/axios";

class UserService {
    async getUsers() {
        return api.get("/users");
    }

    async getUserById(id) {
        return api.get(`/users/${id}`);
    }

    async createUser(user) {
        return api.post("/users/create", user);
    }

    async updateUser(id, user) {
        if (id) {
            try {
                return await api.put(`/users/update/${id}`, user);
            } catch (err) {
                return await api.put(`/users/${id}`, user);
            }
        }
        return api.put("/users/profile", user);
    }

    async deleteUser(id) {
        return api.delete(`/users/delete/${Number(id)}`);
    }
}

export default new UserService();