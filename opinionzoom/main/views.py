from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
import os, sys
import subprocess

print("hh")
server_path = os.getcwd()
api_path = server_path+"main/sentiment-pipeline"
api_path = "home/sbarbosa/arquivos/projeto/opinionzoom/opinionzoom/main/sentiment-pipeline"
"""
sys.path.insert(0, server_path+'/main')
sys.path.insert(0, server_path+'/main/sentiment_pipeline')
sys.path.insert(0, server_path+'/main/sentiment_pipeline/classificador_aspectos')
sys.path.insert(0, server_path+'/main/sentiment_pipeline/TopXMLP')
sys.path.insert(0, server_path+'/main/sentiment_pipeline/uteis')
sys.path.insert(0, server_path+'/main/sentiment_pipeline/opizer')


from sentiment_pipeline import Sentiment_pipeline
"""
# Create your views here.

def index(request):
    return render(request, 'index.html')

def searchQuery(request):
    searchField = request.GET['searchField']
    operation = "pipeline"
    query_process = subprocess.run(["python3", api_path+"/sentiment_pipeline.py", operation, searchField], encoding='utf-8', stdout=subprocess.PIPE)
#    return JsonResponse({'search' : searchField})
    return HttpResponse(query_process.stdout)

def runEnelvo(request):

    text = request.GET['text']
    operation = "normalization"

    query_process = subprocess.run(["python3", api_path+"/sentiment_pipeline.py", operation, text], encoding='utf-8', stdout=subprocess.PIPE)

    return HttpResponse(query_process.stdout)

def runQltFilter(request):

    text = request.GET['text']
    operation = "qltFilter"

    query_process = subprocess.run(["python3", api_path+"/sentiment_pipeline.py", operation, text], encoding='utf-8', stdout=subprocess.PIPE)

    return HttpResponse(query_process.stdout)

def runSbjFilter(request):

    text = request.GET['text']
    operation = "sbjFilter"

    query_process = subprocess.run(["python3", api_path+"/sentiment_pipeline.py", operation, text], encoding='utf-8', stdout=subprocess.PIPE)

    return HttpResponse(query_process.stdout)

def runAspect(request):

    text = request.GET['text']
    operation = "aspect"

    query_process = subprocess.run(["python3", api_path+"/sentiment_pipeline.py", operation, text], encoding='utf-8', stdout=subprocess.PIPE)

    return HttpResponse(query_process.stdout)

def runOpizer(request):

    text = request.GET['text']
    operation = "opizer"

    query_process = subprocess.run(["python3", api_path+"/sentiment_pipeline.py", operation, text], encoding='utf-8', stdout=subprocess.PIPE)

    return HttpResponse(query_process.stdout)

