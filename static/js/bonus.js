
// DRAW HORIZONTAL BAR CHART //
//-------------------------------------------------------//
function barChart(subjectID) {
    console.log(`Draw bar chart for ${subjectID}`)

}

// DRAW BUBBLE CHART //
//-------------------------------------------------------// 
function bubbleChart(subjectID) {

}

// Function called by DOM changes
function optionChanged(newID) {


}

// Setting up subject dashboard -  Initialize the page
function Init () {

    // DASHBOARD OPTION //
    //-------------------------------------------------------// 
    // Add options to the dropdown menu using D3
    var dropdownMenu = d3.select("#selDataset");

    // Use the D3 library to read in samples.json.
    d3.json("./samples.json").then((data) => {
        // console.log(data);

        // Pulling out subjects data
        var subjectData = data.samples;

        // Populate dropdown menu w subject IDs
        subjectData.forEach((s) => {
            dropdownMenu.append("option")
            .text(s.id)
            .property("value", s.id);    
        });


        var subjectID = subjectData[0].id;
        console.log(subjectID);



        // HORIZONTAL BAR CHART //
        //-------------------------------------------------------//
        barChart(subjectID);



        // BUBBLE CHART //
        //-------------------------------------------------------// 
        // bubbleChart(s);

    });
    

}

Init();
