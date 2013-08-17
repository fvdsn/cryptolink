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
    };
    proto.focus = function(){
        this.$el.focus();
    };
    proto.hide = function(){
        this.$el.addClass('hidden');
    };
    proto.has_content = function(){
        return !!this.get_content();
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
        this.el.style.height = Math.max(this.el.scrollHeight,222) + 'px';
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
        this.$el.height(height.toString() + 'px');
        this.editor.resize();
    };

    proto.get_content = function(){
        return this.editor.getValue();
    };
    proto.set_content = function(txt){
        this.editor.setValue(txt);
    };

    /* ----- Image Uploader ----- */

    function ImgEditor($el,onupdate){
        var  self = this;
        this.el   = $el.get(0);
        this.$el  = $(this.el);
        this.onupdate = onupdate;
        this.update();
        this.content = '';
        this.$el.click(function(){
            $('#img-selector').click();
        });
        $('#img-selector').on('change',function(event){
            self.loadimage(event.target.files[0]);
        });
    }

    ImgEditor.prototype = Object.create(TextEditor.prototype);

    var proto = ImgEditor.prototype;

    proto.type     = 'img';
    proto.datatype = 'img';

    proto.update = function(){
        if(this.onupdate){
            this.onupdate();
        }
    };
    proto.get_content = function(){
        return this.content;
    };
    proto.set_content = function(){};

    proto.show_error = function(message){
        $('#img-error').text(message);
        $('#img-error').removeClass('hidden');
    };
    proto.hide_error = function(){
        $('#img-error').addClass('hidden');
    };
    proto.resize_image = function(img,maxheight,maxwidth,callback){
        img.onload = function(){
            if (img.height <= maxheight && img.width <= maxwidth){ 
                callback(img);
            }else{
                var jpeg = new Image();
                var canvas = document.createElement("canvas");
                var context = canvas.getContext("2d");
                var ratio  = 1;

                if(img.width > maxwidth){
                    ratio = maxwidth / img.width;
                }
                if(img.height * ratio > maxheight){
                    ratio = maxheight / img.height;
                }
                var width = Math.floor(img.width * ratio);
                var height = Math.floor(img.height * ratio);

                canvas.width = width;
                canvas.height = height;
                context.drawImage(img,0,0,width,height);

                var encoder = new JPEGEncoder(90);
                jpeg.src = encoder.encode(context.getImageData(0,0,width,height));
                jpeg.onload = function(){
                    callback(jpeg);
                }
            }
        }
    };

    proto.loadimage = function(file){
        var self = this;
        this.hide_error();
        if(!file.type.match(/image.*/)){
            self.show_error('Unsupported File Format');
            return;
        }

        var reader = new FileReader();
        reader.onload = function(event){
            var dataurl = event.target.result;

            if(!cryptolink.is_image_format_allowed(dataurl)){
                self.show_error('Unsupported File Format');
                return;
            }

            var img = new Image();
            img.src = dataurl;
            self.resize_image(img,600,600,function(img){
                self.content = img.src;
                self.$el.find('.userimages').empty();
                self.$el.find('.userimages').append(img);
                self.$el.find('.dropinvite').addClass('hidden');  
                self.$el.removeClass('smallpic');
                if(img.width < 600 || img.height < 257){
                    self.$el.addClass('smallpic');
                }
                self.update();
            });
        };
        reader.onerror = function(){
            self.show_error('Could not read file');
        };
        reader.readAsDataURL(file);
    };


    /* ----- Main GUI ----- */
    
    var editor = null;

    function on_content_changed(){
        if(editor && editor.has_content() && $('#password').val()){
            $('#submit').removeClass('disabled');
        }else{
            $('#submit').addClass('disabled');
        }
        $('#display').addClass('hidden');
    }

    var editors = {
        'text': new TextEditor($('#editor-text'), on_content_changed),
        'html': new HtmlEditor($('#editor-html'), on_content_changed),
        'img' : new ImgEditor($('#editor-img'), on_content_changed),
    };

    editor = editors.text;

    function set_editor(type){
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
    editor.focus();

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
    function check_password(){
        var pw = $('#password');
        clearTimeout(timeout);
        timeout = setTimeout(function(){

            if(pw.val().length === 0){
                display_security('none');
            }else{
                var security = zxcvbn(pw.val(),['horsebatterystaple']);
                if(security.entropy <= 64){
                    display_security('insecure',security.entropy/64.0);
                }else{
                    display_security('secure',(security.entropy-64)/192.0);
                }
            }
        },100);
    }

    $('#password').bind('change input propertychange',check_password);
    $('#password').bind('change input propertychange',on_content_changed);
    $('#password').val('');
    $('#password').keypress(function(e){
        if(e.which === 13){
            $('#submit').click();
        }
    });

    function flash_class($el,css_class){
        $el.addClass('transition0');
        $el.addClass(css_class);
        setTimeout(function(){
            $el.removeClass('transition0');
            $el.addClass('transition500');
            $el.removeClass(css_class);
            setTimeout(function(){
                $el.removeClass('transition500');
            },500);
        },100);
    }
    window.flash_class = flash_class;

    $('#submit').click(function(){
        var content = editor.get_content();
        var password = $('#password').val();

        function on_encoding_success(url){
            $('.urlbox .url').attr('href',url).text(url.slice(0,1024));
            $('.urlbox .js-url-length').text(url.length < 1024 ? 
                  url.length+ ' characters' 
                : Math.floor(url.length*10/1024) / 10 + ' KiB');
            $('.urlbox .js-url-executable').text( editor.type === 'html' ? 'Yes' : 'No');
            $('.loading').addClass('hidden');
            $('#display').removeClass('hidden');

            $('#qrcode').empty();

            var correctLevel = null;
            var small = url.length < 175;

            if(url.length <= 2953){
                $('#qrcode').qrcode({
                    'text': url,
                    'size': small ? 284 : 568,
                });
                var imgdata = $('#qrcode canvas')[0].toDataURL();
                $('#qrcode canvas').replaceWith($('<img>').attr('src',imgdata));
            }else{
                $('#qrcode').text('Sorry, the data is too big to fit in a QR-Code');
            }
            
            $('html, body').animate({
                scrollTop: $('#display').offset().top - window.innerHeight * 0.3
            },500);
        }
        if(!content){
            flash_class(editor.$el,'invalid');
        }
        if(!password){
            flash_class($('#password'),'invalid');
        }
        if(content && password){ 
            $('.loading').removeClass('hidden');
            setTimeout(function(){
                var origin = window.location.origin || window.location.protocol + '//' + window.location.host;
                var baseurl = origin + window.location.pathname;

                cryptolink.encode_url({
                    baseurl: baseurl,
                    content: content,
                    type: editor.type,
                    password: password
                }, on_encoding_success );

            },500);
        }
    });

    /* ----- Copy URL Button ----- */
    
    ZeroClipboard.setDefaults({ 
        moviePath: 'js/vendor/ZeroClipboard.swf',
        forceHandCursor: true, //FIXME: not working.
    });

    var clip = new ZeroClipboard($('#copyurl'));

    clip.on('dataRequested', function(client, args){
        client.setText($('.urlbox .url').attr('href'));
    });
    clip.on('noflash',function(){
        $('#copyurl').addClass('hidden');
    });

    /* ---- Encrypted Result Display ---- */
    
    var display_type = null;

    function set_display(type){
        if(display_type !== type){
            if(display_type){
                $('#display-'+display_type).addClass('hidden');
            }
            display_type = type;
            $('#display-'+type).removeClass('hidden');
            $('#display-type .option.active').removeClass('active');
        }
        $('#display-type .option[data-type="'+type+'"]').addClass('active');
    }
    set_display('url');
    
    $('#display-type .option').click(function(){
        set_display($(this).data('type'));
    });
    $('#display-type .option').hover(function(){
            var type = $(this).data('type');
            var label = $('#display .label');
            if(type === 'url'){
                label.text('Encrypted URL');
            }else if(type === 'qrcode'){
                label.text('Encrypted QR-Code');
            }
            label.removeClass('invisible');
        },function(){
            $('#display .label').addClass('invisible');
        });
});
