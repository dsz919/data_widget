
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
                    key_input.name = "account_id";
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
            };

            this.getConfig(callback);
            
        },
        render: function() {
            alert("I got these! " + _args[0]);
        }
    };
}());

widgets.push(widget);

