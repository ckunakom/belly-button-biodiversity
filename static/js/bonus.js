// Office Hour Discussion - HW Demo

// DRAW HORIZONTAL BAR CHART //
//-------------------------------------------------------//
function barChart(subjectID) {
    console.log(`Draw bar chart for ${subjectID}`)

    d3.json("samples.json").then((data) => {

        var samples = data.sample;
        var resultArray = samples.filter(s => s.id == subjectID);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuId}`).reverse()

        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        }

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        }

        Plotly.newPlot("bar", [barData], barLayout);


    });
}

// DRAW BUBBLE CHART //
//-------------------------------------------------------// 
function bubbleChart(subjectID) {

}

function ShowMetadata(subjectID) {

    d3.json("./samples.json").then((data) => {

        var metadata = data.metadata;
        var resultArray = metadata.filter(md => md.id == subjectID);
        var result = resultArray[0];

        var panel = d3.select("#sample-metadata");
        panel.html("");

        Object.entries(result).forEach(([key, value]) => {

            var textToShow = `${key}: ${value}`;
            panel.append("h6").text(textToShow);


        });

    });
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
