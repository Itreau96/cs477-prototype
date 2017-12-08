import React, { Component } from 'react'
import './App.css'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import { axisBottom, axisLeft } from 'd3-axis'

class BarChart extends Component {

  constructor(props) {
    super(props)
    this.createBarChart = this.createBarChart.bind(this)
  }

  componentDidMount() {
    this.createBarChart()
  }

  componentDidUpdate() {
    this.createBarChart()
  }

   createBarChart() {
    const chartPadding = 100;
    const barSize = 50;

    const node = this.node;
    const dataMax = max(this.props.data);
    const dataScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, this.props.size[1]])
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([this.props.size[1], 0])
    const xScale = scaleLinear()
      .domain([0, 4])
      .range([0, this.props.data.length * barSize])

    const xAxis = axisBottom()
      .scale(xScale)
      .ticks(dataMax-1)

    const yAxis = axisLeft()
      .scale(yScale)

    select(node)
      .append('g')
      .attr('transform', 'translate(' + chartPadding + ',' + chartPadding + ')')
      .attr('id', 'yAxis')
      .call(yAxis)

    select(node)
      .append('g')
      .attr('transform', 'translate(' + chartPadding + ',' + (this.props.size[1] + chartPadding) + ')')
      .attr('id', 'xAxis')
      .call(xAxis)

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .enter()
      .append('rect')

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .exit()
      .remove()

    select(node)
      .selectAll('rect')
      .data(this.props.data)
      .style('fill', '#fe9922')
      .attr('x', (d,i) => i * barSize + chartPadding)
      .attr('y', d => this.props.size[1] - dataScale(d) + chartPadding)
      .attr('height', d => dataScale(d))
      .attr('width', barSize)
   }

render() {
  return <svg ref={node => this.node = node}
  width={700} height={700}>
  </svg>
 }
}
export default BarChart
