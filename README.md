# fancy-todo

Fancy Todo App is an application to manage your project alongside your teammates with todo list shared with them . This app has:
* RESTful endpoint for Project creation Operation
* RESTful endpoint for Invite User to join Project Operation 
* RESTful endpoint for Todos CRUD Operation
* JSON Formated Response


## RESTful endpoints


### GET /project
> Get all project 

_Request Header_
```
{
  "access_token": "<access_token JWT>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": "<show id data from ProjectUser table>",
    "ProjectId": "<show ProjectId data from ProjectUser table>",
    "UserId": "<show UserId data from ProjectUser table>",
    "createdAt": "<show createdAt data from ProjectUser table>",
    "updatedAt": "<show updatedAt data from ProjectUser table>"
    "Project": {
      "id": "<show Project Id>",
      "name": "<show Project Name>",
      "deadline": "<show Project deadline>",
      "createdAt": "<show createdAt data>",
      "updatedAt": "<show updatedAt data>"
    },
    "User": {
      "id": "<show User id>",
      "email": "<show User Email>",
      "password": "<show User encrypted password>",
      "createdAt": "<show createdAt data>",
      "updatedAt": "<show updatedAt data>"
    }
  },
  {
    "id": "<show id data from ProjectUser table>",
    "ProjectId": "<show ProjectId data from ProjectUser table>",
    "UserId": "<show UserId data from ProjectUser table>",
    ""createdAt": "<show createdAt from ProjectUser table data>",
    "updatedAt": "<show updatedAt data from ProjectUser table>"
    "Project": {
      "id": "<show Project Id>",
      "name": "<show Project Name>",
      "deadline": "<show Project deadline>",
      "createdAt": "<show createdAt data>",
      "updatedAt": "<show updatedAt data>"
    },
    "User": {
      "id": "<show User id>",
      "email": "<show User Email>",
      "password": "<show User encrypted password>",
      "createdAt": "<show createdAt data>",
      "updatedAt": "<show updatedAt data>"
    }
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```


### GET /project/:projectId
> Get project base on selected Id

_Request Header_
```
{
  "access_token": "<access_token JWT>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "id": "<show project id data>",
  "name": "<show project name  data>",
  "deadline": "<show project deadline data>",
  "createdAt": "<show createdAt data>",
  "updatedAt": "<show updatedAt data>"
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


### POST /project
> Create new Project

_Request Header_
```
{
  "access_token": "<access_token JWT>"
}
```

_Request Body_
```
not needed
```

_Response (201)_
```
{
  "id": "<given id from database>",
  "name": "<show created project name >",
  "deadline": "<show created project deadline >",
  "createdAt": "<show createdAt data>",
  "updatedAt": "<show updatedAt data>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "all input required"
}
```


### GET /project/member/:projectId
> Get all member on selected project id

_Request Header_
```
{
  "access_token": "<access_token JWT>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": "<show id data from ProjectUser table>",
    "ProjectId": "<show Project Id data from ProjectUser table>",
    "UserId": "<show User Id data from ProjectUser table>",
    "createdAt": "<show createdAt data from ProjectUser table>",
    "updatedAt": "<show updatedAt data from ProjectUser table>"
    "Project": {
      "id": "<show Project id data>",
      "name": "<show Project name data>",
      "deadline": "<show Project deadline data>",
      "createdAt": "<show createdAt data>",
      "updatedAt": "<show updatedAt data>"
    },
    "User": {
      "id": "<show User id data>",
      "email": "<show email id data>",
      "password": "<show user encrypted password data>",
      "createdAt": "<show createdAt data>",
      "updatedAt": "<show updatedAt data>"
    }
  },
  {
    "id": "<show id data from ProjectUser table>",
    "ProjectId": "<show Project Id data from ProjectUser table>",
    "UserId": "<show User Id data from ProjectUser table>",
    "createdAt": "<show createdAt data from ProjectUser table>",
    "updatedAt": "<show updatedAt data from ProjectUser table>",
    "Project": {
      "id": "<show Project id data>",
      "name": "<show Project name data>",
      "deadline": "<show Project deadline data>",
      "createdAt": "<show createdAt data>",
      "updatedAt": "<show updatedAt data>"
    },
    "User": {
      "id": "<show User id data>",
      "email":"<show email id data>"",
      "password": "<show user encrypted password data>",
      "createdAt": "<show createdAt data>",
      "updatedAt": "<show updatedAt data>"
    }
  }
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```


### POST /project/invite/:projectId/:idUser
> Create new data on ProjectUser table 

_Request Header_
```
{
  "access_token": "<access_token JWT>"
}
```

_Request Body_
```
not needed
```

_Response (201)_
```
{
    "id": "<id from database>",
    "ProjectId": "<show inserted ProjectId data>",
    "UserId": "<show inserted UserId data>",
    "createdAt": "<show createdAt data>",
      "updatedAt": "<show updatedAt data>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
}
```

### GET /todos/:projectId
> Get all todos base on selected project Id

_Request Header_
```
{
    "access_token": "<access_token JWT>"
}
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
        "UserId": "<show UserId data>",
        "ProjectId": "<show ProjectId data>",
        "createdAt": "<show createdAt data>",
        "updatedAt": "<show updatedAt data>"
    },
    {
        "id": "<show id data>",
        "title": "<show title data>",
        "description": "<show description data>",
        "status": "<show status data>",
        "due_date": "<show due_date data>",
        "UserId": "<show UserId data>",
        "ProjectId": "<show ProjectId data>",
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


### GET /todos/:projectId/:id
> Get selected todos(id) base on selected project

_Request Header_
```
{
    "access_token": "<access_token JWT>"
}
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
    "UserId": "<show UserId by requested id>",
    "ProjectId": "<show ProjectId by requested id>",
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



### POST /todos/projectId
> Create new todos for selected Project Id
On this method, also hit mailGun API to perform send email after new Todo created.

_Request Header_
```
{
    "access_token": "<access_token JWT>"
}
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
  "UserId": "<UserId from login user>",
  "ProjectId": "<ProjectId from selected project>",
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


### PUT /todos/:projectId/:id
> Update existing todos on selected Project Id

_Request Header_
```
{
    "access_token": "<access_token JWT>"
}
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
    "UserId": "<UserId from login user>",
    "ProjectId": "<ProjectId from selected project>",
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



### DELETE /todos/projectId/:id
> Delete todo for Selected Id and selected project id

_Request Header_
```
{
    "access_token": "<access_token JWT>"
}
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
    "UserId": "<contain UserId that deleted>",
    "ProjectId": "<contain ProjectId that deleted>",
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


### GET /users
> Get all users data

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
        "email": "<show email data>",
        "password": "<show password data>",
        "createdAt": "<show createdAt data>",
        "updatedAt": "<show updatedAt data>"
    },
    {
        "id": "<show id data>",
        "email": "<show email data>",
        "password": "<show password data>",
        "createdAt": "<show createdAt data>",
        "updatedAt": "<show updatedAt data>"
    },
]
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid request"
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


### POST /googleSignin
> Login User with Google Sign in, if not registered, then do register user aswell

_Request Header_
```
not needed
```

_Request Body_
```
{
  "id_token" : "<id_token from google>" 
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