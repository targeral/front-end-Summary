(function(window) {
  function Animator(duration, progress, easing) {
    this.duration = duration;
    this.progress = progress;
    this.easing = easing || function(p) {return p;};
  };

  Animator.prototype = {
    start : function(finished) {
      var startTime = Date.now();
      var duration = this.duration,
          self = this;

      requestAnimationFrame(function step() {
        var p = (Date.now() - startTime) / duration;
        var next = true;

        if(p < 1.0) {
          self.progress(self.easing(p), p);
        }else{
          if(typeof finished === 'function') {
            next = finished() === false;
          }else{
            next = finished === false;
          }

          if(!next) {
            self.progress(self.easing(1.0), 1.0);
          }else {
            startTime += duration;
            self.progress(self.easing(p), p);
          }
        }

        if(next) {
          requestAnimationFrame(step);
        }
      });
    }
  };

  window.Animator = Animator;
})(window);
