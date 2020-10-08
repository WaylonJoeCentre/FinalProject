var paintScatter = function(bites,graphDim,screen,xScale,yScale,colorScale,colorBlueScale)
{
    d3.select("#DogComparisonChart")
    .selectAll("circle")
    .data(bites)
    .enter()
    .append("circle")
    .attr("cx",function(dog)
         {
        return xScale(dog.Percent);
    })
    .attr("cy",function(dog)
    {
          return yScale(dog.Bites);
          })
    .attr("r",5)
    .attr("fill",function(preference)
         {
            if (preference.Percent >= 80) {
        return colorBlueScale(preference.Percent);
    } else {
        return colorScale(preference.Percent);
   }})
    .on("mouseenter" ,function(dog)
      {
        
      var xPos = d3.event.pageX;
      var yPos = d3.event.pageY;
      
        d3.select("#tooltip")
        .classed("hidden",false)
        .style("top",yPos+"px")
        .style("left",xPos+"px")
        
        d3.select("#BREED")
        .text(dog.Breed);
        
        d3.select("#BITE")
        .text(dog.Bites);
      })//tool tip off
    .on("mouseleave",function()
    {
        d3.select("#tooltip")    
        .classed("hidden",true);
    })
}

var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}

var drawScatterAxis = function(graphDim,target,margins,xScale,yScale)
{
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    
    target.append("g")
    .attr("transform", "translate(0," + graphDim.height + ")")
    .call(xAxis)
    
    target.append("g")
    .call(yAxis);
}

var drawAggressionScatter = function(graphDim,margins)
{
    var labels = d3.select("#DogComparisonChart")
    .append("g")
    .classed("labels", true)
    
    labels.append("text")
    .text("Pass Rate")
    .classed("label",true)
    .attr("text-anchor","middle")
    .attr("x",margins.left+(graphDim.width/2))
    .attr("y",400)
    
    labels.append("g")
    .attr("transform",makeTranslateString(20,margins.top+(graphDim.height/2)))
        .append("text")
        .text("Total Bites")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(270)")
    
}


var initiateScatterPlot = function(bites)
{
    var screen = {width:500, height:400}
    var margins = {left:60,right:20,top:20,bottom:30}
    
    var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height-margins.top-margins.bottom
        }
    
    var target = d3.select("#DogComparisonChart")
    .attr("width",screen.width)
    .attr("height",screen.height)
    .append("g")
    .attr("transform",
          "translate("+margins.left+","+
                        margins.top+")");
    
    var xScale = d3.scaleLinear()
    .domain([0,100])
    .range([0,graph.width])
    
    var yScale = d3.scaleLinear()
    .domain([0,2000])
    .range([graph.height,0])
    
    var colorScale = d3.scaleOrdinal()
        .range(["red"]);
    var colorBlueScale = d3.scaleOrdinal()
        .range(["blue"]);
    
    drawScatterAxis(graph,target,margins,xScale,yScale); paintScatter(bites,graph,screen,xScale,yScale,colorScale,colorBlueScale);
    drawAggressionScatter(graph,margins);
}



var successFCN = function(bites)
{
    console.log("classData",bites);
    initiateScatterPlot(bites);
}
var failFCN = function(error)
{
    console.log("error",error)
}

var biteData = d3.csv("../Data/Dog_Bites(corrected).csv");


biteData.then(successFCN,failFCN);
