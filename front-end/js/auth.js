document.addEventListener("DOMContentLoaded", () => {

    /*
    |--------------------------------------------------------------------------
    | Register Page
    |--------------------------------------------------------------------------
    */
    const registerForm = document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            try {

                const response = await registerUser({
                    name,
                    email,
                    password
                });

                saveToken(response.token);

                alert("Registration Successful!");

                window.location.href = "dashboard.html";

            } catch (error) {

                alert(error.message);

            }

        });

    }

    /*
    |--------------------------------------------------------------------------
    | Login Page
    |--------------------------------------------------------------------------
    */
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            try {

                const response = await loginUser({
                    email,
                    password
                });

                saveToken(response.token);

                alert("Login Successful!");

                window.location.href = "dashboard.html";

            } catch (error) {

                alert(error.message);

            }

        });

    }

    /*
    |--------------------------------------------------------------------------
    | Logout Button
    |--------------------------------------------------------------------------
    */
    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {

        logoutBtn.addEventListener("click", async (e) => {
            e.preventDefault();

            try {

                await logoutUser();

            } catch (error) {
                console.log(error);
            }

            removeToken();

            window.location.href = "login.html";
        });

    }

});


/*
|--------------------------------------------------------------------------
| Route Protection
|--------------------------------------------------------------------------
*/

function protectRoute() {

    if (!isLoggedIn()) {

        window.location.href = "login.html";

    }

}


/*
|--------------------------------------------------------------------------
| Redirect Logged-in User Away From Auth Pages
|--------------------------------------------------------------------------
*/

function redirectIfLoggedIn() {

    if (isLoggedIn()) {

        window.location.href = "dashboard.html";

    }

}