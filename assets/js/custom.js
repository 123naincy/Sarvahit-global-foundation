/* ==============
 ========= js documentation ==========================

 * template name: Sarvahit Global Foundation
 * version: 1.0
 * description: Nonprofit NGO Fundraising HTML5 Template
 * author: wowtheme7
 * author-url: https://themeforest.net/user/wowtheme7

    ==================================================

     01. preloader
     -------------------------------------------------
     02. background image
     -------------------------------------------------
     03. custom cursor
     -------------------------------------------------
     04. scroll to top with progress
     -------------------------------------------------
     05. add active class to the current link
     -------------------------------------------------
     06. open search box
     -------------------------------------------------
     07. mobile menu
     -------------------------------------------------
     08. fixed header on scroll
     -------------------------------------------------
     12. banner one slider
     -------------------------------------------------
     16. difference slider
     -------------------------------------------------
     18. cause slider
     -------------------------------------------------
     19. donate amount
     -------------------------------------------------
     20. testimonial slider
     -------------------------------------------------
     21. cause two slider content
     -------------------------------------------------
     22. difference tab
     -------------------------------------------------
     31. footer copyright year
     -------------------------------------------------
     32. aos initialization
     -------------------------------------------------
     33. vanilla tilt animation
     -------------------------------------------------
     34. register gsap
     -------------------------------------------------
     35. gsap null config
     -------------------------------------------------
     36. target section with gsap
     -------------------------------------------------
     37. parallax image with gsap
     -------------------------------------------------
     38. title animation
     -------------------------------------------------
     40. progress bar
     -------------------------------------------------
     41. circular progress bar

    ==================================================
============== */

(function ($) {
  "use strict";

  if (!$) {
    return;
  }

  const hasSwiper = typeof window.Swiper === "function";
  const hasAOS =
    typeof window.AOS !== "undefined" && typeof window.AOS.init === "function";
  const hasVanillaTilt =
    typeof window.VanillaTilt !== "undefined" && typeof window.VanillaTilt.init === "function";
  const hasGsap = typeof window.gsap !== "undefined";
  const hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";
  const hasScrollToPlugin = typeof window.ScrollToPlugin !== "undefined";
  const hasSplitText = typeof window.SplitText !== "undefined";

  function createSwiper(selector, options) {
    if (!hasSwiper || !document.querySelector(selector)) {
      return null;
    }

    return new Swiper(selector, options);
  }

  $(function () {
    let device_width = window.innerWidth;
    let initialScroll = $(window).scrollTop();

    /**
     * ======================================
     * 01. preloader
     * ======================================
     */

    if ($(".preloader").length) {
      $(".preloader").delay(300).fadeOut();
    }

    /**
     * ======================================
     * 02. background image
     * ======================================
     */
    $("[data-background]").each(function () {
      var backgroundImages = $(this).attr("data-background").split(",");
      var cssValue = backgroundImages
        .map(function (image) {
          return 'url("' + image.trim() + '")';
        })
        .join(",");

      $(this).css("background-image", cssValue);
    });

    /**
     * ======================================
     * 03. custom cursor
     * ======================================
     */
    if ($(".mouseCursor").length > 0) {
      function itCursor() {
        var myCursor = jQuery(".mouseCursor");
        if (myCursor.length) {
          if ($("body")) {
            const e = document.querySelector(".cursor-inner"),
              t = document.querySelector(".cursor-outer");
            let n,
              i = 0,
              o = !1;
            (window.onmousemove = function (s) {
              o ||
                (t.style.transform =
                  "translate(" + s.clientX + "px, " + s.clientY + "px)"),
                (e.style.transform =
                  "translate(" + s.clientX + "px, " + s.clientY + "px)"),
                (n = s.clientY),
                (i = s.clientX);
            }),
              $("body").on(
                "mouseenter",
                "button, a, .cursor-pointer",
                function () {
                  e.classList.add("cursor-hover"),
                    t.classList.add("cursor-hover");
                }
              ),
              $("body").on(
                "mouseleave",
                "button, a, .cursor-pointer",
                function () {
                  ($(this).is("a", "button") &&
                    $(this).closest(".cursor-pointer").length) ||
                    (e.classList.remove("cursor-hover"),
                    t.classList.remove("cursor-hover"));
                }
              ),
              (e.style.visibility = "visible"),
              (t.style.visibility = "visible");
          }
        }
      }
      itCursor();
    }

    /**
     * ======================================
     * 04. scroll to top with progress
     * ======================================
     */
    if ($(".progress-wrap").length > 0) {
      var progressPath = document.querySelector(".progress-wrap path");
      var pathLength = progressPath.getTotalLength();
      progressPath.style.transition = progressPath.style.WebkitTransition =
        "none";
      progressPath.style.strokeDasharray = pathLength + " " + pathLength;
      progressPath.style.strokeDashoffset = pathLength;
      progressPath.getBoundingClientRect();
      progressPath.style.transition = progressPath.style.WebkitTransition =
        "stroke-dashoffset 10ms linear";
      var updateProgress = function () {
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength - (scroll * pathLength) / height;
        progressPath.style.strokeDashoffset = progress;
      };
      updateProgress();
      $(window).scroll(updateProgress);
      var offset = 50;
      var duration = 1500;
      $(window).on("scroll", function () {
        if ($(this).scrollTop() > offset) {
          $(".progress-wrap").addClass("active-progress");
        } else {
          $(".progress-wrap").removeClass("active-progress");
        }
      });
      $(".progress-wrap").on("click", function (event) {
        event.preventDefault();
        $("html, body")
          .stop()
          .css("scroll-behavior", "auto")
          .animate(
            {
              scrollTop: 0,
            },
            {
              duration: 1500,
              easing: "swing",
              complete: function () {
                $("html, body").css("scroll-behavior", "smooth");
              },
            }
          );
        return false;
      });

      if (initialScroll >= 50) {
        $(".progress-wrap").addClass("active-progress");
      }
    }

    /**
     * ======================================
     * 05. add active class to the current link
     * ======================================
     */
    function dynamicCurrentMenuClass(selector) {
      let FileName = window.location.href.split("/").reverse()[0];

      selector.find("li").removeClass("active");
      selector
        .find(".navbar__dropdown-label")
        .removeClass("navbar__item-active");

      selector.find("li").each(function () {
        let anchor = $(this).find("a");
        if ($(anchor).attr("href") === FileName) {
          $(this).addClass("active");
        }
      });

      const activeDropdownItem = selector.find(".navbar__sub-menu .active");
      if (activeDropdownItem.length) {
        activeDropdownItem.parents("li").addClass("active");
      }

      selector.find("li").each(function () {
        if ($(this).find(".active").length) {
          $(this).addClass("active");
        }
      });

      if (FileName === "") {
        selector.find('li:has(a[href="index.html"])').addClass("active");
      }
    }
    if ($("header").length) {
      dynamicCurrentMenuClass($("header"));
    }

    /**
     * ======================================
     * 06. open search box
     * ======================================
     */
    if ($(".search-popup").length > 0) {
      $(".open-search").on("click", function () {
        $("body").addClass("search-active");
      });

      $(".close-search").on("click", function () {
        $("body").removeClass("search-active");
      });
    }

    /**
     * ======================================
     * 07. mobile menu
     * ======================================
     */
    if ($(".mobile-menu").length > 0) {
      var mobileMenuContent = $(".navbar__menu").html();
      $(".mobile-menu__list").append(mobileMenuContent);

      $(".mobile-menu .navbar__dropdown-label").on("click", function () {
        $(this).parent().siblings().find(".navbar__sub-menu").slideUp(500);
        $(this)
          .parent()
          .siblings()
          .find(".navbar__dropdown-label")
          .removeClass("navbar__item-active");
        $(this).siblings(".navbar__sub-menu").slideToggle(500);
        $(this).toggleClass("navbar__item-active");
      });
    }

    $(".open-offcanvas-nav").on("click", function () {
      $(this).addClass("open-offcanvas-nav-active");
      $(".mobile-menu__backdrop").addClass("mobile-menu__backdrop-active");
      $(".nav-fade").each(function (i) {
        $(this).css("animation-delay", 0.25 * 1 * i + "s");
      });

      $(".mobile-menu").addClass("show-menu");
      $(".mobile-menu__wrapper").removeClass("nav-fade-active");
    });

    $(".close-mobile-menu, .mobile-menu__backdrop").on("click", function () {
      $(".open-offcanvas-nav").removeClass("open-offcanvas-nav-active");
      $(".mobile-menu").removeClass("show-menu");
      $(".mobile-menu__backdrop").removeClass("mobile-menu__backdrop-active");
      $(".mobile-menu__wrapper").addClass("nav-fade-active");
      $(".mobile-menu .navbar__dropdown-label").removeClass(
        "navbar__item-active"
      );
      $(".mobile-menu .navbar__sub-menu").slideUp(0);
    });

    $(".navbar__item.navbar__item--has-children > a").on("click", function (e) {
      e.preventDefault();
    });

    $(window).on("resize", function () {
      // sidebar info
      $(".off-canvas").removeClass("off-canvas-active");
      $(".off-canvas-backdrop").removeClass("off-canvas-backdrop-active");

      // mobile menu
      $(".mobile-menu").removeClass("show-menu");
      $(".mobile-menu__backdrop").removeClass("mobile-menu__backdrop-active");
      $(".mobile-menu__wrapper").addClass("nav-fade-active");
      $(".mobile-menu .navbar__dropdown-label").removeClass(
        "navbar__item-active"
      );
      $(".mobile-menu .navbar__sub-menu").slideUp(0);
      $(".open-offcanvas-nav").removeClass("open-offcanvas-nav-active");
    });

    /**
     * ======================================
     * 08. fixed header on scroll
     * ======================================
     */
    $(window).on("scroll", function () {
      var scroll = $(window).scrollTop();
      if (scroll < 160) {
        $(".header").removeClass("sticky-header");
      } else {
        $(".header").addClass("sticky-header");
      }
    });

    if (initialScroll >= 100) {
      $(".header").addClass("sticky-header");
    }

    /**
     * ======================================
     * 12. banner one slider
     * ======================================
     */
    var bannerOne = createSwiper(".banner-two__slider", {
      loop: true,
      speed: 2000,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 0,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: ".next-banner",
        prevEl: ".prev-banner",
      },
    });

    /**
     * ======================================
     * 16. difference slider
     * ======================================
     */
    var differenceSlider = createSwiper(".difference__slider", {
      loop: true,
      speed: 1000,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 24,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: ".next-difference",
        prevEl: ".prev-difference",
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
      },
    });

    /**
     * ======================================
     * 18. cause slider
     * ======================================
     */
    var causeSlider = createSwiper(".cause__slider", {
      loop: true,
      speed: 1000,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 24,

      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: ".next-cause",
        prevEl: ".prev-cause",
      },
      pagination: {
        el: ".cause-pagination",
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
        1400: {
          slidesPerView: 4,
        },
      },
    });

    /**
     * ======================================
     * 19. donate amount
     * ======================================
     */
    if ($("#donationAmount").length > 0) {
      const activeAmount = $(".donation-amount.active").text();
      $("#donationAmount").val(activeAmount);

      $(".donation-amount").on("click", function () {
        $(".donation-amount").removeClass("active");
        $(this).addClass("active");

        if ($(this).hasClass("custom-amount")) {
          $("#donationAmount").val("").focus(); // Clear and focus input for custom amount
        } else {
          const amount = $(this).text();
          $("#donationAmount").val(amount);
        }
      });
    }

    /**
     * ======================================
     * 20. testimonial slider
     * ======================================
     */
    var testimonial = createSwiper(".testimonial__slider", {
      loop: true,
      speed: 1000,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 24,

      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: ".next-testimonial",
        prevEl: ".prev-testimonial",
      },

      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
      },
    });

    /**
     * ======================================
     * 21. cause two slider content
     * ======================================
     */
    var causeTwoSliderThumb = createSwiper(".cause-two__content-slider", {
      loop: true,
      speed: 1000,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 24,
      centeredSlides: true,
      watchSlidesProgress: true,
      effect: "fade",

      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        nextEl: ".next-cause-two",
        prevEl: ".prev-cause-two",
      },
    });

    var causeTwoSlider = createSwiper(".cause-two__slider", {
      loop: true,
      speed: 1000,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 24,
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      loopAddBlankSlides: true,
      loopAdditionalSlides: 1,
      slideToClickedSlide: true,
      roundLengths: true,
      coverflowEffect: {
        rotate: 40,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      thumbs: {
        swiper: causeTwoSliderThumb,
      },
      navigation: {
        nextEl: ".next-cause-two",
        prevEl: ".prev-cause-two",
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1400: {
          slidesPerView: 3,
        },
      },
    });

    /**
     * ======================================
     * 22. difference tab
     * ======================================
     */

    $(".difference-two__content-single").hide();
    $(".difference-two__content-single:first").show();

    $(".difference-two__tab-btn").on("click", function () {
      $(".difference-two__tab-btn").removeClass("active");
      $(this).addClass("active");
      $(".difference-two__content-single").hide();
      var target = $(this).data("target");
      $(target).fadeIn(500);
      return false;
    });

    /**
     * ======================================
     * 31. footer copyright year
     * ======================================
     */
    if ($("#copyrightYear").length > 0) {
      $("#copyrightYear").text(new Date().getFullYear());
    }

    /**
     * ======================================
     * 32. aos initialization
     * ======================================
     */
    if (hasAOS) {
      AOS.init();
    }

    /**
     * ======================================
     * 33. vanilla tilt animations
     * ======================================
     */

    let Vantilt = document.querySelectorAll(".van-tilt");

    if (hasVanillaTilt && Vantilt.length > 0) {
      VanillaTilt.init(Vantilt, {
        max: 5,
        speed: 3000,
      });
    }

    /**
     * ======================================
     * 34. register gsap
     * ======================================
     */
    if (hasGsap && hasScrollTrigger && hasScrollToPlugin) {
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    }

    /**
     * ======================================
     * 35. gsap null config
     * ======================================
     */
    if (hasGsap) {
      gsap.config({
        nullTargetWarn: false,
      });
    }

    /**
     * ======================================
     * 36. target section with gsap
     * ======================================
     */
    $('a[href^="#"]:not([href="#"])').on("click", function (event) {
      if (!(hasGsap && hasScrollToPlugin)) {
        return;
      }

      var target = $(this).attr("href");

      if (!target || target.charAt(0) !== "#") {
        return;
      }

      if (
        this.pathname !== window.location.pathname ||
        this.hostname !== window.location.hostname ||
        !document.querySelector(target)
      ) {
        return;
      }

      event.preventDefault();

      gsap.to(window, {
        scrollTo: {
          y: target,
          offsetY: 100,
        },
        duration: 1,
        ease: "power3.inOut",
      });
    });

    /**
     * ======================================
     * 37. parallax image with gsap
     * ======================================
     */
    var imageParallax = document.querySelectorAll(".parallax-image");
    if (hasGsap && hasScrollTrigger && imageParallax.length > 0) {
      $(".parallax-image").each(function () {
        $(this).wrap(
          '<div class="parallax-image-wrap"><div class="parallax-image-inner"></div></div>'
        );
        $(".parallax-image-wrap").css({
          overflow: "hidden",
        });

        var $animImageParallax = $(this);
        var $aipWrap = $animImageParallax.parents(".parallax-image-wrap");
        var $aipInner = $aipWrap.find(".parallax-image-inner");

        let tl_ImageParallax = gsap.timeline({
          scrollTrigger: {
            trigger: $aipWrap,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            onEnter: () => animImgParallaxRefresh(),
          },
        });
        tl_ImageParallax.to($animImageParallax, {
          yPercent: 80,
          ease: "none",
        });

        function animImgParallaxRefresh() {
          tl_ImageParallax.scrollTrigger.refresh();
        }

        let tl_aipZoomIn = gsap.timeline({
          scrollTrigger: {
            trigger: $aipWrap,
            start: "top 99%",
          },
        });
        tl_aipZoomIn.from($aipInner, {
          duration: 1.5,
          autoAlpha: 0,
          scale: 1.3,
          ease: Power2.easeOut,
          clearProps: "all",
        });
      });
    }

    /**
     * ======================================
     * 38. title animation
     * ======================================
     */

    if (hasGsap && hasSplitText && $(".title-animation").length > 0) {
      let char_come = gsap.utils.toArray(".title-animation");
      char_come.forEach((char_come) => {
        let split_char = new SplitText(char_come, {
          type: "chars, words",
          lineThreshold: 0.5,
        });
        const tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: char_come,
            start: "top 90%",
            end: "bottom 60%",
            scrub: false,
            markers: false,
            toggleActions: "play none none none",
          },
        });
        tl2.from(split_char.chars, {
          duration: 0.8,
          x: 40,
          autoAlpha: 0,
          stagger: 0.05,
          ease: "back.out",
        });
      });
    }

    /**
     * ======================================
     * 40. progress bar
     * ======================================
     */

    if (hasGsap && hasScrollTrigger && $(".progress-bar-single").length > 0) {
      $("[data-percent]").each(function () {
        $(this)
          .find(".progress-bar-percent")
          .css("width", $(this).attr("data-percent"));
        $(this).find(".percent-value").text($(this).attr("data-percent"));
      });

      const ax_progress_bar = document.querySelectorAll(".progress-bar-single");
      ax_progress_bar.forEach((element) => {
        const w = element.querySelector(".progress-bar-percent");
        const p = element.querySelector(".percent-value");

        if (!w || !p) {
          return;
        }

        const target = p.textContent;

        const ax_bartl = gsap.timeline({
          defaults: {
            duration: 2,
          },
          scrollTrigger: {
            trigger: element,
          },
        });

        ax_bartl.fromTo(
          w,
          {
            width: 0,
          },
          {
            width: target,
          }
        );
        ax_bartl.from(
          p,
          {
            textContent: 0 + "%",
            snap: {
              textContent: 5,
            },
          },
          "<"
        );
      });
    }

    /**
     * ======================================
     * 41. circular progress bar
     * ======================================
     */
    if (hasGsap && hasScrollTrigger && $(".difference-progress-single").length > 0) {
      const progressBars = document.querySelectorAll(".progress-bar-single");

      progressBars.forEach((element) => {
        const percentAttr = element.getAttribute("data-percent");

        if (percentAttr) {
          const progress = percentAttr.replace("%", "");
          const percentDisplay = element.querySelector(".percent-value");
          const circle = element.querySelector(".circle-progress");

          if (percentDisplay && circle) {
            const radius = 15.9155;
            const circumference = 2 * Math.PI * radius;

            gsap.fromTo(
              circle,
              {
                strokeDashoffset: circumference,
              },
              {
                strokeDashoffset:
                  circumference - (progress / 100) * circumference,
                duration: 2,
                scrollTrigger: {
                  trigger: element,
                  start: "top 80%",
                  end: "bottom 20%",
                  toggleActions: "play none none none",
                },
              }
            );

            gsap.fromTo(
              percentDisplay,
              {
                textContent: 0,
              },
              {
                textContent: progress,
                duration: 2,
                snap: { textContent: 1 },
                ease: "power1.inOut",
                onUpdate: function () {
                  percentDisplay.textContent =
                    Math.round(percentDisplay.textContent) + "%";
                },
              }
            );
          }
        }
      });
    }

  });

	var leadScriptUrl =
		"https://script.google.com/macros/s/AKfycbxUxpv_jrehwgxlV-DhZ_WCCCOyC9iuHcht8yQuonbsA4csr1rINXNSzbDgznoKYGf9/exec";

	$('form').each(function () {
		var form = this;
		if (!form.querySelector('[name="subscribe-email"]')) return;
		form.addEventListener("submit", function (event) {
			event.preventDefault();
			var emailInput = form.querySelector('[name="subscribe-email"]');
			var email = emailInput ? emailInput.value.trim() : "";
			if (!email) return;
			var button = form.querySelector('button[type="submit"]');
			if (button) {
				button.disabled = true;
			}
			fetch(leadScriptUrl, {
				method: "POST",
				mode: "no-cors",
				headers: { "Content-Type": "text/plain;charset=utf-8" },
				body: JSON.stringify({
					formType: "Newsletter",
					fullName: "",
					email: email,
					phone: "",
					purpose: "Newsletter",
					message: "",
					donationAmount: "",
					paymentMethod: "",
					pageUrl: window.location.href
				})
			}).then(function () {
				window.location.href = "thankyou.html";
			}).catch(function () {
				if (button) button.disabled = false;
				alert("Unable to subscribe. Please try again.");
			});
		});
	});

	var sitePages = [
		["Home", "index.html", "home foundation ngo"],
		["About us", "about.html", "about mission vision"],
		["Our causes", "our-causes.html", "causes"],
		["Education for every child", "education-for-every-child.html", "education library school children"],
		["Health and wellbeing", "health-wellbeing.html", "health healthcare sanitation hygiene"],
		["Nutrition and food security", "nutrition-food-security.html", "nutrition food"],
		["Protecting our environment", "protecting-our-environment.html", "environment nature"],
		["Women empowerment", "women-empowerment.html", "women"],
		["Sports and youth", "Sports-youth-development.html", "sports youth"],
		["Stronger communities", "stronger-communities.html", "community"],
		["Every child deserves a future", "every-child-deserves-a-future.html", "child children"],
		["Medical support", "medical-support.html", "medical patient"],
		["Palak", "palak-detail.html", "palak treatment"],
		["Gyan Pratibha Pariksha", "gyan-pratibha-pariksha.html", "gyan pratibha exam result answer"],
		["Media and news", "media.html", "media news newspaper press coverage"],
		["Team", "team.html", "team volunteer"],
		["Donate", "donate.html", "donate donation give"],
		["Become a volunteer", "become-volunteer.html", "volunteer join"],
		["Contact", "contact.html", "contact phone email address gurugram"],
		["Results and updates", "social-media.html", "result answer key instagram"],
		["Privacy policy", "privacy-policy.html", "privacy cookie"],
		["Terms and conditions", "terms-conditions.html", "terms"],
		["Refund policy", "refund-policy.html", "refund cancellation donation money back"],
		["Return policy", "return-policy.html", "return shipping delivery"],
		["Disclaimer", "disclaimer.html", "disclaimer 80g tax"]
	];

	$(".search-popup form").on("submit", function (event) {
		event.preventDefault();
		var query = ($(this).find('input[name="search-field"]').val() || "").toLowerCase().trim();
		var box = $(this).find(".search-popup__results");
		if (!box.length) {
			box = $('<div class="search-popup__results"></div>');
			$(this).append(box);
		}
		if (!query) {
			box.empty();
			return;
		}
		var words = query.split(/\s+/);
		var hits = sitePages.filter(function (page) {
			var haystack = (page[0] + " " + page[2]).toLowerCase();
			return words.every(function (word) {
				return haystack.indexOf(word) !== -1;
			});
		});
		if (hits.length === 1) {
			window.location.href = hits[0][1];
			return;
		}
		if (!hits.length) {
			box.html("<p>No matching page. Try education, donate, volunteer, or contact.</p>");
			return;
		}
		box.html("<ul>" + hits.map(function (page) {
			return '<li><a href="' + page[1] + '">' + page[0] + "</a></li>";
		}).join("") + "</ul>");
	});



})(window.jQuery);
