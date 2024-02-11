(function ($) {
  "use strict";
  localStorage.theme = "dark";
  /* ============================================================ */
  /* PRELOADER START
    /* ============================================================ */
  setTimeout(function () {
    var e = !!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),
      s = document.getElementById("preloader");
    e
      ? s && s.parentNode && s.parentNode.removeChild(s)
      : (setTimeout(function () {
          s.classList.add("preloaded");
        }, 1000),
        setTimeout(function () {
          s && s.parentNode && s.parentNode.removeChild(s);
        }, 2000));
  }, 1000);
  /* Preloader End */

  /* ============================================================ */
  /* MOBILE MENU START
    /* ============================================================ */
  function mobile_menu(selector, actionSelector) {
    var mobile_menu = $(selector);
    mobile_menu.on("click", function () {
      $(selector).toggleClass("is-menu-open");
    });

    var hamburgerbtn = $(selector);
    hamburgerbtn.on("click", function () {
      $(actionSelector).toggleClass("is-menu-open");
    });

    $(document).on("click", function (e) {
      var selectorType = $(actionSelector).add(mobile_menu);
      if (selectorType.is(e.target) !== true && selectorType.has(e.target).length === 0) {
        $(actionSelector).removeClass("is-menu-open");
        $(selector).removeClass("is-menu-open");
      }
    });
    $(".mobile-menu .main-menu a, .menu-overlay").on("click", function (e) {
      $(actionSelector).removeClass("is-menu-open");
      $(selector).removeClass("is-menu-open");
    });
  }
  mobile_menu(".menu_toggle, .close-menu ", ".mobile-menu, .minfo__app, .menu-overlay");
  /* Mobile menu End */

  /* ============================================================ */
  /* Scrollit Scrollspy start
    /* ============================================================ */
  function checkSize() {
    var width = $(window).width();
    if (width < 1240) {
      $.scrollIt({
        scrollTime: 1000,
        topOffset: -55,
      });
    } else {
      $.scrollIt({
        scrollTime: 1000,
        topOffset: 0,
      });
    }
  }
  $(document).ready(function () {
    $(window).on("resize", checkSize);
    checkSize();
  });
  /* Scrollit Scrollspy End */

  /* ============================================================ */
  /* Counterup Fun-facts start
    /* ============================================================ */
  $(".counters .number span").counterUp({
    delay: 10,
    time: 1500,
  });
  /* Counterup Fun-facts End */

  /* ============================================================ */
  /* Hero Section Logo Slider start
    /* ============================================================ */
  let logoSlider = new Swiper(".logo-slider .swiper", {
    spaceBetween: 30,
    slidesPerView: 3,
    loop: true,
    speed: 3000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    allowTouchMove: false,
    breakpoints: {
      576: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 4,
      },
      1400: {
        slidesPerView: 5,
      },
    },
  });

  /* ============================================================ */
  /* Skills Slider start
    /* ============================================================ */
  var skillSlider = new Swiper(".skills-slider .swiper", {
    spaceBetween: 30,
    slidesPerView: 2,
    loop: !1,
    speed: 800,
    breakpoints: {
      600: {
        slidesPerView: 3,
      },
      800: {
        slidesPerView: 4,
      },
    },
    navigation: {
      nextEl: "#skill .button-next",
      prevEl: "#skill .button-prev",
    },
    on: {
      init: function () {
        $(".skills-slider-navigation .counter").html('<span class="text-theme">' + (this.realIndex + 1) + "</span>" + "/" + this.slides.length);
      },
      slideChange: function () {
        $(".skills-slider-navigation .counter").html('<span class="text-theme">' + (this.realIndex + 1) + "</span>" + "/" + this.slides.length);
      },
    },
  });
  // Skills Slider End

  /* ============================================================ */
  /* Testimonial Slider start
    /* ============================================================ */
  let testimonialSlider = new Swiper(".testimonial-slider .swiper", {
    spaceBetween: 30,
    slidesPerView: 1,
    loop: false,
    speed: 800,
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
    },
    navigation: {
      nextEl: ".testimonial-slider-navigation .button-next",
      prevEl: ".testimonial-slider-navigation .button-prev",
    },
    on: {
      init: function () {
        $(".testimonial-slider-navigation .counter").html('<span class="text-theme">' + (this.realIndex + 1) + "</span>" + "/" + this.slides.length);
      },
      slideChange: function () {
        $(".testimonial-slider-navigation .counter").html('<span class="text-theme">' + (this.realIndex + 1) + "</span>" + "/" + this.slides.length);
      },
    },
  });
  // Testimonial Slider End

  /* ============================================================ */
  /* Progressbar start
    /* ============================================================ */
  var CroWey = $(".progressbar");
  if (CroWey.length > 0) {
    CroWey.waypoint(
      function () {
        $(".bar").each(function () {
          $(this)
            .find(".progress-content")
            .animate(
              {
                width: $(this).attr("data-percentage"),
              },
              2000
            );
        });
      },
      {
        offset: "100%",
      }
    );
  }
  // Progressbar End

  /* ============================================================ */
  /* Custom Cursor start
    /* ============================================================ */
  if ($(".custom_cursor").length) {
    var cursor = document.querySelector(".custom_cursor_one");
    var cursorInner = document.querySelector(".custom_cursor_two");
    var anchors = document.querySelectorAll("a");

    document.addEventListener("mousemove", function (e) {
      var x = e.clientX;
      var y = e.clientY;
      cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
    });
    document.addEventListener("mousemove", function (e) {
      var x = e.clientX;
      var y = e.clientY;
      cursorInner.style.left = x + "px";
      cursorInner.style.top = y + "px";
    });
    document.addEventListener("mousedown", function () {
      cursor.classList.add("click");
      cursorInner.classList.add("custom_cursor_hover");
    });
    document.addEventListener("mouseup", function () {
      cursor.classList.remove("click");
      cursorInner.classList.remove("custom_cursor_hover");
    });
    anchors.forEach((item) => {
      item.addEventListener("mouseover", () => {
        cursor.classList.add("custom_cursor_hover");
      });
      item.addEventListener("mouseleave", () => {
        cursor.classList.remove("custom_cursor_hover");
      });
    });
  }
  // Custom Cursor End

  /* ============================================================ */
  /* Animated Circle Progress start
    /* ============================================================ */
  function animateElements() {
    $(".minfo__sidebar .progressCircle").each(function () {
      var elementPos = $(this).offset().top;
      var topOfWindow = $(window).scrollTop();
      var percent = $(this).find(".circle").attr("data-percent");
      var animate = $(this).data("animate");
      if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
        $(this).data("animate", true);
        $(this)
          .find(".circle")
          .circleProgress({
            startAngle: -Math.PI / 30,
            value: percent / 100,
            thickness: 2,
            lineCap: "round",
            emptyFill: "#777777",
            fill: "#00BC91",
            size: $(".circle").width(),
          })
          .on("circle-animation-progress", function (event, progress, stepValue) {
            $(this)
              .parent()
              .find(".label")
              .html((stepValue * 100).toFixed(0) + "%");
          })
          .stop();
      }
    });
    $(".skills-slider .progressCircle").each(function () {
      var elementPos = $(this).offset().top;
      var topOfWindow = $(window).scrollTop();
      var percent = $(this).find(".circle").attr("data-percent");
      var animate = $(this).data("animate");
      if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
        $(this).data("animate", true);
        $(this)
          .find(".circle")
          .circleProgress({
            startAngle: -Math.PI / 2,
            value: percent / 100,
            thickness: 1.5,
            lineCap: "round",
            emptyFill: "#777777",
            fill: "#00BC91",
            size: $(".skills-slider .circle").width(),
          })
          .on("circle-animation-progress", function (event, progress, stepValue) {
            $(this)
              .parent()
              .find(".label")
              .html((stepValue * 100).toFixed(0) + "%");
          })
          .stop();
      }
    });
  }
  setTimeout(function () {
    animateElements();
    $(window).scroll(animateElements);
  }, 2500);

  /* ============================================================ */
  /* Style Switcher
    /* ============================================================ */
  $(".style-switcher .toggle-btn").on("click", function () {
    $(".style-switcher").toggleClass("active");
  });
  $(document).on("click", function (e) {
    var style_switcher = $(".style-switcher.active");
    if (style_switcher.is(e.target) !== true && style_switcher.has(e.target).length === 0) {
      $(style_switcher).removeClass("active");
    }
  });

  /* ============================================================ */
  /* Scroll Top
    /* ============================================================ */
  //   $("body").append("<a href='#top' title='Scroll Top' id='scroll-top' class='topbutton'><i class='fal fa-arrow-up'></i></a>");
  var $scrolltop = $("#scroll-top");
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > $(this).height()) {
      $scrolltop.removeClass("invisible");
    } else {
      $scrolltop.addClass("invisible");
    }
  });
  $("a[href='#top']").on("click", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1000
    );
    return false;
  });

  // =================================================================
  // Dynamic Data
  // =================================================================

  $(window).on("load", function () {
    $.getJSON("../data.json", function (data) {
      // Job Data
      $("#experienceDescription").html(data.workExperience.description);
      for (var i = Object.keys(data.workExperience.jobs).length - 1; i >= 0; i--) {
        $("#experiences").append(`
          <li class="p-5 border rounded-xl md:flex max-md:space-y-2 border-platinum dark:border-metalBlack md:border-0 md:p-0 md:rounded-none">
            <div class="flex items-center justify-between mb-5 md:w-64 md:block md:mb-0">
              <h6 class="text-sm font-medium text-black dark:text-white text-opacity-60 md:text-base md:text-opacity-100">${data.workExperience.jobs[i].company}</h6>
              <p class="text-[13px] md:text-sm text-theme">${data.workExperience.jobs[i].startDate} - ${data.workExperience.jobs[i].endDate}</p>
            </div>
            <div class="md:flex-1 md:pl-16 relative md:before:content-[&#39;&#39;] md:before:absolute md:before:-left-1 md:before:top-3 md:before:w-2 md:before:h-2 md:before:bg-theme md:before:rounded-full md:before:shadow-dots_glow">
              <h4 class="text-xl xl:text-2xl font-medium xl:font-medium leading-7 text-black dark:text-white mb-2.5">${data.workExperience.jobs[i].title}</h4>
              <p>${data.workExperience.jobs[i].description}</p>
            </div>
          </li>
        `);
      }

      // School Data
      for (var i = Object.keys(data.education.schools).length - 1; i >= 0; i--) {
        $("#schools").append(`
          <li class="p-5 border rounded-xl md:flex max-md:space-y-2 border-platinum dark:border-metalBlack md:border-0 md:p-0 md:rounded-none">
            <div class="flex items-center justify-between mb-5 md:w-64 md:block md:mb-0">
              <h6 class="text-sm font-medium text-black dark:text-white text-opacity-60 md:text-base md:text-opacity-100">${data.education.schools[i].name}</h6>
              <p class="text-[13px] md:text-sm text-theme">${data.education.schools[i].startDate} - ${data.education.schools[i].endDate}</p>
            </div>
            <div class="md:flex-1 md:pl-16 relative md:before:content-[&#39;&#39;] md:before:absolute md:before:-left-1 md:before:top-3 md:before:w-2 md:before:h-2 md:before:bg-theme md:before:rounded-full md:before:shadow-dots_glow">
              <h4 class="text-xl xl:text-2xl font-medium xl:font-medium leading-7 text-black dark:text-white mb-2.5">${data.education.schools[i].course}</h4>
              <!-- <p>Owing to advancements in product other designer technologies aute voluptate.</p> -->
            </div>
          </li>
        `);
      }

      // Skills
      for (var i = 0; i < Object.keys(data.skills).length; i++) {
        $("#skillsList").append(`
          <div class="mb-4 mt-10 section-title">
            <h2 class="title text-[32px] font-extralight text-black dark:text-white leading-1.27">${data.skills[i].title}</h2>
          </div>
        `);
        let skills = data.skills[i].list.split(",");
        skills.forEach((skill) => {
          $("#skillsList").append(`
            <div class="inline-block text-sm px-3.5 py-2 mb-4 transition duration-300 border border-dashed text-black dark:text-white/70 border-platinum dark:border-greyBlack rounded-3xl hover:text-theme dark:hover:text-white">
              ${skill}
            </div>
          `);
        });
      }
    });
  });
})(jQuery);
// jQuery Ended
