(function(){

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

    function encode_url(content,password,success){
        LZMA.compress(content,5, function(result){
            result = new Uint8Array((new Int8Array(result)).buffer);
            var encoded = base64ArrayBuffer(result);
            if(password){
                encoded = CryptoJS.AES.encrypt(encoded,password).toString();
                encoded = '?' + encoded;
            }
            success('/#'+encoded);
        });
    }

    function homepage(){

        $('#content').focus();
        
        $('#content').bind('input propertychange',function(){
            if($(this).val()){
                $('#submit').removeClass('disabled');
            }else{
                $('#submit').addClass('disabled');
            }
            $('.urlbox').addClass('hidden');
        });

        $('#submit').click(function(){
            var content = $('#content').val();
            var password = $('#password').val();
            if(content){ 
                $('.loading').removeClass('hidden');
                setTimeout(function(){
                    encode_url('<pre>'+content+'</pre>',password,function(result){
                        var url = window.location.origin + result;
                        $('.urlbox .url').attr('href',url).text(url);
                        $('.urlbox .js-url-length').text(url.length);
                        $('.urlbox .js-url-encrypted').text( password ? 'Yes' : 'No');
                        $('.urlbox').removeClass('hidden');
                        $('.loading').addClass('hidden');
                    });
                },500);
            }
        });
    }

    if(window.location.hash){
        decode(window.location.hash.slice(1));
    }else{
        $(function(){ homepage() });
    }
})();
