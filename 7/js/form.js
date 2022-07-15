
const makeFormInactive = (form) => {
  form.classList.add('ad-form--disabled');
  form.querySelectorAll('fieldset').forEach((element) => {
    element.setAttribute('disabled', true);
  });
};

makeFormInactive(document.querySelector('.ad-form'));
makeFormInactive(document.querySelector('.map__filters'));

