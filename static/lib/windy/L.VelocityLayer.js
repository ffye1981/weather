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
		bounds: null
	},

	_map: null,
	_canvasLayer: null,
	_windy: null,
	_context: null,
	_mouseControl: null,
	_windData: null,

	initialize: function(options) {
	    console.log('initialize....')
		L.setOptions(this, options);
	},

	onAdd: function(map) {
	    console.log('onAdd....')
		// create canvas, add overlay control
		this._canvasLayer = L.canvasLayer().delegate(this);
		this._canvasLayer.addTo(map);
		this._map = map;
	},

	onRemove: function(map) {
	    console.log('onRemove....')
		this._destroyWind();
	},

	setData: function setData(windData) {
        this._startWindy();
	},

	/*------------------------------------ PRIVATE ------------------------------------------*/
	onDrawLayer: function(overlay, params) {
	    console.log('onDrawLayer....')
		var self = this;
		if (!this._windy) {
			this._initWindy(this);
		}
		if (!this.options.data) {
			return;
		}
		this._startWindy();
	},
    reDrawLayer: function(){
        this._destroyWind();
        this.onAdd(this._map);
        this._initWindy(this);
    },
	_startWindy: function() {
		var bounds = this._getBounds();
		var _min = [bounds._southWest.lat, bounds._southWest.lng];
        var _max = [bounds._northEast.lat, bounds._northEast.lng];
        var min = this._map.latLngToContainerPoint(_min);
        var max = this._map.latLngToContainerPoint(_max);
        var extent = [
            [min.x, max.y],
            [max.x, min.y]
        ];
        this._invertData();
        this._windy.start(extent, this._windData);
	},

	_initWindy: function(self) {
		// windy object, copy options
		const options = Object.assign({ canvas: self._canvasLayer._canvas }, self.options);
		this._windy = new Windy(options);

		// prepare context global var, start drawing
		this._context = this._canvasLayer._canvas.getContext('2d');
		this._canvasLayer._canvas.classList.add("velocity-overlay");
		//this.onDrawLayer();

		this._map.on('dragstart', self._windy.stop);
		this._map.on('dragend', self._clearAndRestart);
		this._map.on('zoomstart', self._windy.stop);
		this._map.on('zoomend', self._clearAndRestart);
		this._map.on('resize', self._clearWind);
        this._map.on('resize', self._clearAndRestart);
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
		if (this._windy) this._windy.stop();
		if (this._context) this._context.clearRect(0, 0, 3000, 3000);
		if (this._mouseControl) this._map.removeControl(this._mouseControl);
		this._mouseControl = null;
		this._windy = null;
		this._map.removeLayer(this._canvasLayer);
	},
	_invertData: function setData() {
        this._windData = [];
        if(this.options.data) {
            var that = this;
            this.options.data.forEach(function (wd) {
                var px = that._map.latLngToContainerPoint([wd[0], wd[1]]);
                var x = px.x;
                var y = px.y;
                var angle = wd[2];
                var speed = wd[3];
                that._windData.push({
                    x,y,angle,speed
                });
            });
        }
    },
    _getBounds: function() {
        return this.options.bounds || this._map.getBounds();
    }
});

L.velocityLayer = function(options) {
	return new L.VelocityLayer(options);
};