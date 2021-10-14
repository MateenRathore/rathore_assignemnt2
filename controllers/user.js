const connection = require("../database")

const indexpage = (req,res)=>{
    res.render('index');
};

const logout = (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
};

const dashboardpage = async(req, res)=>{
    let sql = `SELECT Role_IDrole FROM user WHERE loginID = "${req.user.id}"`;
    connection.query(sql, await function(err,result){
        if(result[0].Role_IDrole == undefined){
            res.redirect("/signup");
        }else{
            // if(result[0].Role_IDrole == '2' || result[0].Role_IDrole == '3'){

            // }
            res.set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'").render('dashboard',{role:result[0].Role_IDrole});
        }
    });
}

const signup = async(req,res)=>{
    let sql = `SELECT Role_IDrole FROM user WHERE loginID = "${req.user.id}"`;
    connection.query(sql, await function(err,result){
        if(result[0].Role_IDrole == undefined){
            return res.render('signup');
        }else{
            res.redirect('/dashboard');
        }
    });
};

const googlelogin = (req, res) => {
    let sql = `SELECT * FROM user WHERE loginID = "${req.user.id}"`;
    connection.query(sql, function(err,results){
        if(err) throw err;
        if(results.length){
            res.redirect('/dashboard');
        }else{
            sql = `INSERT INTO user (username, loginID) VALUES ('${req.user.displayName}', '${req.user.id}')`;
            connection.query(sql, function(err, result){
                if(err) throw err;
                res.redirect("/signup");
            })
        }
    });
}

const facebooklogin = (req, res) => {
    let sql = `SELECT * FROM user WHERE loginID = "${req.user.id}"`;
    connection.query(sql, function(err,result){
        if(err) throw err;
        if(result.length){
            res.redirect('/dashboard');
        }else{
            sql = `INSERT INTO user (username, loginID) VALUES ('${req.user.displayName}', '${req.user.id}')`;
            connection.query(sql, function(err, result){
                if(err) throw err;
                res.redirect("/signup");
            })
        }
    });
};

const githublogin = (req, res) => {
    let sql = `SELECT * FROM user WHERE loginID = "${req.user.id}"`;
    connection.query(sql, function(err,results){
        if(err) throw err;
        if(results.length){
            res.redirect('/dashboard');
        }else{
            sql = `INSERT INTO user (username, loginID) VALUES ('${req.user.username}', '${req.user.id}')`;
            connection.query(sql, function(err, result){
                if(err) throw err;
                res.redirect("/signup");
            })
        }
    });
}

const signupPage = (req, res)=>{
    let roleId = parseInt(req.body.role);
    let organizationId = parseInt(req.body.organization);
    let sql = `UPDATE user SET Role_IDrole = ${roleId}, Organization = ${organizationId} WHERE loginID = "${req.user.id}";`
    connection.query(sql, function(err,results){
        if(err) throw err;
        if(results.changedRows>0){
            res.redirect('/dashboard');
        }
    });
}
module.exports= {
    indexpage,
    logout,
    dashboardpage,
    signup, 
    googlelogin,
    facebooklogin,
    githublogin,
    signupPage
}