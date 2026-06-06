// accounts.js

const accountsPage = {

    async init() {

        this.checkAuth();

        this.setupCreateAccount();

        await this.loadAccounts();

    },

    checkAuth() {

        const token =
        localStorage.getItem("token");

        if (!token) {

            window.location.href =
            "login.html";

        }

    },

    async loadAccounts() {

        try {

            const data =
            await api.getAccounts();

            const accounts =
            data.accounts || [];

            this.renderAccounts(
                accounts
            );

        }
        catch (error) {

            console.error(error);

            this.showError(
                "Failed to load accounts"
            );

        }

    },

    async getBalance(accountId) {

        try {

            const data =
            await api.getBalance(
                accountId
            );

            return data.balance || 0;

        }
        catch (error) {

            return 0;

        }

    },

    async renderAccounts(accounts) {

        const container =
        document.getElementById(
            "accountsContainer"
        );

        if (!container) return;

        if (accounts.length === 0) {

            container.innerHTML = `
                <div class="empty-state">
                    No accounts found.
                </div>
            `;

            return;

        }

        container.innerHTML =
        `<div class="accounts-grid"></div>`;

        const grid =
        document.querySelector(
            ".accounts-grid"
        );

        let totalBalance = 0;

        for (const account of accounts) {

            const balance =
            await this.getBalance(
                account._id
            );

            totalBalance += balance;

            grid.innerHTML += `

                <div class="account-card">

                    <div class="top-glow"></div>

                    <div class="account-type">
                        DIGITAL ACCOUNT
                    </div>

                    <div class="account-balance">
                        ₹${balance.toLocaleString()}
                    </div>

                    <div class="account-id">
                        ${account._id}
                    </div>

                </div>

            `;

        }

        this.updateSummary(
            accounts.length,
            totalBalance
        );

    },

    updateSummary(
        accountCount,
        totalBalance
    ) {

        const totalAccounts =
        document.getElementById(
            "totalAccounts"
        );

        const totalBalanceEl =
        document.getElementById(
            "totalBalance"
        );

        if (totalAccounts) {

            totalAccounts.innerText =
            accountCount;

        }

        if (totalBalanceEl) {

            totalBalanceEl.innerText =
            `₹${totalBalance.toLocaleString()}`;

        }

    },

    setupCreateAccount() {

        const createBtn =
        document.getElementById(
            "createAccountBtn"
        );

        if (!createBtn) return;

        createBtn.addEventListener(
            "click",
            async () => {

                await this.createAccount();

            }
        );

    },

    async createAccount() {

        try {

            const btn =
            document.getElementById(
                "createAccountBtn"
            );

            if (btn) {

                btn.disabled = true;

                btn.innerText =
                "Creating...";
            }

            await api.createAccount();

            await this.loadAccounts();

        }
        catch (error) {

            console.error(error);

            this.showError(
                error.message
            );

        }
        finally {

            const btn =
            document.getElementById(
                "createAccountBtn"
            );

            if (btn) {

                btn.disabled = false;

                btn.innerText =
                "+ New Account";

            }

        }

    },

    showError(message) {

        alert(message);

    }

};

document.addEventListener(
    "DOMContentLoaded",
    () => {

        accountsPage.init();

    }
);