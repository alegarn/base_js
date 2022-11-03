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

function countDown(timer) {

  let sec = Number(timer.outerText);
  if ((sec > 0) && (sec <=10)) {
    let minus = sec - 1;
    timer.innerText = `${minus}` ;
  } 
  if (sec == 0)  {
    timer.innerText = "";
    const pricing = document.querySelector("#pricing");
    pricing.innerText = "MOUSE OUT!";
    timer.previousSibling.data = "";
  };

};

const timer = document.querySelector("#timer");

setInterval(() => {
  countDown(timer);
}, 1000);




const mouseEvent = e => {
  const shouldShowExitIntent = 
    !e.toElement && 
    !e.relatedTarget &&
    e.clientY < 10;

  if (shouldShowExitIntent) {
    document.removeEventListener('mouseout', mouseEvent);
    document.querySelector('.exit-intent-popup').classList.add('visible');
  }
};

setTimeout(() => {
  document.addEventListener('mouseout', mouseEvent);
}, 10_000);


const exit = e => {
  const shouldExit =
    [...e.target.classList].includes('exit-intent-popup') || // user clicks on mask
    [...e.target.classList].includes('close'); // user clicks on the close icon

  if (shouldExit) {
    document.querySelector('.exit-intent-popup').classList.remove('visible');
  }
};

document.querySelector('.exit-intent-popup').addEventListener('click', exit);
