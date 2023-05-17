// Находим форму в DOM
const formElement = document.querySelector('.popup__form_edit_profile');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__value_field_name');
const jobInput = document.querySelector('.popup__value_field_job');
// Находим кнопку открытия popup и редактирования галереи
const openProfileButton = document.querySelector('.profile__button');
const openCardsButton = document.querySelector('.profile__add-button');
 // Выбираем поля с именем и профессией
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__work');
//Находим popup
const popup = document.querySelector('.popup');
// Находим кнопку закрытия popup
const closePopupButton = document.querySelector('.popup__button-close');
// функция присвоения класса  popup
const popupToggle = (popup) => ('click', popup.classList.toggle('popup_opened'));

// функция открытия popup 
function openPopup() {
    popupToggle(popup);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}
// открываем popup и подставояем значения из profileName и profileJob при помоще функции openPopup
openProfileButton.addEventListener('click', openPopup);
//ткрываем popup редактирования карточек
openCardsButton.addEventListener('click', openPopup)
//закрываем popup без сохранения
closePopupButton.addEventListener('click', () => popupToggle(popup));
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    //закрытие popup
    popupToggle(popup);
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






