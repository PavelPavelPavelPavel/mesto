// Находим форму в DOM
const formElementProfile = document.querySelector('.popup__form_edit_profile');
const formElementCard = document.querySelector('.popup__form_edit_cards');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__value_field_name');
const jobInput = document.querySelector('.popup__value_field_job');
const placeInput = document.querySelector('.popup__value_field_place');
const urlInput = document.querySelector('.popup__value_field_url');
// Находим кнопку открытия popup и добавления карточки
const openProfileButton = document.querySelector('.profile__button');
const openCardsButton = document.querySelector('.profile__add-button');
//создаем функцию для кнопки удаления 
const deleteCardButton = (evt) => {
  const item = evt.target.closest('.element');
  item.remove();
};
const likeCardButton = (evt) => {
    const item = evt.target.closest('.element__button-like');
    item.classList.toggle('element__button-like_active');
}
// Выбираем поля с именем и профессией
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__work');
//Находим popups
const popup = document.querySelector('.popup');
const popupEditForm = document.querySelector('.popup_edit_form');
const popupEditCards = document.querySelector('.popup_edit_cards');
//Находим article в верстке для вставки template с карточками 
const elements = document.querySelector('.elements');
//находим тemplate с карточками
const templateCards = document.querySelector('template').content;
// Находим кнопку закрытия popup
const closePopupButton = document.querySelectorAll('.popup__button-close');
// функция присвоения класса  popup 
const popupToggle = (value) => ('click', value.classList.toggle('popup_opened'));
function openPopup(item) {
  popupToggle(item)
};
// функция открытия popup`s
function openPopupProfile() {
    popupToggle(popupEditForm);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
};
function openPopupCard() {
    popupToggle(popupEditCards);
    placeInput.value = '';
    urlInput.value = '';
};
//открываем popup с карточками
openCardsButton.addEventListener('click', openPopupCard);
// открываем popup и подставояем значения из profileName и profileJob при помоще функции openPopup
openProfileButton.addEventListener('click', openPopupProfile);
//закрываем popup без сохранения
for (let i = 0; i < closePopupButton.length; i++) {
  closePopupButton[i].addEventListener('click', function() {
    if (closePopupButton[i] === closePopupButton[1]) {
      popupToggle(popupEditCards);
      placeInput.value = '';
      urlInput.value = '';
    } else {
      popupToggle(popupEditForm)
    }
  })
};
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
//форма профайла
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    //закрытие popup
    popupToggle(popupEditForm);
    // Получите значение полей jobInput и nameInput из свойства value
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInputValue;
    profileJob.textContent = jobInputValue;
}
//форма карточек
function handleFormCardSubmit (evt) {
    evt.preventDefault();

    popupToggle(popupEditCards);
    const renderCard = () => {
      //копируем содержимое карточки для каждого элемента массива
      const cardElement = templateCards.cloneNode(true);
      //получаем значения верстки элементов из template
      cardElement.querySelector('.element');
      //вешаем слушатель на кнопку удаления
      cardElement.querySelector('.element__button-delete').addEventListener('click', deleteCardButton);
      cardElement.querySelector('.element__img');
      cardElement.querySelector('.element__wrapper');
      cardElement.querySelector('.element__title');
      //вешаем слушатель на кнопку лайка
      cardElement.querySelectorAll('.element__button-like').addEventListener('click', likeCardButton);
      elements.append(cardElement);
   }
    
};
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementProfile.addEventListener('submit', handleFormSubmit); 
formElementCard.addEventListener('submit', handleFormCardSubmit);
//массив с карточками
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
      alt: 'Горы',
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
      alt: 'Река',
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
      alt: 'Дома пятиэтажки',
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
      alt: 'Горы и степь',
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
      alt: 'Железная дорога через лес 1 путь',
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
      alt: 'Горы ',
    }
  ];
  //функция для создания template
  const renderCard = (card) => {
     //копируем содержимое карточки для каждого элемента массива
     const cardElement = templateCards.cloneNode(true);
     //получаем значения верстки элементов из template
     cardElement.querySelector('.element');
     //вешаем слушатель на кнопку удаления
     cardElement.querySelector('.element__button-delete').addEventListener('click', deleteCardButton);
     cardElement.querySelector('.element__img').src = card.link;
     cardElement.querySelector('.element__img').alt = card.alt;
     cardElement.querySelector('.element__wrapper');
     cardElement.querySelector('.element__title').textContent = card.name;
     //вешаем слушатель на кнопку лайка
     cardElement.querySelector('.element__button-like').addEventListener('click', likeCardButton);
     elements.append(cardElement);
  }
//добавления карточек при загрузке страницы
initialCards.forEach((item) => {
  renderCard(item)  
});







