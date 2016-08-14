const EventEmitter = require('events');

class QueueEmitter extends EventEmitter {
  get command() {
    return "queueMsg";
  }
  emit(msg) {
    super.emit(this.command, msg);
  }
  on(callback) {
    super.on(this.command, callback);
  }
  removeListener(callback) {
    super.removeListener(this.command, callback);
  }
}

exports.getBlEmitter = () => {
  return new QueueEmitter();
}
