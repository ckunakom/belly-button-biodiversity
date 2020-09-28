// Use the D3 library to read in samples.json.
d3.json("./samples.json").then(function(data) {
    // console.log(data.samples.length);

    // Pulling out first 10 samples
    var mySample = data.samples.slice(0, 10);

    // console.log(mySample); 


    
    
    //-------------------------------------------------------// 
    // Define all 10 trace //
    // Define all the values for all the fields for plotting/info box
    var sampleID = mySample.map(s => s.id);
    console.log(sampleID);
    var sampleValues = mySample.map(s => s.sample_values.slice(0,10));

    var otuID = mySample.map(s => s.otu_ids.slice(0,10));
    var otuIDChartLabel = [];

    otuID.forEach((i) => {
        var otuIDLabelArray = [];        
        i.forEach(j => {
            otuIDLabelArray.push(`OTU ${j}`);
            // console.log(otuIDLabelArray);    
        });
        otuIDChartLabel.push(otuIDLabelArray);
    });

    var otuLabels = mySample.map(s => s.otu_labels.slice(0,10));

    var demographicData = data.metadata.slice(0, 10);

    // HA. HA. HA... thinking about what I have to do next makes me want to cry x'D

    // MENU OPTION //
    //-------------------------------------------------------// 
    // Add options to the dropdown menu using D3
    var dropdownMenu = d3.select("#selDataset");
    
    // Append `option value` to select tree - https://stackoverflow.com/questions/43121679/how-to-append-option-into-select-combo-box-in-d3
    sampleID.forEach(s => {
        var options = dropdownMenu.selectAll("option").data(sampleID).enter().append("option");
        options.text(s);
        options.attr("value", s);
    }); // WHY IS IT THE SAME NUMBER????


    // Initialize the page with a default plot & demographic info
    function init() {

        // DEFAULT HORIZONTAL BAR CHART //
        //-------------------------------------------------------// 

        // Create trace
        var traceH = {
            x: sampleValues[0].reverse(),
            y: otuIDChartLabel[0].reverse(),
            type: "bar",
            orientation: "h",
            text: otuLabels[0].reverse()
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
    
        // Get a reference to the demographic div
        var subjectDemo = d3.select("#sample-metadata");

        // Use `Object.entries` and `forEach` to iterate through keys and values
        Object.entries(demographicData[0]).forEach(([key, value]) => {
            // Append `p` tag and add data
            var paraValue = subjectDemo.append("p");
            paraValue.text(`${key}: ${value}`);
        });    

    }

    // Function called by DOM changes
    function optionChanged() {
        
        // Assign the value of the dropdown menu option to a variable
        var dataset = dropdownMenu.property("value");

            

        // HORIZONTAL BAR CHART //
        //-------------------------------------------------------// 
        // Initialize empty array for............
        var subjectData = [];


        // NEED TO DEFINE `subjectID` and `subjectIDText`
        if (dataset === subjectID) {
            subjectData = subjectIDText;
        }
        
        // Call function to update the chart
        Plotly.restyle("bar", "x", [x]);
        Plotly.restyle("bar", "y", [x]);

        // BUBBLE CHART // 
        //-------------------------------------------------------// 

        // DEMOGRAPHIC BOX // 
        //-------------------------------------------------------// 
        // Display demographic info for selected subject ID
        // Will need to figure out if/else of some sort
        // if (dataset === ) { //need a way to not hardcode
        //     demographicData.forEach(s => {    // need to modify this so it calls the option we want
        
        //         // Use `Object.entries` and `forEach` to iterate through keys and values
        //         Object.entries(s).forEach(([key, value]) => {
        //             // Append `p` tag and add data
        //             var paraValue = subjectDemo.append("p");
        //             paraValue.text(`${key}: ${value}`);

        //         });    
        //     });
        // }




    }

    init();

    

});




// 







    
    
    
    