var request = require("request");
var facebook = require("facebook-chat-api");

facebook({
        email: "s2maihien@zing.vn",
        password: "minhtha0"
    },
    function callback(err, api) {
        api.listen(
            function callback(err, message){
                // request API Simsimi
                // message.body get message from facebook
                request("http://sandbox.api.simsimi.com/request.p?key=bb569349-e9d1-4b7e-b1b7-232b92dd6c66&lc=vn&ft=0.0&text="+encodeURI(message.body),
                    function(err, response, body){
                        // parse json from API
                        var text = JSON.parse(body);
                        // check status
                        if(text.msg == "OK."){
                            var messagerep = text.response;
                            // sent message
                            api.sendMessage(messagerep, message.threadID);
                        }else{
                            api.sendMessage("chẳng hiểu mày đang nói gì", message.threadID);
                        }
                    }
                );
            }
        );
    }
);