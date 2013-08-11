(function(){

    window.cryptolink = {};

    cryptolink.version = "1.0";

    var header_template = [
        "<link href='//fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900,200italic,300italic,400italic,600italic,700italic,900italic' rel='stylesheet' type='text/css'>",
        "<link rel='stylesheet' href='../css/main.css'>",
        "<link rel='stylesheet' href='../../css/main.css'>",    // FIXME Not proud of this ...
        "<style>",
            "html{ position: static; }",
            ".centerbox{ width: 350px; height: 200px; position: absolute;",
                    "top: 50%; left: 50%; margin-top:-100px; margin-left:-175px;}",
            ".centerbox h3{ font-size: 30px; margin: 30px 0px 8px; font-weight: 300; }",
            ".centerbox.dark { padding: 0px 32px; box-sizing: border-box; border-radius: 3px; background: rgba(0, 0, 0, 0.11); }",
            ".bottomlink{ width: 350px; text-align: center; position: absolute; bottom: 0px;",
                    "left: 50%; margin-left:-175px; margin-bottom: 8px; text-decoration: none; color: rgb(120,120,120); }",
            "#errorbox{ width: 334px; text-align: center; }",
        "</style>",
        "",
    ].join('\n');

    var password_template = header_template + [
        "<div class='centerbox'>",
            "<h3>Encrypted Document</h3>",
            "<input type='password' placeholder='Password' id='password' class='textinput'></input>",
            "<button id='decrypt' class='button disabled'>Decrypt</button>",
            "<div id='errorbox' class='textinput invalid hidden'>Wrong Password or Damaged URL</div>",
        "</div>",
        "<a class='bottomlink' href='/'>Encrypted with CryptoLink</a>",
    ].join('\n');

    var empty_template = header_template + [
        "<div class='centerbox dark'>",
            "<h3>CryptoLink "+cryptolink.version+"</h3>",
            "<p>ERROR: Nothing to decrypt</p>",
            "<p><a href='/'>Create a Cryptolink?</a></p>",
        "</div>",
    ].join('\n');

    var error_template = header_template + [
        "<div class='centerbox dark'>",
            "<h3>CryptoLink 1.0</h3>",
            "<p>ERROR: Could not decode URL.</p>",
            "<p><a href='/'>Create a Cryptolink?</a></p>",
        "</div>",
    ].join('\n');



    function ask_for_password(pw_callback){
        $('html').html(password_template);
        $('#password').bind('change input propertychange',function(){
            $('#decrypt').toggleClass('disabled',!$(this).val());
        });

        $('#decrypt').click(function(){
            $('#errobox').addClass('hidden');
            var pw = $('#password').val();
            if(pw){
                pw_callback(pw);
            }
        });
    }

    function get_url_hash(url){
        var i = url.indexOf('#');
        if(i > 0){ 
            return url.slice(i + 1);
        }else{
            return '';
        }
    }

    cryptolink.decode_encrypted_url = function(url){
        var doc = get_url_hash(url);
        if(doc){
            $('html').html('');
            window.stop();

            ask_for_password(function(password){
                try{
                    doc = CryptoJS.AES.decrypt(doc,password).toString(CryptoJS.enc.Utf8);
                    doc = LZString.decompressFromBase64(doc);
                }catch(e){
                    $('#errorbox').removeClass('hidden');
                    setTimeout(function(){
                        location.reload();
                    },1000);
                    return;
                }
                if(!doc){
                    $('#errorbox').removeClass('hidden');
                    setTimeout(function(){
                        location.reload();
                    },1000);
                }else{
                    $('html').html(doc);
                }
            });

        }else{
            $('html').html(empty_template);
        }
    };

    cryptolink.decode_public_url = function(url){
        var doc = get_url_hash(url);
        if(doc){
            $('html').html('');
            window.stop();
            try{
                doc = LZString.decompressFromBase64(doc);
            }catch(e){
                $('html').html(error_template);
                return;
            }
            if(!doc){
                $('html').html(error_template);
            }else{
                $('html').html(doc);
            }
        }else{
            $('html').html(empty_template);
        }
    };


    cryptolink.encode_encrypted_url = function(host_url,content,password,success){
        var encoded = LZString.compressToBase64(content);
        encoded = CryptoJS.AES.encrypt(encoded,password).toString();
        success(host_url+cryptolink.version+'/#'+encoded);
    };

    cryptolink.encode_public_url = function(host_url,content,success){
        var encoded = LZString.compressToBase64(content);
        success(host_url+cryptolink.version+'/public/#'+encoded);
    };

})();
