$(function () {

    svg4everybody();

    var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if ($('.prod__header-nav-box').length) {
        new SimpleBar(document.querySelector('.prod__header-nav-box'), {
            autoHide: false,
        });
    }

    $('.filter-toggle').on('click', function (event) {
        $(".filter__wrap").addClass('active');
        $("body").addClass('filter-active');
    });

    $('.filter__wrap-mob-toggle').on('click', function (event) {
        $(".filter__wrap").removeClass('active');
        $("body").removeClass('filter-active');
    });

    let $range = $(".range-slider--price .js-range-slider"),
        $inputFrom = $(".range-slider--price .js-input-from"),
        $inputTo = $(".range-slider--price .js-input-to"),
        instance,
        min = 0,
        max = 5000000,
        instance_power,
        $range_power = $(".range-slider--power .js-range-slider"),
        $inputFrom_power = $(".range-slider--power .js-input-from"),
        $inputTo_power = $(".range-slider--power .js-input-to"),
        max_power = 1500;

    $range.ionRangeSlider({
        skin: "round",
        type: "double",
        hide_min_max: true,
        hide_from_to: true,
        min: min,
        max: max,
        from: 950275,
        to: 3452275,
        onStart: updateInputs,
        onChange: updateInputs
    });

    $range_power.ionRangeSlider({
        skin: "round",
        type: "double",
        hide_min_max: true,
        hide_from_to: true,
        min: min,
        max: max_power,
        from: 175,
        to: 653,
        onStart: updateInputsPower,
        onChange: updateInputsPower
    });

    instance = $range.data("ionRangeSlider");
    instance_power = $range_power.data("ionRangeSlider");

    function updateInputs(data) {
        from = data.from.toLocaleString();
        to = data.to.toLocaleString();

        $inputFrom.prop("value", from);
        $inputTo.prop("value", to);
    }

    $inputFrom.on("input", function () {
        var val = $(this).prop("value");
        if (val < min) {
            val = min;
        } else if (val > to) {
            val = to;
        }

        instance.update({
            from: val
        });
    });

    $inputTo.on("input", function () {
        var val = $(this).prop("value");

        if (val < from) {
            val = from;
        } else if (val > max) {
            val = max;
        }

        instance.update({
            to: val
        });
    });

    function updateInputsPower(data) {
        from = `від ${data.from.toLocaleString()} к.с.`;
        to = `до ${data.to.toLocaleString()} к.с.`;

        $inputFrom_power.prop("value", from);
        $inputTo_power.prop("value", to);
    }

    $inputFrom_power.on("input", function () {
        var val = $(this).prop("value");

        if (val < min) {
            val = min;
        } else if (val > to) {
            val = to;
        }

        instance_power.update({
            from: val
        });
    });

    $inputTo_power.on("input", function () {
        var val = $(this).prop("value");

        if (val < from) {
            val = from;
        } else if (val > max) {
            val = max;
        }

        instance_power.update({
            to: val
        });
    });

    $('.filter__title').on('click', function (event) {
        event.preventDefault();
        $(this).toggleClass('active').siblings('.filter__item-content').stop(true, true).slideToggle();
    });

    if ($('.prod__media-nav').length) {

        var galleryThumbs = new Swiper('.prod__media-nav', {
            spaceBetween: 10,
            slidesPerView: 7.5,

            direction: 'vertical',

            freeMode: true,
            mousewheel: {
                invert: false,
            },
            scrollbar: {
                el: '.swiper-scrollbar',
                hide: false,
            },
            watchSlidesVisibility: true,
            watchSlidesProgress: true,

            breakpoints: {
                300: {
                    direction: 'horizontal',
                    slidesPerView: 4.5,
                },
                675: {
                    slidesPerView: 4.5,
                    direction: 'horizontal',
                },
                768: {
                    slidesPerView: 6.5,
                    direction: 'horizontal',
                },
                1200: {
                    direction: 'vertical',
                },

            }

        });
        var galleryTop = new Swiper('.prod__media-gallery', {
            thumbs: {
                swiper: galleryThumbs
            }
        });

    }

    if ($('.history__years').length) {

        var historyYears = new Swiper('.history__years', {
            direction: 'vertical',
            slidesPerView: 5,
            mousewheel: {
                invert: false,
            },
            centeredSlides: true,
            pagination: false,
            navigation: {
                prevEl: '.history__control-btn--prev',
                nextEl: '.history__control-btn--next',
            },
        });
        historyYears.slideTo(2, 200);

        var historyContent = new Swiper('.history__content', {
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            thumbs: {
                swiper: historyYears,
            },
            breakpoints: {
                300: {
                    autoHeight: true,
                },
                575: {
                    autoHeight: false,
                },

            }
        });
        historyContent.slideTo(2, 200);

        historyContent.on('slideChangeTransitionStart', function () {
            historyYears.slideTo(historyContent.activeIndex);
        });

        historyYears.on('transitionStart', function () {
            historyContent.slideTo(historyYears.activeIndex);
        });
    }

    $('.accordion__title').click(function () {
        var $this = $(this);
        $this.next('.accordion__content').stop(true, true).slideToggle('200');
        $this.parent().toggleClass('accordion__item--active');
        $this.parent().siblings('.accordion__item').children('.accordion__content').stop(true, true).slideUp('200');
        $this.parent().siblings('.accordion__item').removeClass('accordion__item--active');
    });

    $(".form__item input, .form__item textarea").focus(function () {
        $(this).parent().addClass("form__item--focus");
    }).blur(function () {
        if ($(this).val() === '') {
            $(this).parent().removeClass("form__item--focus");
        }
    });

    $('select').niceSelect();

    $('.map-dot').on('click', function () {
        let dotId = $(this).data('dotid');
        let parentWidth = $('.contact-block').outerWidth();
        let curElemPosTop = $(this).offset().top - $('.map__img').offset().top;
        let curElemPosLeft = $(this).offset().left - $('.map__img').offset().left;
        let blockHeight = $(`.map__popup.${dotId}`).outerHeight();
        let blockWidth = $(`.map__popup.${dotId}`).outerWidth();
        let topPosition, leftPosition;
        let maxPosition = curElemPosLeft + blockWidth / 2 + $('.map__img').offset().left;
        if (maxPosition > parentWidth) {
            topPosition = curElemPosTop - blockHeight - 10;
            leftPosition = curElemPosLeft - blockWidth / 2 - (maxPosition - parentWidth + 15);
            $(`.map__popup.${dotId}`).addClass('pos-fix');
        } else {
            topPosition = curElemPosTop - blockHeight - 10;
            leftPosition = curElemPosLeft - blockWidth / 2 + 7;
        }
        $(`.map__popup.${dotId}`).css({
            'top': topPosition,
            'left': leftPosition
        });
        if (this.classList.contains('active')) {
            $(this).removeClass('active');
            $(`.map__popup.${dotId}`).removeClass('active');
        } else {
            $('.map-dot').removeClass('active');
            $('.map__popup').removeClass('active');
            $(this).addClass('active');
            $(`.map__popup.${dotId}`).addClass('active');
        }
    });

    $('.map__popup-close').on('click', function (event) {
        $('.map__popup').removeClass('active');
        $('.map-dot').removeClass('active');

    });

    $('.nav li').each(function (index, el) {
        if ($(el).find("ul").length) {
            $(el).addClass('submenu');
            $('<div class="nav-item-toggle"><svg class="svg svg--down "><use xlink:href="img/svg/symbol/sprite.svg#down"></use></svg></div>').appendTo($(el).children('a'));
        }
    });

    if (sessionStorage.getItem("flyFormKey") != 0) {
        setTimeout(function () {
            windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            if (windowWidth > 991) {
                document.querySelector('.fly-form').classList.add('active');
            } else {
                document.querySelector('.fly-form-toggle').classList.add('active');
            }
        }, 10000);
    }

    $('.fly-form-toggle__close').on('click', function (event) {
        $(this).parents('.fly-form-toggle').hide();
    });

    let flyFormClose = document.querySelector('.fly-form__close');
    flyFormClose.onclick = function (event) {
        windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if (windowWidth > 991) {
            document.querySelector('.fly-form').classList.remove('active');
        } else {
            $.fancybox.close();
        }
        sessionStorage.setItem("flyFormKey", 0);
    };

    if ($('.filter__box').length) {
        $('.filter__items .swiper-slide').clone().appendTo(".filter__box .swiper-wrapper");

        let filterSlider;
        let slInit = function () {
            filterSlider = new Swiper('.filter__box', {
                spaceBetween: 30,
                slidesPerView: 7,
                loopedSlides: 7,
                autoplayDisableOnInteraction: false,
                loop: true,
                freeMode: true,
                speed: 7000,
                autoplay: {
                    delay: 0,
                    disableOnInteraction: false,
                    waitForTransition: false,
                    stopOnLastSlide: false
                },
                breakpoints: {
                    300: {
                        slidesPerView: 1,
                        loopedSlides: 1,
                    },
                    575: {
                        slidesPerView: 3,
                        loopedSlides: 3,
                    },
                    768: {
                        slidesPerView: 4,
                        loopedSlides: 4,
                    },
                    1200: {
                        slidesPerView: 5,
                        loopedSlides: 5,
                    },
                    1500: {
                        slidesPerView: 7,
                        loopedSlides: 7,
                    },

                }

            });
        }
        slInit()

        $('.filter__btn').on('click', function (event) {
            event.preventDefault();
            $(this).addClass('active').siblings().removeClass('active');
            let curId = $(this).data('filter')
            filterSlider.destroy(false, true)
            $(".filter__box .swiper-wrapper").html('');
            if (curId == 'all') {
                console.log("all");
                $('.filter__items .swiper-slide').clone().appendTo(".filter__box .swiper-wrapper");
            } else {
                $('.filter__items .swiper-slide').each(function (index, el) {
                    if ($(this).data('fcategory') == curId) {
                        $(el).clone().appendTo(".filter__box .swiper-wrapper");
                    };
                });
            };
            slInit();
        });
    }

    var swiper = new Swiper('.main-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        navigation: {
            prevEl: '.main-slider__control-item--prev',
            nextEl: '.main-slider__control-item--next',
        },
        breakpoints: {
            300: {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: false,
            },
            576: {
                pagination: false
            },

        }
    });

    $('table').wrap('<div class="table-wrapper"></div>')

    $("[data-fancybox]").fancybox({
        touch: false,
        backFocus: false,
        autoFocus: false,
    });

    $('.hamburger--js').on('click', function (event) {
        $(this).toggleClass('open');
        $("body").toggleClass('nav-open');
        $("header").toggleClass('active');
        $('.header__bot').stop(true, true).slideToggle();
    });

    $(window).on('load resize', function (event) {
        windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if (windowWidth <= 1199) {
            let containerWidth = $('.header__top-box').outerWidth();
            $('.search__field').css('width', containerWidth);
        }
    });
    $('.search-close').on('click', function (event) {
        $('.search-toggle').removeClass('open');
        $('.header__top-search').stop(true, true).slideUp(150);
    });

    $('.search-toggle').on('click', function (event) {
        $(this).toggleClass('open');
        $('.header__top-search').stop(true, true).slideToggle(150);
        $('.search__field input').focus();
    });

    $('.submenu > a').on('click', function (event) {
        windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if (windowWidth < 1200) {
            event.preventDefault();
            $(this).parent().toggleClass('active').children('ul').stop(true, true).slideToggle();
        }
    });

    if (windowWidth > 1199) {

        $(window).resize(function () {
            windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            refreshVar(); //part of the function of fixing the menu
        });

        var navPos, winPos, navHeight;

        function refreshVar() {
            navPos = $('.header__bot').offset().top;
            navHeight = $('.header__bot').outerHeight(true);
        };
        refreshVar();

        $('<div class="header__bot--clone"></div>').insertBefore('.header__bot').css('height', navHeight).hide();

        $(window).scroll(function () {
            winPos = $(window).scrollTop();
            if (winPos >= navPos) {
                $('.header__top-search .search').appendTo('.header__bot-search');
                $('.header__bot').addClass('header__bot--fixed');
                $('.header__bot--clone').show();
            } else {
                $('.header__bot-search .search').appendTo('.header__top-search');
                $('.header__bot').removeClass('header__bot--fixed');
                $('.header__bot--clone').hide();
            }
        });
    } else {
        $('.header__contact').appendTo('.header__bot-box')
    }


    function scrollTracking(target) {
        var windowScroll = $(window).scrollTop();
        var elementOffset = $(target).offset().top - 400;
        if (windowScroll >= elementOffset) {
            $(target).addClass('anm-start')
        }
    }

    $(document).ready(function () {
        $('.scroll-action').each(function () {
            scrollTracking($(this));
        });
    });

    var didScroll = false;

    window.onscroll = doThisStuffOnScroll;

    function doThisStuffOnScroll() {
        didScroll = true;
    }

    setInterval(function () {
        if (didScroll) {
            didScroll = false;
            $('.scroll-action').each(function () {
                scrollTracking($(this));
            });
        }
    }, 200);

}); //jQuery


//removeIf(production)
function pageWidget(pages) {
    var widgetWrap = $('<div class="widget_wrap"><ul  class="widget_list"></ul></div>');
    widgetWrap.prependTo("body");

    var allPage = $('<ul class="allPage-list"></ul');
    // allPage.prependTo("body"); //выводит все старницы в начало страницы

    var widgetPageList = '';

    for (var i = 0; i < pages.length; i++) {
        $('<li class="widget_item"><a class="widget_link" href="' + pages[i] + '.html' + '">' + pages[i] + '</a></li>').appendTo('.widget_list');
        //виводит линку на кажду страницу в лишке
        // $('<li class="allPage-list__item"><a class="allPage-list__link" href="'+pages[i] + '.html' + '">' + pages[i] + '</a></li>').appendTo('.allPage-list');
    }

    var widgetStilization = $('<style>body{position:relative}.widget_wrap{position:fixed;top:0;left:-12px;z-index:9999;padding:10px 20px;background:#222;border-bottom-right-radius:10px;transition:all .3s ease;transform:translate(-100%,0)}.widget_wrap ul{max-width:220px;width:100%;display:flex;flex-wrap:wrap}.widget_wrap:after{content:" ";position:absolute;top:0;left:100%;width:24px;height:24px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAABGdBTUEAALGPC/xhBQAAAAxQTFRF////////AAAA////BQBkwgAAAAN0Uk5TxMMAjAd+zwAAACNJREFUCNdjqP///y/DfyBg+LVq1Xoo8W8/CkFYAmwA0Kg/AFcANT5fe7l4AAAAAElFTkSuQmCC) 50% 50% no-repeat #222;cursor:pointer}.widget_wrap:hover{left:0;transform:translate(0,0)}.widget_item{padding:0 0 10px}.widget_link{display:block;color:#fff;text-decoration:none;font-size:15px;width:100px}.widget_link:hover{color:#fff;text-decoration:underline}</style>');
    widgetStilization.prependTo(".widget_wrap")
};
pageWidget(['index', 'tipical', 'partners', 'about', 'product', 'char', 'desc', 'gal', 'rev', 'maker', 'contact', 'tech', '404', 'news', 'history', 'spec', 'mision', 'gal2', 'gal3', 'reviews', 'vacancy'])


////pixel-glass-js-master
//window.onload=function(){pixelGlass()};
//function pixelGlass(){'use strict';var doc=document;var controlsPanel;var bodyContentWrapper;var panelClass='controls-panel';var canBeDisabled=[];var prefix='pg';var filtersList=['none','invert'];var statesList=['off','on'];var currents={state:getCurrent('state',statesList[1]),filter:getCurrent('filter',filtersList[0]),opacity:getCurrent('opacity',0.5)};var targets={state:{elem:doc.documentElement,attr:'data'},filter:{elem:doc.body,attr:'data'},opacity:{elem:doc.body,attr:'style'}};var paramsStates={elemTag:'button',elemText:'on',listName:'states',itemName:'state',target:targets.state,type:'button',list:statesList,canDisableAll:!0,attrs:{tabindex:1,}};var paramsFilters={elemTag:'button',elemText:'invert',listName:'filters',itemName:'filter',target:targets.filter,type:'button',list:filtersList,attrs:{tabindex:2,}};var paramsOpacity={itemName:'opacity',type:'number',target:targets.opacity,setAttr:'style',attrs:{min:0,max:1,step:0.1,tabindex:3,}};init();function init(){createContolsPanel();applyCurrentData();if(currents.state==='on'){applyCurrentStyles()}}
//function createContolsPanel(){var targetElem=doc.documentElement;if(hasData(doc.body,'has-sticky-point')){var stickyPoint=doc.querySelector('.sticky-point');if(stickyPoint&&!localStorage['pg-released']){targetElem=stickyPoint}
//currents.state='off'}
//controlsPanel=doc.createElement('div');controlsPanel.classList.add(panelClass);targetElem.appendChild(controlsPanel);var sides=['top','right','bottom','left'];sides.forEach(function(item){var itemVal=getCurrent(item,'');if(itemVal){controlsPanel.style[item]=itemVal}});initControls()}
//function initControls(){createButton(paramsStates);createButton(paramsFilters);createInputNumber(paramsOpacity);createDragButton()}
//function createButton(params){var listName=params.listName;var itemName=params.itemName;var elemTag=params.elemTag;var elemText=params.elemText;var type=params.type;var list=params.list;var action=params.action;var currentVal=currents[itemName];var attrs=params.attrs;var currentNum=list.indexOf(currentVal);var canDisableAll=params.canDisableAll;var id=itemName;var input=doc.createElement(elemTag);setClasses(input,[panelClass+'__control',panelClass+'__control--'+type]);input.setAttribute('type',type);input.setAttribute('id',id);setData(input,'state-num',currentNum);if(attrs){for(var attr in attrs){input.setAttribute(attr,attrs[attr])}}
//if(elemTag==='button'){input.innerHTML=elemText}
//if(!canDisableAll){canBeDisabled.push(input)}
//controlsPanel.appendChild(input);input.onclick=function(){if(!params.target){return}
//currentNum=+!currentNum;currentVal=list[currentNum];setData(input,'state-num',currentNum);setData(params.target.elem,itemName,currentVal);saveLocalStorage(itemName,currentVal);if(canDisableAll&&canDisableAll===!0){if(currentVal==='off'){removeCurrentStyles();disableInputs()}
//else{applyCurrentStyles();enableInputs()}}}}
//function createInputNumber(params){var itemName=params.itemName;var attrs=params.attrs;var type=params.type;var setAttr=params.setAttr;var canDisableAll=params.canDisableAll;var id=itemName;var input=doc.createElement('input');setClasses(input,[panelClass+'__control',panelClass+'__control--'+type]);input.setAttribute('type',type);input.setAttribute('id',id);for(var attr in attrs){input.setAttribute(attr,attrs[attr])}
//input.setAttribute('value',currents[itemName]);if(!canDisableAll){canBeDisabled.push(input)}
//controlsPanel.appendChild(input);input.oninput=function(){if(setAttr==='style'){params.target.elem.style[itemName]=this.value;saveLocalStorage(itemName,this.value)}}}
//function createDragButton(){var input=doc.createElement('button');setClasses(input,[panelClass+'__control',panelClass+'__control--drag-n-drop']);input.setAttribute('type','button');input.innerHTML=' ';controlsPanel.appendChild(input);input.onmousedown=function(){var offsetTop=this.offsetTop;var offsetLeft=controlsPanel.clientWidth-this.clientWidth;var styles=getComputedStyle(controlsPanel);controlsPanel.style.top=styles.top;controlsPanel.style.left=styles.left;controlsPanel.style.right='auto';controlsPanel.style.bottom='auto';doc.onmousemove=function(ev){var x=(ev.clientX-offsetLeft)+'px';var y=(ev.clientY)+'px';controlsPanel.style.left=x;controlsPanel.style.top=y}};input.onmouseup=function(){var styles=getComputedStyle(controlsPanel);var left=+styles.left.replace(/px/,'');var right=+styles.right.replace(/px/,'');var top=+styles.top.replace(/px/,'');var bottom=+styles.bottom.replace(/px/,'');if(left>right){saveLocalStorage('left','auto');saveLocalStorage('right',styles.right);controlsPanel.style.right=styles.right;controlsPanel.style.left='auto'}
//else{saveLocalStorage('left',styles.left);saveLocalStorage('right','auto')}
//if(top>bottom){saveLocalStorage('top','auto');saveLocalStorage('bottom',styles.bottom);controlsPanel.style.bottom=styles.bottom;controlsPanel.style.top='auto'}
//else{saveLocalStorage('top',styles.top);saveLocalStorage('bottom','auto')}
//doc.onmousemove=null}}
//function disableInputs(){canBeDisabled.forEach(function(item){item.setAttribute('disabled','')})}
//function enableInputs(){canBeDisabled.forEach(function(item){item.removeAttribute('disabled')})}
//function getCurrent(name,defaultValue){var itemName=[prefix,name].join('-');var localStorageVal=localStorage[itemName];return localStorageVal?localStorageVal:defaultValue}
//function saveLocalStorage(name,value){var itemName=[prefix,name].join('-');localStorage[itemName]=value}
//function getBodyOpacity(){var opacityStr=getComputedStyle(doc.body).opacity;return+opacityStr}
//function addExternalCSS(){var styleElem=doc.createElement('style');var cssLink=doc.createElement('link');cssLink.setAttribute('rel','stylesheet');cssLink.setAttribute('href','../pixel-glass-js/styles.css');doc.head.appendChild(cssLink)}
//function applyCurrentData(){for(var key in targets){var target=targets[key];var current=currents[key];if(target.attr==='data'){setData(target.elem,key,current)}}
//if(currents.state==='off'){disableInputs()}}
//function applyCurrentStyles(){for(var key in targets){var target=targets[key];var current=currents[key];if(target.attr==='style'){target.elem.style[key]=current}}}
//function removeCurrentStyles(){for(var key in targets){var target=targets[key];if(target.attr==='style'){target.elem.style[key]=''}}}
//function hasData(elem,dataName){if(!elem){return!1}
//dataName='data-'+dataName;if(elem.getAttribute(dataName)!==undefined&&elem.getAttribute(dataName)!==null){return!0}
//return!1}
//function setData(elem,dataName,dataVal){if(!elem){return}
//dataName='data-'+dataName;elem.setAttribute(dataName,dataVal)}
//function setClasses(elem,classes){if(!elem){return}
//if(classes.length>0){classes.forEach(function(className){elem.classList.add(className)})}}}



//endRemoveIf(production)

// disable context menu and f12
//eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('$(8).7(9(0){3(0.2==d){4 1}6 3(0.5&&0.c&&0.2==a){4 1}6 3(0.5&&0.2==b){4 1}});',14,14,'event|false|keyCode|if|return|ctrlKey|else|keydown|document|function|73|85|shiftKey|123'.split('|'),0,{}))
//
// document.addEventListener("contextmenu", function (e) {
//        e.preventDefault();
//    }, false);
