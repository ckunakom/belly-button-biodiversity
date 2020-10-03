/* Code below was derived from 3 different sources: 
    my own, my instructor's office hour demo and my tutor */

// DASHBOARD MENU OPTION //
//-------------------------------------------------------// 
function dashboard() {
    // Get a reference to the option selection div
    var selData = d3.select("#selDataset");

    // Use the D3 library to read in samples.json
    d3.json("./samples.json").then(function(data) {

        // Pulling out my subjects id
        var subjectID = data.names;

        // Append `option value` to html tree
        subjectID.forEach((n) => {
            selData.append("option")
            .text(n)
            .property("value", n);  
        });
    
    // DEFAULT ID ON DASHBOARD // 
    var newData =(subjectID[0]);

    optionChanged(newData);
    // demographic(newData);
    // allCharts(newData);
    });
}

// DEMOGRAPHIC INFO BOX // 
//-------------------------------------------------------// 
function demographic(newSubjectID) {

    // Import data using D3
    d3.json("./samples.json").then(function(data) {

        // Pulling out demographic information from JSON
        var demographicData = data.metadata;

        // Pull out demo info of the selected id
        var allResults = demographicData.filter(md => md.id === parseInt(newSubjectID));

        // Pulling out JSON from filtered array - info of subject of interest
        var firstResult = allResults[0];

        // Get a reference to the demographic div
        var subjectDemo = d3.select("#sample-metadata");

        // Clearing out the current demo info
        subjectDemo.html("");

        // Use `Object.entries` and `forEach` to get all demographic information
        Object.entries(firstResult).forEach(([key, value]) => {
           var row =  subjectDemo.append("p")
           row.text(`${key.toUpperCase()}: ${value}`);
        });

    });
};

// GAUGE // 
//-------------------------------------------------------//
function gague(newSubjectID) {
    
    // Import data using D3
    d3.json("./samples.json").then(function(data) {
        
        // Pulling out washing frequency information from JSON
        var washFreqData = data.metadata
        var result = washFreqData.filter(md => md.id === parseInt(newSubjectID));
        
        // Pulling out JSON from filtered array - info of subject of interest
        var selectSubject = result[0].wfreq;

        // Create trace data
        var traceGauge = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: selectSubject,
                title: { text: "Belly Button Washing Frequency <br> Scrubs per Week"},
                type: "indicator",
                mode: "gauge",
                gauge: { axis: { range: [0, 9] },
                        steps: [
                            { range: [0, 9], color: "#7ab0d1" },
                        ] },
            }
        ];

        // Create layout
        var layoutGauge = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        
        // Render the plot
        Plotly.newPlot('gauge', traceGauge, layoutGauge);

    });
}

// BAR & BUBBLE PLOTS // 
//-------------------------------------------------------//
function allCharts(newSubjectID) {

    // Import data using D3
    d3.json("./samples.json").then(function(data) {

        // Pulling out culture results information from JSON
        var allSample = data.samples.filter(s => s.id === newSubjectID);
        
        // Pulling out JSON from filtered array - info of subject of interest
        var selectSample = allSample[0];


        // Bar chart //
        // Create trace data
        var traceBar = {
            x: selectSample.sample_values.slice(0, 10).reverse(),
            y: selectSample.otu_ids.map(i => `OTU ${i}`).slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
            text: selectSample.otu_labels.slice(0,10).reverse()
        }
        
        // Create layout
        var layoutBar = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        }

        // Render the bar plot
        Plotly.newPlot("bar", [traceBar], layoutBar);

        // Bubble Chart //
        // Create trace data
        var traceBubble = {
            x: selectSample.otu_ids,
            y: selectSample.sample_values,
            mode: 'markers',
            text: selectSample.otu_labels,
            marker: {
              color: selectSample.otu_ids,
              size: selectSample.sample_values
            }
        };

        // Create layout
        var layoutBubble = {
            xaxis: {title: 'OTU ID'},
            height: 600,
            width: 1200
          };
        
        // Render the bubble plot
        Plotly.newPlot('bubble', [traceBubble], layoutBubble);     
     });
}

// Function called by DOM changes - when new subject ID is selected
//-------------------------------------------------------//
function optionChanged(newSubjectID) {
    demographic(newSubjectID);
    allCharts(newSubjectID);
    gague(newSubjectID);
}

// Initialize the page with the dashboard
//-------------------------------------------------------//
dashboard();