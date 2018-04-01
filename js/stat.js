'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var OUTER_GAP = 30;
var FONT_HEIGHT = 16;
var BAR_WIDTH = 40;
var BAR_CHART_HEIGHT = 150;
var BAR_GAP = 50;
var barHeight = BAR_CHART_HEIGHT - GAP - FONT_HEIGHT;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';

  var maxTime = getMaxElement(times);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + OUTER_GAP, CLOUD_Y + OUTER_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + OUTER_GAP, CLOUD_Y + 2 * FONT_HEIGHT + OUTER_GAP);

  for (var i = 0; i < players.length; i++) {
    var x = CLOUD_X + OUTER_GAP + (BAR_WIDTH + BAR_GAP) * i;
    var y = CLOUD_HEIGHT - OUTER_GAP;
    var playerBarHeight = (barHeight * times[i]) / maxTime;
    var recY = y - FONT_HEIGHT - playerBarHeight;
    var blueColor = 'rgb(0, 0, ' + Math.floor(Math.random() * 256) + ')';

    ctx.fillText(players[i], x, y, BAR_WIDTH);

    if (players[i].toString() === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = blueColor;
    }

    ctx.fillRect(x, recY, BAR_WIDTH, playerBarHeight);
    ctx.fillStyle = '#000';
  }
};
