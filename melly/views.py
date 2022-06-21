from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from .models import Dogs
from django.urls import reverse
from datetime import datetime, date, timedelta
import re

def index(request):
    melly = Dogs.objects.first()
    dob = melly.dob.strftime(r"%#m/%#d/%Y")
    age = round((date.today() - melly.dob).days / 365)
    breed = re.search(r"(.*)\s\(.*\)", melly.breed).group(1)
    color = melly.color.capitalize()
    template = loader.get_template('test.html')
    fedCheck = round((datetime.now() - melly.lastFed.replace(tzinfo=None)).days / 24)
    poopedCheck = round((datetime.now() - melly.lastPooped.replace(tzinfo=None)).days / 24)
    lastFed = melly.lastFed.strftime(r"%#I:%M %p")
    lastPooped = melly.lastPooped.strftime(r"%#I:%M on %#m/%#d/%Y")
    lastFedHour = (melly.lastFed.hour + melly.lastFed.minute/60) % 12
    nowHour = (datetime.now().hour + datetime.now().minute/60) % 12
    context = {
        'melly': melly,
        'dob': dob,
        'age': age,
        'breed': breed,
        'color': color,
        'fedCheck': fedCheck,
        'lastFed': lastFed,
        'lastFedHour': lastFedHour,
        'nowHour': nowHour,
        'poopedCheck': poopedCheck,
        'lastPooped': lastPooped,
    }
    return HttpResponse(template.render(context, request))

def updateLastFed(request):
    melly = Dogs.objects.first()
    melly.lastFed = datetime.now() - timedelta(hours=8)
    melly.save()
    return HttpResponseRedirect(reverse('index'))

def updateLastPooped(request):
    melly = Dogs.objects.first()
    melly.lastPooped = datetime.now()
    melly.save()
    return HttpResponseRedirect(reverse('index'))