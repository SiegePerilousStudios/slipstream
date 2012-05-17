/**************************************************************

					Slipstream
			Time visualisation jQuery Plugin
		(C) Alisdair Rankine, Siege Perilous Studios
	http://www.siegeperilousstudios.com/projects/slipstream/

***************************************************************/


(function($){

	function getScale(startDate, endDate,incrementType,incremenrValue){
		//set up variables for drawing the scale
		var s,e;
		if (startDate.getDate===undefined){
			start = new Date(startDate);
		} else {
			start = new Date(startDate.getTime());
		}
		if (endDate.getDate===undefined){
			end = new Date(endDate);
		} else {
			end = new Date(endDate.getTime());
		}
		var increment;
		switch (incrementType){
			case "seconds":
				increment = function(datetime){
					datetime.setSeconds(datetime.getSeconds()+incremenrValue);
				}
				break;
			case "minutes":
				increment = function(datetime){
					datetime.setMinutes(datetime.getMinutes()+incremenrValue);
				}
				break;
			default:
			case "days":
				increment = function(datetime){
					datetime.setDate(datetime.getDate()+incremenrValue);
				}
				break;
			case "months":
				increment = function(datetime){
					datetime.setMonth(datetime.getMonth()+incremenrValue);
				}
				break;
			case "years":
				increment = function(datetime){
					datetime.setFullYear(datetime.getFullYear()+incremenrValue);
				}
				break;
		}
		
		var dateToString = function(datetime){
			//YYYY-MM-DD HH:mm:SS
			return	datetime.getFullYear() +
					"-" +
					("0"+ Number(datetime.getMonth()+1).toString()).substr(-2) +
					"-" +
					("0"+ Number(datetime.getDate()).toString()).substr(-2) +
					" " +
					("0"+ Number(datetime.getHours()).toString()).substr(-2) +
					":" +
					("0"+ Number(datetime.getMinutes()).toString()).substr(-2) +
					":" +
					("0"+ Number(datetime.getSeconds()).toString()).substr(-2)
					
		}
		var endString = dateToString(end);
		var startString = dateToString(start);
		var arr={};
		while(startString != endString){
			increment(start);			
			startString = dateToString(start);
			if (arr["Y"+start.getFullYear()]===undefined){
				arr["Y"+start.getFullYear()] = {};
			}
			if (arr["Y"+start.getFullYear()]["M"+(start.getMonth()+1)]===undefined){
				arr["Y"+start.getFullYear()]["M"+(start.getMonth()+1)] = {};
			}
			if (arr["Y"+start.getFullYear()]["M"+(start.getMonth()+1)]["D"+start.getDate()]===undefined){
				arr["Y"+start.getFullYear()]["M"+(start.getMonth()+1)]["D"+start.getDate()] = [];
			}
			var time = startString.substr(-8);
			arr["Y"+start.getFullYear()]["M"+(start.getMonth()+1)]["D"+start.getDate()].push(time);
			
		}
		return arr;
	}
	
	function drawScale(timescale,pixelsPerDay){
		var html ="";
		var evenStyle="background-color:#eee;color:#999;";
		var oddStyle="background-color:#999;color:#eee;";
		var styleD=evenStyle;
		var styleM=evenStyle;
		var styleY=evenStyle;
		var oddD = true;
		var oddM = true;
		var oddY = true;
		
		
		var width= 0;
		$.each(timescale,function(y,ms){
			html += '<div style="display:inline-block;">';
			html += '<div style="'+styleY+'display:block;width:100%;text-align:center;">'+y.substring(1)+'</div>';
			$.each(ms,function(m,ds){		
				html += '<div style="display:inline-block;">';
				html += '<div style="'+styleM+'display:block;width:100%;text-align:center;">'+m.substring(1)+'</div>';
				$.each(ds,function(d,ts){
					html += '<div style="'+styleD+'display:inline-block;width:'+pixelsPerDay+'px;text-align:center;">';
					
					if(pixelsPerDay>=20){
						html += d.substring(1);
					} else {
						html += "&nbsp;";
					}
					
					html += '</div>';
					width+=pixelsPerDay;
					if (oddD){
						styleD=oddStyle;
					} else {
						styleD=evenStyle;
					}
					oddD = !oddD;
				});
				html += '</div>';
					if (oddM){
						styleM=oddStyle;
					} else {
						styleM=evenStyle;
					}
					oddM = !oddM;
			});
			html += '</div>';
					if (oddY){
						styleY=oddStyle;
					} else {
						styleY=evenStyle;
					}
					oddY = !oddY;
		});
		return {
		"html":html,
		"width":width
		};
	}



	var methods = {
		init : function( options ) { 
			var start = new Date();
			var end = new Date();
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
			if (options!==undefined && options.events !==undefined){
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
			var scale = getScale(start, end, "days", 1)
			var scaleDrawn = drawScale(scale,4)
			this.html(scaleDrawn.html);
			this.width(scaleDrawn.width+"px");
			
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
