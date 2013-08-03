(function(){

    window.cryptolink = {};

    cryptolink.version = "1.0";

    function ask_for_password(pw_callback){
        $('html').html("<input type='text' placeholder='Password' id='password'></input><button id='decrypt'>Decrypt</button>");
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
