import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formdata = {};

const feedbackFormEl = document.querySelector('.feedback-form');

feedbackFormEl.addEventListener('submit', onFormSubmit);
feedbackFormEl.addEventListener('input', throttle(onTextareaInput, 500));

// Заолняем инпуты если что-то есть в LocalStorage
window.addEventListener('DOMContentLoaded', fillInputsArea);

// Загружает в LocalStorage
const save = (key, value) => {
  try {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  } catch (err) {
    console.error('Stingify error', err.message);
  }
};

// Считывает с LocalStorage
const load = key => {
  try {
    const data = localStorage.getItem(key);
    return data === null ? undefined : JSON.parse(data);
  } catch (err) {
    console.error('Parse error', err.message);
  }
};

//  Очищает все поля после Submit
function onFormSubmit(evt) {
  evt.preventDefault();
  const currentState = load(STORAGE_KEY);

  if (evt.target.email.value === '' || evt.target.message.value === '') {
    alert('Все поля должны быть заполнены!');
    return;
  }

  console.log('Submit form');
  console.log(currentState);
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  
}

// Записывает в объект данные с инпута и в LocalStorage,
// если LocalStorage пустой создаем новый объект
function onTextareaInput(evt) {
  const currentState = load(STORAGE_KEY);
  if (currentState) {
    currentState[evt.target.name] = evt.target.value;
    save(STORAGE_KEY, currentState);
  } else {
    formdata[evt.target.name] = evt.target.value;
    save(STORAGE_KEY, formdata);
  }
}

// Считывает с LocalStorage данные и записывает в инпуты, если LocalStorage не пустой.
function fillInputsArea() {
  const currentState = load(STORAGE_KEY);
  if (currentState) {
    for (const key in currentState) {
      feedbackFormEl[key].value = currentState[key];
    }
  }
}
