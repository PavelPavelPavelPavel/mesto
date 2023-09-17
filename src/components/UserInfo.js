export default class UserInfo {
    constructor(nameElement, workElement, avatarElement) {
        this._name = nameElement;
        this._work = workElement;
        this._avatar = avatarElement;
    }


    setCurrentValuesToForm(inputName, inputWork) {
        inputName.value = this._name.textContent;
        inputWork.value = this._work.textContent;
    }

    setUserInfo(nameUser, workUser) {
        this._name.textContent = nameUser;
        this._work.textContent = workUser;
    }

    setUserAvatar(input) {
        this._avatar.src = input.link;
    }

    setUserAvatarFromServer(res) {
        this._avatar.src = res;
    }
       
}
