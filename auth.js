document.addEventListener("DOMContentLoaded", function(){

    let params = new URLSearchParams(window.location.search);
    let mode = params.get("mode");

    let loginForm = document.getElementById("loginForm");
    let registerForm = document.getElementById("registerForm");

    if(mode === "register"){
        loginForm.style.display = "none";
        registerForm.style.display = "block";
    }else{
        loginForm.style.display = "block";
        registerForm.style.display = "none";
    }

    /* ================= REGISTER ================= */

    let registerBtn = registerForm.querySelector(".login-btn-new");

    registerBtn.addEventListener("click", function(e){

        e.preventDefault();

        let name = registerForm.querySelector("input[type='text']").value;
        let email = registerForm.querySelector("input[type='email']").value;
        let password = registerForm.querySelector("input[type='password']").value;
        let role = document.getElementById("userRole").value;

        let userData = {
            name:name,
            email:email,
            password:password,
            role:role
        };

        let accounts = JSON.parse(localStorage.getItem("smarteduAccounts")) || [];

        // check duplicate email
        let exists = accounts.find(acc => acc.email === email);

        if(exists){
            alert("Account already exists. Please login.");
            return;
        }

        accounts.push(userData);

        localStorage.setItem("smarteduAccounts", JSON.stringify(accounts));

        // create login session
        localStorage.setItem("smarteduUser", JSON.stringify(userData));

        window.location.href="dashboard.html";
    });

    /* ================= LOGIN ================= */

    let loginBtn = loginForm.querySelector(".login-btn-new");

    loginBtn.addEventListener("click", function(e){

        e.preventDefault();

        let emailInput = loginForm.querySelector("input[type='email']").value;
        let passwordInput = loginForm.querySelector("input[type='password']").value;

        let accounts = JSON.parse(localStorage.getItem("smarteduAccounts")) || [];

        let savedUser = accounts.find(acc =>
            acc.email === emailInput && acc.password === passwordInput
        );

        if(savedUser){

            localStorage.setItem("smarteduUser", JSON.stringify(savedUser));
            window.location.href="dashboard.html";

        }else{
            alert("Invalid Email or Password");
        }
    });

});