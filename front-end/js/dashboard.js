// dashboard.js

const dashboard = {

    async init() {

        this.checkAuth();

        this.loadUserInfo();

        await this.loadAccounts();

        this.setupLogout();

    },

    checkAuth() {

        const token =
        localStorage.getItem("token");

        if (!token) {

            window.location.href =
            "login.html";

        }

    },

    loadUserInfo() {

        const user =
        JSON.parse(
            localStorage.getItem("user")
        );

        if (!user) return;

        const welcome =
        document.getElementById(
            "welcomeText"
        );

        const email =
        document.getElementById(
            "userEmail"
        );

        if (welcome) {

            welcome.innerText =
            `Welcome, ${user.name}`;

        }

        if (email) {

            email.innerText =
            user.email;

        }

    },

    async loadAccounts() {

        try {

            const data =
            await api.getAccounts();

            const accounts =
            data.accounts || [];

            if (
                accounts.length === 0
            ) {

                await api.createAccount();

                return this.loadAccounts();

            }

            await this.renderAccounts(
                accounts
            );

        }
        catch (error) {

            console.error(error);

        }

    },

    async renderAccounts(accounts) {

        const container =
        document.getElementById(
            "accountsContainer"
        );

        if (!container) return;

        container.innerHTML = "";

        let totalBalance = 0;

        for (const account of accounts) {

            const balanceData =
            await api.getBalance(
                account._id
            );

            const balance =
            balanceData.balance || 0;

            totalBalance += balance;

            container.innerHTML += `

                <div class="account-card">

                    <h3>
                        Account
                    </h3>

                    <div class="balance">
                        ₹${balance.toLocaleString()}
                    </div>

                    <div class="account-id">
                        ${account._id}
                    </div>

                </div>

            `;

        }

        const totalBalanceElement =
        document.getElementById(
            "totalBalance"
        );

        if (totalBalanceElement) {

            totalBalanceElement.innerText =
            `₹${totalBalance.toLocaleString()}`;

        }

    },

    setupLogout() {

        const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );

        if (!logoutBtn) return;

        logoutBtn.addEventListener(
            "click",
            async () => {

                try {

                    await api.logout();

                }
                catch (err) {

                    console.log(err);

                }

                localStorage.clear();

                window.location.href =
                "login.html";

            }
        );

    }

};

document.addEventListener(
    "DOMContentLoaded",
    () => {

        dashboard.init();

    }
);