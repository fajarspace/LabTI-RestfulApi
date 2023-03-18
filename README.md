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


## GET users By Id

### Request

`GET /users/:id`

    http://localhost:4000/users/0173bf2a-86b0-4be5-b445-eb8b2805875b

### Response

    [
      {
          "uuid": "0173bf2a-86b0-4be5-b445-eb8b2805875b",
          "nama": "Asisten",
          "email": "asisten@gmail.com",
          "role": "admin"
      }
    ]


## Create new users

### Request

`POST /users/:id`

    http://localhost:4000/users/

    {
      "nama":"fajar",
      "email":"fajar@gmail.com",
      "password":"fajar1232",
      "konfirmPassword":"fajar1232",
      "role":"admin"
    }

### Response

    {
      "msg": "Register Berhasil"
    }


## Update users

### Request

`PATCH /users/:id`

    http://localhost:4000/users/0173bf2a-86b0-4be5-b445-eb8b2805875b

    {
      "nama":"Fajar Agung",
      "email":"fajar.agung@gmail.com",
      "password":"fajar1232",
      "konfirmPassword":"fajar1232",
      "role":"admin"
    }

### Response

    {
      "msg": "Update berhasil!"
    }


## Delete users

### Request

`DELETE /users/:id`

    http://localhost:4000/users/0173bf2a-86b0-4be5-b445-eb8b2805875b

### Response

    {
      "msg": "Hapus berhasil!"
    }

