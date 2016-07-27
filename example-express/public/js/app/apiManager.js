function apiPost(url, postData, cb) {
    $.post("http://localhost:3000/" + url, postData)
        .done(function(data) {
            console.log(data);
            cb(null, data);
        })
        .fail(function() {
            console.log('fail');
        })
        .always(function() {
            console.log('finish');
        });
}

function apiGet(url, cb) {
    $.get("http://localhost:3000/" + url)
        .done(function(data) {
            cb(null, data);
        });
}

function APIServer() {

}

APIServer.prototype.UserCheckLogin = function( cb) {
    apiGet('v1/user/', cb);
};

APIServer.prototype.UserLogin = function(user, pass, cb) {
    apiPost('v1/user/login', { user: user, pass: pass }, cb);
};

APIServer.prototype.UserLogout = function(cb) {
    apiGet('v1/user/logout', cb);
};

APIServer.prototype.UserSignup = function(user, pass, email, cb) {
    apiPost('v1/user/signup', { user: user, pass: pass, email: email }, cb);
};

APIServer.prototype.UserResetPassword = function(pass, email, cb) {
    apiPost('v1/user/reset-password', { pass: pass, email: email }, cb);
};

APIServer.prototype.UserLostPassword = function(email, cb) {
    apiPost('v1/user/lost-password', { email: email }, cb);
};
