'use strict';

var WIZARDS_COUNT = 4;

var wizards = [];
var firstNamesArray = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNamesArray = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColorsArray = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColorsArray = ['black', 'red', 'blue', 'yellow', 'green'];
var userDialog = document.querySelector('.setup');
var setupSimilarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template');
var setupSimilarItemTemplate = similarWizardTemplate.content.querySelector('.setup-similar-item');

var getRandomInt = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

var getNameWizard = function () {
  var ind = getRandomInt(0, firstNamesArray.length - 1);
  return firstNamesArray[ind] + ' ' + lastNamesArray[ind];
};

var createWizards = function () {
  for (var i = 0; i < WIZARDS_COUNT; i++) {
    wizards[i] = {
      name: getNameWizard(),
      coatColor: coatColorsArray[getRandomInt(0, coatColorsArray.length - 1)],
      eyesColor: eyesColorsArray[getRandomInt(0, eyesColorsArray.length - 1)]
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

userDialog.classList.remove('hidden');
createWizards();
renderWizards();
document.querySelector('.setup-similar').classList.remove('hidden');
