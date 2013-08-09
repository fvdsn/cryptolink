(function(){

    window.cryptolink = {};

    cryptolink.version = "1.0";

    var password_template = [
        "<link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900,200italic,300italic,400italic,600italic,700italic,900italic' rel='stylesheet' type='text/css'>",
        "<link rel='stylesheet' href='../css/main.css'>",
        "<style>",
            "html{ position: static; }",
            ".pwbox{ width: 350px; height: 200px; position: absolute;",
                    "top: 50%; left: 50%; margin-top:-100px; margin-left:-175px;}",
            ".pwbox h3{ font-size: 30px; margin: 30px 0px 8px; font-weight: 300; }",
            ".bottomlink{ width: 350px; text-align: center; position: absolute; bottom: 0px;",
                    "left: 50%; margin-left:-175px; margin-bottom: 8px; text-decoration: none; color: rgb(120,120,120); }",
            
        "</style>",
        "<div class='pwbox'>",
            "<h3>Encrypted Document</h3>",
            "<input type='password' placeholder='Password' id='password' class='textinput'></input>",
            "<button id='decrypt' class='button disabled'>Decrypt</button>",
        "</div>",
        "<a class='bottomlink' href='/'>Encrypted with CryptoLink</a>",
    ].join('\n');


    function ask_for_password(pw_callback){
        $('html').html(password_template);
        $('#password').bind('change input propertychange',function(){
            $('#decrypt').toggleClass('disabled',!$(this).val());
        });

        $('#decrypt').click(function(){
            var pw = $('#password').val();
            if(pw){
                pw_callback(pw);
            }
        });
    }

    function decode(doc){
        $('html').html('');
        window.stop();

        if(doc[0] === '?'){
            ask_for_password(function(password){
                doc = doc.slice(1);
                doc = CryptoJS.AES.decrypt(doc,password).toString(CryptoJS.enc.Utf8);
                doc = new Int8Array(Base64Binary.decode(doc).buffer);
                LZMA.decompress(doc, function(result){
                    $('html').html(result);
                });
            });
        }else{
            doc = new Int8Array(Base64Binary.decode(doc).buffer);
            LZMA.decompress(doc, function(result){
                $('html').html(result);
            });
        }
    }

    function decode_current_url(){
        if(window.location.hash){
            decode(window.location.hash.slice(1));
        }else{
            $('html').html("<h1>Error: nothing to decrypt</h1>");
        }
    }

    cryptolink.decode_current_url = decode_current_url;

    function encode_url(content,password,success){
        LZMA.compress(content,5, function(result){
            result = new Uint8Array((new Int8Array(result)).buffer);
            var encoded = base64ArrayBuffer(result);
            if(password){
                encoded = CryptoJS.AES.encrypt(encoded,password).toString();
                encoded = '?' + encoded;
            }
            success('/'+cryptolink.version+'/#'+encoded);
        });
    }

    cryptolink.encode_url = encode_url;

})();
