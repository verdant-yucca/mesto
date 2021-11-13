let profile = document.querySelector('.profile');
let btnEdit = profile.querySelector('.profile__buttonEdit');
let name = profile.querySelector('.profile__profile-name');
let info = profile.querySelector('.profile__profile-info');
let ppEditProfile = document.querySelector('.ppEditProfile');
let fieldsEdit = ppEditProfile.querySelector('.ppEditProfile__edit');
let ppContainer = ppEditProfile.querySelector('.ppEditProfile__container');
let editName = document.querySelector('.ppEditProfile__profile-name');
let editInfo = document.querySelector('.ppEditProfile__profile-info');
let btnClose = ppEditProfile.querySelector('.ppEditProfile__btnClose');

//открыть пп
function ppEditProfileOpen() {
  editName.value = name.textContent;
  editInfo.value = info.textContent;
  ppEditProfile.classList.add('active');
}
btnEdit.addEventListener('click', ppEditProfileOpen);

//закрыть пп
function ppEditProfileClose() {
  ppEditProfile.classList.remove('active');
}
btnClose.addEventListener('click', ppEditProfileClose);

//применить изменения и закрыть пп
function ppEditProfileSubmit(e) {
  e.preventDefault();
  let newName = editName.value;
  let newJob = editInfo.value;
  name.textContent = newName;
  info.textContent = newJob;
  ppEditProfileClose();
}
fieldsEdit.addEventListener('submit', ppEditProfileSubmit);
