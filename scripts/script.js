let profile = document.querySelector('.profile');
let btnEdit = profile.querySelector('.profile__button-edit');
let name = profile.querySelector('.profile__profile-name');
let info = profile.querySelector('.profile__profile-info');
let ppEditProfile = document.querySelector('.popup-edit-profile');
//let ppContainer = ppEditProfile.querySelector('.popup-edit-profile__container');
let fieldsEdit = ppEditProfile.querySelector('.popup-edit-profile__edit');
let editName = ppEditProfile.querySelector('.popup-edit-profile__input_name');
let editInfo = ppEditProfile.querySelector('.popup-edit-profile__input_info');
let btnClose = ppEditProfile.querySelector('.popup-edit-profile__batton-close');


//открыть пп
function openPopupEditProfile() {
  editName.value = name.textContent;
  editInfo.value = info.textContent;
  ppEditProfile.classList.add('popup-edit-profile_active');
}
btnEdit.addEventListener('click', openPopupEditProfile);

//закрыть пп
function closePopuoEditProfile() {
  ppEditProfile.classList.remove('popup-edit-profile_active');
}
btnClose.addEventListener('click', closePopuoEditProfile);

//применить изменения и закрыть пп
function SubmitPopupEditProfile(e) {
  e.preventDefault();
  let newName = editName.value;
  let newJob = editInfo.value;
  name.textContent = newName;
  info.textContent = newJob;
  closePopuoEditProfile();
}
fieldsEdit.addEventListener('submit', SubmitPopupEditProfile);
