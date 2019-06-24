L.VelocityLayer = (L.Layer ? L.Layer : L.Class).extend({

	options: {
		displayValues: true,
		displayOptions: {
			velocityType: 'Velocity',
			position: 'bottomleft',
			emptyString: 'No velocity data'
		},
		maxVelocity: 10, // used to align color scale
		colorScale: null,
		data: null
	},

	_map: null,
	_canvasLayer: null,
	_windy: null,
	_context: null,
	_timer: 0,
	_mouseControl: null,

	initialize: function(options) {
		L.setOptions(this, options);
	},

	onAdd: function(map) {
		// create canvas, add overlay control
		this._canvasLayer = L.canvasLayer().delegate(this);
		this._canvasLayer.addTo(map);
		this._map = map;
    this._initWindy(this);
    this._startWindyShake();
	},

	onRemove: function(map) {
		this._destroyWind();
	},

	setData: function setData(windData) {
    this.options.data = windData;
    this._clearWind();
    this._startWindyShake();
	},
  reDrawLayer: function(){
    this._destroyWind();
    this.onAdd(this._map);
  },
	/*------------------------------------ PRIVATE ------------------------------------------*/
  _startWindyShake: function(overlay, params) {
    // 防止多次执行
    clearTimeout(this._shakeTimer);
    var that = this;
    this._shakeTimer = setTimeout(function(){
      that._startWindy();
    }, 800);

  },
	_startWindy: function() {
    console.log('VelocityLayer _startWindy....')
		var bounds = this._map.getBounds();
		var size = this._map.getSize();

		// bounds, width, height, extent
		this._windy.start(
			[
				[0, 0],
				[size.x, size.y]
			],
			size.x,
			size.y,
			[
				[bounds._southWest.lng, bounds._southWest.lat],
				[bounds._northEast.lng, bounds._northEast.lat]
			]);
	},

	_initWindy: function(self) {
		// windy object, copy options
		const options = Object.assign({ canvas: self._canvasLayer._canvas }, self.options);
		this._windy = new Windy(options);

		// prepare context global var, start drawing
		this._context = this._canvasLayer._canvas.getContext('2d');
		this._canvasLayer._canvas.classList.add("velocity-overlay");

    this._map.on('dragstart', self._clearWind.bind(self));
    this._map.on('dragend', self._startWindyShake.bind(self));
    this._map.on('zoomstart', self._clearWind.bind(self));
    this._map.on('zoomend', self._startWindyShake.bind(self));
		this._map.on('resize', self._clearWind);
		this._initMouseHandler();
	},

	_initMouseHandler: function() {
		if (!this._mouseControl && this.options.displayValues) {
			var options = this.options.displayOptions || {};
			options['leafletVelocity'] = this;
			this._mouseControl = L.control.velocity(options).addTo(this._map);
		}
	},

	_clearAndRestart: function(){
		if (this._context) this._context.clearRect(0, 0, 3000, 3000);
		if (this._windy) this._startWindy();
	},

	_clearWind: function() {
		if (this._windy) this._windy.stop();
		if (this._context) this._context.clearRect(0, 0, 3000, 3000);
	},

	_destroyWind: function() {
		if (this._timer) clearTimeout(this._timer);
		if (this._windy) this._windy.stop();
		if (this._context) this._context.clearRect(0, 0, 3000, 3000);
		if (this._mouseControl) this._map.removeControl(this._mouseControl);
		this._mouseControl = null;
		this._windy = null;
		this._map.removeLayer(this._canvasLayer);
	}
});

L.velocityLayer = function(options) {
	return new L.VelocityLayer(options);
};
