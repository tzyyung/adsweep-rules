// ==UserScript==
// @name        Google Ads WebView Blocker
// @match       *://*/*
// @run-at      document-end
// @version     1.3
// ==/UserScript==

// Phase 1: Remove ad elements with Google attributes + collapse parents
function removeAds() {
  // Google Ad Manager containers
  document.querySelectorAll('[data-google-query-id]').forEach(function(el) {
    collapseWithParent(el);
  });
  // Ad iframes
  document.querySelectorAll('iframe').forEach(function(f) {
    var src = f.src || '';
    if (/doubleclick|googlesyndication|googleads|adservice\.google/.test(src)) {
      collapseWithParent(f);
    }
  });
  // Empty ad containers: find elements with only "Ad" text
  // (when shouldInterceptRequest blocks gpt.js, container stays empty with "Ad" label)
  document.querySelectorAll('div').forEach(function(div) {
    var text = div.textContent.trim();
    if (text === 'Ad' || text === 'AD' || text === 'Advertisement') {
      var rect = div.getBoundingClientRect();
      if (rect.height < 200 && rect.height > 0) {
        var container = div.closest('[class*="ad"]') || div.parentElement;
        if (container) {
          container.style.cssText = 'display:none!important;height:0!important;overflow:hidden!important';
        }
      }
    }
  });
}
removeAds();

// Phase 2: MutationObserver
new MutationObserver(function(mutations) {
  var needsClean = false;
  mutations.forEach(function(m) {
    m.addedNodes.forEach(function(n) {
      if (n.nodeType === 1) {
        if (n.getAttribute && n.getAttribute('data-google-query-id')) needsClean = true;
        if (n.tagName === 'IFRAME' && /doubleclick|googlesyndication|googleads/.test(n.src || '')) needsClean = true;
        if (n.tagName === 'DIV' && n.textContent && n.textContent.trim() === 'Ad') needsClean = true;
      }
    });
  });
  if (needsClean) removeAds();
}).observe(document.body || document.documentElement, {childList: true, subtree: true});

// Phase 3: Intercept fetch
(function() {
  var origFetch = window.fetch;
  if (origFetch) {
    window.fetch = function(url) {
      if (typeof url === 'string' && /doubleclick|googlesyndication|adservice\.google/.test(url))
        return Promise.resolve(new Response('', {status: 200}));
      return origFetch.apply(this, arguments);
    };
  }
})();

function collapseWithParent(el) {
  var parent = el.parentElement;
  el.remove();
  if (parent && parent.children.length === 0) {
    parent.style.cssText = 'display:none!important;height:0!important';
  }
}
