from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
import os, sys
import subprocess

server_path = os.getcwd()
api_path = server_path+"/main/sentiment_pipeline"
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
    """
    result = Sentiment_pipeline(
            search=searchField,
            crawl_reviews=True,
            filter_subjectivity=True,
            classify_aspects=True,
            filter_quality_fuzzy=False,
            filter_quality_mlp=True,
            summarize='opizere'
            )
    result.set_script_dir(api_path)
    result.run(save_partial_results=True)
    """
    query_process = subprocess.run(["python3", api_path+"/sentiment_pipeline.py", searchField], encoding='utf-8', stdout=subprocess.PIPE)
#    return JsonResponse({'search' : searchField})
    return HttpResponse(query_process.stdout)


