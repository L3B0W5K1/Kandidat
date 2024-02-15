document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.map-thumbnail');
    const mapImage = document.getElementById('map-image');
    const nodes = document.querySelectorAll('.node');

    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', function() {
        const mapSrc = thumbnail.getAttribute('data-src');
        mapImage.src = mapSrc;

        // Hide all nodes
        nodes.forEach(node => {
          node.style.display = 'none';
        });

        // Show nodes corresponding to the selected map
        const mapClass = thumbnail.getAttribute('data-map');
        const nodesToShow = document.querySelectorAll(`.node.${mapClass}`);
        nodesToShow.forEach(node => {
          node.style.display = 'block';
        });
      });
    });

    // Show nodes for the default map
    const defaultMap = document.querySelector('.map-thumbnail');
    const defaultMapClass = defaultMap.getAttribute('data-map');
    const defaultNodesToShow = document.querySelectorAll(`.node.${defaultMapClass}`);
    defaultNodesToShow.forEach(node => {
      node.style.display = 'block';
    });
  });