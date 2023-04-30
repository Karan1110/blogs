
## 🚀 About Me
I'm Karan, a backend developer.

I'm based in India,Karnataka,Bengaluru.





## Installation

To start this API
```bash
git clone https://github.com/Karan1110/veera.git
npm install
npm run dev
```

In case of restarting the Database
run 
``` bash
node destroy
```

# Blog API
An API written in Express framework using PostgreSQL as DBMS.

## Features

- list blogs with pagination.
 - CRUD features for Users,Blogs and Authors
 - foreign key constraint protection for one to one  relation ship for blogs and author
 - logging errors using winston to DB OR logs File
 - using express-async-errors to concentrate  on application logic and also to handle errors gracefully with winston
 - usage of config for safe env variables.
 - input validation using joi
 - use of JWT,bcrypt and middleware for authentication   and authorization
 - use of middleware for handling db connection and eror handling
## Deployment

To deploy this project run

```bash
 heroku create <app-name>
```

```bash
heroku addons:create heroku-postgresql:hobby-dev
```
```bash
heroku config:set DATABASE_URL=<your-api-key> JwtPrivateKey=<your-secret-key>
```

```bash
git add .
git commit -m "Initial commit"
git push heroku master
```

```bash
git add .
git commit -m "Initial commit"
git push heroku master
```

```bash
heroku open
```
