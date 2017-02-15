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

        'default_image' : '/static/images/no_image.jpeg'

    };

    var TEMPLATE = '<li><img class="thumb" src="{image_url}">{label}</li>';

    var Spotify =
    {
        init: function()
        {
            var _this = this;

            // Even if user hit enter on search field, do search.
            $(SELECTORS.search_field).keypress(function (e) {
                if (e.which == 13) {
                    $(SELECTORS.search).click();
                    return false;
                }
            });

            // On search click, Send a request with user selections.
            $('body').on("click", SELECTORS.search, function(){
                var val = $(SELECTORS.search_field).val();

                $(SELECTORS.loader).removeClass('hide-important');
                $(SELECTORS.search).hide();

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
                        $(SELECTORS.search).show();
                    }
                });
            });
        },

        // Parse the response from backend and create a template to show it to the user.
        fillResults: function(response) {
            var _this = this;
            var counter = 0;
            var html = '';

            if(response.status) {
                var records = response.records[Object.keys(response.records)[0]];
                counter = records.total;
                if(counter) {
                    $.each(records.items, function(){

                        var image = SELECTORS.default_image;
                        var images = this.images;

                        if(images.length) {
                            image = images.pop();
                            image = image.url;
                        }

                        html += _this.getLI(this.name, image);
                    });
                } else {
                    html = 'No record found';
                }
            } else {
                html = 'error' in response?response.error:'No record found';
            }

            $(SELECTORS.counter).html(counter + ' record(s)');
            $(SELECTORS.results).html(html);
        },

        // Creates an <li> to with the provided label and image url
        getLI: function(label, image) {
            var template = TEMPLATE;

            var li = template.replace('{label}', label);
            li = li.replace('{image_url}', image);

            return li;
        }
    };
    $(document).ready(function(){
        Spotify.init();
    });

})();
