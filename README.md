# fancy-todo

Fancy Todo App is an application to manage your todo list . This app has:
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
        "id": "<show id data>",
        "title": "<show title data>",
        "description": "<show description data>",
        "status": "<show status data>",
        "due_date": "<show due_date data>",
        "createdAt": "<show createdAt data>",
        "updatedAt": "<show updatedAt data>"
    },
    {
        "id": "<show id data>",
        "title": "<show title data>",
        "description": "<show description data>",
        "status": "<show status data>",
        "due_date": "<show due_date data>",
        "createdAt": "<show createdAt data>",
        "updatedAt": "<show updatedAt data>"
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
    "id": "<show id by requested id>",
    "title": "<show title by requested id>",
    "description": "<show description by requested id>",
    "status": "<show status by requested id>",
    "due_date": "<show due_date by requested id>",
    "createdAt": "<show createdAt by requested id>",
    "updatedAt": "<show updatedAt by requested id>"
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
On this method, also hit mailGun API to perform send email after new Todo created.

_Request Header_
```
not needed
```

_Request Body_
```
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due_date to get insert into>"
}
```

_Response (201)_
```
{
  "id": <given id by system>,
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "status": "<status to get insert into>",
  "due_date": "<due_date to get insert into>",
  "createdAt": "<createdAt to get insert into>",
  "updatedAt": "<updatedAt to get insert into>"
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
  "title": "<title to get update into>",
  "description": "<description to get update into>",
  "status": "<status to get update into>",
  "due_date": "<due_date to get update into>"
}
```

_Response (200)_
```
{
    "id": "<id to get update into>",
    "title": "<title to get update into>",
    "description": "<description to get update into>",
    "status": "<status to get update into>",
    "due_date": "<due_date to get update into>",
    "createdAt": "<createdAt to get update into>",
    "updatedAt": "<updatedAt to get update into>"
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
> Delete todo for Selected Id

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
    "id": "<contain id that deleted>",
    "title": "<contain title that deleted>",
    "description": "<contain description that deleted>",
    "status": "<contain status that deleted>",
    "due_date": "<contain due_date that deleted>",
    "UserId": "<contain due_date that deleted>",
    "createdAt": "<contain createdAt that deleted>",
    "updatedAt": "<contain updatedAt that deleted>"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```


### POST /login
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

_Response (200)_
```
{
    "access_token": "<access_token JWT>"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```



### POST /register
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
    "id": "<id given by system>",
    "email": "<contain email result register>",
    "password": "<contain password result register>",
    "updatedAt": "<contain updatedAt result register>",
    "createdAt": "<contain createdAt result register>"
}
```

_Response (404 - Not Found)_
```
{
  "message": "data not found"
}
```