const SECTION_ID = "apex-quotation-section";

function addQuotationSection() {
  if (!location.pathname.startsWith("/admin") || location.pathname.startsWith("/admin/login") || location.pathname.startsWith("/admin/quotation")) return;
  const main = document.querySelector("main");
  if (!main || main.classList.contains("admin-login") || document.getElementById(SECTION_ID)) return;

  const section = document.createElement("section");
  section.id = SECTION_ID;
  section.setAttribute("aria-labelledby", "quotation-section-title");
  section.innerHTML = '<div><p>TEAM SALES TOOL</p><h2 id="quotation-section-title">Quotation Studio</h2><span>Build accurate, branded client quotations with live pricing and presentation mode.</span></div><a href="/admin/quotation">Open quotation builder</a>';
  main.prepend(section);
}

addQuotationSection();
new MutationObserver(addQuotationSection).observe(document.documentElement, { childList: true, subtree: true });
window.addEventListener("popstate", addQuotationSection);