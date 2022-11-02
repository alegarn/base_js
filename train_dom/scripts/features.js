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

if (url.includes('features')) {

  function selectDomImage(dom) {
    const domImage = dom.firstElementChild;
    return(domImage)
  };

  function changeImage(dom, images) {
    const domImage = selectDomImage(dom);
    const image = getRandom(images);
    domImage.setAttribute("style", `background-image: url('${image}');`);
  };


  function selectDomTitle(dom) {
    const cardTitle = dom.getElementsByTagName('h3')[0].firstChild;
    return(cardTitle);
  };

  function changeTitle(dom, titles) {
    const domTitle = selectDomTitle(dom);
    const title = getRandom(titles);
    domTitle.nodeValue = (`${title}`);
  };
  
  const getRandom = (data) => data[Math.floor(Math.random() * data.length)];

  function shuffleCard(card) {
    const colDom = card[0];
    const image = card[1];
    const title = card[2];
    changeImage(colDom, image);
    changeTitle(colDom, title);
  };


  function shuffleCards() {

    const col1Dom = document.getElementById("col1");
    const col2Dom = document.getElementById("col2");
    const col3Dom = document.getElementById("col3");

    const images = ['./images/1.png', './images/2.png' , './images/3.png'];
    const playerClass = ['Berzerker', 'Paladin', 'Fighter' ];
    const card1 = [col1Dom, images, playerClass];

    const logos = ['./images/logo1.png', './images/logo1.png', './images/logo1.png'];
    const charactName = ['Draven', 'Ulder', 'Grace'];
    const card2 = [col2Dom, logos, charactName];

    const classAttackLogos = ['./images/special1.png', './images/special2.png', './images/special3.png'];
    const classAttackNames = ['Rage', 'Healing Lighting', 'Dark Vision'];
    const card3 = [col3Dom, classAttackLogos, classAttackNames];

    shuffleCard(card1);
    shuffleCard(card2);
    shuffleCard(card3);

  };
  

  const shuffleButton = document.querySelector('#theShuffleButton');
  shuffleButton.addEventListener("click", shuffleCards);
}
