
widget = (function(){
    var _args = {};

    return {
        getConfig: function(callback) {
            console.log("has config called");
            $.ajax({
                url: "/config/widget_" + _args,
                cache: false
            }).done(function(json_config) {
                if(json_config === ""){
                    console.log("got empty result for widget: " + _args);
                }
                console.log("result: " + json_config);
                callback(json_config);
            });
        },
        init: function(args){
            _args = args;
            console.log('got init: ' + args);
            var widget_id = _args
            var widget = document.getElementById(widget_id);
            widget.innerHTML = "<h4>Data: " + widget_id + "</h4>";
            var data_span = document.createElement('span');
            data_span.style.margin = "10px";
            data_span.src = "/graph_widget/graph.png";
            widget.appendChild(data_span);

            var callback = function (json_config) {
                if(json_config === ""){

                    var form = document.createElement("form");
                    form.setAttribute('method',"post");
                    form.setAttribute('action',"/setup/save_config");

                    var key_input = document.createElement('input');
                    key_input.type = "text";
                    key_input.name = "github_data_url";
                    key_input.style.margin = "10px";

                    var widget_id_input = document.createElement('input');
                    widget_id_input.type = "hidden";
                    widget_id_input.name = "widget_id";
                    widget_id_input.value = widget_id;

                    var submit_button = document.createElement('input');
                    submit_button.type = "submit";
                    submit_button.value = "save";

                    form.appendChild(key_input);
                    form.appendChild(widget_id_input);
                    form.appendChild(submit_button);
                    widget.appendChild(form);
                }
                else{
                    console.log("DATA widget! got non-null config: " + json_config);
                    var config_object = jQuery.parseJSON(json_config);
                    console.log("got this: " + config_object + " url: " + config_object.github_data_url);
                    var data_url = config_object.github_data_url
                    $.ajax({
                        url: data_url,
                        cache: false
                    }).done(function(github_data_json) {
                        if(github_data_json === ""){
                            console.log("no github data found!");
                        }
                        github_data_object = jQuery.parseJSON(github_data_json);
                        console.log("result: " + github_data_json);
                        var number_of_commits = github_data_json.length;
                        console.log("num commits: " + github_data_json.length);
                        var innerhtml = "<h1 style='margin:10px;color:red;'>Commits: " + number_of_commits + "</h1>"
                        var data_url_split = data_url.split('/');
                        innerhtml = innerhtml + "<br/><span style='margin:10px;font-size:8pt;'>project: " + data_url_split[5] + "</span>";
                        //innerhtml = innerhtml + '<br><a href="https://github.com/login/oauth/authorize?client_id=0fe25fd8f1a07dec0d1c">authorize</a>'
                        //innerhtml = innerhtml + '<br><a href="https://github.com/login/oauth/access_token?client_id=0fe25fd8f1a07dec0d1c">access_token</a>'
                        widget.innerHTML = innerhtml;
                    });

                }
            };

            this.getConfig(callback);
            
        },
        render: function() {
            alert("I got these! " + _args[0]);
        }
    };
}());

widgets.push(widget);

