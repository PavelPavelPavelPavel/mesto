let openPopupButton = document.querySelector('.profile__button');
let closePopupButton = document.querySelector('.popup__button-close');
let submitPopupButton = document.querySelector('.popup__button');
let profileName = document.querySelector('.profile__name');
let profileWork = document.querySelector('.profile__work');
let popupWindow = document.querySelector('.popup');
let popupName = document.querySelector('.popup__name');
let popupProfession = document.querySelector('.popup__profession');


const popupToggle = () => popupWindow.classList.toggle('popup__opened')

closePopupButton.addEventListener('click', () => popupToggle(popupWindow));
openPopupButton.addEventListener('click', () => popupToggle(popupWindow));

submitPopupButton.addEventListener('click', closedPopup);
    function closedPopup () {
        profileName.textContent = `${popupName.value}`;
        profileWork.textContent = `${popupProfession.value}`;
    }

 function handleFormSubmit (evt) {
    evt.preventDefault();  
    popupWindow.classList.remove('popup__opened');
    popupName.value = profileName.textContent
    popupProfession.value = profileWork.textContent;
}
popupWindow.addEventListener('submit', handleFormSubmit); 








   




    
    
    
    
    
    popupName.addEventListener.value
    popupProfession.addEventListener.value
    profileName.addEventListener
    profileWork.addEventListener



