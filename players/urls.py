from django.conf.urls import url
from django.contrib.auth import views as auth_views
from django.contrib.auth.decorators import login_required
from django.views.generic import TemplateView

from players import views

from django.views.generic import RedirectView
from django.contrib import admin

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='players/home.html'), name='aimmo/home'),

    url(r'^accounts/login/$', auth_views.login),
    url(r'^admin/', admin.site.urls),

    url(r'^console/$', login_required(TemplateView.as_view(template_name='players/console.html')), name='aimmo/console'),
    url(r'^statistics/$', TemplateView.as_view(template_name='players/statistics.html'), name='aimmo/statistics'),

    url(r'^api/games/setup/(?P<id>[0-9]+)/$', views.setup_game, name='aimmo/setup'),
    url(r'^api/level/(?P<num>[0-9]+)/$', views.get_level, name='aimmo/level'),
    url(r'^api/code/(?P<id>[0-9]+)/$', views.code, name='aimmo/code'),
    url(r'^api/games/$', views.list_games, name='aimmo/games'),
    url(r'^api/games/(?P<id>[0-9]+)/$', views.get_game, name='aimmo/game_details'),
    url(r'^api/games/(?P<id>[0-9]+)/complete/$', views.mark_game_complete, name='aimmo/complete_game'),

    url(r'^jsreverse/$', 'django_js_reverse.views.urls_js', name='aimmo/js_reverse'),  # TODO: Pull request to make django_js_reverse.urls
    url(r'^games/new/$', views.add_game, name='aimmo/new_game'),

    # TODO: this is a quickfix for redirecting for the Unity resources
    url(r'^watch/(?P<resource>.[0-9A-Za-z/.]+)$',
        RedirectView.as_view(url='/static/unity/%(resource)s', permanent=False)),
]
