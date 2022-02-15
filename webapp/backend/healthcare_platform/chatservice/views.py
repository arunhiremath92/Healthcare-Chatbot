from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from chatservice.models import Chatservice
from chatservice.serializers import ChatseriviceSerializer


@csrf_exempt
def chatservice_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    return JsonResponse({'foo':'bar'})

@csrf_exempt
def chatservice_detail(request, pk):
    """
    Retrieve, update or delete a code snippet.
    """
    try:
        snippet = Chatservice.objects.get(pk=pk)
    except Chatservice.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer =ChatseriviceSerializer(snippet)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = ChatseriviceSerializer(snippet, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        snippet.delete()
        return HttpResponse(status=204)

