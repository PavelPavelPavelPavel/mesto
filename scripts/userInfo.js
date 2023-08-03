export class UserInfo {
    constructor({ ...dataUser }) {
        this._name = dataUser.name;
        this._job = dataUser.job;
    }

    getUserInfo(fieldName, fieldJob) {
        fieldName.value = this._name.textContent;
        fieldJob.value = this._job.textContent;
    }

    setUserInfo(inputName, inputJob) {
        this._name.textContent = inputName;
        this._job.textContent = inputJob;
    }
}
