(function ($) {
	$(function () {
		$(document).ready(function() {
			if($('input.txt').length > 0) inputFnc();//�명뭼諛뺤뒪
			if($('.selectbox select').length > 0) selectboxFnc();//���됲듃諛뺤뒪
			if($('input.chk').length > 0) checkboxFnc();//泥댄겕諛뺤뒪
			if($('input.rdi').length > 0) radioboxFnc();//�쇰뵒�ㅻ컯��
			if($('input.value, textarea.area').length > 0) $('input.value, textarea.area').check();//�명뭼�띿뒪�� 泥댄겕
			if ($('#gnb').length > 0) gnbFnc();//GNB
		});//ready

		$(window).scroll(function(){
			var _top = $(this).scrollTop();
			var _start = ($("#container").offset().top);
			var _gnb = $("#gnb");
			if (_top>_start){
				_gnb.addClass('fixed');
			}else {
				_gnb.removeClass('fixed');
			};
		});

		inputFnc = function (obj) {//�명뭼諛뺤뒪
			var _this, _tmp, _bg = null;
			if (!obj)
				_this = $('input.txt, textarea.area');
			else
				_this = $(obj).find('input.txt, textarea.area');
			_this.unbind('focus blur').bind('focus', function () {
				_bg = ($(this).attr('class').indexOf('bg') > -1) ? true : false;
				$(this).addClass('on');//�대옒�� 諛⑹떇
				if(_bg) $(this).removeClass('bg');
			}).bind('blur', function () {
				$(this).removeClass('on');//�대옒�� 諛⑹떇
				if (_bg && $(this).val() == '') $(this).addClass('bg');
			});
		};//�명뭼諛뺤뒪

		selectboxFnc = function (obj) {//���됲듃諛뺤뒪
			var _select = null
			if (!obj)
				_select = $('.selectbox select');
			else
				_select = ($(obj).find('.selectbox select').length > 0) ? $(obj).find('.selectbox select') : $(obj);
				_select.unbind().each(function (index, value) {
					$(this).prev().html($(this).children('option:selected').text());
					if ($(this).val() == 'direct') {//吏곸젒�낅젰
						$(this).parent().parent().find('.direct').css('display', 'inline');
				}
			}).bind('change keyup', function (evt) {
				$(this).prev().html($(this).children('option:selected').text());
				if ($(this).prev().is('.ellipsis')) $(this).prev().ellipsis();//湲�以꾩엫 �ㅼ젙
				if ($(this).find("option[value='direct']").length == 1) {//吏곸젒�낅젰 �ㅼ젙
					if ($(this).val() == 'direct') {
						$(this).parent().parent().find('.direct').css('display', 'inline');
						if (evt.type == 'change') $(this).parent().parent().find('.direct').focus();//吏곸젒�낅젰 �ъ빱�� �대룞
					} else {
						$(this).parent().parent().find('.direct').css('display', 'none');
					}
				}
			}).bind('focus', function () {
				$(this).prev().addClass('on');
			}).bind('blur', function () {
				$(this).prev().removeClass('on');
			});

		};//���됲듃諛뺤뒪

		checkboxFnc = function () {//泥댄겕諛뺤뒪
			var _chk = $('.chk').parent();
			_chk.each(function() {
				if ($(this).find('input').is(':checked')) {
					$(this).removeClass('off').addClass('on');
				} else {
					$(this).removeClass('on').addClass('off');
				};
			}).click(function() {
				if ($(this).find('input').is(':checked')) {
					$(this).removeClass('off').addClass('on');
				} else {
					$(this).removeClass('on').addClass('off');
				};
			});
		};//泥댄겕諛뺤뒪

		radioboxFnc = function () {//�쇰뵒�ㅻ컯��
			var _rdi = $('.rdi').parent();
			_rdi.each(function() {
				if ($(this).find('input').is(':checked')) {
					$(this).removeClass('off').addClass('on');
				} else {
					$(this).removeClass('on').addClass('off');
				}
			}).click(function() {
				var _name = $(this).find('input').attr('name');
				var _radio = $('label input[name$='+_name+']');
				var _index = _radio.parent().index(this);
				_radio.each(function(index, value) {
					if (_index == index) {
						$(this).checked = true;
						$(this).parent().removeClass('off').addClass('on');
					} else {
						$(this).checked = false;
						$(this).parent().removeClass('on').addClass('off');
					};
				});
			});
		};//�쇰뵒�ㅻ컯��

		$.fn.check = function(index) {//�명뭼�띿뒪�� 泥댄겕
			return this.each(function(index, value) {
				var _default = $(this).attr('default');
				if(this.value == '' || this.value == _default) {
					$(this).attr('value', _default);
				} else {
					$(this).removeClass('value');
				}
				$(this).bind('focus', function() {
					if(this.value == _default) {
						this.value = '';
					}
					$(this).removeClass('value');
				}).bind('blur', function() {
					if(this.value == '' || this.value == _default) {
						this.value = _default;
						$(this).addClass('value');
					};
				});
			});
		};//�명뭼�띿뒪�� 泥댄겕

		if(!$.fn.ellipsis) {//湲�以꾩엫 v3 2017-12-11 �섏젙
			$.fn.ellipsis = function(index) {//v2�쒓렇�꾪꽣 異붽�, v3�대옒�� 異붽�
				return this.each(function(index, value) {
					var el = $(this);
					if(el.attr('ellipsis') != null) return false;
					if(el.css("overflow") == "hidden") {
						var _tmpObj = (el.find('span').length > 0) ? el.find('span') : null;
						var _tmpWidth = el.find('span').outerWidth() || 0;
						var _tmpClass = el.find('span').attr('class') || 0;
						var text = el.find('span').remove();
							text = el.html();
						var multiline = el.hasClass('multiline');
						var t = $(this.cloneNode(true))
						.hide()
						.css({
							'max-height':'none',
							'position':'absolute',
							'overflow':'visible'
						})
						.width(multiline ? el.width() - _tmpWidth : 'auto')
						.height(multiline ? 'auto' : el.height());
						el.after(t);
						function height() { return t.height() > el.height(); };
						function width() { return t.width() > el.width() - _tmpWidth; };
						var func = multiline ? height : width;
						while (text.length > 0 && func()) {
							text = text.substr(0, text.length - 1);
							t.html(text + "<em>...</em>");
							if(func())el.attr('title', el.text().replace(/[\t]/g, '').replace(/[\r\n]/g, ' '));//���댄� 異붽�
						}
						if(_tmpObj != null) el.html(t.html() + '<span'+ ((_tmpClass) ? ' class=\"'+_tmpClass+'\"' : '') +'>' +_tmpObj.html() + '</span>');//�쒓렇�꾪꽣 遺숈엫
						else el.html(t.html());
						t.remove();
						el.attr('ellipsis',true);
					};
				});
			};
		};

		tabFnc = function (obj, group, idx) {//��찓��
			$(group).each(function (index, value) {
				if(idx == index) {
					$(group).eq(index).show();
					$(obj).parents('ul').find('li').eq(index).addClass('on');
				} else {
					$(group).eq(index).hide();
					$(obj).parents('ul').find('li').eq(index).removeClass('on');
				};
			});
			return false;
		}//��찓��

		function gnbFnc(){//GNB
			//�ㅽ겕濡� �좊땲硫붿씠��
			var $body = $('body');
			var htmlWrap = $('html, body');
			$body.on('click', '#gnb ul a, .infoArea ul a', function (e) {
				var offset = $($(this).attr('href')).offset(),
					paddingTop = $(this).data('padding-top') || 44
				if (!!offset) {
					htmlWrap.stop().animate({scrollTop: offset.top - paddingTop});
					e.preventDefault();
				};
			});

			//�꾩튂�먮뵲�� 硫붾돱 �쒖꽦��
			var $window = $(window),
				sectionBorderPadding = 70,
				lastEventToken,
				$gnb = $('#gnb'),
				idArray = [];
			$window.on('scroll', function () {
				//留덉�留� �대깽�몃쭔 泥섎━�섎룄濡�
				var closureToken = Math.floor((Math.random() * 1000000) + 1),
					windowScrollTop = $window.scrollTop(),
					tabOn, tmpOffset;
				var _start = ($("#sec1").offset().top)-45;
				lastEventToken = closureToken;

				if (windowScrollTop > _start) {
					$('.btnTop').show();
				} else {
					$('.btnTop').hide();
					$('#gnb ul li').removeClass('on');
				};

				$('.scSet').each(function(n){
					var id = $(this);
					idArray[n] = id;
				});

				setTimeout(function () {
					if (closureToken === lastEventToken) {
						tabOn = 0;
						for(i=0; i<idArray.length; i++){
							if (idArray[i].size() > 0) {
								tmpOffset =idArray[i].offset();
								if ((windowScrollTop + sectionBorderPadding) > tmpOffset.top ) {
									tabOn = i;
								} else {
									break;

								};
							};
						};
						if ($(window).scrollTop()>_start) {
							$gnb.find('li').eq(tabOn).addClass('on').siblings().removeClass('on');
						}else{
							$gnb.find('li').removeClass('on');
						};
					};
				}, 200);

				if ($(window).scrollTop()==0) {
					$('#gnb ul li').removeClass('on');
					console.log('aaaa')
				}

			});
			$(".btnTop").click(function() {//top踰꾪듉
				$('html, body').animate({
					scrollTop : 0
				}, 200);
				return false;
			});
		};//GNB
	});//$jQuery
})(jQuery);