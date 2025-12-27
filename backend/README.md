Backend setup (development)

1) Install dependencies

```bash
cd backend
npm install
```

2) Create database and tables (adjust MySQL credentials as needed)

```bash
# from project root or using a MySQL client
mysql -u root -p < backend/create_tables.sql
```

3) Create a `.env` file in the `backend` folder with:

```
DB_HOST=localhost
DB_USER=root
DB_PASS=your_password
DB_NAME=class_routine_db
PORT=3000
```

4) Run the server

```bash
cd backend
npm start
```

The server exposes endpoints on `http://localhost:3000/api`:

- `GET /api/sync` — returns {teachers,students,classes,notifications}
- `POST /api/register/teacher` — body {name,email,password}
- `POST /api/register/student` — body {name,email,password}
- `POST /api/login` — body {email,password,role}
