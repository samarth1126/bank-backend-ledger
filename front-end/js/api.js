const API_BASE_URL = "http://localhost:3000/api";

class ApiService {
    async getTransactions() {

        return await this.request(
            "/transactions"
        );

    }
    getToken() {
        return localStorage.getItem("token");
    }

    getHeaders() {

        const headers = {
            "Content-Type": "application/json"
        };

        const token = this.getToken();

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        return headers;
    }

    async request(endpoint, options = {}) {

        try {

            const response = await fetch(
                `${API_BASE_URL}${endpoint}`,
                {
                    ...options,
                    headers: {
                        ...this.getHeaders(),
                        ...(options.headers || {})
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Something went wrong"
                );

            }

            return data;

        }
        catch (error) {

            console.error(
                "API Error:",
                error
            );

            throw error;
        }
    }

    /* ======================
       AUTH
    ====================== */

    async login(email, password) {

        return await this.request(
            "/auth/login",
            {
                method: "POST",
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

    }

    async register(name, email, password) {

        return await this.request(
            "/auth/register",
            {
                method: "POST",
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            }
        );

    }

    async logout() {

        return await this.request(
            "/auth/logout",
            {
                method: "POST"
            }
        );

    }

    /* ======================
       ACCOUNTS
    ====================== */

    async getAccounts() {

        return await this.request(
            "/accounts"
        );

    }

    async createAccount() {

        return await this.request(
            "/accounts",
            {
                method: "POST"
            }
        );

    }

    async getBalance(accountId) {

        return await this.request(
            `/accounts/balance/${accountId}`
        );

    }

    /* ======================
       TRANSACTIONS
    ====================== */

    async transferMoney(
        fromAccount,
        toAccount,
        amount,
        idempotencyKey
    ) {

        return await this.request(
            "/transactions",
            {
                method: "POST",
                body: JSON.stringify({
                    fromAccount,
                    toAccount,
                    amount,
                    idempotencyKey
                })
            }
        );

    }

}

const api = new ApiService();