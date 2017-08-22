(function($) {
	var DGTU = (function() {

		var $sel = {};
		$sel.window = $(window);
		$sel.html = $("html");
		$sel.body = $("body", $sel.html);

		return {
			menu: function() {
				var self = this;

				$(".header-menu--has-submenu").on("mouseenter", function() {
					var $holder = $(this);
					$(".header-menu-level1", $holder).css("display", "block");
					setTimeout(function() {
						$(".header-menu-level1", $holder).addClass("show");
					}, 50);
				});
				$(".header-menu--has-submenu").on("mouseleave", function() {
					var $holder = $(this);
					$(".header-menu-level1", $holder).removeClass("show");
					setTimeout(function() {
						$(".header-menu-level1", $holder).css("display", "none");
					}, 350);
				});
			},

			dropdown: {
				timer: false,
				init: function() {
					var self = this;
					$(".header-topmenu-item-holder--has-submenu, .header-menu-item-holder--has-submenu", $sel.body)
						.on("mouseenter", function() {
							(function($holder) {
								self.show($holder);
							})($(this));
						})
						.on("mouseleave", function() {
							(function($holder) {
								self.hide($holder);
							})($(this));
						});
				},
				show: function($holder) {
					var self = this;
					if(self.timer) {
						clearTimeout(self.timer);
					}
					var $list = $("> nav", $holder);
					$list.css("display", "block");
					self.timer = setTimeout(function() {
						$holder.addClass("hovered");
					}, 50);
				},

				hide: function($holder) {
					var self = this;
					if(self.timer) {
						clearTimeout(self.timer);
					}
					var $list = $("> nav", $holder);
					$holder.removeClass("hovered");
					self.timer = setTimeout(function() {
						$list.css("display", "none");
					}, 220);
				}
			},

			slider: function() {
				$(".sections").slick({
					infinite: true,
					slidesToShow: 5,
					slidesToScroll: 3,
					dots: false,
					prevArrow: "<button type='button' class='sections-arrow sections-arrow-prev icon-arrow-left-red-before icon-arrow-left-white-after'></button>",
					nextArrow: "<button type='button' class='sections-arrow sections-arrow-next icon-arrow-right-red-before icon-arrow-right-white-after'></button>",
					centerMode: true,
				});

				// sliders news
				$(".slider").slick({
					infinite: true,
					slidesToShow: 5,
					slidesToScroll: 3,
					dots: false,
					prevArrow: "<button type='button' class='slider-arrow slider-arrow--prev'></button>",
					nextArrow: "<button type='button' class='slider-arrow slider-arrow--next'></button>",
					adaptiveHeight: true,
					centerMode: true,
				});

				$(".slider-bottom").slick({
					centerPadding: '60px',
					centerMode: true,
					infinite: true,
					slidesToShow: 3,
					slidesToScroll: 1,
					dots: false,
					prevArrow: "<button type='button' class='slider-arrow slider-arrow--prev'></button>",
					nextArrow: "<button type='button' class='slider-arrow slider-arrow--next'></button>",
				});

				// sliders service
				$(".slider-bottom-service").slick({
					infinite: true,
					slidesToShow: 2,
					slidesToScroll: 1,
					dots: false,
					prevArrow: "<button type='button' class='slider-arrow slider-arrow--prev'></button>",
					nextArrow: "<button type='button' class='slider-arrow slider-arrow--next'></button>",
					centerMode: true,
				});

				// sliders contacts
				$(".slider-contacts").slick({
					infinite: true,
					slidesToShow: 2,
					slidesToScroll: 1,
					dots: false,
					prevArrow: "<button type='button' class='slider-arrow slider-arrow--prev'></button>",
					nextArrow: "<button type='button' class='slider-arrow slider-arrow--next'></button>",
				});

			},

			forms: {
				init: function($container) {
					if(!$container) {
						var $container = $sel.body;
					}

					jcf.setOptions("Select", {
						wrapNative: false,
						wrapNativeOnMobile: false
					});
					var $selects = $(".form-item--select", $container);
					$selects.each(function(i) {
						var $select = $(this),
							selectPlaceholder = $select.attr("placeholder");

						if(selectPlaceholder) {
							$select.prepend('<option class="hideme" selected>' + selectPlaceholder + '</option>');
						}

						jcf.replace($select);
					});

					$(".form-item--checkbox", $container).each(function() {
						var $ch = $(this);

						jcf.replace($ch, "Checkbox", {
							addClass: $ch.data("htmlclass") ? $ch.data("htmlclass") : ""
						});
					});

					$(".form-item--radio", $container).each(function() {
						var $rd = $(this);

						jcf.replace($rd, "Radio", {
							addClass: $rd.data("htmlclass") ? $rd.data("htmlclass") : "",
							spanColor: $rd.data("spancolor") ? $rd.data("spancolor") : ""
						});
					});
				}
			},

			tabs: {
				init: function() {
					var self = this;
					$(".tabs-heading-item").on("click", function(e) {
						var $item = $(this),
							$tabs = $sel.body,
							itemID = $item.attr("href").replace("#", "");

						if(!$tabs.hasClass("inactive")) {
							if(!$item.hasClass("active-tabs")) {
								self.hideAll($tabs);
								self.show(itemID, $tabs);
							}
							e.preventDefault();
						}
					});
				},
				show: function(tabID, $tabs) {
					$(".tabs-heading-item[href*=" + tabID + "]", $tabs).addClass("active-tabs");
					$(".tabs-content-item[id*=" + tabID + "]", $tabs).addClass("active-tabs");
					$(".slick-initialized", $(".tabs-content-item[id*=" + tabID + "]", $tabs)).slick("setPosition");
				},
				hide: function(tabID, $tabs) {
					$(".tabs-heading-item[href*=" + tabID + "]", $tabs).removeClass("active-tabs");
					$(".tabs-content-item[id*=" + tabID + "]", $tabs).removeClass("active-tabs");
				},
				hideAll: function($tabs) {
					$(".tabs-heading-item", $tabs).removeClass("active-tabs");
					$(".tabs-content-item", $tabs).removeClass("active-tabs");
				}
			},

			slideToggle: {
				init: function() {
					var self = this;
					$(".filter-events--more").change(function() {
						var $item = $(this),
							$slideItem = $sel.body.find("#"+$item.data("slideMore"));
							$slideItem.slideToggle("1000");
					})
				}

			},

			initAjaxLoader: function() {
				$sel.body.on("click", ".btn-event-load--more", function(event) {
					var $linkAddress = $(this),
						href = $linkAddress.attr("href"),
						$container = $($linkAddress.data("container"));

						(function(href, $container) {
							$.ajax({
								url: href,
								success: function(data) {
									var $data = $(data).addClass("load-events-item");
										$container.append($data);
								}
							})
						})(href, $container);
						event.preventDefault();
				})
			},

			yandexMap: {
				$map: false,
				map: false,
				points: false,
				init: function() {
					var self = this;
					self.$map = $(".map", $sel.body);
					if(!self.$map.length) {
						return false;
					}
					self.map = new ymaps.Map(self.$map[0], {
						center: self.$map.data("center"),
						zoom: self.$map.data("zoom")
					});
					self.map.behaviors.disable("scrollZoom");
					self.map.controls.remove("trafficControl").remove("scaleLine").remove("typeSelector").remove("searchControl");
					self.points = eval(self.$map.data("points"));

					var point1 = self.points[0],
						placemark1,
						pointPosition1 = point1.position.split(",");
					placemark1 = new ymaps.Placemark(
						[parseFloat(pointPosition1[0]), parseFloat(pointPosition1[1])], {
							balloonContent: point1.description,
						}, {
							preset: "islands#redIcon",
							iconImageHref: point1.icon,
							iconImageSize: [65, 85],
						}
					);

					var point2 = self.points[1],
						placemark2,
						pointPosition2 = point2.position.split(",");
					placemark2 = new ymaps.Placemark(
						[parseFloat(pointPosition2[0]), parseFloat(pointPosition2[1])], {
							balloonContent: point2.description,
						}, {
							preset: "islands#redIcon",
							iconImageHref: point2.icon,
							iconImageSize: [35, 55],
						}
					);
					self.map.geoObjects.add(placemark1);
					self.map.geoObjects.add(placemark2);
				}

			},

			isotope: {
				init: function() {
					var $container = $(".isotope-filter");
					$(".isotope-filter-button").on("click", function() {
						var $itemFilter = $(this);
						var selector = $itemFilter.attr("data-filter");
							$container.isotope({  itemSelector: ".isotope-filter-item", filter: selector });
							return false;
					});
				}
			}

		};

	})();

	DGTU.menu();
	DGTU.initAjaxLoader();
	DGTU.slider();

	DGTU.isotope.init();
	DGTU.dropdown.init();

	DGTU.forms.init();

	DGTU.tabs.init();

	DGTU.slideToggle.init();

	ymaps.ready(function() {
		DGTU.yandexMap.init();
	});


})(jQuery);
