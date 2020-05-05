
// calculate distance between two places
		// extended from https://www.geodatasource.com/developers/javascript
function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") {
			if  (dist>(5/1.609344)){dist = Math.round(dist * 1.609344)}
			else{dist = Math.round(dist * 1.609344*10)/10}
		  }
		if (unit=="N") { dist =  Math.round(dist * 0.8684) }
		return dist;
	}
};

// necessary to determine the exact positioning dependent on the text length
function getWidthOfText(txt, fontname, fontsize){
    if(getWidthOfText.c === undefined){
        getWidthOfText.c=document.createElement('canvas');
        getWidthOfText.ctx=getWidthOfText.c.getContext('2d');
    }
    getWidthOfText.ctx.font = fontsize + ' ' + fontname;
    return getWidthOfText.ctx.measureText(txt).width;
}

// corrects the font size depend on distance or amount (if this mode is active)
function fontCorrection(distance){
		if (mapSettings[0].fontCorrection==true){
			if (mapSettings[0].mode == "distance"){
			if (distance>10000){return 0.6}else{
				if (distance>1000){return 0.7}else{
					if (distance>100){return 0.8}	else{
						if (distance>10){return 0.9}	else{
					return 1}}}}
				}
			if (mapSettings[0].mode == "amount"){
				if (distance>10000){return 1.60}else{
					if (distance>1000){return 1.45}else{
						if (distance>100){return 1.30}	else{
							if (distance>10){return 1.15}	else{
						return 1}}}}
		}
	}
		else {return 1}
}

//calculates the end points given the angle is known
		// template ::: https://jsfiddle.net/pmusx2wp/2/ :::
function vectorOfPoints(lat1, lon1, lat2, lon2,displayed_text,displayed_distance,manipulation=0,
  fontLocation="Helvetica", fontSizeLocation=25, fontDistance="Helvetica", fontSizeDistance=25, displayed_amount) {
  var start = 500;
  var length = 490;
  var length_of_text = Math.round(getWidthOfText(displayed_text,fontLocation, fontSizeLocation*fontCorrection(displayed_distance)+"px"))
	if (mapSettings[0].mode=="distance"){
		var length_of_textDist = Math.round(getWidthOfText(displayed_distance+" km",fontDistance,fontSizeDistance*fontCorrection(displayed_distance)+"px"	))
	  }
	if (mapSettings[0].mode=="amount"){
		var length_of_textDist = Math.round(getWidthOfText(displayed_amount +" €",fontDistance,fontSizeDistance*fontCorrection(displayed_distance)+"px"	))
	  }

// Calculate the distance between two coordinates   https://planetcalc.com/713/

			var Calculate712_result = {};

			var la1 = lat1 //default: 28.1272222222
			var lo1 =  lon1 //default: -15.4313888889
			var la2 = lat2 //default: 13.0961111111
			var lo2 = lon2 //default: -59.6083333333
			var ellipseType =  "wgs84"
			var angleL = {
					"SetValue": function(v) {
							Calculate712_result["angleL"] = v;
					}
			};
			var distanceM = {
					"SetValue": function(v) {
							Calculate712_result["distanceM"] = v;
					}
			};
			var distanceNMI = {
					"SetValue": function(v) {
							Calculate712_result["distanceNMI"] = v;
					}
			};
			function rad(a) {
					return Math.PI * a / 180;
			}
			function grad(a) {
					return 180 * a / Math.PI;
			}

			function meridionalD(a) {
					return Math.tan(rad(45 + a / 2));
			}

			function geoidD(a, e) {
					return Math.pow((1 - e * Math.sin(rad(a))) / (1 + e * Math.sin(rad(a))), e / 2);
			}
			function abs(a) {
					return a < 0 ? -a : a;
			}
			function calcDestination(e, la1, lo1, la2, lo2) {
					var lD = lo2 - lo1;
					if (abs(lD) > 180)
							lD = lD < 0 ? 360 + lD : -360 + lD;

					var rRes = Math.atan2(rad(lD), (Math.log(meridionalD(la2) * geoidD(la2, e)) - Math.log(meridionalD(la1) * geoidD(la1, e))));
					var arcLen = (la2 - la1) ? ((1 - e * e / 4) * rad(la2 - la1) - (3 / 8) * e * e * (Math.sin(2 * rad(la2)) - Math.sin(2 * rad(la1)))) / Math.cos(rRes) : (lo2 - lo1) ? Math.cos(rad(la1)) * Math.abs(rad(lo2 - lo1)) : 0;
					return {
							"arc": arcLen,
							"rhumb": rRes
					};
			}

			var ellipsoids = {
					"wgs84": {
							"min": 6356752.314,
							"max": 6378137
					},
					"sk42": {
							"min": 6356863,
							"max": 6378245
					},
					"sphere": {
							"min": 6378137,
							"max": 6378137
					}
			};
			if (ellipseType === undefined)
					ellipseType = "wgs84";
			var geoid = ellipsoids[ellipseType];
			var a2 = geoid.max * geoid.max;
			var b2 = geoid.min * geoid.min;
			var e = Math.sqrt((a2 - b2) / a2);
			var res1 = calcDestination(e, la1, lo1, la2, lo2, geoid.max);
			var res2 = calcDestination(e, la1, lo1, la2, lo2 + 360, geoid.max);
			var res = (res2.arc < res1.arc) ? res2 : res1;
			var aRes = grad(res.rhumb);
			if (aRes < 0) {
					aRes = 360 + aRes
			}
			;angleL.SetValue(aRes);
			var len = geoid.max * res.arc;

			angle =  aRes-90

// continue

  var text_angle = angle;
  if (angle > 90 & angle < 180) {text_angle = angle + 180} //transform in a way to be readible as a poster e.g. not turned around
  if (angle > 180 & angle < 270) {text_angle = angle - 180}

  var start_x = start + 0.95* length * Math.cos(angle * Math.PI / 180);
  var start_y = start + 0.95* length * Math.sin(angle * Math.PI / 180);

  var end_x = start + length * Math.cos(angle * Math.PI / 180);
  var end_y = start + length * Math.sin(angle * Math.PI / 180);

  var text_x = end_x - (25+10+length_of_textDist+length_of_text/2)*Math.cos(angle * Math.PI / 180)
  var text_y = end_y - (25+10+length_of_textDist+length_of_text/2)*Math.sin(angle * Math.PI / 180)

  var textDist_x = end_x - (25+5+length_of_textDist/2)*Math.cos(angle * Math.PI / 180)
  var textDist_y = end_y - (25+5+length_of_textDist/2)*Math.sin(angle * Math.PI / 180)

  if (manipulation!=0) { // calculates a new text positioning, while the line is kept correct (start_x,end_x

    var start_x2 = start + 0.95* length * Math.cos((angle+manipulation) * Math.PI / 180);
    var start_y2 = start + 0.95* length * Math.sin((angle+manipulation) * Math.PI / 180);

    var end_x2 = start + length * Math.cos((angle+manipulation) * Math.PI / 180);
    var end_y2 = start + length * Math.sin((angle+manipulation) * Math.PI / 180);

    var text_x = end_x2 - (25+10+length_of_textDist+length_of_text/2)*Math.cos((angle+manipulation) * Math.PI / 180)
    var text_y = end_y2 - (25+10+length_of_textDist+length_of_text/2)*Math.sin((angle+manipulation) * Math.PI / 180)

    var textDist_x = end_x2 - (25+5+length_of_textDist/2)*Math.cos((angle+manipulation) * Math.PI / 180)
    var textDist_y = end_y2 - (25+5+length_of_textDist/2)*Math.sin((angle+manipulation) * Math.PI / 180)
	//	console.log("Start_x2 is" + start_x2 + "for " + displayed_text)
	//	console.log("Start_y2 is" + start_y2 + "for " + displayed_text)
    text_angle = text_angle +manipulation

  }

  var pointsInPlot = {
    start_x:start_x,start_y:start_y,end_x:end_x,end_y:end_y,
    text_x:text_x,text_y:text_y,text_angle:text_angle,
    textDist_x:textDist_x,textDist_y:textDist_y,
    length_of_text:length_of_text,length_of_textDist:length_of_textDist,angle:angle,
		start_x_corr:start_x2, start_y_corr:start_y2
  }
  return pointsInPlot
}

// add parameters to friendlocation
function AddParametersFriendLocation(){
	var i =0
	for (i = 0; i < friendLocation.length; i++) {
			friendLocation[i].dist = distance(homeLocation[0].lat,homeLocation[0].lon,friendLocation[i].lat,friendLocation[i].lon, "K");
		friendLocation[i].data = vectorOfPoints(homeLocation[0].lat,homeLocation[0].lon,friendLocation[i].lat,friendLocation[i].lon,friendLocation[i].location,friendLocation[i].dist, manipulation=0,
			fontLocation=mapSettings[0].fontLocation, fontSizeLocationn=mapSettings[0].fontSizeLocation, fontDistancen=mapSettings[0].fontDistance,fontSizeDistance=mapSettings[0].fontSizeDistance,friendLocation[i].spendings );
	}
}

// correction of not-so-nice visualization (locations with the same direction)

function correctCloseLocations(){

	var min_correction_dist = 5 // if helvetica == 20, a correction of 3 seems enough

	var correction = [0]
	for (i = 0; i < friendLocation.length; i++) {
	correction[i]=friendLocation[i].data.angle
	}

	function checkSimilar(value) {
	    return value == x;
	}

	function compute_correction_diff(correction){
	  var correction_diff =  []
	  var correction_diff_abs = []
	    for (i = 0; i < correction.length; i++) {
	        correction_diff_one = []
	        correction_diff_one_abs = []
	        for (j = 0; j < correction.length; j++) {
	            if (i == j){
	            correction_diff_one.push(1000)  //set to a high value
	            correction_diff_one_abs.push(1000)
	            }else{
							if ((Math.abs(correction[i]-correction[j])) <(360-min_correction_dist) ){
									if (correction[i]>350) {correction[i]=(correction[i]-360)}
									if (correction[j]>350) {correction[j]=(correction[j]-360)}
							}
								 correction_diff_one.push(correction[i]-correction[j])
								 correction_diff_one_abs.push(Math.abs(correction[i]-correction[j]))
	            }
	          }
	        x =  Math.min(...correction_diff_one_abs)

	        abs_index= correction_diff_one_abs.findIndex(checkSimilar )
	        correction_diff_abs[i] =x
	        correction_diff[i] = correction_diff_one[abs_index]
	    }

	    var corr=[]
	    corr[0]=correction_diff_abs
	    corr[1]=correction_diff
	    return corr
	}

	var k;
	for (k = 0; k < 100; k++) {

	  var corr = compute_correction_diff(correction)

	  x =  Math.min(...corr[0])
	  abs_index= corr[0].findIndex(checkSimilar )


	  if (x > min_correction_dist) {
	    break;
	  }

	  if (corr[1][abs_index]<0){
	  correction[abs_index] = correction[abs_index] - 0.2
	  //  console.log("Value has been reduced by 0.2 for " + friendLocation[abs_index].location)
	  }else{
	  correction[abs_index] = correction[abs_index] + 0.2
	  //  console.log("Value has been increased by 0.2 for " + friendLocation[abs_index].location)
	  }

	  //to find the second pendant set the abs_index to +1
	  corr[0][abs_index] =   corr[0][abs_index] + 0.2

	  abs_index= corr[0].findIndex(checkSimilar ) //find second example

	  if (corr[1][abs_index]<0){
	  correction[abs_index] = correction[abs_index] - 0.2
	//  console.log("Value has been reduced by 0.2 for " + friendLocation[abs_index].location)
	  }else{
	  correction[abs_index] = correction[abs_index] + 0.2
//	  console.log("Value has been increased by 0.2 for " + friendLocation[abs_index].location)
	  }

	}

	var i =0
	for (i = 0; i < friendLocation.length; i++) {
		text_corrector = -friendLocation[i].data.angle+correction[i]
		friendLocation[i].data = vectorOfPoints(homeLocation[0].lat,homeLocation[0].lon,friendLocation[i].lat,friendLocation[i].lon,friendLocation[i].location,friendLocation[i].dist, manipulation=text_corrector,
			fontLocation=mapSettings[0].fontLocation, fontSizeLocationn=mapSettings[0].fontSizeLocation, fontDistancen=mapSettings[0].fontDistance,fontSizeDistance=mapSettings[0].fontSizeDistance,friendLocation[i].spendings);
	}
}

// parameter calculation and correction

function calculateMapParameter(){

	AddParametersFriendLocation()

	correctCloseLocations()

}









//// failed trials - Calculation of the direction

// 	// calculate the angle shown in the plot (option 1 = wrong)
//   var angle =  Math.atan2(lon2 - lon1, lat2 - lat1) * 180 / Math.PI // seems a bug
//   if (angle > 360) {angle = angle-360}
// 	console.log("option 1 " + angle + " " +  displayed_text)
//
// 	var angle =  Math.atan2(lat2 - lat1, lon2 - lon1) * 180 / Math.PI // seems a bug
//   if (angle > 360) {angle = angle-360}
// 	console.log("option 1X " + angle + " " +  displayed_text)
//
//  // atlernative: https://stackoverflow.com/questions/3932502/calculate-angle-between-two-latitude-longitude-points
// 	function angleFromCoordinate(lat1,lon1,lat2,lon2) { // returns the same angle as above!
//     var p1 = {
//         x: lat1,
//         y: lon1
//     };
//
//     var p2 = {
//         x: lat2,
//         y: lon2
//     };
//     // angle in radians
//     var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);
//     // angle in degrees
//     var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
//
//     return angleDeg;
// }
//
// //console.log("option 1a " + angleFromCoordinate(lat1,lon1,lat2,lon2) + " " +  displayed_text)
//  //angleFromCoordinate(37.330604,-122.028947,37.3322109,-122.0329665);
//
// // option 2: try to calculate bearings  https://stackoverflow.com/questions/46590154/calculate-bearing-between-2-points-with-javascript
// // Converts from degrees to radians.
// function toRadians(degrees) {
//   return degrees * Math.PI / 180;
// };
//
// // Converts from radians to degrees.
// function toDegrees(radians) {
//   return radians * 180 / Math.PI;
// }
//
//
// function bearing(startLat, startLng, destLat, destLng){
// 	startLat = toRadians(startLat);
//   startLng = toRadians(startLng);
//   destLat = toRadians(destLat);
//   destLng = toRadians(destLng);
//
//   y = Math.sin(destLng - startLng) * Math.cos(destLat);
//   x = Math.cos(startLat) * Math.sin(destLat) -
//         Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
//   brng = Math.atan2(y, x);
//   brng = toDegrees(brng);
//  return (brng + 360) % 360 -90;  // Calculating - 90 because the circle starts the angle at 90 degree position of the bearing point circle
//
// }
//
// 	angle = bearing(lat1, lon1, lat2, lon2)
// 	console.log("option2 " + angle + " " +  displayed_text)






////- correction of text - approach 1 (element 0 first then element 1)

            // function createArray(length) {
            //     var arr = new Array(length || 0),
            //         i = length;
            //
            //     if (arguments.length > 1) {
            //         var args = Array.prototype.slice.call(arguments, 1);
            //         while(i--) arr[length-1 - i] = createArray.apply(this, args);
            //     }
            //
            //     return arr;
            // }

            // var correction_diff = [0]
            // var correction_diff_index = [0]
            // var correction_diff_elements = []
            // //  for (i = 0; i < friendLocation.length; i++) {
            //   i = 0
            //       for (j = 0; j < friendLocation.length; j++) {
            //           correction_diff[j]=correction[i]-correction[j]
            //
            //           if  (Math.abs(correction_diff[j])>min_correction_dist) {
            //             correction_diff_index[j]=null;
            //           } else {
            //             correction_diff_index[j]=j};
            //
            //         if (  correction_diff_index[j]==null){}else{correction_diff_elements.push(correction_diff[j])}
            //
            //         }
            //
            // total_correction_tobe = correction_diff_elements.length*min_correction_dist
            // total_correction_is = Math.max(... correction_diff_elements) - Math.min(... correction_diff_elements)
            //
            // var total_correction = total_correction_tobe - total_correction_is

            //var x = correction_diff_elements.reduce((a,b) => a + b, 0)  //sum

            //total_correction_tobe = correction_diff_elements.length*min_correction_dist
            //total_correction_is = Math.max(... correction_diff_elements) - Math.min(... correction_diff_elements)

            //var total_correction = total_correction_tobe - total_correction_is




////  approach 2 (find weakest point, grudually correct ...)
// taken into production

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                         :::
//:::  This routine calculates the distance between two points (given the     :::
//:::  latitude/longitude of those points). It is being used to calculate     :::
//:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
//:::                                                                         :::
//:::  Definitions:                                                           :::
//:::    South latitudes are negative, east longitudes are positive           :::
//:::                                                                         :::
//:::  Passed to function:                                                    :::
//:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
//:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
//:::    unit = the unit you desire for results                               :::
//:::           where: 'M' is statute miles (default)                         :::
//:::                  'K' is kilometers                                      :::
//:::                  'N' is nautical miles                                  :::
//:::                                                                         :::
//:::  Worldwide cities and other features databases with latitude longitude  :::
//:::  are available at https://www.geodatasource.com                         :::
//:::                                                                         :::
//:::  For enquiries, please contact sales@geodatasource.com                  :::
//:::                                                                         :::
//:::  Official Web site: https://www.geodatasource.com                       :::
//:::                                                                         :::
//:::               GeoDataSource.com (C) All Rights Reserved 2018            :::
//:::                                                                         :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
