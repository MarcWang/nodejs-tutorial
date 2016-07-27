function App() {
    console.log('App');
    this.eventCTR = new EventController();
    this.apiMgr = new APIServer();
}


App.prototype.initialize = function() {
    let self = this;
    console.log('initialize');

    self.userLogin = false;

    var data = {
        directPage: '#',
        message: 'hello'
    };

    var arrData = [];
    arrData.push(data);
    arrData.push(data);
    self.eventCTR.genNotifyMessages('Msglist', arrData);

    var alertDatas = [];
    alertDatas.push({
        level: 0,
        alertName: 'Primary',
        labelName: '0'
    });
    alertDatas.push({
        level: 2,
        alertName: 'Info',
        labelName: '2'
    });
    alertDatas.push({
        level: 4,
        alertName: 'Danger',
        labelName: '4'
    });
    self.eventCTR.genAlertMessages('Alertlist', alertDatas);

    function setUserState(islogin, username) {
        if (islogin) {
            $('#state-user-login').hide();
            $('#state-user-logout').show();
            document.getElementById("user-name").innerHTML = username;
        } else {
            $('#state-user-login').show();
            $('#state-user-logout').hide();
            document.getElementById("user-name").innerHTML = 'Non';
        }
    }

    function checkUserLogin() {
        self.apiMgr.UserCheckLogin((err, res) => {
            if (err) {} else {
                console.log(res);
                if (res.result) {
                    self.userLogin = true;
                    setUserState(true, res.user);
                } else {
                    self.userLogin = false;
                    setUserState(false, 'Non');
                }
            }
        });
    }

    checkUserLogin();


    $('#userLogin').on('show.bs.modal', function(e) {
        document.getElementById("login-submit").onclick = () => {
            let loginUsername = document.getElementById('login-username').value;
            let loginPassword = document.getElementById('login-password').value;
            console.log(loginUsername);
            console.log(loginPassword);
            self.apiMgr.UserLogin(loginUsername, loginPassword, (err, res) => {
                if (err) {

                } else {
                    console.log(res);
                    if (res.result) {
                        self.userLogin = true;
                        setUserState(true, res.user);
                        $('#userLogin').modal('hide');
                    } else {
                        self.userLogin = false;
                        console.log("user or pass was error");
                    }
                }
            });
        };

        document.getElementById("login-signup").onclick = () => {
            $('#userLogin').modal('hide');
            $('#userSignup').modal('show');
        }

        document.getElementById("login-forgot-password").onclick = () => {
            console.log("login-forgot-password");
            $('#userLogin').modal('hide');
            $('#userForgotPassword').modal('show');
        }
        

        $('#userLogin').on('hidden.bs.modal', function(e) {
            console.log('userLogin was closed');
        })

        if (!data) return e.preventDefault();
    })

    $('#state-user-logout').click(function(event) {
        console.log("logout")
        self.apiMgr.UserLogout((err, res) => {
            if (err) {

            } else {
                setUserState(false, 'Non');
            }
        })
    });

    $('#userSignup').on('show.bs.modal', function(e) {
        document.getElementById("signup-submit").onclick = () => {
            console.log("signup");
            let username = document.getElementById('signup-username').value;
            let password = document.getElementById('signup-password').value;
            let email = document.getElementById('signup-email').value;
            self.apiMgr.UserSignup(username, password, email, (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    if (res.result) {
                        $('#userSignup').modal('hide');
                    } else {
                        console.log("user or pass was existed");
                    }
                }
            });
        };

        $('#signup-form').validator().on('valid.bs.validator', function(e) {
            console.log(e);
        })

        if (!data) return e.preventDefault();
    })

    $('#userForgotPassword').on('show.bs.modal', function(e) {
        document.getElementById("forgot-password-submit").onclick = () => {
            console.log("forgotPassword");
            let email = document.getElementById('forgot-password-email').value;
            // self.apiMgr.UserSignup(username, password, email, (err, res) => {
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         if (res.result) {
            //             $('#userSignup').modal('hide');
            //         } else {
            //             console.log("user or pass was existed");
            //         }
            //     }
            // });
        };

        if (!data) return e.preventDefault();
    })
}


let app = new App();
app.initialize();
