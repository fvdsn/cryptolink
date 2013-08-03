$(function(){

    var content_type = '';  
    
    function set_content_type(type){
        console.log('set_content_type',type);
        $('#content').focus();
        if(type !== content_type){
            $('#content-type .option.active').removeClass('active');
            $('#content-type .option[data-type="'+type+'"]').addClass('active');
        }
        content_type = type;
    }
    $('#content-type .option').click(function(){
        set_content_type($(this).data('type'));
    });

    set_content_type('text');
        
    encoder = {};
    encoder.text = function(){
        // does txt.split(sep) then inserts the sep between the tokens
        function split(txt,sep){
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
        }
        var entity_map = { 
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': '&quot;',
            "'": '&#39;',
            "/":"/",
        };
        function escape_html(txt){
            return txt.replace(/[&<>"'\/]/g, function(s){ return entity_map[s]; });
        }
        
        var content = $('#content').val();
        var out = [];
        
        content = split(split(split(content,'\n'),'\t'),' ');
        
        var urlrgxp = /(^(http|https|ftp|file|)\:\/\/|^(mailto\:|magnet\:))/;

        for(var i = 0, len = content.length; i < len; i++){
            if(urlrgxp.test(content[i])){
                out.push('<a href="'+encodeURI(content[i])+'">'+escape_html(content[i])+'</a>');
            }else{
                out.push(escape_html(content[i]));
            }
        }
        return '<pre>'+out.join("")+'</pre>';
    };

    encoder.html = function(){ 
        return $('#content').val(); 
    }; 

    encoder.picture = function(){
        return 'picture';
    };
    
    $('#content').bind('input propertychange',function(){
        if($(this).val()){
            $('#submit').removeClass('disabled');
        }else{
            $('#submit').addClass('disabled');
        }
        $('.urlbox').addClass('hidden');
    });

    $('#submit').click(function(){
        var content = encoder[content_type](); 
        console.log(content);
        var password = $('#password').val();
        if(content){ 
            $('.loading').removeClass('hidden');
            setTimeout(function(){
                cryptolink.encode_url(content,password,function(result){
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
});
