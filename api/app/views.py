from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from app.models import Profil
import json
import jwt
# Create your views here.

def addUser(request) :
    if request.method == 'POST' :
        data = {}
        data["statut"] = "Error"
        if len(request.body) != 0:
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            profil = Profil(email = body['email'],password = body['password'], first_name = body['first_name'], last_name = body['last_name'])
            profil.save()
            data["statut"] = "OK"
        return JsonResponse(data)

def login(request) :
    if request.method == 'POST' :
        data = {}
        data["statut"] = "Invalid user"
        if len(request.body) != 0:
            try :
                body_unicode = request.body.decode('utf-8')
                body = json.loads(body_unicode)
                user = Profil.objects.get(email = body["email"])
                if user.password == body['password'] :
                    token = jwt.encode({'id' : user.id}, 'secret', algorithm='HS256')
                    data['token'] = token.decode('utf-8')
                    data["statut"] = "OK"
            except Exception:
                data["statut"] = "Invalid user"
        return JsonResponse(data)



def getUser(request) :
    data = {}
    data["statut"] = "OK"
    try :
        token = jwt.decode(request.META['HTTP_AUTHORIZATION'], 'secret', algorithms=['HS256'])
        user = Profil.objects.get(id = token["id"])
        data["profil"] = {'email' :user.email, 'firstname' : user.first_name, 'lastname' :user.last_name, 'id' : user.id}
    except Exception:
        data["statut"] = "token invalid"
    return JsonResponse(data)


def setUser(request) :
    if request.method == 'POST' :
        data = {}
        data["statut"] = "OK"
        try :
            token = jwt.decode(request.META['HTTP_AUTHORIZATION'], 'secret', algorithms=['HS256'])
            user = Profil.objects.get(id = token["id"])
            if len(request.body) != 0:
                body_unicode = request.body.decode('utf-8')
                body = json.loads(body_unicode)
                user.email = body['email']
                user.first_name = body['firstname']
                user.last_name = body['lastname']
                user.save()
        except Exception:
            data["statut"] = "token invalid"
        return JsonResponse(data)