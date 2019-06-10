/**
 * @author lzugis
 * @Date
 * 1.计算矩形4个角的canvas坐标x、y，初始化该区域所有网格点，间距可根据map index设置
 * 2.将已有的站点经纬度转换为canvas坐标
 * 3.插值法计算出每个网格点的风向、风速
 * 4.在该网格区域随机生成width*8个点，重复运动
 */

var Windy = function (options) {
  var MAX_PARTICLE_AGE = options.particleAge || 100; //粒子最大运动次数
  var FRAME_RATE = options.particleMultiplier || 20; //重绘帧数
  var PARTICLE_MULTIPLIER = options.frameRate || 8;
  var PARTICLE_LINE_WIDTH = options.lineWidth || 1;   //线宽
  var PARTICLE_LINE_STYLE = options.lineStyle || 'rgba(255,255,255,0.8)';   //线样式

  var canvas = options.canvas;
  var width = canvas.width;
  var height = canvas.height;
  var ctx = canvas.getContext('2d');
  ctx.lineWidth = PARTICLE_LINE_WIDTH;
  ctx.strokeStyle = PARTICLE_LINE_STYLE;
  ctx.globalCompositeOperation = "destination-in";
  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = 0.9;

  var buildBounds = function (extent, callback) {
    var upperLeft = extent[0];
    var lowerRight = extent[1];
    var bounds = {
      x: upperLeft[0],
      y: upperLeft[1],
      xmax: lowerRight[0],
      ymax: lowerRight[1],
      width: lowerRight[0] - upperLeft[0],
      height: lowerRight[1] - upperLeft[1]
    };
    callback(bounds);
  }

  var createField = function (columns, bounds, callback) {
    function vector(x, y) {
      var column = columns[Math.floor(x)];
      return column && column[Math.floor(y)];
    }

    vector.release = function () {
      columns = [];
    }

    vector.randomize = function (o) {
      var x = Math.floor(Math.floor(Math.random() * bounds.width) + bounds.x);
      var y = Math.floor(Math.floor(Math.random() * bounds.height) + bounds.y);
      o.x = x;
      o.y = y;
      return o;
    }
    callback(bounds, vector);
  };

  var interpolateGrid = function (bounds, dataPoints, callback) {
    var columns = [];
    var x = bounds.x;

    function interpolateColumn(x) {
      var column = [];
      for (var y = bounds.y; y < bounds.ymax; y += 2) {
        var wind = interpolate(x, y);
        column[y + 1] = column[y] = wind;
      }
      columns[x + 1] = columns[x] = column;
    }

    function interpolate(x, y) {
      var angle0 = 0,
        angle1 = 0,
        speed0 = 0,
        speed1 = 0,
        wind = {};

      dataPoints.forEach(function (dp) {
        angle0 += dp.angle * 1.0 / ((y - dp.y) * (y - dp.y) + (x - dp.x) * (x - dp.x));
        angle1 += 1.0 / ((y - dp.y) * (y - dp.y) + (x - dp.x) * (x - dp.x));

        speed0 += dp.speed * 1.0 / ((y - dp.y) * (y - dp.y) + (x - dp.x) * (x - dp.x));
        speed1 += 1.0 / ((y - dp.y) * (y - dp.y) + (x - dp.x) * (x - dp.x));

        if (angle1 != 0) {
          wind.angle = angle0 / angle1;
        }
        if (speed1 != 0) {
          wind.speed = speed0 / speed1;
        }
      });
      return wind;
    }

    (function batchInterpolate() {
      var start = Date.now();
      while (x < bounds.xmax) {
        interpolateColumn(x);
        x += 2;
        if ((Date.now() - start) > 1000) { //MAX_TASK_TIME
          setTimeout(batchInterpolate, 25);
          return;
        }
      }
      createField(columns, bounds, callback);
    })();
  };

  var animate = function (bounds, vector) {
    var particleCount = Math.round(bounds.width * PARTICLE_MULTIPLIER);
    var particles = [];
    for (var i = 0; i < particleCount; i++) {
      particles.push(vector.randomize({
        age: Math.floor(Math.random() * MAX_PARTICLE_AGE)
      }));
    }

    function evolve() {
      particles.forEach(function (particle, i) {
        if (particle.age > MAX_PARTICLE_AGE) {
          particle = vector.randomize({
            age: 0
          });
          particles.splice(i, 1, particle);
        }
        var x = particle.x;
        var y = particle.y;
        var v = vector(x, y);
        if (v) {
          var xe = x - v.speed * Math.sin(Math.PI / 180 * (180 - v.angle));
          var ye = y - v.speed * Math.cos(Math.PI / 180 * (180 - v.angle));
          var nextPoint = vector(xe, ye);
          if (nextPoint) {
            particle.xe = xe;
            particle.ye = ye;
          } else {
            var newParticle = vector.randomize({
              age: Math.floor(Math.random() * MAX_PARTICLE_AGE)
            });
            particles.splice(i, 1, newParticle);
          }
        } else {
          particle.age = MAX_PARTICLE_AGE;
        }
        particle.age += 1;
      });
    }

    function render() {
      var prev = ctx.globalCompositeOperation;
      ctx.globalCompositeOperation = "destination-in";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = prev;

      ctx.beginPath();
      particles.forEach(function (particle, i) {
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(particle.xe, particle.ye);
        particle.x = particle.xe;
        particle.y = particle.ye;
      });
      ctx.stroke();
    }

    (function frame() {
      try {
        windy.timer = setTimeout(function () {
          requestAnimationFrame(frame);
          evolve();
          render();
        }, 1000 / FRAME_RATE);
      } catch (e) {
        console.error(e);
      }
    })();
  };

  var start = function (extent, dataPoints) {
    stop();
    buildBounds(extent, function (bounds) {
      interpolateGrid(bounds, dataPoints, function (bounds, vector) {
        windy.vector = vector;
        animate(bounds, vector);
      });
    });
  };

  var stop = function () {
    ctx.clearRect(0, 0, width, height);
    if (windy.vector) windy.vector.release();
    if (windy.timer) clearTimeout(windy.timer);
  };

  var setData = function(pointData) {
    start(pointData);
  }

  var interpolatePoint = function(x,y) {
    if (windy.vector) {
        return windy.vector(x,y);
    }else {
        return {};
    }
  };
  var windy = {
    options: options,
    start: start,
    stop: stop,
    setData: setData,
    interpolatePoint: interpolatePoint
  };

  return windy;
};

window.requestAnimationFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 20);
    };
})();
