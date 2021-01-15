const express = require('express');
const app = express();
const morgan = require('morgan'); //for logging request details.

const AppError = require('./AppError');

app.use(morgan('tiny'));
//Testing middlewares
// app.use((req,res,next) => {
//     console.log("HEY");
//     next();
// });
//Testing middlewares again....
// app.use((req,res,next) => {
//     console.log("HEY AGAIN");
//     next();
// });

const verifyPassword = (req,res,next) => {
    const { password } = req.query;
    if(password === 'nugget'){
        next();
    }
    // res.send('INCORRECT PASSWORD');
    // throw new Error('Try again');
    throw new AppError('Password required', 400);
}

app.get('/secret', verifyPassword, (req,res) => {
    res.send('MY SECRET IS: .............');
})

app.get('/error', (req,res,) => {
    chicken.fly();
})

app.get('/admin',  (req,res) => {
    throw new AppError('You are not an admin', 403)
});

app.use((req, res) => {
    res.status(404).send('NOT FOUND!')
})

//middleware that handles all errors in express
app.use((err, req,res,next) => {
    const { status = 500, message = 'Something went wrong'} = err;
    res.status(status).send(message);
})

app.listen(3000, () => {
    console.log('Server is running on localhost:3000')
})