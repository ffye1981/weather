L.Control.Velocity = L.Control.extend({

    options: {
        position: 'bottomleft',
        emptyString: 'Unavailable',
        // Could be any combination of 'bearing' (angle toward which the flow goes) or 'meteo' (angle from which the flow comes)
        // and 'CW' (angle value increases clock-wise) or 'CCW' (angle value increases counter clock-wise)
        angleConvention: 'bearingCCW',
	    // Could be 'm/s' for meter per second, 'k/h' for kilometer per hour or 'kt' for knots
	    speedUnit: 'm/s',
        onAdd: null,
        onRemove: null
    },

    onAdd: function (map) {
        this._container = L.DomUtil.create('div', 'leaflet-control-velocity');
        L.DomEvent.disableClickPropagation(this._container);
        map.on('mousemove', this._onMouseMove, this);
        this._container.innerHTML = this.options.emptyString;
        if (this.options.leafletVelocity.options.onAdd) this.options.leafletVelocity.options.onAdd();
        return this._container;
    },

    onRemove: function (map) {
        map.off('mousemove', this._onMouseMove, this);
	    if (this.options.leafletVelocity.options.onRemove) this.options.leafletVelocity.options.onRemove();
    },

    vectorToSpeed: function(uMs, vMs, unit){
        var velocityAbs = Math.sqrt( Math.pow(uMs, 2) + Math.pow(vMs, 2) );
        // Default is m/s
        if (unit === 'k/h') {
            return this.meterSec2kilometerHour(velocityAbs);
        } else if (unit === 'kt') {
            return this.meterSec2Knots(velocityAbs);
        } else {
            return velocityAbs;
        }
    },

    vectorToDegrees: function(uMs, vMs, angleConvention){

	    // Default angle convention is CW
	    if (angleConvention.endsWith('CCW')) {
		    // vMs comes out upside-down..
		    vMs = vMs > 0 ? vMs = -vMs : Math.abs(vMs);
	    }
	    var velocityAbs = Math.sqrt(Math.pow(uMs, 2) + Math.pow(vMs, 2));

	    var velocityDir = Math.atan2(uMs / velocityAbs, vMs / velocityAbs);
	    var velocityDirToDegrees = velocityDir * 180 / Math.PI + 180;

	    if (angleConvention === 'bearingCW' || angleConvention === 'meteoCCW') {
		    velocityDirToDegrees += 180;
		    if (velocityDirToDegrees >= 360) velocityDirToDegrees -= 360;
	    }

	    return velocityDirToDegrees;
    },

	meterSec2Knots: function(meters) {
		return meters / 0.514
	},

	meterSec2kilometerHour: function(meters) {
		return meters * 3.6
	},

    _onMouseMove: function (e) {

        var self = this;
	    //var pos = this.options.leafletVelocity._map.containerPointToLatLng(L.point(e.containerPoint.x, e.containerPoint.y));
	    var gridValue = this.options.leafletVelocity._windy.interpolatePoint(e.containerPoint.x, e.containerPoint.y);
	    console.log(gridValue);
	    var htmlOut = "";

	    if(gridValue && !isNaN(gridValue.angle) && !isNaN(gridValue.speed)) {
		    htmlOut = "<strong>"+ this.options.velocityType +" Direction: </strong>"+
			    gridValue.angle +"°"+
			    ", <strong> Speed: </strong>"+ gridValue.speed + this.options.speedUnit;
	    }
	    else {
		    htmlOut = this.options.emptyString;
	    }

	    self._container.innerHTML = htmlOut;
    }

});

L.Map.mergeOptions({
    positionControl: false
});

L.Map.addInitHook(function () {
    if (this.options.positionControl) {
        this.positionControl = new L.Control.MousePosition();
        this.addControl(this.positionControl);
    }
});

L.control.velocity = function (options) {
    return new L.Control.Velocity(options);
};
