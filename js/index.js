//animate header

$(document).ready(function() {

	var $w = $(window),
		$d = $(document),
		$body = $("body"),
		$top = $w.scrollTop(),
		$headerContact = $(".header_gray"),
		$headerContactHeight = $headerContact.outerHeight(),
		$headerNav = $(".header_nav"),
		$headerWrap = $(".header-wrap"),
		$logo = $(".logo__img"),
		$arrowUp = $(".arrow-up:first");

	function doAnimate() {
		$w.on("scroll", function() {

		//animated header
			var $top = $(this).scrollTop(),
				$isHeaderSmall = Boolean($(".header_small").length),
				$viewportHeight = $(this).height(),
				$viewportBottom = $top + $viewportHeight;

			makeHeaderSticky($top, $isHeaderSmall);
			animated($viewportBottom);

		//get active page
			var $page = $(".page");
			$page.each(function(idx, el) {
				var $topActivePage = $(el).offset().top - 100,
					$bottomActivePage = $topActivePage + $(el).height(),
					$activeId = $(el).attr("id");

				getActivePage($bottomActivePage, $topActivePage, $activeId);
			});

			function getActivePage($bottomActivePage, $topActivePage, $activeId) {
				var $activeLink = $(".menu__link[href$='#" + $activeId + "']");
				var $menuAllActiveLink = $(".menu__link.menu__link_active");

				if ($top > $topActivePage && $top < $bottomActivePage) {
					$menuAllActiveLink.removeClass("menu__link_active");
					$activeLink.addClass("menu__link_active");
				}
			}

		// fadeIn/fadeOut arrow Up
			if ($w.scrollTop() > 40) {
				$arrowUp.fadeIn(500);
			} else {
				$arrowUp.fadeOut(500);
			}
		});
	}

	function makeHeaderSticky($top, $isHeaderSmall) {
		if ($top > $headerContactHeight && !$isHeaderSmall) {
			makeHeaderSmall();
		} else if ($top <= $headerContactHeight && $isHeaderSmall) {
			makeHeaderBig();
		}
	}

	function makeHeaderBig() {
		$headerNav.removeClass("header_small");
		$headerWrap.removeClass("header-wrap_height");
		$logo.removeClass("logo__img_scroll");
	}

	function makeHeaderSmall() {
		$headerNav.addClass("header_small");
		$headerWrap.addClass("header-wrap_height");
		$logo.addClass("logo__img_scroll");
	}


//animate DOM-element (scroll)

	var $pageTitle = $(".page__title"),
		$pageLead = $(".page__lead"),
		$pageLine = $(".page__line"),
		$boxService = $(".box-service"),
		$boxApproach = $(".box-approach"),
		$numStep = $(".num-step"),
		$projectRows = $(".project-rows"),
		$boxProject = $(".box-project"),
		$plane = $(".box-project__icon"),
		$openFormDiv = $(".open-form:first"),
		$social = $(".social");

	function animated($viewportBottom) {
		$pageTitle.each(function() {
			var $elem = $(this);
			if ($viewportBottom > $elem.offset().top + 200) {
				makeAnimatedInBottom($elem);
			}
		});

		$pageLead.each(function() {
			var $elem = $(this);
			if ($viewportBottom > $elem.offset().top + 200) {
				makeAnimatedInBottom($elem);
			}
		});

		$pageLine.each(function() {
			var $elem = $(this);
			if ($viewportBottom > $elem.offset().top + 200) {
				makeAnimatedInBottom($elem);
			}
		});

		$boxService.each(function(idx, el) {
			var $elem = $(this);
			if ($viewportBottom > $elem.offset().top + 200) {
				setTimeout(function() {
					makeAnimatedInCenter($elem);
				}, idx * 250);
			}
		});

		$boxApproach.each(function(idx, el) {
			var $elem = $(this);
			if ($viewportBottom > $elem.offset().top + 200) {
				makeAnimatedList($elem);
			}
		});

		$boxProject.each(function(idx, el) {
			var $elem = $(this);
			if ($viewportBottom > $projectRows.offset().top + 200) {
				setTimeout(function(){
					makeAnimatedInCenter($elem);
				}, idx * 250);
			}
		});

		if ($viewportBottom > $openFormDiv.offset().top + 200) {
			makeAnimatedInCenter($openFormDiv);
		}

		$social.each(function(idx, el) {
			var $elem = $(this);
			if ($viewportBottom > $elem.offset().top + 200) {
				setTimeout(function() {
					makeAnimatedInBottom($elem);
				}, idx * 250);
			}
		});
	}

	function makeAnimatedInBottom($elem) {
		$elem.addClass("animated-in-bottom");
	}
	function makeAnimatedInCenter($elem) {
		$elem.addClass("animated-in-center");
	}
	function makeAnimatedInLeft($elem) {
		$elem.addClass("animated-in-left");
	}
	function makeAnimatedInRight($elem) {
		$elem.addClass("animated-in-right");
	}
	function makeAnimatedList($elem) {
		$elem.addClass("animated-list");
	}
	function makeAnimatedRotate($elem) {
		$elem.addClass("animated-rotate");
	}
	function delAnimatedRotate($elem) {
		$elem.removeClass("animated-rotate");
	}


//open-close form

	var $openFormBtn = $(".open-form__btn"),
		$crossCancelForm = $(".cross-cancel_contact"),
		$formWrap = $(".wrap-block-form"),
		$analysisBlockForm = $(".block-form");

	$openFormBtn.on("click", function() {
		if ($formWrap.css("display") === "none") {
			$formWrap.slideDown(500);
			makeAnimatedRotate($openFormBtn);

		} else {
			$formWrap.slideUp(500);
			delAnimatedRotate($openFormBtn);
		}
	});

	$crossCancelForm.click(function() {
		$formWrap.slideUp(500);
		delAnimatedRotate($openFormBtn);
	});

	$body.click(function(e) {
		if ($formWrap.css("display") === "block") {
			var target = e.target;
			if ($analysisBlockForm.has(target).length === 0 && $(target).has(".open-form__btn").length !== 0) {
				$formWrap.slideUp(500);
				delAnimatedRotate($openFormBtn);
			}
		}
	});
//when does animation start

	if($w.width() > 1020) {	
		doAnimate();
	} else {
		var arrClassOpacity = document.querySelectorAll(".opacity");
		for (var i = 0; i < arrClassOpacity.length; i++) {
			arrClassOpacity[i].classList.remove('opacity');
		}
	}



//navigation menu
	var $menuLink = $(".menu__link");
	$menuLink.each(function() {
		$(this).on("click", function(e) {
			e.preventDefault();
			var $activeId = $(this).attr("href"),
				$topActivePage = $($activeId).offset().top;
			$("html").animate({
				scrollTop: $topActivePage
			}, 500);
		});
	});

//go up
	
	$arrowUp.on("click", function(e) {
		e.preventDefault();
		$("body, html").animate({scrollTop: $headerContactHeight + 1}, 500);
	});

//open-close popup (consultation)

	var $cancelConsultation = $(".cross-cancel_consultation, .backdrop"),
		$popupConsultation = $(".popup"),
		$btnConsultation = $(".btn_nav, .btn_promo"),
		$backdrop = $(".backdrop"),
		$wrapPopup = $(".wrap-popup");

	$btnConsultation.on("click", function() {
		$backdrop.fadeIn(500);
		$wrapPopup.fadeIn(500);
	});

	$cancelConsultation.on("click", function() {
		$backdrop.fadeOut(500);
		$wrapPopup.fadeOut(500);
	});

	$d.on("keydown", closePopup);

	function closePopup(e) {
		if (e.keyCode === 27) {
			fadeOutPopup();
		}
	}

	function fadeOutPopup() {
		$wrapPopup.each(function() {
			$elem = $(this);
			if ($elem.is(":visible")) {
				$elem.fadeOut(500);
				$backdrop.fadeOut(500);
			}
		});
	}
	
	var $menu = $(".menu"),
		$wrapBtnMenu = $(".wrap-btn-menu"),
		$btnMenu = $(".btn-menu"),
		$nav = $(".nav");

	//open-close menu-hamburger

	$wrapBtnMenu.click(function() {
		$btnMenu.toggleClass("btn-menu-show");
		$nav.slideToggle();
	});

});