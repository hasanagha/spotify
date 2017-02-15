;(function()
{
    'use strict';

    var CONFIG = {
        "search_url"    : "/search/",
    };

    var SELECTORS = {
        'search'        : '.fa-search',
        'loader'        : '.fa-spinner',
        'counter'       : '.counter',
        'search_field'  : '#formGroupInputLarge',
        'filter'        : '#search_type',
        'results'       : 'ul.results',

    };

    var TEMPLATE = '<li><img class="thumb" src="{image_url}">{label}</li>';

    var Spotify =
    {
        init: function()
        {
            var _this = this;

            $('body').on("click", SELECTORS.search, function(){
                var val = $(SELECTORS.search_field).val();

                $(SELECTORS.loader).removeClass('hide-important');
                $(this).hide();

                $.ajax({
                    url: CONFIG.search_url + $(SELECTORS.filter).val(),
                    type: 'GET',
                    data: {
                        'search_term': $(SELECTORS.search_field).val(),
                    },
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                    },
                    success: function(response) {
                        _this.fillResults(response);

                        $(SELECTORS.loader).addClass('hide-important');
                        $(this).show();
                    }
                });
            });
            $(SELECTORS.title_field).keypress(function (e) {
                if (e.which == 13) {
                    $(SELECTORS.submitBtn).click();
                    return false;
                }
            });
            $(SELECTORS.submitBtn).click();
        },
        fillResults: function(response){
            var _this = this;
            $('.counter').html(response.length + ' result(s) found').show();
            if(response.length) {
                var source   = $(SELECTORS.hb_item).html();
                var template = Handlebars.compile(source);
                var context = {presentations: response}
                var html    = template(context);
            } else {
                var html = '';
            }
            $(SELECTORS.results).html(html);
        }
    };
    $(document).ready(function(){
        Spotify.init();
    });

})();
