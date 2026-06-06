// transfer.js

const transferPage = {

    async init() {

        this.checkAuth();

        await this.loadAccounts();

        this.setupAmountPreview();

        this.setupTransferForm();

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

            const select =
            document.getElementById(
                "fromAccount"
            );

            if (!select) return;

            select.innerHTML = "";

            data.accounts.forEach(
                account => {

                    select.innerHTML += `
                        <option value="${account._id}">
                            ${account._id}
                        </option>
                    `;

                }
            );

        }
        catch (error) {

            console.error(error);

            this.showError(
                "Failed to load accounts"
            );

        }

    },

    setupAmountPreview() {

        const amountInput =
        document.getElementById(
            "amount"
        );

        const preview =
        document.getElementById(
            "preview"
        );

        if (
            !amountInput ||
            !preview
        ) return;

        amountInput.addEventListener(
            "input",
            (e) => {

                const amount =
                e.target.value || 0;

                preview.innerText =
                `₹${Number(amount)
                .toLocaleString()}`;

            }
        );

    },

    generateIdempotencyKey() {

        return (
            Date.now() +
            "-" +
            Math.random()
            .toString(36)
            .substring(2, 15)
        );

    },

    setupTransferForm() {

        const form =
        document.getElementById(
            "transferForm"
        );

        if (!form) return;

        form.addEventListener(
            "submit",
            async (e) => {

                e.preventDefault();

                await this.submitTransfer();

            }
        );

    },

    async submitTransfer() {

        try {

            const fromAccount =
            document.getElementById(
                "fromAccount"
            ).value;

            const toAccount =
            document.getElementById(
                "toAccount"
            ).value;

            const amount =
            Number(
                document.getElementById(
                    "amount"
                ).value
            );

            if (!fromAccount) {

                return this.showError(
                    "Please select an account"
                );

            }

            if (!toAccount) {

                return this.showError(
                    "Recipient account is required"
                );

            }

            if (
                !amount ||
                amount <= 0
            ) {

                return this.showError(
                    "Enter a valid amount"
                );

            }

            const result =
            await api.transferMoney(
                fromAccount,
                toAccount,
                amount,
                this.generateIdempotencyKey()
            );

            this.showSuccess(
                result.message ||
                "Transfer completed successfully"
            );

            document
            .getElementById(
                "transferForm"
            )
            .reset();

            document
            .getElementById(
                "preview"
            )
            .innerText = "₹0";

        }
        catch (error) {

            this.showError(
                error.message
            );

        }

    },

    showSuccess(message) {

        const successBox =
        document.getElementById(
            "successBox"
        );

        const errorBox =
        document.getElementById(
            "errorBox"
        );

        if (successBox) {

            successBox.style.display =
            "block";

            successBox.innerText =
            message;

        }

        if (errorBox) {

            errorBox.style.display =
            "none";

        }

    },

    showError(message) {

        const successBox =
        document.getElementById(
            "successBox"
        );

        const errorBox =
        document.getElementById(
            "errorBox"
        );

        if (errorBox) {

            errorBox.style.display =
            "block";

            errorBox.innerText =
            message;

        }

        if (successBox) {

            successBox.style.display =
            "none";

        }

    }

};

document.addEventListener(
    "DOMContentLoaded",
    () => {

        transferPage.init();

    }
);