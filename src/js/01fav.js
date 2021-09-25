'use strict';

function handleFav(e) {
  const clickedId = parseInt(e.currentTarget.id);
  const favFound = favoriteSeries.findIndex((fav) => {
    return fav.id === clickedId;
  });

  if (favFound === -1) {
    const showEle = listSeries.find((ele) => {
      return ele.id === clickedId;
    });
    favoriteSeries.push(showEle);

  } else {
    favoriteSeries.splice(favFound, 1);

  }

  renderFavList(); //esto pinta 
  setInLocalStorage(); //esto guarda 
}

function renderFavList() {
  favoriteListHtml.innerHTML = '';
  for (let fav of favoriteSeries) {
    const nameShow = fav.name;
    const image = fav.image;
    const id = fav.id;
    let getImage = '';
    const newItemList = document.createElement('li');
    const img = document.createElement('img');
    const textName = document.createElement('p');
    const textField = document.createTextNode(nameShow);
    newItemList.id = id;
    newItemList.className = "styleListFav js_li";

    const removeFav = document.createElement('i');
    removeFav.className = 'fas fa-times-circle styleRemove';

    if (image !== null) {
      getImage = image.medium;
      img.src = getImage;
    } else {
      img.src = placeholderImage;

    }
    img.alt = nameShow;
    textName.appendChild(textField);
    newItemList.append(textName, img, removeFav);
    favoriteListHtml.appendChild(newItemList);

  }
  handleClickLi();
}

function handleClickLi() {
  const liListener = document.querySelectorAll('.js_li');
  for (let eleLi of liListener) {
    eleLi.addEventListener('click', handleFav);
  }
}

