# Belly-Button-Challenge

## Background

In this assignment, you will build an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels. The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs) were present in more than 70% of people, while the rest were relatively rare.

## Instructions

Complete the following steps:
1. Use the D3 library to read in samples.json from the URL https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json.

2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
  - Use sample_values as the values for the bar chart.
  - Use otu_ids as the labels for the bar chart.
  - Use otu_labels as the hovertext for the chart.
    ![hw01](https://github.com/user-attachments/assets/cce5dbc2-03d1-469b-92da-495b9158f107)

3. Create a bubble chart that displays each sample.
  - Use otu_ids for the x values.
  - Use sample_values for the y values.
  - Use sample_values for the marker size.
  - Use otu_ids for the marker colors.
  - Use otu_labels for the text values.
    ![bubble_chart](https://github.com/user-attachments/assets/08cd0c6d-9f94-4b0c-ba3b-e8fea8223178)

4. Display the sample's metadata, i.e., an individual's demographic information.
  - Loop through each key-value pair from the metadata JSON object and create a text string.
  - Append an html tag with that text to the #sample-metadata panel.
    
    ![hw03](https://github.com/user-attachments/assets/f61b2208-ba16-4ae8-b423-047cd714ef05)

5. Update all the plots when a new sample is selected. Additionally, create any layout that you would like for your dashboard. An example dashboard is shown as follows:
    ![hw02](https://github.com/user-attachments/assets/7418c5c2-4bd9-412e-badb-a5ecf9abd64f)

## References
- https://plotly.com/javascript/bubble-charts/

## Acknowledgements

Hulcr, J. et al. (2012) A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable. Retrieved from: http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/
