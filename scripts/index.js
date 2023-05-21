// Находим форму в DOM
const formElement = document.querySelector('.popup__form_edit_profile');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__value_field_name');
const jobInput = document.querySelector('.popup__value_field_job');
const placeUnput = document.querySelector('.popup__value_field_place');
const urlUnput = document.querySelector('.popup__value_field_url');
// Находим кнопку открытия popup и добавления карточки
const openProfileButton = document.querySelector('.profile__button');
const openCardsButton = document.querySelector('.profile__add-button');
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
const closePopupButton = document.querySelector('.popup__button-close');
// функция присвоения класса  popup
const popupToggle = (value) => ('click', value.classList.toggle('popup_opened'));


// функция открытия popup 
function openPopup() {
    popupToggle(popupEditForm);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
};
function openPopupCard() {
    popupToggle(popupEditCards);
};
//открываем popup с карточками
openCardsButton.addEventListener('click', openPopupCard);
// открываем popup и подставояем значения из profileName и profileJob при помоще функции openPopup
openProfileButton.addEventListener('click', openPopup);
//закрываем popup без сохранения
closePopupButton.addEventListener('click', () => popupToggle(popupEditForm));
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
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
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 
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
//добавления карточек при загрузке страницы
initialCards.forEach((item) => {
    //копируем содержимое карточки для каждого элемента массива
    const itemElement = templateCards.cloneNode(true);
    //получаем значения верстки элементов из template
    itemElement.querySelector('.element');
    itemElement.querySelector('.element__button-delete');
    itemElement.querySelector('.element__img').src = item.link;
    itemElement.querySelector('.element__img').alt = item.alt;
    itemElement.querySelector('.element__wrapper');
    itemElement.querySelector('.element__title').textContent = item.name;
    itemElement.querySelector('.element__button-like');
    elements.append(itemElement);
});







