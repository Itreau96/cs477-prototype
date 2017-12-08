import React, { Component } from 'react'
import './App.css'
import { scaleLinear, scaleTime } from 'd3-scale'
import { timeFormat } from 'd3-time-format'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import { axisBottom, axisLeft } from 'd3-axis'

class LineChart extends Component {

  // Initialization method
  constructor(props) {
    super(props)
    this.createLineChart = this.createLineChart.bind(this)
  }

  // Recreate chart on mount
  componentDidMount() {
    this.createLineChart()
  }

  // Recreate chart on update
  componentDidUpdate() {
    this.createLineChart()
  }

  // Chart generation method
  createLineChart() {

    // Size values
    const chartPadding = 100;
    const axisPadding = 50;

    // Svg node
    const node = this.node;

    // Size/data values from input
    const dataMax = max(this.props.data);
    const width = 500;
    const height = 500;

    // Date values
    var minDate = new Date(2017, 11, 1),
        maxDate = new Date(2017, 11, 8);
    var tFormat = timeFormat("%m-%d-%Y");

    // Scale for y axis
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([height, 0])

    // Scale for time on x axis
    const timeScale = scaleTime()
      .range([0, width])
      .domain([minDate, maxDate])

    // Append y axis label
    select(node)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 + axisPadding)
      .attr("x", 0 - (height / 2) - chartPadding)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Bytes Reclaimed");

    // Append x axis label
    select(node)
      .append("text")
      .attr("x", width / 2 + chartPadding)
      .attr("y", height + chartPadding + axisPadding / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Date Reclaimed");

    // Create the x axis element
    const xAxis = axisBottom()
      .scale(timeScale)
      .tickFormat(tFormat)
      .ticks(this.props.data.length-1)

    // Create the y axis element
    const yAxis = axisLeft()
      .scale(yScale)

    var d = "";

    // Create line element based on input
    for (var i = 0, size = this.props.data.length-1; i <= size; i++)
    {
        // Get data height
        var dHeight = (this.props.data[i] / dataMax) * height;

        // Determine if first point
        if (i === 0)
        {
          // Create empty line data variable
          d += "M" + chartPadding + " " + (height + chartPadding - dHeight) + " ";
        }
        // If not, create move point
        else
        {
          // Create new point
          d += "L" + (chartPadding + i * (width / size)) + " " + (height + chartPadding - dHeight) + " ";
        }
    }

    // Append the y axis element to the svg node
    select(node)
      .append('g')
      .attr('transform', 'translate(' + chartPadding + ',' + chartPadding + ')')
      .attr('id', 'yAxis')
      .call(yAxis)

    // Append the x axis element to the svg node
    select(node)
      .append('g')
      .attr('transform', 'translate(' + chartPadding + ',' + (height + chartPadding) + ')')
      .attr('id', 'xAxis')
      .call(xAxis)

    // Create/append the line graph to the svg element
    select(node)
      .datum(this.props.data)
      .append('path')
      .style('fill', '#FF7F50')
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 1.5)
      .attr("d", d)
 }

 render() {
  // Constants
  const width = 700;
  const height = 700;

  // Return svg canvas node
  return <svg ref={node => this.node = node}
  width={width} height={height}>
  </svg>
  }
}
export default LineChart
