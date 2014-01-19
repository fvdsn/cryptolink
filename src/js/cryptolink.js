(function(cryptolink){

    cryptolink.version = "beta";

    // HTML Template for loading ressources for other templates
    
    function header_template(){
        return [
        "<meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1'>",
        "<link href='//fonts.googleapis.com/css?family=Inconsolata:400,700' rel='stylesheet' type='text/css'>",
        "<link href='//fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900,200italic,300italic,400italic,600italic,700italic,900italic' rel='stylesheet' type='text/css'>",
        "<link rel='stylesheet' href='/css/main.css'>",
        "<style>",
            "html{ position: static; }",
        "</style>",
        "",
        ].join('\n');
    }

    // HTML Template for the password dialog
    
    function password_template(args){
        return header_template(args) + [
        "<div class='centerbox'>",
            args.exe ? "<h3>Encrypted <span class='warn'>Executable</span></h3>" 
                     : "<h3>Encrypted Document</h3>",
            args.exe ? "<p class='subtitle warn'> Executables can leak your information </p>"
                     : "",
            "<input type='password' placeholder='Password' id='password' class='textinput'></input>",
            "<button id='decrypt' class='button disabled'>Decrypt</button>",
            "<div id='errorbox' class='textinput invalid hidden'>Wrong Password or Damaged URL</div>",
        "</div>",
        "<a class='bottomlink' href='/'>Encrypted with CryptoLink</a>",
        ].join('\n');
    }

    // HTML Template for error messages

    function error_template(args,msg){
        return header_template(args) + [
        "<div class='centerbox dark'>",
            "<h3>CryptoLink "+cryptolink.version+"</h3>",
            "<p>"+msg+"</p>",
            "<p><a href='/'>Create a Cryptolink?</a></p>",
        "</div>",
        ].join('\n');
    }

    function display_text_template(args,text){
        return header_template(args) + [
        "<div class='page textbox'>",
            "<div class='textinput'>",
                text,
                "<footer class='clearfix'><a href='/' target='_blank' class='button'>Compose New Message</a></footer>",
            "</div>",
        "</div>",
        ].join('\n');
    }

    function display_img_template(args,img){
        return header_template(args) + [
        "<div class='page imgbox'>",
            img,
        "</div>",
        ].join('\n');
    }

    // Shows a password dialog
    // opts { 
    //      exe: BOOL, notify the user that the content is executable
    // }
    // pw_callback : function(pwd), called when the user provides his password

    function ask_for_password(opts,pw_callback){
        $('html').html(password_template(opts));
        $('#password').bind('change input propertychange',function(){
            $('#decrypt').toggleClass('disabled',!$(this).val());
        });
        $('#password').focus();
        $('#password').keypress(function(e){
            if(e.which === 13){
                $('#decrypt').click();
            }
        });

        $('#decrypt').click(function(){
            $('#errobox').addClass('hidden');
            var pw = $('#password').val();
            if(pw){
                pw_callback(pw);
            }
        });
    }

    var entity_map = { 
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#47",
    };

    function escape_html(txt){
        return txt.replace(/[&<>"'\/]/g, function(s){ return entity_map[s]; });
    }

    // returns true if the image provided as a dataurl has a supported format
    cryptolink.is_image_format_allowed = function(dataurl){

        var allowed = [
            'data:image/png;base64,',
            'data:image/gif;base64,',
            'data:image/bmp;base64,',
            'data:image/jpeg;base64,',
        ];

        for(var i = 0; i < allowed.length; i++){
            // escape regexp special chars in the prefix
            var prefix = allowed[i].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
            if(dataurl.match('^'+prefix)){
                return true;
            }
        }
        return false;
    };


    // Returns an html representation of the content based on the type
    // type : [ 'html', 'img', 'text' ] 
    // content: STR, nature depends on type

    function decode_to_html(type,content){

        var textsplit,linebreak;

        if(type === 'html'){

            return content;

        }else if(type === 'img'){


            content = encodeURI(content);
            if(!cryptolink.is_image_format_allowed(content)){
                return null;
            }else{
                return "<img src='"+content+"'>";
            }

        }else if(type === 'text'){

            // does txt.split(sep) then inserts the sep between the tokens
            textsplit = function(txt,sep){
                var out = [];
                txt = txt instanceof Array ? txt : [txt];
                for(var i = 0, len = txt.length; i < len; i++){
                    var tokens = txt[i].split(sep);
                    for(var j = 0, jlen = tokens.length; j < jlen; j++){
                        if(tokens[j] !== ""){
                            out.push(tokens[j]);
                        }
                        if(j !== jlen -1){
                            out.push(sep);
                        }
                    }
                }
                return out;
            };

            // inserts linebreaks after $width characters without breaking words
            linebreak = function(width,tokens){
                var out = [];
                var currlen = 0;
                for(var i = 0, len = tokens.length; i < len; i++){
                    var token = tokens[i];
                    var tokenlen = token === '\t' ? 4 : token.length;

                    if(token === '\n'){
                        out.push('\n');
                        currlen = 0;
                    }else if(currlen && currlen + tokenlen > width){
                        out.push('\n');
                        if(token === ' '){
                            currlen = 0;
                        }else{
                            out.push(token);
                            currlen = tokenlen;
                        }
                    }else{
                        currlen += tokens[i].length;
                        out.push(tokens[i]);
                    }
                }
                return out;
            };


            // 71 is the textarea width as shown in the gui
            content = linebreak(71,textsplit(textsplit(textsplit(content,'\n'),'\t'),' '));

            var urlrgxp = /(^(http|https|ftp|file|)\:\/\/|^(mailto\:|magnet\:))/;

            var out = [];
            for(var i = 0, len = content.length; i < len; i++){
                if(urlrgxp.test(content[i])){
                    out.push('<a href="'+encodeURI(content[i])+'">'+escape_html(content[i])+'</a>');
                }else{
                    out.push(escape_html(content[i]));
                }
            }

            return '<pre>'+out.join("")+'</pre>';

        }else{ // doesn't match known type
            return null;
        }
    }

    // returns the part of the url after the hash, hash not included
    function get_url_hash(url){
        var i = url.indexOf('#');
        if(i > 0){ 
            return url.slice(i + 1);
        }else{
            return '';
        }
    }

    // Decodes an url and replaces the current page by the result.
    //
    // url : STR, the url to decrypt ( most likely current url )
    // opts : {
    //    exe: BOOL, true if we allow executables
    // }

    cryptolink.decode_url = function(url,opts){
        opts = opts || {};
        var doc = get_url_hash(url);

        if(doc){

            // we remove the existing content and stop the loading of further content
            $('html').html('');
            window.stop();

            ask_for_password(opts,function(password){
                try{
                    doc = CryptoJS.AES.decrypt(doc,password).toString(CryptoJS.enc.Utf8);
                    doc = LZString.decompressFromBase64(doc);
                    doc = JSON.parse(doc);
                }catch(e){
                    $('#errorbox').removeClass('hidden');
                    setTimeout(function(){
                        window.location.reload();
                    },1000);
                    return;
                }
                if(!doc){
                    $('#errorbox').removeClass('hidden');
                    setTimeout(function(){
                        window.location.reload();
                    },1000);
                }else{
                    if(!opts.exe && doc.type === 'html'){
                        $('html').html(escape_html(doc.content));
                    }else{
                        var html = decode_to_html(doc.type,doc.content);
                        if(html){
                            if(doc.type === 'img'){
                                $('html').html(display_img_template(opts,html));
                            }else if(doc.type === 'text'){
                                $('html').html(display_text_template(opts,html));
                            }else{
                                $('html').html(html);
                            }
                        }else{
                            $('html').html(error_template(opts,'ERROR: Corrupted Data'));
                        }
                    }
                }
            });

        }else{
            $('html').html(error_template(opts,'ERROR: Nothing to decrypt'));
        }
    };


    
    // Returns an encrypted URL
    // 
    // args: { type: ['text','img','html'],  the type of content
    //         content:  STR,  the content to encode 
    //         password: STR,  the password
    //         baseurl:  STR,   the base cryptolink url
    //         }
    // onsuccess: function(url) : the callback providing the encrypted url

    cryptolink.encode_url = function(args, onsuccess){
        var encoded = JSON.stringify({ type: args.type, content: args.content });
        encoded = LZString.compressToBase64(encoded);
        encoded = CryptoJS.AES.encrypt(encoded,args.password).toString();
        onsuccess( args.baseurl +
                   cryptolink.version +
                   (args.type === 'html' ? '/exe' : '') +
                   '/#' +
                   encoded );
    };

})(typeof exports === 'undefined' ? ( this.cryptolink || (this.cryptolink = {})) : exports );
