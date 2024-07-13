let formData = { email: '', message: '' };
const STORAGE_KEY = 'feedback-form-data';

const form = document.querySelector('.feedback-form');

populateForm();

form.addEventListener('submit', handleFormSubmit);
form.addEventListener('input', handleFormInput);

function populateForm() {
  try {
    formData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch (err) {
    console.log(err);
    return;
  }

  if (!formData) {
    return;
  }

  for (const key in formData) {
    form.elements[key].value = formData[key];
  }
}

function handleFormInput(event) {
  const value = event.target.value;
  const key = event.target.name;
  console.log(key, value);

  try {
    formData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch (err) {
    console.log(err);
    return;
  }

  if (formData) {
    formData[key] = value;
  } else {
    formData = {
      [key]: value,
    };
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  } catch (err) {
    console.log(err);
    return;
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  const elements = event.currentTarget.elements;
  const info = {
    email: elements.email.value.trim(),
    message: elements.message.value.trim(),
  };

  if (info.email == 0 || info.message == 0) {
    alert(`Fill please all fields`);
    return;
  }

  console.log(info);

  localStorage.removeItem(STORAGE_KEY);

  event.currentTarget.reset();
}
