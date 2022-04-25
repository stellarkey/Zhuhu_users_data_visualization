class D3Demo {
  constructor() {  }

  create_d3_demo_name_locations(element_id){
    open_loading_preview();
    
    document.getElementById(element_id).innerHTML = '<svg width="1200" height="750" id="Map_svg" class="svgs" style="display: block; margin: 0 auto;"></svg>';
    
    let d3_svg = d3.select(document.getElementById("Map_svg")).node();
    $.getJSON("data/China.json").then(async data => {
      
      const svg = d3.select(d3_svg);
      const width = svg.attr('width');
      const height = svg.attr('height');
      const margin = { top: 60, right: 0, bottom: 0, left: 0 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
      const mainGroup = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

      const tip = d3.tip()
        .attr('class', 'd3-tip')
        .html((event, d) => d.properties.name);
      mainGroup.call(tip);

      const projection = d3.geoNaturalEarth1();
      // const projection = d3.geoMercator();
      // const projection = d3.geoMollweide();
      // const projection = d3.geoNicolosi();
      // const projection = d3.geoIdentity();
      projection.fitSize([innerWidth, innerHeight], data);
      const path = d3.geoPath().projection(projection);
      mainGroup.selectAll('path').data(data.features).join('path')
        .attr('stroke', 'black').attr('fill', 'white')
        .attr('d', path)
        .attr('id', d => d.properties.name)
        .on('mouseover', function(d, i) {
          tip.show(d, i);
        })
        .on('mouseout', function(d, i) {
          tip.hide(d, i);
        });

      close_loading_preview();
    })
  }
}