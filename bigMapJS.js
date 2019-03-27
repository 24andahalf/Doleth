	$(window).on("load", function() {
		var draggable = Draggable.create($('.map'));
		getSize();
		var devActive = false;
		
		var POIarray = [];
		var currPos = $('.map').position();
		
		var newPOIs = 0;
		
		for (var i = 0; i < POIobjs.length; i++) {
		
		//	$('.map').append('<div class="POI" id="A'+i+'"><div class="child"></div></div>');
			
		}

		$('.map').mousemove(function(e){
			currPos = $('.map').position();
			var x = e.pageX - currPos.left;
			var y = e.pageY - currPos.top;
			$('.location').html("X: " + x.toFixed(2) + "<br> Y: " + y.toFixed(2)); 
		});
		
		$('.map').click(function(evt){
			if(evt.ctrlKey && devActive == true){
				newPOIs++;
				var newID = morphToThree(POIobjs.length);
			   	POIobjs.push({
					POIid: 		"A"+newID,		
					hoverText: 	$('#inputHoverText').val(),
					popupText: 	$('#inputPopupText').val(),
					popupHeaderImage: "robe",
					x:			evt.pageX - currPos.left - 10,
					y:			evt.pageY - currPos.top - 10
				});
					$('#inputHoverText').val("");
					$('#inputPopupText').val("");
				console.log(POIobjs.length);
				POIarray.push( new PointOfInterest(POIobjs[POIobjs.length-1].POIid, POIobjs[POIobjs.length-1].hoverText, POIobjs[POIobjs.length-1].popupText, POIobjs[POIobjs.length-1].popupHeaderImage, POIobjs[POIobjs.length-1].x, POIobjs[POIobjs.length-1].y) );
			   
			   }
			directArrows();
		});
		
		//$('.POI').hover(function(){
		$(document).on("mouseenter", ".POI", function() {
			var thisChild = $(this).children('.child');
			var currArrow = $(this).children('.arrowFrom');
			TweenMax.set(thisChild, { display: "block" });
			console.log(this.id.slice(-3));
			thisChild.first().text(POIobjs[parseInt(this.id.slice(-3))].hoverText);
			TweenMax.to(thisChild, 0.5, { opacity: 1 });
			TweenMax.to(currArrow, 0.5, { opacity: 1 });
		});
		$(document).on("mouseleave", ".POI", function() {
			var thisChild = $(this).children('.child');			
			TweenMax.to(thisChild, 0.5, { opacity: 0, onComplete: function(){
				TweenMax.set(thisChild, { display: "none" });
			} });
			var currArrow = $(this).children('.arrowFrom');
			TweenMax.to(currArrow, 0.5, { opacity: 0.5 });
		});

		//$('.POI').click(function(){
		$(document).on('click', '.POI', function() {
				$('.POI').removeClass('active').removeClass('beforeActive');
				$(this).addClass('active');
				if($(this).prev().is("div")){
				   $(this).prev().addClass('beforeActive');
				}
				/* This also needs to be reset in Nav button clicks too! */
				
				var currID = this.id;
				
				showPopUp(currID);
				navCheck(currID.slice(-3));
				

		});
		
		$('.button').click(function(){
			if(newPOIs > 0){
				for ( var i = newPOIs; i > 0; i--) { 
					console.log(POIobjs[POIobjs.length - i]);
					console.log('{');
					console.log('POIid: 				"'+POIobjs[parseInt(POIobjs.length - i)].POIid+'",');
					console.log('hoverText: 			"'+POIobjs[parseInt(POIobjs.length - i)].hoverText+'",');
					console.log('popupText: 			"'+POIobjs[parseInt(POIobjs.length - i)].popupText+'", ');
					console.log('popupHeaderImage:	"robe",');
					console.log('x:					'+POIobjs[parseInt(POIobjs.length - i)].x+',');
					console.log('y:					'+POIobjs[parseInt(POIobjs.length - i)].y+'');

					console.log('}	');
					}
			 }
		});
		
		$('.nav').click(function(){
			var currActive = $('.active').attr('id').slice(-3);
			var newActive; 
			if($(this).hasClass('Left')){
					if(currActive > 0){
						newActive = parseInt(currActive) - 1;
					   } 
			   } else {
				   if(currActive < $('.POI').length-1){
					  	newActive = parseInt(currActive) + 1;	
					  }
			   }
			var newActiveString = morphToThree(newActive);
			navCheck(newActiveString);
			$('.POI').removeClass('active');
			$('#A'+newActiveString).addClass('active');
			showPopUp($('.active').attr('id'));
		});

		function getSize() {
		var windowWidth = window.innerWidth;
		var windowHeight = window.innerHeight;
		var mapWidth = $('img').width();
		var mapHeight = $('img').height();

		var newMinX, newMinY, newMaxX, newMaxY;

			newMinX = windowWidth * .79 - mapWidth; 
			newMinY = windowHeight - mapHeight;
			newMaxX = 0
			newMaxY = 0	

			draggable[0].applyBounds({minX: newMinX, minY: newMinY, maxX: newMaxX, maxY: newMaxY} );
		}

		class PointOfInterest{
			constructor(i, h, p, hi, x, y){
				this.POIid = i;
				this.hoverText = h;
				this.popupHeaderImage = hi;
				this.popupText = p;
				
				$('.map').append('<div class="POI" id="'+i+'"><div class="child"></div><div class="arrowFrom"><img src="images/arrow.svg"></div></div>');
				$('#'+i).css({left: x, top: y });
			}

			toot(){
				console.log(this.POIid + " " + this.hoverText + " " + this.popupText);
			}
		}

		for ( var i = 0; i < POIobjs.length; i++) { 
			POIarray[i] = new PointOfInterest(POIobjs[i].POIid, POIobjs[i].hoverText, POIobjs[i].popupText, POIobjs[i].popupHeaderImage, POIobjs[i].x, POIobjs[i].y);
		}
		
		function onKonamiCode(cb) {
		  var input = '';
		  var key = '38384040373937396665';
		  document.addEventListener('keydown', function (e) {
			input += ("" + e.keyCode);
			if (input === key) {
			  return cb();
			}
			if (!key.indexOf(input)) return;
			input = ("" + e.keyCode);
		  });
		}

	onKonamiCode(function () {
		alert('Dev mode activated');
		$('.devTools').css('display', 'block');
		devActive = true;
	});
	
	function getDistanceToNext(x1, x2, y1, y2){
		var a = x1 - x2;
		var b = y1 - y2;

		var c = Math.sqrt( a*a + b*b );
		
		return c;
	}
		
	/*  To add in new code. this will open a new window and you can addin the code there to copy from
		var x = window.open('');
		x.document.write('<div>test</div>');
	*/
	function directArrows(){
		
		for ( var i = 0; i < $('.POI').length - 1; i++) { 
			var currNumString = morphToThree(i);
			
			$('#A'+currNumString).children('.arrowFrom').css('display', 'block');
			
			var currPos = $('#A'+currNumString).position();
			var nextPos = $('#A'+currNumString).next(".POI").position();
			var angleToNext = Math.atan2(nextPos.top - currPos.top, nextPos.left - currPos.left) * 180 / Math.PI;
			var distanceToNext = getDistanceToNext(currPos.left,nextPos.left,currPos.top,nextPos.top ); 
			
			var currArrow = $('#A'+currNumString).children('.arrowFrom');

			currArrow.css('width', distanceToNext - 20+'px');	
			currArrow.css('display', 'block');
			currArrow.css('transform', 'rotate('+angleToNext+'deg');
			currArrow.css('transform-origin', '-10px 7.5px');
		
		}
		var finalNum = $('.POI').length - 1;
		var finalNumString = morphToThree(finalNum);
		$('#A'+ finalNumString).children('.arrowFrom').css('display', 'none');
		
	}	
		
	function startItUp(){
		directArrows();
		$('#A000').click();
	}	
		
	setTimeout(startItUp, 10);	
		
	function showPopUp(currID){
		TweenMax.from($('.popupText'), 0.5, { opacity: 0, top: 25 });
		TweenMax.from($('.popupHeader'), 0.5, { opacity: 0, onStart: function(){
			$('.popupHeader').find('img').attr("src", "images/"+POIobjs[parseInt(currID.slice(-3))].popupHeaderImage+".svg");
			$('.nav').addClass('blocked');
		}, onComplete: function(){
			$('.nav').removeClass('blocked');
		} });
		$('.popupText').html(currID+"<br><br>"+POIobjs[parseInt(currID.slice(-3))].popupText);
		var windowWidth = window.innerWidth * .79;
		var windowHeight = window.innerHeight;
		var currPos = $('#'+currID).position();
		var currPosLeft = currPos.left * -1
		var currPosTop = currPos.top * -1
		var panToX = adjustIfOutside(currPosLeft, windowWidth, "width");
		var panToY = adjustIfOutside(currPosTop, windowHeight, "height");
		TweenMax.to($('.map'), 0.5, { x: panToX, y: panToY });
	}	
		
	function adjustIfOutside(currPos, windowMeasurement, widthOrHeight){
		console.log(currPos *-1 + " " + windowMeasurement + " " + widthOrHeight);
		console.log($('.map').width());
		if (widthOrHeight === "width"){
			if (currPos + (windowMeasurement * 1/2) >0){
				return 0;
			} else if (currPos*-1 > ($('.map').width() - windowMeasurement)) {
				return ($('.map').width() * -1) + windowMeasurement;
			} else {
				return currPos + (windowMeasurement * 1/2);	
			}		
		} else {
			if (currPos + (windowMeasurement * 1/2) >0){
				return 0;
			} else if (currPos*-1 > ($('.map').width() - windowMeasurement)) {
				return ($('.map').height() * -1) + windowMeasurement;
			} else {
				return currPos + (windowMeasurement * 1/2);	
			}	
		}
		
	};	
		
	function navCheck(newActive){
		$('.nav').removeClass('disable');
		if(newActive == 0){
		   $('.Left').addClass('disable');
		   }else if(newActive == $('.POI').length - 1){
			$('.Right').addClass('disable');
		}
	}	
		
	function morphToThree(currNum){
		var currNumString = currNum.toString();
		for (i = currNumString.length; i < 3; i++) { 
			currNumString =  + "0"+currNumString; /*+ currNumString*/;
		}
		return currNumString;
		
	}	
		
	var currArrowView = 0	
		
	$('.arrowAdjust').click(function(){
		if(currArrowView > 2){
		   currArrowView = 0;
		   }
		console.log("Arrow adjust number is currently " + currArrowView);
		var classes = [' all',' some',' none'];
		  $('.POI').each(function(){
			  for (i = 0; i < classes.length; i++) { 
			  	$(this).removeClass(classes[i]);
			  }
			  $(this).addClass(classes[currArrowView]);
		  });
		
		currArrowView++
	});	
		
		
	});