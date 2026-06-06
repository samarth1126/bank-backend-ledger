// transactions.js

const transactionsPage = {

    transactions: [],

    async init() {

        this.checkAuth();

        await this.loadTransactions();

        this.setupSearch();

    },

    checkAuth() {

        if (
            !localStorage.getItem(
                "token"
            )
        ) {

            window.location.href =
            "login.html";

        }

    },

    async loadTransactions() {

        try {

            const data =
            await api.getTransactions();

            this.transactions =
            data.transactions || [];

            this.renderTransactions(
                this.transactions
            );

        }
        catch (error) {

            console.error(error);

        }

    },

    renderTransactions(transactions) {

        const container =
        document.getElementById(
            "transactionsContainer"
        );

        if (
            transactions.length === 0
        ) {

            container.innerHTML = `
                <div class="empty-state">
                    No transactions found.
                </div>
            `;

            return;

        }

        container.innerHTML =
        `<div class="transactions-list"></div>`;

        const list =
        document.querySelector(
            ".transactions-list"
        );

        transactions.forEach(
            transaction => {

                const status =
                transaction.status
                .toLowerCase();

                const date =
                new Date(
                    transaction.createdAt
                );

                list.innerHTML += `

                    <div class="transaction-card">

                        <div class="transaction-top">

                            <div>

                                <h3>
                                    Transfer
                                </h3>

                                <div class="meta">
                                    ${date.toLocaleString()}
                                </div>

                            </div>

                            <div class="status ${status}">
                                ${transaction.status}
                            </div>

                        </div>

                        <div class="amount">
                            ₹${transaction.amount.toLocaleString()}
                        </div>

                        <div class="meta">
                            From:
                            ${transaction.fromAccount}
                        </div>

                        <div class="meta">
                            To:
                            ${transaction.toAccount}
                        </div>

                    </div>

                `;

            }
        );

    },

    setupSearch() {

        const input =
        document.getElementById(
            "searchInput"
        );

        if (!input) return;

        input.addEventListener(
            "input",
            (e) => {

                const query =
                e.target.value
                .toLowerCase();

                const filtered =
                this.transactions.filter(
                    transaction => {

                        return (

                            transaction
                            .fromAccount
                            .toLowerCase()
                            .includes(query)

                            ||

                            transaction
                            .toAccount
                            .toLowerCase()
                            .includes(query)

                            ||

                            transaction
                            .status
                            .toLowerCase()
                            .includes(query)

                        );

                    }
                );

                this.renderTransactions(
                    filtered
                );

            }
        );

    }

};

document.addEventListener(
    "DOMContentLoaded",
    () => {

        transactionsPage.init();

    }
);