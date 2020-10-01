// Use the D3 library to read in samples.json.
d3.json("./samples.json").then(function(data) {

    // Pulling out my subjects
    var mySample = data.samples;

    //-------------------------------------------------------// 
    // Define all the values for all the fields for plotting/info box
    var sampleID = mySample.map(s => s.id);

    var sampleValues = mySample.map(s => s.sample_values);

    var otuID = mySample.map(s => s.otu_ids);

    var otuIDBar = otuID.slice(0,10);
    var otuIDChartLabel = [];

    otuIDBar.forEach((i) => {
        var otuIDLabelArray = [];        
        i.forEach(j => {
            otuIDLabelArray.push(`OTU ${j}`);
        });
        otuIDChartLabel.push(otuIDLabelArray);
    });

    var otuLabels = mySample.map(s => s.otu_labels);

    var demographicData = data.metadata;

    // MENU OPTION //
    //-------------------------------------------------------// 
    var dropdownMenu = d3.select("#selDataset");

    // Get a reference to the demographic div
    var subjectDemo = d3.select("#sample-metadata");
    
    // Append `option value` to select tree
    sampleID.forEach(s => {
        dropdownMenu.append("option")
        .text(s)
        .property("value", s);   
    });

    // HTML onchange doesn't work..
    dropdownMenu.on("change", optionChanged);

    // Initialize the page with a default plot & demographic info
    function init() {

        // DEFAULT HORIZONTAL BAR CHART //
        //-------------------------------------------------------// 

        // Create trace
        var traceH = {
            x: sampleValues[0].slice(0, 10).reverse(),
            y: otuIDChartLabel[0].slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
            text: otuLabels[0].slice(0,10).reverse()
        };

        // Data
        var dataPlotH = [traceH];

        // Render the plot
        Plotly.newPlot("bar", dataPlotH);


        // BUBBLE CHART //
        //-------------------------------------------------------// 

        var traceB = {
            x: otuID[0],
            y: sampleValues[0],
            mode: 'markers',
            text: otuLabels[0],
            marker: {
              color: otuID[0],
              size: sampleValues[0]
            }
          };
          
          var dataPlotB = [traceB];
          
          var layoutB = {
            xaxis: {title: 'OTU ID'},
            // showlegend: false,
            height: 600,
            width: 1200
          };
          
          Plotly.newPlot('bubble', dataPlotB, layoutB);


        // DEFAULT DEMOGRAPHIC BOX // 
        //-------------------------------------------------------// 
        // Use `Object.entries` and `forEach` to iterate through keys and values
        Object.entries(demographicData[0]).forEach(([key, value]) => {
            // Append `p` tag and add data
            subjectDemo.append("p")
            .text(`${key}: ${value}`);
        });    
    }
    
    // Function called by DOM changes
    function optionChanged() {
        console.log("is this working");
        
        // Assign the value of the dropdown menu option to a variable
        var dataset = dropdownMenu.property("value");

        // Initialize empty array for update bar/bubble plot
        var subjectDataXBar = [];
        var subjectDataYBar = [];
        var subjectDataTextBar = [];

        var subjectDataYBub = [];
        var subjectDataYBub = [];
        var subjectDataTextBub = [];

        // some sort of loop
        mySample.forEach(s => {
            if (dataset === s.id) {
                subjectDataYBub = s.sample_values;
                subjectDataXBar = subjectDataYBub.slice(0,10).reverse()

                subjectDataXBub = s.otu_ids;
                subjectDataYBar = subjectDataXBub.slice(0,10);

                var otuIDLabelArray = []; 

                subjectDataYBar.forEach((i) => {
                    otuIDLabelArray.push(`OTU ${i}`);  
                });

                subjectDataYBar = otuIDLabelArray.reverse();
                
                subjectDataTextBub = s.otu_labels;
                subjectDataTextBar = subjectDataTextBub.slice(0,10).reverse();      
        
            }
        });

        // HORIZONTAL BAR CHART //
        //-------------------------------------------------------// 
        Plotly.restyle("bar", "x", [subjectDataXBar]);
        Plotly.restyle("bar", "y", [subjectDataYBar]);
        Plotly.restyle("bar", "text", [subjectDataTextBar]);

        // BUBBLE CHART // 
        //-------------------------------------------------------// 
        Plotly.restyle('bubble', "x", [subjectDataXBub]);
        Plotly.restyle('bubble', "y", [subjectDataYBub]);
        Plotly.restyle('bubble', "text", [subjectDataTextBub]);
        Plotly.restyle('bubble', "marker.color", [subjectDataXBub]);
        Plotly.restyle('bubble', "marker.size", [subjectDataYBub]);

        // DEMOGRAPHIC BOX // 
        //-------------------------------------------------------// 
        // Clear the Demographic info
        d3.select("#sample-metadata").html("");
        // Show updated dashboard
        demographicData.forEach(s => {
            if (parseInt(dataset) === s.id) {
                Object.entries(s).forEach(([key, value]) => {
                    subjectDemo.append("p")
                    .text(`${key}: ${value}`);
                });  
            }
        });

    }

    init();

});






    
    
    
    