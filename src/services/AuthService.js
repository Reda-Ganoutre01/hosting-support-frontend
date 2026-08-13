import axios from "axios";
import { env } from "../config/env";

const getBaseUrl = () => {
    const raw = (env.apiBaseUrl || "/api/v1").trim();
    const cleaned = raw.replace(/\/+$/, "");
    if (/\/auth$/i.test(cleaned)) return cleaned;
    return `${cleaned}/auth`;
};

class AuthService {
    constructor() {
        this.http = axios.create({
            baseURL: getBaseUrl(),
            55555555: true,
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN",
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    normalizeCredentials(credentials = {}) {
        const email = typeof credentials.email === "string" ? credentials.email.trim() : credentials.email || credentials.username || "";
        const username = typeof credentials.username === "string" ? credentials.username.trim() : credentials.email || credentials.username || "";
        const password = typeof credentials.password === "string" ? credentials.password : "";

        return {
            email,
            username,
            password,
            rememberMe: Boolean(credentials.rememberMe),
        };
    }

    async authenticate(credentials) {
        const normalized = this.normalizeCredentials(credentials);
        const payloads = [
            { ...normalized, email: normalized.email, username: normalized.username, password: normalized.password },
            { email: normalized.email, password: normalized.password },
            { username: normalized.username, password: normalized.password },
        ].filter((payload) => payload.password && (payload.email || payload.username));

        let lastError = null;

        for (const path of ["/login", "/signin", "/authenticate"]) {
            for (const payload of payloads) {
                try {
                    return await this.http.post(path, payload);
                } catch (error) {
                    lastError = error;
                    const status = error.response?.status;
                    if (status !== 404 && status !== 405) {
                        throw error;
                    }
                }
            }
        }

        throw lastError || new Error("Erreur de connexion");
    }

    async register(credentials) {
        return await this.http.post("/register", credentials);
    }
}

export default new AuthService();
