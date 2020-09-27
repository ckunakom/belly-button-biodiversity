// Use the D3 library to read in samples.json.
d3.json("./samples.json").then(function(data) {
    // console.log(data);

    // Use otu_ids as the labels for the bar chart.
    var dataLabels = data.samples[0].otu_ids;
    var topLabels = dataLabels.slice(0, 10);
    // Create OTU labels
    var OTULabels = []
    topLabels.forEach(label => OTULabels.push(`OTU ${label}`));

    // Use sample_values as the values for the bar chart.
    var dataValues = data.samples[0].sample_values;
    var topValues = dataValues.slice(0, 10);
    // console.log(topValues);

    // Use otu_labels as the hovertext for the chart.
    var dataHoverText = data.samples[0].otu_labels;
    var topHoverText = dataHoverText.slice(0, 10);
    // console.log(topHoverText);

    // Use id as dropdown selection
    var sampleID = data.names.slice(0,10);
    // console.log(sampleID);

    // Initialize the page with a default plot
    function init() {

        // Horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
        //-------------------------------------------------------// 

        // Create trace
        var trace1 = {
            x: topValues.reverse(),
            y: OTULabels.reverse(),
            type: "bar",
            orientation: "h",
            text: topHoverText.reverse()
        };

        // Data
        var dataPlot = [trace1];

        // Render the plot
        Plotly.newPlot("bar", dataPlot);
    }

    // Function called by DOM changes
    function optionChanged() {
        
        // Use D3 to select the dropdown menu
        var dropdownMenu = d3.select("#selDataset");
        
        // Assign the value of the dropdown menu option to a variable
        var dataset = dropdownMenu.property("value");
        console.log(dataset);

        // Initialize empty array for 
        var subjectData = [];


        // NEED TO DEFINE `subjectID` and `subjectIDText`
        if (dataset === subjectID) {
            subjectData = subjectIDText;
        }
        
        // Call function to update the chart
        Plotly.restyle("bar", "x", [x]);
        Plotly.restyle("bar", "y", [x]);
    }

    init();

    // Create a bubble chart that displays each sample.
    //-------------------------------------------------------// 


        // Use otu_ids for the x values.


        // Use sample_values for the y values.


        // Use sample_values for the marker size.


        // Use otu_ids for the marker colors.


        // Use otu_labels for the text values.


    // Display the sample metadata, i.e., an individual's demographic information.


    // Display each key-value pair from the metadata JSON object somewhere on the page.

    // Update all of the plots any time that a new sample is selected.


    // Oh gosh... Don't tell me, we have to append the "names" into
    //  drop down in html T_T
// DOESN'T WORK //
    // Use D3 to select the dropdown tag in html
    var selectID = d3.select("#selDataset");

    // Append `option value` to select tree
    sampleID.forEach(s => {
        var optionValue = selectID.append("option");
        optionValue.append(`value="${s}"`).text(s);

    });




});




// 







    
    
    
    