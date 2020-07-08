# fancy-todo

TodoDancy Todo App is an application to manage your todo list . This app has:
* RESTful endpoint for asset's CRUD Operation
* JSON Formated Response

## RESTful endpoints

### GET /todos
> Get all todos

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "id": 4,
        "title": "Bima",
        "description": "test",
        "status": "test",
        "due_date": "2019-02-02T00:00:00.000Z",
        "createdAt": "2020-07-06T08:24:30.000Z",
        "updatedAt": "2020-07-06T08:24:30.000Z"
    },
    {
        "id": 3,
        "title": "cinta",
        "description": "cintaku",
        "status": "onhold",
        "due_date": "2019-02-01T17:00:00.000Z",
        "createdAt": "2020-07-06T06:17:43.834Z",
        "updatedAt": "2020-07-06T08:30:20.027Z"
    }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```


### GET /todos/:id
> Get todos base on requested id

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "id": 4,
    "title": "Bima",
    "description": "test",
    "status": "test",
    "due_date": "2019-02-02T00:00:00.000Z",
    "createdAt": "2020-07-06T08:24:30.000Z",
    "updatedAt": "2020-07-06T08:24:30.000Z"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```



### POST /todos
> Create new todos

_Request Header_
```
not needed
```

_Request Body_
```
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>"
  "status": "<status to get insert into>"
  "due_date": "<due_date to get insert into>"
}
```

_Response (201)_
```
{
  "id": <given id by system>,
  "title": "<title to get insert into>",
  "description": "<description to get insert into>"
  "status": "<status to get insert into>"
  "due_date": "<due_date to get insert into>"
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "all input required"
}
```


### PUT /todos/update/:id
> Update existing todos

_Request Header_
```
not needed
```

_Request Body_
```
{
  "title": "<title to get updated into>",
  "description": "<description to get updated into>"
  "status": "<status to get updated into>"
  "due_date": "<due_date to get updated into>"
}
```

_Response (201)_
```
{
    "id": 3,
    "title": "<title to get update into>",
    "description": "<description to get update into>"
    "status": "<status to get update into>"
    "due_date": "<due_date to get update into>"
    "createdAt": "2020-07-06T06:17:43.834Z",
    "updatedAt": "2020-07-06T09:21:27.916Z"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "all input required"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```



### DELETE /todos/update/:id
> Delete Selected Id

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (201)_
```
{
    "id": 3,
    "title": "minum",
    "description": "minum madu",
    "status": "udah",
    "due_date": "2019-02-02T00:00:00.000Z",
    "UserId": null,
    "createdAt": "2020-07-06T12:14:59.639Z",
    "updatedAt": "2020-07-06T12:14:59.639Z"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```


### LOGIN /login
> Login User

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get login>",
  "password": "<password to get login>"
}
```

_Response (201)_
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJiaW1hMTIzQGdtYWlsLmNvbSIsImlhdCI6MTU5NDA0MDIxOX0.4ngkGDY0O8VwYbo1IjNXelY9gH9fa60YoAl_wHziKwo"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```



### REGISTER /register
> Register User

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get register into>",
  "password": "<password to get register into>"
}
```

_Response (201)_
```
{
    "id": 3,
    "email": "galih@gmail.com",
    "password": "$2b$08$wyr.W5B2KXpihNdU7A5IXuERvFjEm4nN43n.BPJW7fby5lv/MxI86",
    "updatedAt": "2020-07-06T13:01:52.682Z",
    "createdAt": "2020-07-06T13:01:52.682Z"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```