const navItems = document.getElementsByClassName('nav')[0].getElementsByClassName('nav-item');

const url = window.location.href;

function objMap(obj, func, url) {
  return Object.fromEntries(Object.entries(obj).filter(([k, v]) => [k, func(v, url)]));
};

function activeRemove(dom, url) {
  const link = dom.firstChild.getAttribute("href").slice(2, -5);

  if (url.includes(link)) {
    dom.className = dom.className.replace("nav-item", "nav-item active");
    dom.firstChild.setAttribute("class", "nav-link active");
    return(link)
  } else {
    dom.className = dom.className.replace("nav-item active", "nav-item");
    dom.firstChild.setAttribute("class", "nav-link");
  }
}

function activeTab(navItems, url) {
  const tabName = objMap(navItems, activeRemove, url);
  return(tabName)
};

const tabName = activeTab(navItems, url);

