# eLab pelitabangsa

### Build with Node.js and ❤️

Test with Postman or Rest Client

# Documentation API : 

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

<hr>

## Login users

### Request

`POST /login/`

    http://localhost:4000/login

### Response

    {
      "uuid": "0173bf2a-86b0-4be5-b445-eb8b2805875b",
      "email": "asisten@gmail.com",
      "role": "admin"
    }

## Profile users

### Request

`GET /profile/`

    http://localhost:4000/profile

### Response

    {
      "uuid": "0173bf2a-86b0-4be5-b445-eb8b2805875b",
      "nama": "Asisten",
      "email": "asisten@gmail.com",
      "role": "admin"
    }

## Logout

### Request

`DELETE /logout/`

    http://localhost:4000/logout

### Response

    {
      "msg": "Anda telah logout"
    }

<hr>

## GET all jadwal

### Request

`GET /jadwal/`

    http://localhost:4000/jadwal

### Response

      [
        {
          "uuid": "ecedadec-0495-478b-a504-c7c10bc78dc9",
          "dosen": "Najamuddin dwi, S.Kom, M.Kom",
          "asisten1": "Fajar Agung",
          "asisten2": "M. Romdon",
          "tanggal": "2023-03-23",
          "jam": "09:30",
          "kelas": "TI.20.A.3",
          "praktikum": "Data Mining",
          "user": {
              "nama": "Asisten",
              "email": "asisten@gmail.com"
          }
        },
        {
          "uuid": "ad8c8edb-38f4-4c9d-93c0-3a8546f21b80",
          "dosen": "Alfiyan, S.Kom",
          "asisten1": "Veno Setyoaji",
          "asisten2": "Maulana Muhammad",
          "tanggal": "2023-03-23",
          "jam": "13:00",
          "kelas": "TI.20.A.1",
          "praktikum": "Data Mining",
          "user": {
              "nama": "Asisten",
              "email": "asisten@gmail.com"
          }
        },
        {
          "uuid": "3c7e457a-d621-49f5-a2a3-2a917428cb6e",
          "dosen": "Agung Nugroho, S.Kom, M.Kom",
          "asisten1": "Veno Setyoaji",
          "asisten2": "Maulana Muhammad",
          "tanggal": "2023-03-30",
          "jam": "02:48",
          "kelas": "TI.20.A.1",
          "praktikum": "Bahasa Pemrograman",
          "user": {
              "nama": "Asisten",
              "email": "asisten@gmail.com"
            }
        }
      ]

## GET jadwal by Id

### Request

`GET /jadwal/:id`

    http://localhost:4000/jadwal/ecedadec-0495-478b-a504-c7c10bc78dc9

### Response

    {
      "uuid": "ecedadec-0495-478b-a504-c7c10bc78dc9",
      "dosen": "Najamuddin dwi, S.Kom, M.Kom",
      "asisten1": "Fajar Agung",
      "asisten2": "M. Romdon",
      "tanggal": "2023-03-23",
      "jam": "09:30",
      "kelas": "TI.20.A.3",
      "praktikum": "Data Mining",
      "user": {
          "nama": "Asisten",
          "email": "asisten@gmail.com"
      }
    }

## Create new jadwal

### Request

`POST /jadwal/`

    http://localhost:4000/jadwal

    {
      "dosen":"najamuddin, S.Kom, M.Kom",
      "asisten1":"fajar",
      "asisten2":"veno",
      "tanggal":"20-03-2023",
      "jam":"08:00",
      "kelas":"TI.20.A.1",
      "praktikum":"data mining"
    }

### Response

    {
      "msg": "Jadwal berhasil dibuat!"
    }

## Update jadwal

### Request

`PATCH /jadwal/`

    http://localhost:4000/jadwal/ad8c8edb-38f4-4c9d-93c0-3a8546f21b80

### Response

    {
      "uuid": "ad8c8edb-38f4-4c9d-93c0-3a8546f21b80",
      "dosen": "Alfiyan, S.Kom",
      "asisten1": "Veno Setyoaji",
      "asisten2": "Maulana Muhammad",
      "tanggal": "2023-03-23",
      "jam": "13:00",
      "kelas": "TI.20.A.1",
      "praktikum": "Data Mining",
    }

## Delete jadwal

### Request

`DELETE /jadwal/`

    http://localhost:4000/jadwal/ad8c8edb-38f4-4c9d-93c0-3a8546f21b80

### Response

    {
      "msg": "Jadwal berhasil di hapus!"
    }