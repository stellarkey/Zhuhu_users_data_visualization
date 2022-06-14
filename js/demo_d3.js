class D3Demo {
  constructor() {  }

  create_d3_demo_name_locations(element_id){
    open_loading_preview();
    
    document.getElementById(element_id).innerHTML = '<svg id="Map_svg" class="svgs" style="display: block; margin: 0 auto;"></svg>';
    
    let d3_svg = d3.select(document.getElementById("Map_svg")).node();
    $.getJSON("data/China.json").then(data => {
      $.getJSON("data/count_analytics/locations_count.json").then(data_count => {
        const svg = d3.select(d3_svg);
        svg.attr("width",  window.innerWidth * 0.75);
        svg.attr("height", window.innerWidth * 0.55);
        const width = svg.attr('width');
        const height = svg.attr('height');
        const margin = { top: 60, right: 0, bottom: 0, left: 0 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        const mainGroup = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // 加入知乎统计数据
        let dict_filtered_name = {};
        for(let ele in data.features){
          // console.log("[data_count]:",data_count["北京"])
          let name = data.features[ele].properties.name;
          dict_filtered_name[name] = data_count[name];
          if(name in data_count){
            data.features[ele].properties.count = data_count[name];
            // console.log("[ele]:", data.features[ele].properties.count)
          }
        }
        let sum = 0 , max_dict_filtered_name = 0;
        for(let ele in data_count){
          if(ele in dict_filtered_name){
            sum += data_count[ele];
            max_dict_filtered_name = Math.max(max_dict_filtered_name, data_count[ele]);
          }
        }
        for(let ele in data.features){
          let name = data.features[ele].properties.name;
          if(name in data_count){
            data.features[ele].properties.proportion = data_count[name] / sum;
          }
        }

        // 标签
        const tip = d3.tip()
          .attr('class', 'd3-tip')
          .html((event, d) => d.properties.name + ": " + d.properties.count + " (" + Math.round((d.properties.proportion) * 10000)/100 + "%)");
        mainGroup.call(tip);

        const projection = d3.geoNaturalEarth1();
        // const projection = d3.geoMercator();
        // const projection = d3.geoMollweide();
        // const projection = d3.geoNicolosi();
        // const projection = d3.geoIdentity();
        projection.fitSize([innerWidth, innerHeight], data);
        const path = d3.geoPath().projection(projection);
        var myColor = d3.scaleSequential()
          .domain([0, Math.log(max_dict_filtered_name)])
          // .range(["white", "blue"]);
          .interpolator(d3.interpolateOrRd);
        mainGroup.selectAll('path').data(data.features).join('path')
          .attr('stroke', 'black').attr('fill', 'white')
          .attr('d', path)
          .attr('id', d => d.properties.name)
          .attr('opacity', 0.75)
          .on('mouseover', function(d, i) {
            tip.show(d, i);
            d3.select(this)
              .attr('opacity', 1);
          })
          .on('mouseout', function(d, i) {
            tip.hide(d, i);
            d3.select(this)
              .attr('opacity', 0.75);
          })
          .transition()
            .ease(d3.easeExpInOut)
            .duration(1500)
            .attr('fill', d => myColor(Math.log(d.properties.count)) );
        
        close_loading_preview();
      })
    })
  }
}