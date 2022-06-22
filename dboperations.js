var config = require('./dbconfig');
const sql = require('mssql');


async function getMovies() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from Movies");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getMovie(orderId) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.VarChar, orderId)
            .query("SELECT * from Movies where Title = @input_parameter");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function getMovieYear(orderId,year){
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.VarChar, orderId)
            .input('year_p',sql.VarChar,year)
            .query("SELECT * from Movies where Title = @input_parameter and Year = @year_p");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function getSelectMovies() {

    var myquery = ["SELECT top 5 * from Movies order by rand(),Title","SELECT TOP 5 * FROM Movies ORDER BY RAND()",
                "SELECT TOP 5 * FROM Movies ORDER BY Director","SELECT TOP 5 * FROM Movies ORDER BY RAND(),Title",
                "SELECT TOP 5 * FROM Movies ORDER BY Writers","SELECT TOP 5 * FROM Movies ORDER BY Cast"];
    var item = myquery[Math.floor(Math.random()*myquery.length)];    
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query(item);
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getSelectMoviesDesc() {

    var myquery = ["SELECT top 5 * from Movies order by rand() Desc,Title","SELECT TOP 5 * FROM Movies ORDER BY RAND() desc",
                "SELECT TOP 5 * FROM Movies ORDER BY Rating","SELECT TOP 5 * FROM Movies ORDER BY RAND(),Rating desc",
                "SELECT TOP 5 * FROM Movies ORDER BY Writers desc","SELECT TOP 5 * FROM Movies ORDER BY Cast desc",
                "SELECT TOP 5 * FROM Movies ORDER BY Cast,Runtime desc"];
    var item = myquery[Math.floor(Math.random()*myquery.length)];    
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query(item);
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getUserDetails() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from UserDetails");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}


async function getLogin(email,pass){
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('email', sql.VarChar, email)
            .input('password',sql.VarChar, pass)
            .query("SELECT uid from UserDetails where Email = @email and password = @password");
            try{
                if(product.recordsets[0][0].uid != null){
                    return product.recordsets;
                }
            }
            catch(error){
                return 0;
            }
    }
    catch (error) {
        console.log(error);
    }
}


async function signUpUser(uid, name, userid, email, subscriptionstatus, address, phonenum, creditcardno, payment_id, pass){
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('u_id', sql.Int, uid)
            .input('n_ame',sql.VarChar, name)
            .input('u_serid', sql.VarChar, userid)
            .input('e_mail',sql.VarChar, email)
            .input('s_ubscriptionstatus', sql.VarChar, subscriptionstatus)
            .input('a_ddress',sql.VarChar, address)
            .input('p_honenum', sql.VarChar, phonenum)
            .input('c_reditcardno',sql.Int, creditcardno)
            .input('p_ayment_id', sql.VarChar, payment_id)
            .input('p_assword',sql.VarChar, pass)
            .query("insert into UserDetails values(@u_id, @n_ame, @u_serid, @e_mail, @s_ubscriptionstatus, @a_ddress, @p_honenum, @c_reditcardno, @p_ayment_id, @p_assword)");
            return 1;
    }
    catch (error) {
        console.log(error);
        return 0;
    }
}


async function viewProfile() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT * from UserDetails");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getUser(email,pass) {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request()
            .input('em',sql.VarChar,email)
            .input('pa',sql.VarChar,pass)
            .query("SELECT * from UserDetails where Email = @em and password = @pa");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function updateUser(uid_,email,name,number,address_,credit_) {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request()
            .input("id",sql.Int, uid_)
            .input('ema',sql.VarChar,email)
            .input('nm',sql.VarChar,name)
            .input('num',sql.VarChar,number)
            .input("ad",sql.VarChar,address_)
            .input("cr",sql.Int,credit_)
            .query("UPDATE UserDetails Set Email = @ema, Username=@nm, Phone_Number=@num, Address = @ad, Credit_Card_Number=@cr where uid=@id ");
        return 1;
    }
    catch (error) {
        return 0;
        console.log(error);
    }
}


async function deleteUser(uid) {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request()
            .input('id',sql.Int,uid)
            .query("Delete from UserDetails where uid=@id");
        return 1;
    }
    catch (error) {
        return 0;
        console.log(error);
    }
}





// async function addOrder(order) {

//     try {
//         let pool = await sql.connect(config);
//         let insertProduct = await pool.request()
//             .input('Id', sql.Int, order.Id)
//             .input('Title', sql.NVarChar, order.Title)
//             .input('Quantity', sql.Int, order.Quantity)
//             .input('Message', sql.NVarChar, order.Message)
//             .input('City', sql.NVarChar, order.City)
//             .execute('InsertOrders');
//         return insertProduct.recordsets;
//     }
//     catch (err) {
//         console.log(err);
//     }

// }






module.exports = {
    getMovies: getMovies,
    getMovie : getMovie,
    getMovieYear:getMovieYear,
    getSelectMovies:getSelectMovies,
    getSelectMoviesDesc:getSelectMoviesDesc,
    getUserDetails:getUserDetails,
    getLogin:getLogin,
    signUpUser:signUpUser,
    viewProfile:viewProfile,
    getUser:getUser,
    updateUser:updateUser,
    deleteUser:deleteUser,
    // addOrder : addOrder
}