
// colors =  ['#fff7ec','#fee8c8','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#b30000','#7f0000']
//src = https://colorbrewer2.org/#type=sequential&scheme=OrRd&n=9


// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 30, left: 60},
  width = 600 - margin.left - margin.right,
  height = 100 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Labels of row and columns
var myGroups  = ["1900", "1910", "1920", "1930", "1940", "1950", "1960", "1970", "1980", "1990","2000", "2010","2020"];
var myVars = ["Publications"]

// Build X scales and axis:
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(myGroups)
  .padding(0.01);

svg.append("g")
  .attr("transform", "translate("+ -x.bandwidth()/2  +"," + height + ")")
  .call(d3.axisBottom(x).tickSize(0))
  .select(".domain").remove()

// Build X scales and axis:
var y = d3.scaleBand()
  .range([ height, 0 ])
  .domain(myVars)  //uncomment to get the y label
  
svg.append("g")
  .call(d3.axisLeft(y).tickSize(0))
  .select(".domain").remove()



var colors =  ['#ffffff', '#fff7ec','#fee8c8','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#b30000','#7f0000'];
var Bins =   [0,10,30,60,150,300,600,1500,10000,20000] 


// Build color scale for bins        //https://www.d3indepth.com/scales/
var myColor = d3.scaleThreshold()
  .range(colors)
  .domain(Bins)

//Read the data
d3.csv("./dataIsis.csv", function(data) {

//console.log(data);


 data = [{Year:"1900", Count:"0"},
       {Year:"1910", Count:"10"},
       {Year:"1920", Count:"30"},
       {Year:"1930", Count:"60"},
       {Year:"1940", Count:"150"},
       {Year:"1950", Count:"300"},
       {Year:"1960", Count:"600"},
       {Year:"1970", Count:"1500"},
       {Year:"1980", Count:"10000"},
       {Year:"1990", Count:"100000"},
       {Year:"2000", Count:"1500"},
       {Year:"2010", Count:"600"}] 
    // create a tooltip
  var tooltip = d3.select("#my_dataviz")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "2px")
  .style("border-radius", "5px")
 

  var mouseover = function(d) {
    tooltip.style("opacity", 1)
    tooltip
      .html("Publications: " + d.Count)
      .style("left", (d3.event.pageX) + 10 + "px")
      .style("top", (d3.event.pageY ) + "px")

    d3.select(this)
      .style("stroke-width", 4)
 
  }

  var mouseleave = function(d) {
    tooltip.style("opacity", 0)
    d3.select(this)
      .style("stroke-width", 1)
  }


  svg.selectAll()
      .data(data, function(d) {return d.Year+':'+d.Count;})
      .enter()
      .append("rect")
      .attr("stroke","black")
      .style("stroke-width", 1)
      .attr("x", function(d) { return x(d.Year) })
      .attr("y", 0)
      .attr("rx", 0) //for rounded rectangle
      .attr("ry", 0) //for rounded rectangle
      .attr("width", x.bandwidth() )
      .attr("height", y.bandwidth() )
      .style("fill", function(d) {
              return myColor(d.Count)} )
      

 svg.selectAll("rect")
      .on("mouseover", mouseover)
      .on("mousemove", mouseover)
      .on("mouseleave", mouseleave)




})
