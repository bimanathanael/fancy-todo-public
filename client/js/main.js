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
    $('#logout').show()
    $('#loginForm').hide()
    $('#registerCard').hide()
    $('#addTodo').hide()
    $('#addToDoBtn').show()
    $('#editTodo').hide()
    $('#errorAddTodo').hide()
    $('#errorAddTodoUpdate').hide()
    $('#errorDelete').hide()
    

    fetchDataTodos()
}

function beforeLogin(){
    $('#cardTodos').hide()
    $('#loginForm').show()
    $('#logout').hide()
    $('#registerCard').hide()
    $('#addTodo').hide()
    $('#addToDoBtn').hide()
    $('#errorLogin').hide()
    $('#editTodo').hide()
    $('#successRegister').hide()
    $('#errorRegister').hide()
    $('#errorAddTodoUpdate').hide()
    $('#errorDelete').hide()
}

function fetchDataTodos() {
    $('#cardTodos').empty()
    $.ajax({
        method: "GET",
        url : "http://localhost:3333/todos/",
        headers : {
            access_token: localStorage.token
        }
    })
    .done( todos => {
        todos.forEach(todo => { 
            let due_date = new Date(todo.due_date)
            let getDate = `${due_date.getFullYear()}-0${due_date.getMonth()+1}-0${due_date.getDate()}`
            $('#cardTodos').append(`
            <div class="card" style="width: 18rem;margin: 1%" >
                <div class="card-body">
                    <h5 class="card-title">${todo.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${todo.description}</h6>
                    <p class="card-text">Status : ${todo.status} </p>
                    <h6 class="card-subtitle mb-2 text-muted"> Due Date ${getDate}</h6>
                    <a onclick="doEdit(${todo.id}, event)" class="btn btn-primary">Edit</a>
                    <a onclick="doDelete(${todo.id}, event)" class="btn btn-danger">Delete</a>
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
    $('#registerCard').show()
}

function doEdit(id, event){
    event.preventDefault()
    $('#addTodo').hide()
    $('#editTodo').show()

    $.ajax({
        method: "GET",
        url: `http://localhost:3333/todos/${id}`,
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

    console.log(title, description, status, due_date)

    $.ajax({
        method: "PUT",
        url: `http://localhost:3333/todos/${id}`,
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

function doDelete(id, event){
    event.preventDefault()
    $.ajax({
        method: "DELETE",
        url: `http://localhost:3333/todos/${id}`,
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

    const newTodo = {
        title: $('#title').val(),
        description: $('#description').val(),
        status: $('#status').val(),
        due_date: $('#due_date').val()
    }
    console.log(newTodo)
    $.ajax({
        method: "POST",
        url: "http://localhost:3333/todos/",
        data: {
            title: newTodo.title,
            description: newTodo.description,
            status: newTodo.status,
            due_date: newTodo.due_date
        },
        headers:{
            access_token : localStorage.token
        }
    })
    .done( data => {
        console.log("success add ", data)
        $('title').val('')
        $('description').val('')
        $('status').val('')
        $('due_date').val('')
        afterLogin()
    })
    .fail ( err => {
        console.log("error", err.responseJSON)
        $('#errorAddTodo').text(err.responseJSON.message).show()

    })
    .always ( () => {
        console.log("ini always")
    })

}

function showAddToDo(event) {
    event.preventDefault()
    $('#editTodo').hide()
    $('#addTodo').show()

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