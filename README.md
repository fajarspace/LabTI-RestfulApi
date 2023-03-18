## eLab pelitabangsa

### Build with Node.js and ❤️

Test with Postman or Rest Client

### Examples : 

## GET all users

### Request

`GET /users/`

    http://localhost:4000/users/

### Response

    [
      {
          "uuid": "0173bf2a-86b0-4be5-b445-eb8b2805875b",
          "nama": "Asisten",
          "email": "asisten@gmail.com",
          "role": "admin"
      },
      {
          "uuid": "44a78fd6-41bc-438f-885a-0de9291f3788",
          "nama": "Dummy",
          "email": "dummy@gmail.com",
          "role": "user"
      }
    ]


```
GET all users by ID
```

`GET /users/0173bf2a-86b0-4be5-b445-eb8b2805875b`

Create new users

`POST /users/`

Update users

`PATCH /users/0173bf2a-86b0-4be5-b445-eb8b2805875b`

Delete users

`DELETE /users/0173bf2a-86b0-4be5-b445-eb8b2805875b`