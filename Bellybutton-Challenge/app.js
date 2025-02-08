// define external data link
let url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";


// function that initialzes dashboard
function initialize()
{
    // begin with "samples.json" data file on computer for ease of coding;
    // in last step, replace reference to json data file to the external url    
    // let data = d3.json("samples.json");
    // console.log(data);

    // to access dropdown, use d3 to select the select tag with "#selDataset" id in index.html file
    var select = d3.select("#selDataset");

    // use d3.json to get the data
    d3.json(url).then((data) => {

        // console.log(data);

        // get names key (an array of names)
        let sampleNames = data.names; 
        //console.log(sampleNames);
    
        // use list of sampleNames to populate dropdown menu 
        sampleNames.forEach((sample) => {
            select.append("option").text(sample).property("value", sample); 
        });
        
            // alternative approach to the step above: 
            // for(var i = 0; i < sampleNames.length; i++)
            // {
            //    select.append("option").text(sampleNames[i]).property("value", sampleNames[i]);
            // }


        // initialize with first data sample
        let sample1 = sampleNames[0];

        // call function to build metadata
        demogInfo(sample1);

        // call function to build bar chart
        buildBarChart(sample1);

        // call function to build bubble chart
        buildBubbleChart(sample1);

    });
}

// function that updates dashboard
function optionChanged(item)
{
    // console.log(item);

    // call the update to the metadata
    demogInfo(item);

    // call function to update bar chart
    buildBarChart(item);

    // call function to update bubble chart
    buildBubbleChart(item);
}

// function that populates metadata
function demogInfo(sample)
{
    // console.log(sample);

    // use d3.json to get the data
    d3.json(url).then((data) => {
        // grab metadata
        let metadata = data.metadata;
        // console.log(metadata);

        // filter based on value of sample (should return 1 result in array)
        let result = metadata.filter(sampleResult => sampleResult.id == sample);
        // console.log(result);

        // access index 0 from array
        let resultData = result[0];
        // console.log(resultData);

        // clear metadata out
        d3.select("#sample-metadata").html(""); // clears the html out  

        // use Object.entries to get the value-key pairs
        Object.entries(resultData).forEach(([key, value]) => {
            // add to the sampel data / demographic section
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        }); 

    });
}

// function that builds bar graph
function buildBarChart(sample)
{
    // console.log(sample);
    // let data = d3.json("samples.json");
    // d3.json("samples.json").then((data) => {console.log(data)});

    d3.json(url).then((data) => {
        // grab all sample data
        let sampledata = data.samples;
        // console.log(sampledata);

        // filter based on value of sample (should return 1 result in array)
        let result = sampledata.filter(sampleResult => sampleResult.id == sample);

        // access index 0 from array
        let resultData = result[0];

        // get otu_ids, labels, and sample values
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;

        // build out bar chart
        let yValues = otu_ids.slice(0, 10).map(id => `OTU ${id}`);
        let xValues = sample_values.slice(0, 10);
        let textLabels = otu_labels.slice(0, 10);
        
        let barChart = {
        x: xValues.reverse(),
        y: yValues.reverse(),
        text: textLabels.reverse(),
        type: "bar",
        orientation: "h",
        };

        let maxValue = Math.max(...xValues);
        let barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            xaxis:{
                title: "Number of Bacteria", 
                dtick: maxValue/8,
            },
            width: 800,
        };

        Plotly.newPlot("bar", [barChart], barLayout);

    });
}

// function that builds bubble graph
function buildBubbleChart(sample)
{
    d3.json(url).then((data) => {
        // grab all sample data
        let sampledata = data.samples;
        // console.log(sampledata);

        // filter based on value of sample (should return 1 result in array)
        let result = sampledata.filter(sampleResult => sampleResult.id == sample);

        // access index 0 from array
        let resultData = result[0];

        // get otu_ids, labels, and sample values
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;
        
        // build bubble chart
        
        let bubbleChart = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth",
            },
        };

        let bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            xaxis: {title: "OTU ID"},
            yaxis: {title: "Number of Bacteria"},
            hovermode: "closest",
            height: 600,
            width: 1000, 
        };

        Plotly.newPlot("bubble", [bubbleChart], bubbleLayout);
    });


}


// call initialize function
initialize();