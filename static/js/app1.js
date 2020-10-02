function dashboard() {
    var selData = d3.select("#selDataset");

    d3.json("./samples.json").then(function(data) {
        data.names.forEach((n) => {
            selData.append("option")
            .text(n)
            .property("value", n);  
        });
    var newData =(data.names[0])
    optionChanged(newData);
    // demographic(newData);
    // allCharts(newData);
    });
}

function demographic(newSubjectID) {
    d3.json("./samples.json").then(function(data) {
        var demographicData = data.metadata;
        var allResults = demographicData.filter(md => md.id === parseInt(newSubjectID));
        var firstResult = allResults[0];

        var subjectDemo = d3.select("#sample-metadata");

        subjectDemo.html("");
        console.log(demographicData);
        Object.entries(firstResult).forEach(([key, value]) => {
           var row =  subjectDemo.append("p")
           row.text(`${key}: ${value}`);
        });

    });
};

function gague(newSubjectID) {
    d3.json("./samples.json").then(function(data) {
        var washFreqData = data.metadata
        var result = washFreqData.filter(md => md.id === parseInt(newSubjectID));
        var firstSubject = result[0].wfreq;
        var subjectDemo = d3.select("#sample-metadata");

        Object.entries(firstSubject).forEach(([key, value]) => {
            var row =  subjectDemo.append("p")
            row.text(`${key}: ${value}`);
        });

        var traceGauge = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: firstSubject,
                title: { text: "Scrubs per Week <br> something"},
                type: "indicator",
                mode: "gauge",
                gauge: { axis: { range: [0, 9] },
                        steps: [
                            { range: [0, 9], color: "cyan" },
                        ] },
            }
        ];

        var layoutGauge = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        
        Plotly.newPlot('gauge', traceGauge, layoutGauge);

    });
}


function allCharts(newSubjectID) {
    d3.json("./samples.json").then(function(data) {
        var allSample = data.samples.filter(s => s.id === newSubjectID);
        var firstSample = allSample[0];


        // Bar chart
        var traceBar = {
            x: firstSample.sample_values.slice(0, 10).reverse(),
            y: firstSample.otu_ids.map(i => `OTU ${i}`).slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
            text: firstSample.otu_labels.slice(0,10).reverse()
        }

        var layoutBar = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        }

        // Render the plot
        Plotly.newPlot("bar", [traceBar], layoutBar);

        // Bubble Chart
        var traceBubble = {
            x: firstSample.otu_ids,
            y: firstSample.sample_values,
            mode: 'markers',
            text: firstSample.otu_labels,
            marker: {
              color: firstSample.otu_ids,
              size: firstSample.sample_values
            }
        };

        var layoutBubble = {
            xaxis: {title: 'OTU ID'},
            height: 600,
            width: 1200
          };

        Plotly.newPlot('bubble', [traceBubble], layoutBubble);     
     });
}



function optionChanged(newSubjectID) {
    demographic(newSubjectID);
    allCharts(newSubjectID);
    gague(newSubjectID);
}

dashboard();