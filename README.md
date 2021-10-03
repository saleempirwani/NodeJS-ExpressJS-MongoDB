# NodeJS-ExpressJS-MongoDB

##### Quick Start REST_API
```
const express = require("express");

const app = express();

const PORT = process.env.PORT | 3000;

app.get("/", (req, res) => {
    res.send('Hello World')
});

app.listen(PORT, () => console.log(`Listening at: http://localhost:${PORT}`));

```

##### bcrypt - Algo for password encryption
```
const myFunction () => {
    const password = 'Red1234!'
    const hashedPassword = bcrypt.hash(password, 8)

    console.log(password)
    console.log(hashedPassword)

    const isMatch = await bcrypt.compare('red1234!', hashedPassword)

    console.log(isMatch)
}

myFunction()
```

##### jwt - json web token
```
const myFunction () => {
   
   const token = jwt.sign({_id: 'df123'}, 'SECRET', {expiresIn: '7 days'})

   console.log(token)

   const data = jwt.verify(token, 'SECRET')
}

myFunction()
```

## Projects
* Weather App (Third Party API): https://selim-weather-app.herokuapp.com
* Student Management System (CRUD Operations).
