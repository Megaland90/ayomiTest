var TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.-xXA0iKB4mVNvWLYFtt2xNiYkFpObF54J9lj2RwduAI"

module.exports = {
        login : {
            url : "http://127.0.0.1:8000/app/login",
            option : {
                method : "POST",
                body : {
                    "email": "test@gmail.com",
                    "password" : "Ok"
                },
                headers: {
                    'Content-Type' : "application/json",
                },
            },
            result : {
                "statut": "OK",
                "token": TOKEN
            }
        },
        badLogin : {
            url : "http://127.0.0.1:8000/app/login",
            option : {
                method : "POST",
                body : {
                    "email": "test",
                    "password" : "Ok"
                },
                headers: {
                    'Content-Type' : "application/json",
                },
            },
            result : { statut: 'Invalid user' }
        },
        editUser : {
            url : "http://127.0.0.1:8000/app/users/update",
            option : {
                method : "POST",
                body : {
                    "email":"test@gmail.com",
                    "firstname" : "Théo",
                    "lastname" : "LeTEST"
                },
                headers: {
                    'Content-Type' : "application/json",
                    'Authorization' : TOKEN
                },
            },
            result : {
                "statut": "OK"
            }
        },
        getUser : {
            url : "http://127.0.0.1:8000/app/users/",
            option : {
                method : "GET",
                headers: {
                    'Content-Type' : "application/json",
                    'Authorization' : TOKEN
                },
            },
            result : {
                "statut": "OK",
                "profil": {
                    "email": "test@gmail.com",
                    "firstname": "Théo",
                    "lastname": "LeTEST",
                    "id": 1
                }
            }
        }
    }