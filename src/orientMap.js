
function DrawOrientMap(update=false, fill=mapSettings[0].color){

//define the SVG space

var orient = d3.select("#drawMap") // select the 'body' element
      .append("svg")           // append an SVG element to the body
      .attr("width", 1000)      // make the SVG element X pixels wide
      .attr("height", 1000)     // make the SVG element X pixels high
      .attr("class", "graph-svg-component");   // for defining the bg color

// draw a circle
orient.append("circle")        // attach a circle
    .style("fill", fill)
    .attr("cx", 500)           // position the x-center
    .attr("cy", 500)           // position the y-center
    .attr("r", 500)            // set the radius
    .attr("class", "outer-circle");

//draw an inner circle
    orient.append("circle")        // attach a circle
        .style("fill", "white")
        .attr("cx", 500)           // position the x-center
        .attr("cy", 500)           // position the y-center
        .attr("r", 200);            // set the radius

// text in the middle

orient.append("text")
        .style("fill", "darkgrey")
       .attr("font-size", mapSettings[0].fontSizeHome+"px")   // previously: 100px
        .attr("font-family",mapSettings[0].fontHome)
        .attr("y", 510)
       .attr("x", 500)
       .attr('text-anchor', 'middle')
       .attr('alignment-baseline', 'middle')
       .attr("class", "middle_text")//easy to style with CSS
       .text(homeLocation[0].location);

// draw text and line per element

  //var i = 0 // testing
var i;
for (i = 0; i < friendLocation.length; i++) {

//
  if (friendLocation[i].data.start_x_corr == null){

    orient.append("line")          // attach a line
      .style("stroke", "white")  // colour the line
      .style("stroke-width", 3)
      .attr("x1", friendLocation[i].data.start_x)     // x position of the first end of the line
      .attr("y1", friendLocation[i].data.start_y)      // y position of the first end of the line
      .attr("x2", friendLocation[i].data.end_x)     // x position of the second end of the line
      .attr("y2", friendLocation[i].data.end_y);    // y position of the second end of the line

  }else{
     orient.append("line")          // attach a line
        .style("stroke", "white")  // colour the line
        .style("stroke-width", 1)
        .attr("x1", (friendLocation[i].data.start_x+friendLocation[i].data.end_x)/2)     // x position of the first end of the line
       .attr("y1", (friendLocation[i].data.start_y+friendLocation[i].data.end_y)/2)      // y position of the first end of the line
        .attr("x2", friendLocation[i].data.start_x_corr)     // x position of the second end of the line
        .attr("y2", friendLocation[i].data.start_y_corr);    // y position of the second end of the line

      orient.append("line")          // attach a line
        .style("stroke", "white")  // colour the line
        .style("stroke-width", 3)
        .attr("x1", (friendLocation[i].data.start_x))     // x position of the first end of the line
        .attr("y1", (friendLocation[i].data.start_y))      // y position of the first end of the line
        .attr("x2", friendLocation[i].data.end_x)     // x position of the second end of the line
        .attr("y2", friendLocation[i].data.end_y);    // y position of the second end of the line
  }


//beta
 var xx = friendLocation[i].location;

 var CorrectedFont = mapSettings[0].fontSizeLocation*fontCorrection(friendLocation[i].dist)

  orient.append("text")
        .style("fill", "white")
        .attr("font-family",mapSettings[0].fontLocation)
        .attr("font-size", CorrectedFont+"px") // sensitivity: min 20px max 30px
       .attr('text-anchor', 'middle')
       .attr('alignment-baseline', 'middle')
       .attr("transform", "translate("+friendLocation[i].data.text_x+","+friendLocation[i].data.text_y+") rotate("+friendLocation[i].data.text_angle+")")  //http://bl.ocks.org/d3noob/10633421 //data[1][6]
       .attr("class", "friendLocation")//easy to style with CSS
       .attr("id", "friendLocation")
       .text(xx)

  var   distanceText = friendLocation[i].dist+" km"

 orient.append("text")
       .style("fill", "white")
       .attr("font-size", mapSettings[0].fontSizeDistance*fontCorrection(friendLocation[i].dist)+"px") // sensitivity: min 20px max 30px
       .attr("font-family",mapSettings[0].fontDistance)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr("transform", "translate("+friendLocation[i].data.textDist_x+","+friendLocation[i].data.textDist_y+") rotate("+friendLocation[i].data.text_angle+")")  //http://bl.ocks.org/d3noob/10633421 //data[1][6]
      .attr("class", "friendLocation")//easy to style with CSS
      .text(distanceText); //+"("+Math.round(data[6])+"°)"
}

// direction symbols

orient.append("text")
        .style("stroke", "white")
        .attr("font-family","Helvetica")
        .attr("font-size", "30px") // sensitivity: min 20px max 30px
        .attr("y", 20)
       .attr("x", 500)
       .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
       .attr("class", "north_sign")//easy to style with CSS
       .text("N");

 orient.append("text")
         .style("stroke", "white")
         .attr("font-family","Helvetica")
         .attr("font-size", "30px") // sensitivity: min 20px max 30px
         .attr("y", 980)
        .attr("x", 500)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .attr("class", "north_sign")//easy to style with CSS
        .text("S");

  orient.append("text")
        .style("stroke", "white")
        .attr("font-family","Helvetica")
        .attr("font-size", "30px") // sensitivity: min 20px max 30px
        .attr("y", 500)
       .attr("x", 980)
       .attr('text-anchor', 'middle')
       .attr('alignment-baseline', 'middle')
       .attr("class", "north_sign")//easy to style with CSS
       .text("E");


orient.append("text")
        .style("stroke", "white")
        .attr("font-family","Helvetica")
        .attr("font-size", "30px") // sensitivity: min 20px max 30px
        .attr("y", 500)
       .attr("x", 20)
       .attr('text-anchor', 'middle')
       .attr('alignment-baseline', 'middle')
       .attr("class", "north_sign")//easy to style with CSS
       .text("W");

}
