import cPickle as pickle
import logging
import os
import sys

from django.contrib.auth.decorators import login_required
from django.core.exceptions import ValidationError
from django.core.urlresolvers import reverse
from django.http import HttpResponse, Http404
from django.http import JsonResponse
from django.shortcuts import redirect, render, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.views.generic import TemplateView

from models import Avatar, Game, LevelAttempt
from players import forms
from . import app_settings

LOGGER = logging.getLogger(__name__)


def _post_code_success_response(message):
    return _create_response("SUCCESS", message)


def _create_response(status, message):
    response = {
        "status": status,
        "message": message
    }
    return JsonResponse(response)

def _find_avatar_by_game_user(game, user):
    return game.avatar_set.get(owner=user)

@login_required
def code(request, id):
    game = get_object_or_404(Game, id=id)
    if not game.can_user_play(request.user):
        raise Http404
    try:
        avatar = _find_avatar_by_game_user(game, request.user)
    except Avatar.DoesNotExist:
        initial_code_file_name = os.path.join(
            os.path.abspath(os.path.dirname(__file__)),
            'avatar_examples/dumb_avatar.py',
        )
        with open(initial_code_file_name) as initial_code_file:
            initial_code = initial_code_file.read()
        avatar = Avatar.objects.create(owner=request.user, code=initial_code,
                                       game_id=id)
    if request.method == 'POST':
        avatar.code = request.POST['code']
        avatar.save()
        return _post_code_success_response('Your code was saved!<br><br><a href="%s">Watch</a>' % reverse('aimmo/watch', kwargs={'id': game.id}))
    else:
        return HttpResponse(avatar.code)


def list_games(request):
    response = {
        game.pk:
            {
                'name': game.name,
                'settings': pickle.dumps(game.settings_as_dict()),
            } for game in Game.objects.exclude_inactive()
    }
    return JsonResponse(response)


def get_game(request, id):
    game = get_object_or_404(Game, id=id)
    response = {
        'main': {
            'parameters': [],
            'main_avatar': None,
            'users': [],
        }
    }
    for avatar in game.avatar_set.all():
        if avatar.owner_id == game.main_user_id:
            response['main']['main_avatar'] = avatar.owner_id
        response['main']['users'].append({
            'id': avatar.owner_id,
            'code': avatar.code,
        })
    return JsonResponse(response)


@csrf_exempt
@require_http_methods(['POST'])
def mark_game_complete(request, id):
    game = get_object_or_404(Game, id=id)
    game.completed = True
    game.static_data = request.body
    game.save()
    return HttpResponse('Done!')

@login_required
def add_game(request):
    if request.method == 'POST':
        form = forms.AddGameForm(request.POST)
        if form.is_valid():
            game = form.save(commit=False)
            game.generator = 'Main'
            game.owner = request.user
            game.save()
            return redirect('aimmo/program', id=game.id)
    else:
        form = forms.AddGameForm()
    return render(request, 'players/add_game.html', {'form': form})
