import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const formData = {}

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

populateForm();

function onFormInput(e) {

  const formElValue = e.target.value;
  const formElName = e.target.name;
  formData[formElName] = formElValue;

  const formDataStringified = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, formDataStringified);
}

function onFormSubmit(e) {
  e.preventDefault();

  if (e.target.email.value === '') {
    alert('Please enter your email');
    return;
  }
  if (e.target.message.value === '') {
    alert('Please type your message');
    return;
  }

  console.log(formData);

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateForm() {
  const storageValue = localStorage.getItem(STORAGE_KEY);

  const storageValueParsed = JSON.parse(storageValue);
  console.log(storageValueParsed)

  if (storageValueParsed) {
    const formElements = form.elements;
    for (const key of storageValueParsed) {
      formElements[key].value = storageValueParsed[key];
    }
  }
}

// import throttle from 'lodash.throttle';
// import localStorageApi from './localstorage';
//
// const form = document.querySelector('.feedback-form');
//
// const feedbackFormState = {};
//
// const fillFormFields = () => {
//   const userDataFromLS = localStorageApi.load('feedback-form-state');
//
//   if (userDataFromLS === undefined) {
//     return;
//   }
//
//   const formElements = form.elements;
//
//   for (const key in userDataFromLS) {
//     if (userDataFromLS.hasOwnProperty(key)) {
//       formElements[key].value = userDataFromLS[key];
//     }
//   }
// };
//
// const onFormElChange = event => {
//   const target = event.target;
//
//   const formElVal = target.value;
//   const formElName = target.name;
//
//   feedbackFormState[formElName] = formElVal;
//
//   localStorageApi.save('feedback-form-state', feedbackFormState);
// };
//
// const onFormSubmit = event => {
//   event.preventDefault();
//
//   console.log(feedbackFormState);
//   localStorageApi.remove('feedback-form-state');
//
//   event.currentTarget.reset();
// };
//
// fillFormFields();
//
// form.addEventListener('input', throttle(onFormElChange, 500));
// form.addEventListener('submit', onFormSubmit);