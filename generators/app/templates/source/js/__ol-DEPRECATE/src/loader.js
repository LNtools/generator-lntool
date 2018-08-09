
let loader= {
  $loader: $(".preload"),
  interval: null,
  anima: function () { 
      let canvas = document.getElementById('spinner');
      let context = canvas.getContext('2d');
      let start = new Date();
      let lines = 26,  
          cW = context.canvas.width,
          cH = context.canvas.height;

	let draw = function() {
	  	let rotation = parseInt(((new Date() - start) / 1000) * lines) / lines;
		context.save();
		context.clearRect(0, 0, cW, cH);
		context.translate(cW / 2, cH / 2);
		context.rotate(Math.PI * 2 * rotation);
		for (let i = 0; i < lines; i++) {

			context.beginPath();
			context.rotate(Math.PI * 2 / lines);
			context.moveTo(cW / 5, 0);
			context.lineTo(cW / 4, 0);
			context.lineWidth = cW / 90;
			context.strokeStyle = "rgba(51, 85, 119," + i / lines + ")";
			context.stroke();
		}
  		
  		context.restore();            
	};

	this.interval = window.setInterval(draw, 1000 / 30);
	this.show();
  
  },
  
  show: function() { this.$loader.removeClass("off").fadeIn(); },
  
  hide: function() { 
	clearInterval(this.interval);
  	this.$loader.addClass("off").fadeOut("slow"); 
  }

};

module.exports = loader;