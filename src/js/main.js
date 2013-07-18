if(window.location.hash){
    var doc = window.location.hash.slice(1);
    $('html').html('');
    doc = new Int8Array(Base64Binary.decode(doc).buffer);
    LZMA.decompress(doc, function(result){
        $('html').html(result);
    });
    window.stop();
}else{
    $(function(){
        $('#submit').click(function(){
            var content = $('#content').val();
            var password = $('#password').val();

            console.log('Content size:',content.length);
            if(!content){ return; }
            LZMA.compress(content,5,function(result){
                console.log('Compressed size:',result.length);
                var ures = new Uint8Array((new Int8Array(result)).buffer);
                var enc = base64ArrayBuffer(ures.buffer);
                console.log('Encoded size:',enc.length);
                if(password){
                    enc = '&e' + enc;
                    console.log('Unencrypted:\n', enc);
                    enc = CryptoJS.AES.encrypt(enc,password).toString();
                    console.log('Crypted: \n',enc);
                    var dec = CryptoJS.AES.decrypt(enc,password);
                    console.log('Decoded:\n',dec.toString());

                }else{
                    window.location = '/#'+enc;
                    window.location.reload();
                }

            },function(progress){console.log(progress);});
        });
    });
}
