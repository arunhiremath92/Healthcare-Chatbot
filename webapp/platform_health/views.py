from django.shortcuts import render
from .forms import ContactForm

# Create your views here.
from django.http import HttpResponse


def home(request):
    if request.method == "GET":
        return render(request, "home_page/home.html")


def contact(request):
    if request.method == "GET":
        form = ContactForm()
        context = {'form': form}
        return render(request, "home_page/contact.html", context)
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            return render(request, "home_page/contact_success.html")


def aboutUs(request):
    if request.method == "GET":
        return render(request, "home_page/aboutUs.html")

        
def appointment(request):
    if request.method == "GET":
        return render(request, "home_page/appointment.html")

