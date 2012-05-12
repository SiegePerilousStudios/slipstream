/**************************************************************

					Slipstream
			Time visualisation jQuery Plugin
		(C) Alisdair Rankine, Siege Perilous Studios
	http://www.siegeperilousstudios.com/projects/slipstream/

***************************************************************/


(function($){

	function drawScale(startDate, endDate){
		//set up variables for drawing the scale
		var s,e;
		if (startDate.getTime===undefined){
			start = new Date(startDate);
		} else {
			start = new Date(startDate.getTime());
		}
		if (endDate.getTime===undefined){
			end = new Date(endDate);
		} else {
			end = new Date(endDate.getTime());
		}
	
	}



	var methods = {
		init : function( options ) { 
			var start = new Date();
			start.setMonth(start.getMonth()-1);
			if (options!==undefined){
				if (options.start !== undefined){
					start = new Date(options.start);
					if (options.end !==undefined){
						end = new Date(options.end);
					}
				}
			}
			if (end <= start){
				end = new Date(start.getTime());
				end.setMonth(end.getMonth()+2)
				$.error('End date less than or equal to start date. I changed it to 2 months after the start.');
			}
			var events = [];
			if (options.events !==undefined){
				if (options.events.push!==undefined){
					events = options.events;
				} else {
					events.push(options.events);
				}
			}
			this.data("events",events)
				.data("start",start)
				.data("end",end);
				
			//draw with start, end, events, (and scale)
			
			
			
			
			return this;
		}
	};

	$.fn.slipstream = function( method ) {
    
		// Method calling logic
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'I\' don\' understand what you mean by \'' +  method + '\'. - slipstream' );
		}    
	};


})(jQuery)
