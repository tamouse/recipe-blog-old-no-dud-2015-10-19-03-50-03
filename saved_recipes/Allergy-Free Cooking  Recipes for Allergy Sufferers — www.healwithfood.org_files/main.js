// DOCS: http://requirejs.org/docs/api.html#config
require.config({
    paths: {
        'jquery': 'libs/jquery/jquery-1.10.2',
        'jqueryui': 'libs/jquery-ui-1.10.3/jqueryui',
        'underscore': 'libs/underscore/underscore-min',
        'fastclick': 'libs/fastclick/fastclick'
    },
    shim: {
        'jquery': {
            exports: 'jquery'
        },
        'jqueryui': {
            deps: ['jquery']
        },
        'underscore': {
            exports: '_'
        }
    }
});

require([
    'jquery',
    'app',
    'reading-list',
    'article',
    'appearance',
    'flyouts',
    'settings',
    'tools',
    'recommend',
    'profile'
], function ($, AppView, ReadinglistView, ArticleView, AppearanceView, Flyouts,
    SettingsView, ToolsView, RecommendView, ProfileView) {

    var appView = new AppView(),
        appearanceView = new AppearanceView(),
        flyouts = new Flyouts();

    $(function () {
        var body = $('body');

        appView.init();
        flyouts.init();
        appearanceView.init();

        // Using some checks on the body class to avoid initializing everything
        // on every page. These resources with still end up being loaded because
        // we're going to combine everything (I think) but maybe things will be
        // faster if we're not doing things we don't need to?
        // TODO: Code Review
        if (body.hasClass('reading-list')) {
            new ReadinglistView();
        }

        if (body.hasClass('article')) {
            new ArticleView();
        }

        if (body.hasClass('settings')) {
            new SettingsView();
        }

        if (body.hasClass('recommend')) {
            new RecommendView({
                el: $('.recommend-form')
            });
        }

        if (body.hasClass('tools')) {
            new ToolsView();
        }

        if (body.hasClass('profile')) {
            new ProfileView();
        }
    });
});