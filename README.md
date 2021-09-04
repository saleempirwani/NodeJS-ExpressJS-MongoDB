# NodeJS-ExpressJS-MongoDB

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
