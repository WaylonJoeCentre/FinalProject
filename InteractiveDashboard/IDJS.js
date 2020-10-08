//Bites Bar Chart
var drawRects = function(bites, target,graphDim,xScale,yScale,colorScale,colorBlueScale)
{
    target.selectAll("rect")
    .data(bites)
    .enter()
    .append("rect")
    .attr("x", xScale(0))
    .attr("y", function(preference){
        return yScale(preference.Breed);
    })
    .attr("width",function(preference){
        return xScale(preference.Bites);
    })
    .attr("height", yScale.bandwidth)
    .attr("fill", function(preference)
         {
            if (preference.Bites >= 1500) {
        return colorScale(preference.Bites);
    } else {
        return colorBlueScale(preference.Bites);
    }});
    
}

var drawAxis = function(graphDim,target,margins,xScale,yScale)
{
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    
    target.append("g")
    .attr("transform", "translate(0," + graphDim.height + ")")
    .call(xAxis)
    //.selectAll("text")
    //.attr("transform","translate(-5,55) rotate(270)")
    
    
    target.append("g")
    .call(yAxis);
}

var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}



var drawRectLabels = function(graphDim,margins)
{
    var labels = d3.select("#BitesBarChart")
    .append("g")
    .classed("labels", true)
    
    
    labels.append("text")
    .text("Total Bites")
    .classed("label",true)
    .attr("text-anchor","middle")
    .attr("x",margins.left+(graphDim.width/2))
    .attr("y",295)
}


var initiateBarChart = function(bites)
{
    var screen = {width:500, height:300}
    
    var margins = {left:120,right:20,top:20,bottom:40}
    
    var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height-margins.top-margins.bottom
        }
    
    var target = d3.select("#BitesBarChart")
    .attr("width",screen.width)
    .attr("height",screen.height)
    .append("g")
    .attr("transform",
          "translate("+margins.left+","+
                        margins.top+")");
    var xScale = d3.scaleLinear()
    .domain([0,2000])
    .range([0,graph.width])
    
    
    var yScale = d3.scaleBand()
    .domain(bites.map(function(d) { return d.Breed}))
    .range([0,graph.height])
    .paddingInner(0.05)
    
    var colorScale = d3.scaleOrdinal()
        .range(["red"]);
    var colorBlueScale = d3.scaleOrdinal()
        .range(["blue"]);
    
    drawRects(bites,target,graph,xScale,yScale,colorScale,colorBlueScale);
    drawAxis(graph,target,margins,xScale,yScale);
    drawRectLabels(graph,margins);
}


























var drawAggressionRects = function(bites, target,graphDim,xScale,yScale,colorScale,colorBlueScale)
{
    target.selectAll("rect")
    .data(bites)
    .enter()
    .append("rect")
    .attr("x", xScale(0) )
    .attr("y", function(preference){
        return yScale(preference.Breed);
    })
    .attr("height", yScale.bandwidth)
    .attr("width",function(preference){
        return xScale(preference.Percent);
    })
    .attr("fill",function(preference)
         {
            if (preference.Percent >= 80) {
        return colorBlueScale(preference.Percent);
    } else {
        return colorScale(preference.Percent);
   }});
    
}


var drawAggressionAxis = function(graphDim,target,margins,xScale,yScale)
{
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    
    target.append("g")
    .attr("transform", "translate(0," + graphDim.height + ")")
    .call(xAxis)
    
    target.append("g")
    .call(yAxis);
}


var drawAggressionLabels = function(graphDim,margins)
{
    var labels = d3.select("#DogAgressionChart")
    .append("g")
    .classed("labels", true)
    
    labels.append("text")
    .text("Pass Rate")
    .classed("label",true)
    .attr("text-anchor","middle")
    .attr("x",margins.left+(graphDim.width/2))
    .attr("y",300)
    
}

//Aggression Graph
var initiateBarChartAggression = function(bites)
{
    var screen = {width:400, height:300}
    
    var margins = {left:120,right:20,top:20,bottom:30}
    
    var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height-margins.top-margins.bottom
        }
    
    var target = d3.select("#DogAgressionChart")
    .attr("width",screen.width)
    .attr("height",screen.height)
    .append("g")
    .attr("transform",
          "translate("+margins.left+","+
                        margins.top+")");
    var xScale = d3.scaleLinear()
    .domain([0,100])
    .range([0,graph.width])
    
    var yScale = d3.scaleBand()
    .domain(bites.map( function(d){ return d.Breed}))
    .range([0,graph.height])
    .paddingInner(0.05)

    
    var colorScale = d3.scaleOrdinal()
        .range(["maroon"]);
    var colorBlueScale = d3.scaleOrdinal()
        .range(["darkblue"]);
    
    drawAggressionRects(bites,target,graph,xScale,yScale,colorScale,colorBlueScale);
    drawAggressionAxis(graph,target,margins,xScale,yScale);
    drawAggressionLabels(graph,margins);
    
}












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
    .attr("y",300)
    
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
    var screen = {width:500, height:300}
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









var clearTable = function()
{
    d3.selectAll("#DogPopularityTable tbody tr")
    .remove();
}



var popularFill = function(popularityLevels)
{
    console.log("popularityLevels",popularityLevels);
    
    var popularDogs = popularityLevels.filter(function(dog)
    {
        if(dog.Breed=="Retrievers (Labrador)")
    {
        return true;
    }
    else if(dog.Breed=="German Shepherd Dogs")
        {
            return true;
       }
    else if(dog.Breed=="Retrievers (Golden)")
        {
            return true;
        }
    else if(dog.Breed=="Bulldogs")
        {
            return true;
        }
   else {
        return false;
    }
    })
var popularNums = popularityLevels.filter(function(dog)
    {
        if(dog.Rank=="1")
    {
        return true;
    }
    else if(dog.Rank=="2")
        {
            return true;
       }
    else if(dog.Rank=="3")
        {
            return true;
        }
    else if(dog.Rank=="4")
        {
            return true;
        }
   else {
        return false;
    }
    });
    var rows = d3.select("#DogPopularityTable tbody")
    .selectAll("tr")
    .data(popularDogs)
    .enter()
    .append("tr")
    //var rower = d3.select("#DogPopularityTable tbody")
    //.selectAll("tr")
    //.data(popularNums)
    //.enter()
    //.append("tr")
    
    
    //console.log("popularDogs",popularDogs);
    
rows.append("td")
.text(function(dog)
     {
    return dog.Breed
})
.data(popularNums)
.enter()
    
rows.append("td")
.text(function(dog)
     {
    return dog.Rank
})
    
}
var popularFillSmall = function(popularityLevels)
{
    console.log("popularityLevels",popularityLevels);
    
    var popularDogs = popularityLevels.filter(function(dog)
    {
        if(dog.Breed=="Shih Tzu")
    {
        return true;
    }
    else if(dog.Breed=="Chihuahuas")
        {
            return true;
       }
   else {
        return false;
    }
    })
var popularNums = popularityLevels.filter(function(dog)
    {
        if(dog.Rank=="20")
    {
        return true;
    }
    else if(dog.Rank=="30")
        {
            return true;
       }
   else {
        return false;
    }
    });
    var rows = d3.select("#DogPopularityTable tbody")
    .selectAll("tr")
    .data(popularDogs)
    .enter()
    .append("tr")
    //var rower = d3.select("#DogPopularityTable tbody")
    //.selectAll("tr")
    //.data(popularNums)
    //.enter()
    //.append("tr")
    
    
    //console.log("popularDogs",popularDogs);
    
rows.append("td")
.text(function(dog)
     {
    return dog.Breed
})
.data(popularNums)
.enter()
    
rows.append("td")
.text(function(dog)
     {
    return dog.Rank
})
    
}

var popularFillAggressive = function(popularityLevels)
{
    console.log("popularityLevels",popularityLevels);
    
    var popularDogs = popularityLevels.filter(function(dog)
    {
        if(dog.Breed=="German Shepherd Dogs")
    {
        return true;
    }
    else if(dog.Breed=="Rottweilers")
        {
            return true;
       }
    else if(dog.Breed=="American Staffordshire Terriers")
        {
            return true;
       }
   else {
        return false;
    }
    })
var popularNums = popularityLevels.filter(function(dog)
    {
        if(dog.Rank=="2")
    {
        return true;
    }
    else if(dog.Rank=="8")
        {
            return true;
       }
    else if(dog.Rank=="81")
        {
            return true;
       }
   else {
        return false;
    }
    });
    var rows = d3.select("#DogPopularityTable tbody")
    .selectAll("tr")
    .data(popularDogs)
    .enter()
    .append("tr")
    //var rower = d3.select("#DogPopularityTable tbody")
    //.selectAll("tr")
    //.data(popularNums)
    //.enter()
    //.append("tr")
    
    
    //console.log("popularDogs",popularDogs);
    
rows.append("td")
.text(function(dog)
     {
    return dog.Breed
})
.data(popularNums)
.enter()
    
rows.append("td")
.text(function(dog)
     {
    return dog.Rank
})
    
}

var switchTable = function(popularityLevels) {
    d3.select("#labelOne")
    .on("click", function()
       {
        clearTable();
        console.log("clicked")
        popularFill(popularityLevels);
    });
    //clearTable();
    //popularFill(popularityLevels);
}
var otherSwitchTable = function(popularityLevels) {
    d3.select("#labelTwo")
    .on("click", function()
       {
        clearTable();
        console.log("clicked")
        popularFillSmall(popularityLevels);
    });
    //clearTable();
    //popularFill(popularityLevels);
}

var finalSwitchTable = function(popularityLevels) {
    d3.select("#labelThree")
    .on("click", function()
       {
        clearTable();
        console.log("clicked")
        popularFillAggressive(popularityLevels);
    });
    //clearTable();
    //popularFill(popularityLevels);
}

















//Permanent Data
var successFCN = function(dogData)
{
    console.log("classData",dogData);
    var bites = dogData[0];
    var aggressionLevels = dogData[1];
    var popularityLevels = dogData[2];
    initiateBarChart(bites);
    switchTable(popularityLevels);
    otherSwitchTable(popularityLevels);
    finalSwitchTable(popularityLevels);
    initiateBarChartAggression(bites);
    initiateScatterPlot(bites);
}
var failFCN = function(error)
{
    console.log("error",error)
}

var biteData = d3.csv("../Data/Dog_Bites(corrected).csv");
var aggressionData = d3.csv("../Data/DogAggression.csv");
var popularityData = d3.csv("../Data/AKC_Popular_Breeds_2013-2016.csv");

var allData = [biteData,aggressionData,popularityData];
Promise.all(allData).then(successFCN,failFCN);
