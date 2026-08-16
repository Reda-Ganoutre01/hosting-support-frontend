import axios from "axios";
import { env } from "../config/env";

const getBaseUrl = () => {
    const raw = (env.apiBaseUrl || "/api").trim();
    const cleaned = raw.replace(/\/+$/, "");
    if (/\/auth$/i.test(cleaned)) return cleaned;
    return `${cleaned}/auth`;
};

class AuthService {
    constructor() {
        this.http = axios.create({
            baseURL: getBaseUrl(),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    async authenticate(credentials = {}) {
        const email = (credentials.email || credentials.username || "").trim();
        const password = credentials.password || "";

        return await this.http.post("/login", { email, password });
    }

    async register(credentials = {}) {
        const email = (credentials.email || "").trim();
        const fullName = (credentials.fullName || credentials.full_name || credentials.name || "").trim();
        const userName = (credentials.userName || credentials.user_name || credentials.username || email.split("@")[0] || "").trim();
        const phone = (credentials.phone || "0600000000").trim();
        const password = credentials.password || "";
        const role = credentials.role || "USER";

        const payload = {
            fullName,
            userName,
            email,
            password,
            phone,
            role
        };

        return await this.http.post("/register", payload);
    }
}

export default new AuthService();
