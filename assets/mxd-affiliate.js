// MXD Affiliate — kimcuong
// Tự động rewrite nút "Mua ngay" sang isclix + gắn sub1/2/3
(() => {
  const BASES = {
    shopee: "https://go.isclix.com/deep_link/6840025033764211965/4751584435713464237?sub4=oneatweb",
    lazada: "https://go.isclix.com/deep_link/6840025033764211965/5127144557053758578?sub4=oneatweb",
    tiktok: "https://go.isclix.com/deep_link/6840025033764211965/6648523843406889655?sub4=oneatweb"
  };

  const MERCHANT_FROM_HOST = (h) => {
    const host = (h || "").toLowerCase();
    if (host.includes("shopee")) return "shopee";
    if (host.includes("lazada")) return "lazada";
    if (host.includes("tiktok")) return "tiktok";
    return "";
  };

  const buildIsclix = (merchant, url, { sku = "", cat = "", repo = "kimcuong" } = {}) => {
    const base = BASES[merchant];
    if (!base) return "#";
    const sep = base.includes("?") ? "&" : "?";
    return (
      base +
      sep +
      "url=" + encodeURIComponent(url) +
      "&sub1=" + encodeURIComponent(repo) +
      "&sub2=" + encodeURIComponent(cat) +
      "&sub3=" + encodeURIComponent(sku)
    );
  };

  const cards = document.querySelectorAll(".product-card");
  cards.forEach(card => {
    const meta = card.querySelector("a.product-meta");
    const buy  = card.querySelector("a.buy");
    if (!meta || !buy) return;

    const productUrl = meta.getAttribute("href") || "#";
    const sku = meta.getAttribute("data-sku") || "";
    const merchant =
      meta.getAttribute("data-merchant") ||
      MERCHANT_FROM_HOST(new URL(productUrl, location.href).host);

    // lấy cat từ footer note "category=..."
    let cat = "";
    try {
      const note = document.querySelector("footer small")?.textContent || "";
      const m = note.match(/category=([a-z0-9\-]+)/i);
      if (m) cat = m[1];
    } catch (e) {}

    const deep = buildIsclix(merchant, productUrl, { sku, cat });
    buy.setAttribute("href", deep);
    buy.setAttribute("target", "_blank");
    buy.setAttribute("rel", "noopener");
  });
})();
