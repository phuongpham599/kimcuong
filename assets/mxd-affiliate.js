// /assets/mxd-affiliate.js
// MXD affiliate rewriter — kimcuong68 (sub1=repo, sub2=cat, sub3=sku)
(() => {
  const BASES = {
    shopee: "https://go.isclix.com/deep_link/6840025033764211965/4751584435713464237?sub4=oneatweb",
    lazada: "https://go.isclix.com/deep_link/6840025033764211965/5127144557053758578?sub4=oneatweb",
    tiktok: "https://go.isclix.com/deep_link/6840025033764211965/6648523843406889655?sub4=oneatweb"
  };

  const hostToMerchant = (h) => {
    const x = (h||'').toLowerCase();
    if (x.includes('shopee')) return 'shopee';
    if (x.includes('lazada')) return 'lazada';
    if (x.includes('tiktok')) return 'tiktok';
    return '';
  };

  const build = (merchant, url, sku='', cat='', repo='kimcuong68') => {
    const base = BASES[merchant];
    if (!base) return '#';
    const sep = base.includes('?') ? '&' : '?';
    return base + sep + 'url=' + encodeURIComponent(url)
      + '&sub1=' + encodeURIComponent(repo)
      + '&sub2=' + encodeURIComponent(cat)
      + '&sub3=' + encodeURIComponent(sku);
  };

  document.querySelectorAll('.product-card').forEach(card => {
    const meta = card.querySelector('a.product-meta');
    const buy  = card.querySelector('a.buy');
    if (!meta || !buy) return;
    const url = meta.getAttribute('href') || '#';
    const sku = meta.getAttribute('data-sku') || '';
    const cat = (document.querySelector('footer small')?.textContent||'').split('category=')[1]||'';
    const merchant = meta.getAttribute('data-merchant') || hostToMerchant((new URL(url, location.href)).host);
    const deep = build(merchant, url, sku, cat);
    buy.href = deep; buy.target = "_blank"; buy.rel = "noopener";
  });
})();
