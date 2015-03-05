var EventEmitter = require('base_event_emitter')


EventEmitter.prototype.emitChange = function() {
    this.emit('change');
};

EventEmitter.prototype.addChangeListener = function(callback) {
    this.on('change', callback);
},

// Remove change listener
EventEmitter.prototype.removeChangeListener = function(callback) {
  this.removeListener('change', callback);
}


module.exports = EventEmitter
