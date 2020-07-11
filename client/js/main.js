$(document).ready(function() {
    if (!localStorage.getItem('token')) {
        beforeLogin()
        $('#myModal').modal(options)
    } else {
        afterLogin()
    }
})

function afterLogin(){
    $('#cardTodos').show()
    $('#addProject').show()
    
    $('#logout').show()
    $('#loginForm').hide()
    $('#registerCard').hide()
    $('#addTodo').hide()
    $('#addToDoBtn').show()
    $('#editTodo').hide()
    $('#errorAddTodo').hide()
    $('#errorAddTodoUpdate').hide()
    $('#errorDelete').hide()
    $('#activeProject').show()
    $('#showDetailsProject').hide()
    $('#errorAddProject').hide()
    $('#addProjectForm').hide()

    fetchDataProject()
}

function beforeLogin(){
    $('#cardTodos').hide()
    $('#loginForm').show()
    $('#logout').hide()
    $('#registerCard').hide()
    $('#addTodo').hide()
    $('#addToDoBtn').hide()
    $('#addProject').hide()
    $('#addProjectForm').hide()
    $('#errorLogin').hide()
    $('#editTodo').hide()
    $('#successRegister').hide()
    $('#errorRegister').hide()
    $('#errorAddTodoUpdate').hide()
    $('#errorDelete').hide()
    $('#activeProject').hide()
    $('#showDetailsProject').hide()


}

function fetchDataTodos(projectId) {
    console.log(projectId,"projectIdprojectIdprojectId")
    $('#cardTodos').empty()
    $.ajax({
        method: "GET",
        url : `http://localhost:3333/todos/${projectId}`,
        headers : {
            access_token: localStorage.token
        }
    })
    .done( todos => {
        todos.forEach(todo => { 
            console.log(todo, "todotodo" )
            let due_date = new Date(todo.due_date)
            let getDate = `${due_date.getFullYear()}-0${due_date.getMonth()+1}-0${due_date.getDate()}`
            $('#cardTodos').append(`
            <div class="card" style="width: 18rem;margin: 1%" >
                <div class="card-body">
                    <h5 class="card-title text-info">${todo.title} </h5>
                    <h6 class="card-subtitle mb-2 text-muted">${todo.description}</h6>
                    <p class="card-text">Status : ${todo.status} </p>
                    <h6 class="card-subtitle mb-2 text-muted"> Due Date ${getDate}</h6>
                    <button onclick="doEdit(${todo.ProjectId},${todo.id}, event)" class="btn btn-info">Edit</button> |
                    <button onclick="doDelete(${todo.ProjectId},${todo.id}, event)" class="btn btn-danger">Delete</button>
                </div>
            </div>
            `)
        });
    })
    .fail ( err => {
        console.log("Error:" , err.responseJSON.message)
    })
    .always ( () => {
    })
}


function fetchDataProject() {
    $('#cardProject').empty()
    $.ajax({
        method: "GET",
        url : "http://localhost:3333/project/",
        headers : {
            access_token: localStorage.token
        }
    })
    .done( projects => {
        console.log(projects, "INI PROJECT")
        projects.forEach(project => { 
            console.log(project,"projectproject")
            let deadline = new Date(project.Project.deadline)
            let getDate = `${deadline.getFullYear()}-0${deadline.getMonth()+1}-0${deadline.getDate()}`
            $('#cardProject').append(`
            <div class="card" style="width: 18rem;margin: 1%" >
                <div class="card-body">
                    <h5 class="card-title">${project.Project.name}</h5>
                    <p class="card-text">Deadline : ${getDate} </p>
                    <button class="btn btn-info" onclick="detailsProject(${project.ProjectId},event)"> see details </button>
                </div>
            </div>
            `)
        });
    })
    .fail ( err => {
        console.log("Error:" , err)
    })
    .always ( () => {
    })
}

function detailsProject(projectId,event){
    event.preventDefault()
    $('#showDetailsProject').toggle()
    $('#addToDoBtn').attr('onclick',`showAddToDo(${projectId},event)`)
    console.log(projectId)
    $.ajax({
        method: "get",
        url: `http://localhost:3333/project/${projectId}`,
        headers : {
            access_token: localStorage.token
        }
    })
    .done( data => {
        let deadline = new Date(data.deadline)
        let getDate = `${deadline.getFullYear()}-0${deadline.getMonth()+1}-0${deadline.getDate()}`
        
        console.log(data,"datadatadata")
        
        $('#idProject').val(data.id)
        $('#nameProject').text(data.name)
        $('#deadlineProjectDetails').text(getDate)
        $.ajax({
            method: "get",
            url: `http://localhost:3333/users`
        })
        .done( userList => {
            $('#listUser').empty()
            userList.forEach( user=> {
                $('#listUser').append(`
                    <option  href="#" value="${user.id}" >${user.email}</option>
                    `)
            })
            $.ajax({
                method: "get",
                url: `http://localhost:3333/project/member/${projectId}`,
                headers : {
                    access_token: localStorage.token
                }
            })
            .done( PUData => {
                console.log(PUData,"PUData")
                $('#projectMembers').empty()
                PUData.forEach( data => {
                    $('#projectMembers').append(`
                    | ${data.User.email} |
                `)
                })

                fetchDataTodos(projectId)
            })
            .fail ( err => {
                $('#errorLogin').text(err.responseJSON.message).show()
                console.log("Error:" , err.responseJSON.message)
            })
            .always ( () => {
                $('#emailLogin').val('')
                $('#passwordLogin').val('')
            })
        })
        .fail ( err => {
            $('#errorLogin').text(err.responseJSON.message).show()
            console.log("Error:" , err.responseJSON.message)
        })
        .always ( () => {
            $('#emailLogin').val('')
            $('#passwordLogin').val('')
        })
    })
    .fail ( err => {
        $('#errorLogin').text(err.responseJSON.message).show()
        console.log("Error:" , err.responseJSON.message)
    })
    .always ( () => {
        $('#emailLogin').val('')
        $('#passwordLogin').val('')
    })
}

function showAddProjectForm(event){
    event.preventDefault()
    $('#addProjectForm').toggle()
    
}

function addUserToProject (event){
    event.preventDefault()
    const idProject = $('#idProject').val()
    const idUser = $('#listUser').val()
    $.ajax({
        method: "post",
        url : `http://localhost:3333/project/invite/${idProject}/${idUser}`,
        headers:{
            access_token : localStorage.token
        }
    })
    .done( data => {
        console.log("masuk data", data)
        $('#showDetailsProject').hide()
        afterLogin()
    })
    .fail ( err => {
        console.log("masuk err", err)
        $('#errorLogin').text(err.responseJSON.message).show()
        console.log("Error:" , err.responseJSON.message)
    })
    .always ( () => {
    })
}

function processLogin(event){    
    event.preventDefault();

    $.ajax({
        method: "POST",
        url : "http://localhost:3333/login",
        data : {
            email : $('#emailLogin').val(),
            password: $('#passwordLogin').val()
        }
    })
    .done( todos => {
        localStorage.token = todos.access_token
        afterLogin()
    })
    .fail ( err => {
        $('#errorLogin').text(err.responseJSON.message).show()
        console.log("Error:" , err.responseJSON.message)
    })
    .always ( () => {
        $('#emailLogin').val('')
        $('#passwordLogin').val('')
    })
}

function processRegister(event){    
    event.preventDefault();

    $.ajax({
        method: "POST",
        url : "http://localhost:3333/register",
        data : {
            email : $('#emailReg').val(),
            password: $('#passwordReg').val()
        }
    })
    .done( todos => {
        console.log("register done")
        $('#successRegister').text("register done").show()
        $('#errorRegister').hide()
    })
    .fail ( err => {
        console.log("Error:" , err.responseJSON.message)
        $('#successRegister').hide()
        $('#errorRegister').text(err.responseJSON.message).show()
    })
    .always ( () => {
        $('#emailReg').val('')
        $('#passwordReg').val('')
    })
}

function showRegister () {
    $('#registerCard').toggle()
}

function doEdit(projectId,id, event){
    event.preventDefault()
    $('#addTodo').hide()
    $('#editTodo').toggle()

    $.ajax({
        method: "GET",
        url: `http://localhost:3333/todos/${projectId}/${id}`,
        headers: {
            access_token: localStorage.token
        }
    })
    .then( data => {
        let due_date = new Date(data.due_date)
        let getDate = `${due_date.getFullYear()}-0${due_date.getMonth()+1}-0${due_date.getDate()}`
        console.log(data)
        $('#titleUpdate').val(data.title)
        $('#descriptionUpdate').val(data.description)
        $('#statusUpdate').val(data.status)
        $('#due_dateUpdate').val(getDate)
        $('#todoId').val(data.id)
        $('#ProjectId').val(data.ProjectId)
        
    })
    .fail( err => {
        console.log(err.responseJSON.message)
    })
    .always ( () => {
    })
    // href="http://localhost:3333/todos/${todo.id}"
}

function doProcessEdit(event) {
    event.preventDefault()
    const id = $('#todoId').val()
    const title = $('#titleUpdate').val()
    const description = $('#descriptionUpdate').val()
    const status = $('#statusUpdate').val()
    const due_date = $('#due_dateUpdate').val()
    const ProjectId = $('#ProjectId').val()

    console.log(title, description, status, due_date)

    $.ajax({
        method: "PUT",
        url: `http://localhost:3333/todos/${ProjectId}/${id}`,
        data : {
            title : title,
            description : description,
            status : status,
            due_date : due_date
        },
        headers: {
            access_token: localStorage.token
        }
    })
    .then( data => {
        afterLogin()
        $('#editTodo').hide()

    })
    .fail( err => {
        $('#errorAddTodoUpdate').text(err.responseJSON.message).show()
        console.log(err)
    })
    .always ( () => {
    })
}

function doDelete(ProjectId,id, event){
    event.preventDefault()
    $.ajax({
        method: "DELETE",
        url: `http://localhost:3333/todos/${ProjectId}/${id}`,
        headers: {
            access_token: localStorage.token
        }
    })
    .done( data => {
        afterLogin()
    })
    .fail( err =>{
        console.log(err)
        $('#errorDelete').text(err.responseJSON.message).show()
    })
    .always()
}

function doAddToDo(event){
    event.preventDefault()
    $('#editTodo').hide()
    const projectId = $('#projectId').val()

    const newTodo = {
        title: $('#title').val(),
        description: $('#description').val(),
        status: $('#status').val(),
        due_date: $('#due_date').val()
    }
    console.log(newTodo)
    $.ajax({
        method: "POST",
        url: `http://localhost:3333/todos/${projectId}`,
        data: {
            title: newTodo.title,
            description: newTodo.description,
            status: newTodo.status,
            due_date: newTodo.due_date,
        },
        headers:{
            access_token : localStorage.token
        }
    })
    .done( data => {
        console.log("success add ", data)
        $('#title').val('')
        $('#description').val('')
        afterLogin()
    })
    .fail ( err => {
        console.log("error", err)
        $('#errorAddTodo').text(err.responseJSON.message).show()

    })
    .always ( () => {
        console.log("ini always")
    })

}

function doAddProject(event){
    event.preventDefault()
    // $('#addProject').hide()
    const newProject = {
        name: $('#projectName').val(),
        deadline: $('#deadlineProject').val(),
    }
    console.log(newProject)
    $.ajax({
        method: "POST",
        url: "http://localhost:3333/project/",
        data: {
            name: newProject.name,
            deadline: newProject.deadline,
        },
        headers:{
            access_token : localStorage.token
        }
    })
    .done( data => {
        console.log("success add ", data)
        $('#projectName').val('')
        $('#deadlineProject').val('')
        afterLogin()
    })
    .fail ( err => {
        console.log("error", err.responseJSON)
        $('#errorAddProject').text(err.responseJSON.message).show()
        
    })
    .always ( () => {
        console.log("ini always")
    })

}

function showAddToDo(projectId,event) {
    event.preventDefault()
    $('#editTodo').hide()
    $('#projectId').val(projectId)
    $('#addTodo').toggle()

}

function processLogout(event){
    event.preventDefault()
    localStorage.clear() 
    beforeLogin()
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: "POST",
        url: "http://localhost:3333/googleSignin/",
        data : {id_token}
    })
    .done( todos => {
        localStorage.token = todos.access_token
        afterLogin()
    })
    .fail ( err => {
        console.log(err)
        // $('#errorLogin').text(err.responseJSON.message).show()
        // console.log("Error:" , err.responseJSON.message)
    })
    .always ( () => {
        $('#emailLogin').val('')
        $('#passwordLogin').val('')
    })


    console.log("masuk")
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

//   function signOut() {
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//       console.log('User signed out.');
//     });
//   }