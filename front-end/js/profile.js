// profile.js

const profilePage = {

    async init() {

        this.checkAuth();

        this.loadUserInfo();

        await this.loadStats();

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

        if (!user) {

            localStorage.clear();

            return window.location.href =
            "login.html";

        }

        document.getElementById(
            "userName"
        ).innerText =
        user.name;

        document.getElementById(
            "userEmail"
        ).innerText =
        user.email;

        document.getElementById(
            "userId"
        ).innerText =
        user._id;

        document.getElementById(
            "avatar"
        ).innerText =
        user.name
            .charAt(0)
            .toUpperCase();

    },

    async getBalance(accountId) {

        try {

            const data =
            await api.getBalance(
                accountId
            );

            return data.balance || 0;

        }
        catch {

            return 0;

        }

    },

    async loadStats() {

        try {

            const data =
            await api.getAccounts();

            const accounts =
            data.accounts || [];

            document.getElementById(
                "accountCount"
            ).innerText =
            accounts.length;

            let totalBalance = 0;

            for (const account of accounts) {

                totalBalance +=
                await this.getBalance(
                    account._id
                );

            }

            document.getElementById(
                "totalBalance"
            ).innerText =
            `₹${totalBalance.toLocaleString()}`;

        }
        catch (error) {

            console.error(error);

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
                catch (error) {

                    console.log(error);

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

        profilePage.init();

    }
);