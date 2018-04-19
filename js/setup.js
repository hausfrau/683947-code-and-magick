'use strict';

var WIZARDS_COUNT = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var TABINDEX = '0';
var MIN_LENGTH = '2';
var MAX_LENGTH = '25';

var wizards = [];
var firstNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballWrapColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var userDialog = document.querySelector('.setup');
var userForm = userDialog.querySelector('.setup-wizard-form');
var setupTitle = userForm.querySelector('.setup-title');
var setupPlayer = userForm.querySelector('.setup-player');
var setupOpen = document.querySelector('.setup-open');
var setupOpenIcon = setupOpen.querySelector('.setup-open-icon');
var setupUserName = setupTitle.querySelector('.setup-user-name');
var setupWizard = setupPlayer.querySelector('.setup-wizard');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireballWrap = setupPlayer.querySelector('.setup-fireball-wrap');
var inputEyesColor = setupPlayer.querySelector('input[name=eyes-color]');
var inputFireballColor = setupFireballWrap.querySelector('input[name=fireball-color]');
var setupClose = setupTitle.querySelector('.setup-close');
var setupSimilarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template');
var setupSimilarItemTemplate = similarWizardTemplate.content.querySelector('.setup-similar-item');

var getRandomInt = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var getNameWizard = function () {
  var ind = getRandomInt(0, firstNames.length - 1);
  return firstNames[ind] + ' ' + lastNames[ind];
};

var createWizards = function () {
  for (var i = 0; i < WIZARDS_COUNT; i++) {
    wizards[i] = {
      name: getNameWizard(),
      coatColor: coatColors[getRandomInt(0, coatColors.length - 1)],

      eyesColor: eyesColors[getRandomInt(0, eyesColors.length - 1)]
    };
  }
};

var renderWizard = function (wizard) {
  var similarWizardElement = setupSimilarItemTemplate.cloneNode(true);
  similarWizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  similarWizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  similarWizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return similarWizardElement;
};

var renderWizards = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  setupSimilarListElement.appendChild(fragment);
};

var escKeyHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && !document.activeElement.classList.contains('setup-user-name')) {
    closeDialog();
  }
};

var openDialog = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', escKeyHandler);
};

setupOpen.addEventListener('click', openDialog);

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openDialog();
  }
});

var closeDialog = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', escKeyHandler);
};

setupClose.addEventListener('click', function () {
  closeDialog();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeDialog();
  }
});

var colorizeElement = function (element, colors, parentElement, hiddenElement) {
  element.addEventListener('click', function () {
    var color = colors[getRandomInt(0, colors.length - 1)];
    if (parentElement.tagName === 'DIV') {
      parentElement.style.backgroundColor = color;
    } else {
      parentElement.style.fill = color;
    }
    hiddenElement.value = color;
  });
};

colorizeElement(wizardEyes, eyesColors, wizardEyes, inputEyesColor);

colorizeElement(setupFireballWrap, fireballWrapColors, setupFireballWrap, inputFireballColor);

var init = function () {
  setupOpenIcon.tabIndex = TABINDEX;
  setupClose.tabIndex = TABINDEX;
  setupUserName.minLength = MIN_LENGTH;
  setupUserName.maxLength = MAX_LENGTH;
  createWizards();
  renderWizards();
  document.querySelector('.setup-similar').classList.remove('hidden');
};

init();
