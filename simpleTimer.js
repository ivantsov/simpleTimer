/**
* @author Alexandr Ivantsov (shpuntik74@gmail.com)
* @uri http://alex_ivantsov.ru/
*/

(function($){
	
	var date = new Date();	
	var defaults = {
		date   : date.getDate() + "/" + date.getHours() + "/" + date.getMinutes() + "/" + date.getSeconds(),
		format : 'day',
		action : function(){
			alert("Time is up!");
		}
	};

	$.fn.simpleTimer = function(params){
		
		var elem = $(this);		
		var options = $.extend({}, defaults, params);
		var event_date = options.date.split("/");
		
		var t_event = {
			days  : parseInt(event_date[0]), 	
			hours : parseInt(event_date[1]),	
			min   : parseInt(event_date[2]),	
			sec   : parseInt(event_date[3])
		};
		
		switch(options.format){
			case("day")  : elem.append("<span class='days'>0</span>:<span class='hours'>00</span>:<span class='min'>00</span>:<span class='sec'>00</span>"); break;
			case("hour") : elem.append("<span class='hours'>00</span>:<span class='min'>00</span>:<span class='sec'>00</span>"); break;
			case("min")  : elem.append("<span class='min'>00</span>:<span class='sec'>00</span>"); break;
		};
		
		var t = setInterval(timer, 1000);					
		
		function timer(){
		
			date = new Date();
									
			var now = {
				days  : date.getDate(),
				hours : date.getHours(),
				min   : date.getMinutes(),
				sec   : date.getSeconds()
			};
											
			t_event.total = t_event.days * 24 * 60 * 60 + t_event.hours * 60 * 60 + t_event.min * 60 + t_event.sec;			
			now.total =  now.days * 24 * 60 * 60 + now.hours * 60 * 60 + now.min * 60 + now.sec;			
			var diff = t_event.total - now.total;
						
			if(diff <= 0){
				clearInterval(t);
				elem.contents(".days").html("00");
				elem.contents(".hours").html("00");
				elem.contents(".min").html("00");
				elem.contents(".sec").html("00");	
				options.action();
				return false;
			};
					
			if(options.format == "day"){
				var days  = Math.floor(diff / (24 * 60 * 60));
				var hours = Math.floor((diff - days * 24 * 60 * 60) / (60 * 60));
				var min   = Math.floor((diff - days * 24 * 60 * 60 - hours * 60 * 60) / 60);
			}
			else if(options.format == "hour"){
				var hours = Math.floor(diff / (60 * 60));			
				var min   = Math.floor((diff - hours * 60 * 60) / 60);
			}
			else{
				var min = Math.floor(diff / 60);
			}			
			var sec  = diff % 60;
			if(hours < 10) hours = "0" + hours;
			if(min < 10) min = "0" + min;
			if(sec < 10) sec = "0" + sec;												
					
			elem.contents(".days").html(days);
		    elem.contents(".hours").html(hours);
			elem.contents(".min").html(min);
			elem.contents(".sec").html(sec);					
		};
		
		return this;
		
	};
								
})(jQuery);
