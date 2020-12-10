//set up buttons

const data1 = [{"venue": 1, "boxes": 1},{"venue": 2, "boxes": 2},{"venue": 3, "boxes": 60},{"venue": 4, "boxes": 93},{"venue": 0, "boxes": 1000}];
const data2 = [{"venue": 1, "boxes": 1},{"venue": 2, "boxes": 285},{"venue": 3, "boxes": 356},{"venue": 4, "boxes": 750},{"venue": 0, "boxes": 1000}];
const data3 = [{"venue": 1, "boxes": 1},{"venue": 2, "boxes": 1.6},{"venue": 3, "boxes": 18.5},{"venue": 4, "boxes": 480},{"venue": 0, "boxes": 1000}];
const data4 = [{"venue": 0, "boxes": 1},{"venue": 1, "boxes": 100},{"venue": 2, "boxes": 1},{"venue": 3, "boxes": 100}];
const data5 = [{"venue": 1, "boxes": 1},{"venue": 2, "boxes": 20.83},{"venue": 3, "boxes": 57},{"venue": 4, "boxes": 199},{"venue": 0, "boxes": 409.5}];
const data6 = [{"venue": 0, "boxes": 1, "group": 0},{"venue": 1, "group": 1, "boxes": 108},{"venue": 1, "group": 2, "boxes": 17},{"venue": 1, "group": 3, "boxes": 10},{"venue": 1, "group": 4, "boxes": 30},{"venue": 1, "group": 5, "boxes": 38},{"venue": 2, "group" : 1, "boxes": 104},{"venue": 2, "group" : 2, "boxes": 43},{"venue": 2, "group" : 3, "boxes": 45},{"venue": 2, "group" : 4, "boxes": 97},{"venue": 2, "group" : 5, "boxes": 30}];

var anim = {};

function generateChart(colors, data, div, box){
    uncount = (data, accessor) =>
      data.reduce((arr, item) => {
        const count = accessor(item)
        for (let i = 0; i < count; i++) {
          arr.push({
            ...item
          })
        }
        return arr
      }, []);

    const boxes = uncount(data, d => d.boxes);

    const nest = d3
      .nest()
      .key(d => d.venue)
      .entries(boxes);

    const graph = d3.select(div);
    const group = graph
      .selectAll(".container")
      .data(nest)
      .join("div")
      .attr("class", "container");

    group
      .selectAll("."+box)
      .data(d => d.values)
      .join("div")
      .attr("class", box)
      .style("background-color", d => colors[d.venue]);

//intitiate paused animation
anim[div] = new TimelineLite({paused: true});
anim[div].staggerTo("."+box, 1, {
  scale: 1,
  ease: Back.easeOut,
  stagger: {
    grid: "auto",
    from: "start",
    axis: "y",
    each: 0.05
  }
});
}


function generateChartSpecial(colors, data, div, box){
    uncount = (data, accessor) =>
      data.reduce((arr, item) => {
        const count = accessor(item)
        for (let i = 0; i < count; i++) {
          arr.push({
            ...item
          })
        }
        return arr
      }, []);

    const boxes = uncount(data, d => d.boxes);

    const nest = d3
      .nest()
      .key(d => d.venue)
      .entries(boxes);

    const graph = d3.select(div);
    const group = graph
      .selectAll(".container")
      .data(nest)
      .join("div")
      .attr("class", "container");

    group
      .selectAll("."+box)
      .data(d => d.values)
      .join("div")
      .attr("class", box)
      .style("background-color", d => colors[d.group]);

//intitiate paused animation
anim[div] = new TimelineLite({paused: true});
anim[div].staggerTo("."+box, 1, {
  scale: 1,
  ease: Back.easeOut,
  stagger: {
    grid: "auto",
    from: "start",
    axis: "y",
    each: 0.05
  }
});
}

const colors1 = ["#DB1D25", "#DB1D25", "#DB1D25", "#DB1D25", "#DB1D25"];
const colors2 = ["#7451eb", "#7451eb", "#7451eb", "#7451eb", "#7451eb"];
const colors3 = ["#15f709", "#15f709", "#15f709", "#15f709", "#15f709"];
const colors4 = ["#00b2b2", "#00b2b2", "#ff7402", "#ff7402", "#DB1D25"];
const colors5 = ["#0241ff", "#0241ff", "#0241ff", "#0241ff", "#0241ff"];
const colors6 = ["#0241ff", "#15f709", "#DB1D25", "#7451eb", "#00b2b2", "#ff7402"];

generateChart(colors1,data1,"#chart1", "box1")
generateChart(colors2,data2,"#chart2", "box2")
generateChart(colors3,data3,"#chart3", "box3")
generateChart(colors4,data4,"#chart4", "box4")
generateChart(colors5,data5,"#chart5", "box5")
generateChartSpecial(colors6,data6,"#chart6", "box6")

anim["#chart1"].play(0)


const controller = new ScrollMagic.Controller();
   
const scrollTrigger1 = new ScrollMagic.Scene({triggerElement:".chart2Trigger"})
                                  .on("enter",(e)=>{
                                      anim["#chart1"].reverse(0).timeScale(1.5)
                                     anim["#chart2"].play(0).timeScale(1)
                                  })
                                  .addTo(controller);

const scrollTrigger1r = new ScrollMagic.Scene({triggerElement:".chart2Trigger"})
                                  .on("leave",(e)=>{
                                     anim["#chart2"].reverse(0).timeScale(1.5)
                                     anim["#chart1"].play(0).timeScale(1)
                                  })
                                  .addTo(controller);

const scrollTrigger2 = new ScrollMagic.Scene({triggerElement:".chart3Trigger"})
                                  .on("enter",(e)=>{
                                     anim["#chart3"].play(0).timeScale(1)
                                     anim["#chart2"].reverse(0).timeScale(1.5)
                                  })
                                  .addTo(controller);
                                  
const scrollTrigger2r = new ScrollMagic.Scene({triggerElement:".chart3Trigger"})
                                  .on("leave",(e)=>{
                                     anim["#chart2"].play(0).timeScale(1)
                                     anim["#chart3"].reverse(0).timeScale(1.5)
                                  })
                                  .addTo(controller);
                                  
const scrollTrigger3 = new ScrollMagic.Scene({triggerElement:".chart4Trigger"})
                                  .on("enter",(e)=>{
                                     anim["#chart4"].play(0).timeScale(1)
                                     anim["#chart3"].reverse(0).timeScale(1.5)
                                  })
                                  .addTo(controller);
                                  
const scrollTrigger3r = new ScrollMagic.Scene({triggerElement:".chart4Trigger"})
                                  .on("leave",(e)=>{
                                     anim["#chart3"].play(0).timeScale(1)
                                     anim["#chart4"].reverse(0).timeScale(1.5)
                                  })
                                  .addTo(controller);
                                  
const scrollTrigger4 = new ScrollMagic.Scene({triggerElement:".chart5Trigger"})
                                  .on("enter",(e)=>{
                                     anim["#chart5"].play(0).timeScale(1)
                                     anim["#chart4"].reverse(0).timeScale(1.5)
                                  })
                                  .addTo(controller);
                                  
const scrollTrigger4r = new ScrollMagic.Scene({triggerElement:".chart5Trigger"})
                                  .on("leave",(e)=>{
                                     anim["#chart4"].play(0).timeScale(1)
                                     anim["#chart5"].reverse(0).timeScale(1.5)
                                  })
                                  .addTo(controller);
                                 
const scrollTrigger5 = new ScrollMagic.Scene({triggerElement:".chart6Trigger"})
                                  .on("enter",(e)=>{
                                     anim["#chart6"].play(0).timeScale(1)
                                     anim["#chart5"].reverse(0).timeScale(1.5)
                                  })
                                  .addTo(controller);
                                  
const scrollTrigger5r = new ScrollMagic.Scene({triggerElement:".chart6Trigger"})
                                  .on("leave",(e)=>{
                                     anim["#chart5"].play(0).timeScale(1)
                                     anim["#chart6"].reverse(0).timeScale(1.5)
                                  })
                                  .addTo(controller);