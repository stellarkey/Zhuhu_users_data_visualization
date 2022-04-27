class BarplotDemo {
  constructor() {  }
  create_demo_barplot_locations_at(element_id){
    open_loading_preview();
    document.getElementById(element_id).innerHTML = `
      <svg id="bar_svg" class="svgs" style="display: block; margin: 0 auto;"></svg>
    `;
    
    let d3_svg = d3.select(document.getElementById("bar_svg")).node();
    $.getJSON("data/count_analytics/locations_count.json").then(data => {
      // 只取前30名
      data = data.slice(0,30);

      const svg = d3.select(d3_svg);
      svg.attr("width",  window.innerWidth * 0.75);
      svg.attr("height", window.innerHeight * 0.75);
      const width = svg.attr('width');
      const height = svg.attr('height');
      const margin = { top: 60, right: 0, bottom: 0, left: 0 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
      const mainGroup = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
      const xValue = d => d.location;
      const yValue = d => d.count;
      const xScale = d3.scaleBand();
      const yScale = d3.scaleLinear();
      // console.log(data);
      
      
      // 饼图参数
      const subGroup = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
      const path = d3.arc().innerRadius(window.innerHeight * 0.05).outerRadius(window.innerHeight * 0.2);
      const path_highlight = d3.arc().innerRadius(window.innerHeight * 0.08).outerRadius(window.innerHeight * 0.25);
      const pie = d3.pie().value(yValue);
      const arcData = pie(data);
  
        
      svg.append("text")
        .attr("id", "locations-title")
        .attr("transform",
          "translate(" + (width/2) + " ," + 
                          (0.5*margin.top) + ")")
        .style("text-anchor", "middle")
        .style("font-size", "1.5em")
        .text("用户分布地理位置可视化（柱状图）");

      const tip = d3.tip()
        .attr('class', 'd3-tip')
        .html((event, d) => d.location + ": " + d.count);
      mainGroup.call(tip);

      const tip2 = d3.tip()
        .attr('class', 'd3-tip')
        .html((event, d) => d.location + ": " + d.count);
      subGroup.call(tip2);

      
      xScale.domain(data.map(xValue)).range([0, innerWidth]).padding(0.1);
      yScale.domain([0, d3.max(data, yValue)]).range([0, innerHeight]);
      
      var myColor = d3.scaleSequential().domain([1,data.length])
        .interpolator(d3.interpolateRdYlGn);
      mainGroup.selectAll('rect').data(data).join('rect')
        .attr("id", (d, i) => "rect"+i)
        .attr('width', xScale.bandwidth())
        // .attr('width', d => 0)
        .attr('height', 0)
        .attr('x', d => xScale(xValue(d)))
        .attr('y', d => innerHeight)
        .attr('count', xValue)
        .attr('location', yValue)
        .attr('opacity', 0.75)
        .on('mouseover', function(e, d) {
          tip.show(e, d);
          d3.select(this)
            .attr('opacity', 1);
          let selector = `#${d3.select(this).attr("id").replace("rect", "path")}`;
          d3.select(selector)
            .transition()
              .duration(300)
              .attr('opacity', 1)
              .attr("d", path_highlight);
        })
        .on('mouseout', function(e, d) {
          tip.hide(e, d);
          d3.select(this)
            .attr('opacity', 0.75);
          let selector = `#${d3.select(this).attr("id").replace("rect", "path")}`;
          d3.select(selector)
            .transition()
              .duration(300)
              .attr('opacity', 0.75)
              .attr("d", path);
        })
        .transition()
          .ease(d3.easeExpInOut)
          .duration(1500)
          .attr('height', d => yScale(yValue(d)))
          .attr('y', d => innerHeight - yScale(yValue(d)))
          .style("fill", function(d,i) { return myColor(i) });
      
      
      
      
      
      const color = d3.scaleOrdinal()
        .domain(data.map(xValue))
        .range(d3.schemeSet2.concat(d3.schemeSet3));
      
      subGroup.selectAll('path').data(arcData).join('path')
        .attr("id", (d, i) => "path"+i)
        .attr('count', xValue)
        .attr('location', yValue)
        .attr('transform', `translate(${width * 0.80}, ${height * 0.35})`)
        .attr('fill', d => color(d.data.location))
        .attr('opacity', 0.75)
        .on('mouseover', function(e, d) {
          tip2.show(e, d.data);
          d3.select(this)
            .transition()
              .duration(300)
              .attr('opacity', 1)
              .attr("d", path_highlight);
          let selector = `#${d3.select(this).attr("id").replace("path", "rect")}`;
          d3.select(selector)
            .attr('opacity', 1);
        })
        .on('mouseout', function(e, d) {
          tip2.hide(e, d.data);
          d3.select(this)
            .transition()
              .duration(300)
              .attr('opacity', 0.75)
              .attr("d", path);
          let selector = `#${d3.select(this).attr("id").replace("path", "rect")}`;
          d3.select(selector)
            .attr('opacity', 0.75);
        })
        .transition()
          .delay(function(d, i) { return i * 1500 / data.length; })
          .duration(1500 / data.length)
          .attr('d', path)
          .attrTween('d', function(d) {
            var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
            return function(t) {
                d.endAngle = i(t);
                // console.log(d);
              return path(d);
            }
          });

      close_loading_preview();
    })
  }
}