$(function(){

    /* ----- Simple Text Editor ----- */

    function TextEditor($el,onupdate){
        var  self = this;
        this.el   = $el.get(0);
        this.$el  = $(this.el);
        this.onupdate = onupdate;
        this.$el.bind('input propertychange',function(){ 
            self.update(); 
        });
        this.update();
        this.set_content('');
    }

    var proto = TextEditor.prototype;

    proto.type     = 'text';
    proto.datatype = 'string';

    proto.show = function(){
        this.$el.removeClass('hidden');
        this.update();
        this.$el.focus();
    };
    proto.hide = function(){
        this.$el.addClass('hidden');
    };
    proto.has_content = function(){
        return this.$el.val() !== "";
    };
    proto.set_content = function(txt){
        this.$el.val(txt);
    };
    proto.get_content = function(){
        return this.$el.val();
    };
    proto.update = function(){
        if(this.onupdate){
            this.onupdate(this);
        }
        this.el.style.height = 'auto';
        this.el.style.height = this.el.scrollHeight + 'px';
    };
    proto.get_encoded_content = function(){
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
        
        var content = this.$el.val();
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

    /* ----- HTML Text Editor ----- */

    function HtmlEditor($el,onupdate){
        var  self = this;
        this.el   = $el.get(0);
        this.$el  = $(this.el);
        this.onupdate = onupdate;
        this.editor = ace.edit(this.el);
        this.editor.setTheme('ace/theme/pastel_on_dark');
        this.editor.getSession().setMode('ace/mode/html');

        this.editor.getSession().on('change',function(){
            self.update(); 
        });
        this.set_content('');
        this.update();
    }

    HtmlEditor.prototype = Object.create(TextEditor.prototype);

    var proto = HtmlEditor.prototype;

    proto.type     = 'html';
    proto.datatype = 'string';

    proto.update = function(){
        if(this.onupdate){
            this.onupdate(this);
        }
        var height = this.editor.getSession().getScreenLength() 
                    * this.editor.renderer.lineHeight 
                    + this.editor.renderer.scrollBar.getWidth();
        height = Math.max(height,190);
        console.log('height:',height);
        this.$el.height(height.toString() + 'px');
        this.editor.resize();
    };

    proto.has_content = function(){
        return this.editor.getValue() !== "";
    };
    proto.get_content = function(){
        return this.editor.getValue();
    };
    proto.set_content = function(txt){
        this.editor.setValue(txt);
    };
    proto.get_encoded_content = function(){
        return this.editor.getValue();
    };

    /* ----- Image Uploader ----- */

    function ImgEditor($el,onupdate){
        var  self = this;
        this.el   = $el.get(0);
        this.$el  = $(this.el);
        this.onupdate = onupdate;
        this.update();
        this.content = '';
        this.$el.find('#img-selector').on('change',function(event){
            self.loadimage(event.target.files[0]);
        });
    }

    ImgEditor.prototype = Object.create(TextEditor.prototype);

    var proto = ImgEditor.prototype;

    proto.type     = 'img';
    proto.datatype = 'img';

    proto.update = function(){
        if(this.onupdate){
            this.onupdate(this);
        }
    };
    proto.get_content = function(){
        return this.content;
    };
    proto.get_encoded_content = function(){
        return this.get_content();
    };
    proto.has_content = function(){
        return this.content !== '';
    };
    proto.set_content = function(){};

    proto.show_error = function(message){
        $('#img-error').text(message);
        $('#img-error').removeClass('hidden');
    };
    proto.hide_error = function(){
        $('#img-error').addClass('hidden');
    };
    proto.loadimage = function(file){
        var self = this;
        this.hide_error();
        if(!file.type.match(/image.*/)){
            self.show_error('Unsupported File Format');
            console.log('Not an image!');
            return;
        }

        var reader = new FileReader();
        reader.onload = function(event){
            var img = new Image();
            img.src = event.target.result;
            self.content = '<img src="'+event.target.result+'">';
            self.$el.find('.userimages').empty();
            self.$el.find('.userimages').append(img);
            self.$el.find('.dropinvite').addClass('hidden');
            self.update();
        };
        reader.onerror = function(){
            self.show_error('Could not read file');
        };
        reader.readAsDataURL(file);
    };


    /* ----- Main GUI ----- */
    
    function on_content_changed(editor){
        if(editor.has_content()){
            $('#submit').removeClass('disabled');
        }else{
            $('#submit').addClass('disabled');
        }
        $('.urlbox').addClass('hidden');
    }

    var editors = {
        'text': new TextEditor($('#editor-text'), on_content_changed),
        'html': new HtmlEditor($('#editor-html'), on_content_changed),
        'img' : new ImgEditor($('#editor-img'), on_content_changed),
    };

    var editor = editors.text;

    function set_editor(type){
        console.log('type:',type, editors);
        if(editors[type] && editor.type !== type){
            editor.hide();
            if(editor.datatype === editors[type].datatype){
                editors[type].set_content(editor.get_content());
            }
            editor = editors[type];
            $('#content-type .option.active').removeClass('active');
        }
        $('#content-type .option[data-type="'+type+'"]').addClass('active');
        editor.show();
    }

    set_editor('text');

    $('#content-type .option').click(function(){
        set_editor($(this).data('type'));
    });
    $('#content-type .option').hover(function(){
            var type = $(this).data('type');
            var label = $('#content-type .label');
            if(type === 'text'){
                label.text('Encrypt a Text Message');
            }else if(type === 'html'){
                label.text('Encrypt an HTML Web Page');
            }else if(type === 'img'){
                label.text('Encrypt a Picture');
            }
            label.removeClass('invisible');
        },function(){
            $('#content-type .label').addClass('invisible');
        });
    
    function display_security(security,score){
        var s = $('#security');
        if(security === 'insecure'){
                s.addClass('invalid');
                s.removeClass('valid');
                s.html("<span class='progress'></span><i class='icon-warning-sign'></i>&nbsp; Insecure");
                s.removeClass('hidden');
                s.find('.progress').css('width',Math.floor(score*100)+'%');
        }else if(security === 'secure'){
                s.addClass('valid');
                s.removeClass('invalid');
                s.html("<span class='progress'></span><i class='icon-lock'></i>&nbsp; Secure");
                s.removeClass('hidden');
                s.find('.progress').css('width',Math.floor(score*100)+'%');
        }else{
                s.removeClass('valid');
                s.addClass('hidden');
                s.html('');
        }
    }

    var timeout = null;
    function checkPassword(){
        var pw = $('#password');
        clearTimeout(timeout);
        timeout = setTimeout(function(){

            if(pw.val().length === 0){
                display_security('none');
            }else{
                var security = zxcvbn(pw.val(),['horsebatterystaple']);
                console.log('entropy:',security.entropy);
                if(security.entropy <= 64){
                    display_security('insecure',security.entropy/64.0);
                }else{
                    display_security('secure',(security.entropy-64)/192.0);
                }
            }
        },100);
    }

    $('#password').bind('change input propertychange',checkPassword);
    $('#password').val('');

    $('#submit').click(function(){
        var content = editor.get_encoded_content();
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
                    if(url.length <= 4296){
                        $('#qrcode').empty();
                        new QRCode($('#qrcode')[0],{
                            'text': url,
                            'width': 568,
                            'height': 568,
                        });
                    }
                });
            },500);
        }
    });
});
