/**
 * Renders Media & News cards from MEDIA_ITEMS in media-data.js.
 * Shows four items at a time. A fifth entry in the data file turns on Load More.
 */
(function () {
	var PAGE_SIZE = 4;
	var root = document.getElementById("mediaGrid");
	var filters = document.getElementById("mediaFilters");
	var empty = document.getElementById("mediaEmpty");
	var moreWrap = document.getElementById("mediaMoreWrap");
	var moreButton = document.getElementById("mediaLoadMore");
	var dialog = document.getElementById("mediaPreview");
	var previewImage = document.getElementById("mediaPreviewImage");
	var previewCaption = document.getElementById("mediaPreviewCaption");

	if (!root || !window.MEDIA_ITEMS) {
		return;
	}

	var items = MEDIA_ITEMS.slice();
	var activeCategory = "All";
	var visibleCount = PAGE_SIZE;

	function escapeHtml(value) {
		return String(value || "")
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#39;");
	}

	function safeArticleUrl(url) {
		if (!url) {
			return "";
		}
		try {
			var parsed = new URL(url, window.location.href);
			if (parsed.protocol === "http:" || parsed.protocol === "https:") {
				return parsed.href;
			}
		} catch (error) {
			return "";
		}
		return "";
	}

	function formatDate(value) {
		if (!value) {
			return "";
		}
		var parsed = new Date(value + "T00:00:00");
		if (isNaN(parsed.getTime())) {
			return value;
		}
		return parsed.toLocaleDateString("en-IN", {
			day: "numeric",
			month: "long",
			year: "numeric"
		});
	}

	function filteredItems() {
		if (activeCategory === "All") {
			return items;
		}
		return items.filter(function (item) {
			return item.category === activeCategory;
		});
	}

	function categories() {
		var names = ["All"];
		items.forEach(function (item) {
			if (item.category && names.indexOf(item.category) === -1) {
				names.push(item.category);
			}
		});
		["Newspaper", "Magazine", "Online Media"].forEach(function (name) {
			if (names.indexOf(name) === -1) {
				names.push(name);
			}
		});
		return names;
	}

	function renderFilters() {
		if (!filters) {
			return;
		}
		filters.innerHTML = categories().map(function (name) {
			var pressed = name === activeCategory ? "true" : "false";
			return '<button type="button" class="media-filter' + (name === activeCategory ? " is-active" : "") + '" data-category="' + escapeHtml(name) + '" aria-pressed="' + pressed + '">' + escapeHtml(name) + "</button>";
		}).join("");
	}

	function cardHtml(item) {
		var newspaper = item.newspaper ? '<p class="media-card__paper">' + escapeHtml(item.newspaper) + "</p>" : "";
		var dateText = formatDate(item.date);
		var date = dateText ? '<p class="media-card__date"><i class="fa-regular fa-calendar" aria-hidden="true"></i> ' + escapeHtml(dateText) + "</p>" : "";
		var articleUrl = safeArticleUrl(item.articleUrl);
		var button = articleUrl
			? '<a class="btn--primary" href="' + escapeHtml(articleUrl) + '" target="_blank" rel="noopener noreferrer">Read Full Article <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>'
			: '<button type="button" class="btn--primary" data-preview="' + escapeHtml(item.id) + '">View Newspaper <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>';

		return (
			'<article class="media-card">' +
				'<button type="button" class="media-card__image" data-preview="' + escapeHtml(item.id) + '" aria-label="Open a larger view of this newspaper cutting">' +
					'<img src="' + escapeHtml(item.image) + '" alt="' + escapeHtml(item.alt || item.title) + '" loading="lazy" decoding="async">' +
				"</button>" +
				'<div class="media-card__body">' +
					newspaper +
					"<h2>" + escapeHtml(item.title) + "</h2>" +
					date +
					"<p>" + escapeHtml(item.description) + "</p>" +
					button +
				"</div>" +
			"</article>"
		);
	}

	function render() {
		var list = filteredItems();
		var shown = list.slice(0, visibleCount);
		root.innerHTML = shown.map(cardHtml).join("");
		if (empty) {
			empty.hidden = list.length > 0;
		}
		if (moreWrap) {
			moreWrap.hidden = shown.length >= list.length;
		}
	}

	function openPreview(id) {
		var item = items.filter(function (entry) { return entry.id === id; })[0];
		if (!item || !dialog || !previewImage) {
			return;
		}
		previewImage.src = item.image;
		previewImage.alt = item.alt || item.title;
		if (previewCaption) {
			previewCaption.textContent = item.newspaper ? item.newspaper + " — " + item.title : item.title;
		}
		if (typeof dialog.showModal === "function") {
			dialog.showModal();
		} else {
			dialog.setAttribute("open", "");
		}
	}

	function closePreview() {
		if (!dialog) {
			return;
		}
		if (typeof dialog.close === "function" && dialog.open) {
			dialog.close();
		} else {
			dialog.removeAttribute("open");
		}
	}

	renderFilters();
	render();

	if (filters) {
		filters.addEventListener("click", function (event) {
			var button = event.target.closest("[data-category]");
			if (!button) {
				return;
			}
			activeCategory = button.getAttribute("data-category");
			visibleCount = PAGE_SIZE;
			renderFilters();
			render();
		});
	}

	if (moreButton) {
		moreButton.addEventListener("click", function () {
			visibleCount += PAGE_SIZE;
			render();
		});
	}

	root.addEventListener("click", function (event) {
		var trigger = event.target.closest("[data-preview]");
		if (!trigger) {
			return;
		}
		openPreview(trigger.getAttribute("data-preview"));
	});

	if (dialog) {
		dialog.addEventListener("click", function (event) {
			if (event.target === dialog || event.target.closest("[data-media-close]")) {
				closePreview();
			}
		});
	}
})();
