// Находим форму в DOM
let formElement = document.querySelector('.popup__container');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__profession');
// Находим кнопку открытия popup
let openPopupButton = document.querySelector('.profile__button');
 // Выбираем поля с именем и профессией
 let profileName = document.querySelector('.profile__name');
 let profileJob = document.querySelector('.profile__work');
// Находдим кнопку закрытия popup
const closePopupButton = document.querySelector('.popup__button-close');
// находим popup
const popup = document.querySelector('.popup');
// функция закрытия popup
let popupToggle = (popup) => ('click', popup.classList.toggle('popup_opened'));
// открываем popup и подставояем значения из profileName и profileJob
openPopupButton.addEventListener('click', function() {
    popupToggle(popup);
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});
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
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInputValue;
    profileJob.textContent = jobInputValue;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 




