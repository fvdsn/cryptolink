if(window.location.hash){
    $('html').html('');
    window.stop();

    var doc = window.location.hash.slice(1);
    if(doc[0] === '?'){
        $('html').html("<input type='text' placeholder='Password' id='password'></input><button id='decrypt'>Decrypt</button>");
        $('#decrypt').click(function(){
            doc = doc.slice(1);
            doc = CryptoJS.AES.decrypt(doc,$('#password').val()).toString(CryptoJS.enc.Utf8);
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
}else{
    $(function(){
        $('#submit').click(function(){
            var content = $('#content').val();
            var password = $('#password').val();
            if(!content){ return; }
            LZMA.compress(content,5,function(result){
                var ures = new Uint8Array((new Int8Array(result)).buffer);
                var enc = base64ArrayBuffer(ures.buffer);
                if(password){
                    enc = CryptoJS.AES.encrypt(enc,password).toString();
                    enc = '?' + enc;
                }
                window.location = '/#'+enc;
                window.location.reload();
            },function(progress){console.log(progress);});
        });
    });
}
