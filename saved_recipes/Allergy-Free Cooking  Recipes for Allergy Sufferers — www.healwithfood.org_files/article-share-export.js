define([
    'jquery',
    'article-to-epub',
    'article-to-kindle'
],
function ($, ArticleToEpubView, ArticleToKindleView) {
    var ArticleShareExport = function (options) {
        var opts = options || {},
            el = opts.el || $('body'),
            articleToEpub = new ArticleToEpubView(),
            articleToKindle = new ArticleToKindleView({
                el: el
            });

        function shareEmail (e) {
            e.preventDefault();
            var url = $(e.target).attr('href');
            window.open(url, 'emailBox', 'chrome=yes,centerscreen=yes,width=800,height=400');
        }

        function shareFacebook (e) {
            e.preventDefault();
            var url = $(e.target).attr('href');
            window.open(url, 'facebookBox', 'width=640,height=350,toolbar=no');
        }

        function printArticle (e) {
            e.preventDefault();
            window.print();
        }

        el.on('click', '.share-email', shareEmail);
        el.on('click', '.share-facebook', shareFacebook);
        el.on('click', '.article-print', printArticle);

        return {};
    };

    return ArticleShareExport;
});