export default function (tooltip) {
  // Tooltip Element
  var tooltipEl = document.getElementById('chartjs-tooltip')
  if (!tooltipEl) {
    tooltipEl = document.createElement('div')
    tooltipEl.id = 'chartjs-tooltip'
    tooltipEl.innerHTML = '<table></table>'
    document.body.appendChild(tooltipEl)
  }
  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0
    return
  }
  // Set caret Position
  tooltipEl.classList.remove('above', 'below', 'no-transform')
  if (tooltip.yAlign) {
    tooltipEl.classList.add(tooltip.yAlign)
  } else {
    tooltipEl.classList.add('no-transform')
  }
  function getBody (bodyItem) {
    return bodyItem.lines
  }
  // Set Text
  if (tooltip.body) {
    var titleLines = tooltip.title || []
    var bodyLines = tooltip.body.map(getBody)
    // PUT CUSTOM HTML TOOLTIP CONTENT HERE (innerHTML)
    var innerHtml = '<thead>'
    titleLines.forEach(function (title) {
      innerHtml += '<tr><th>' + title + '</th></tr>'
    })
    innerHtml += '</thead><tbody>'
    bodyLines.forEach(function (body, i) {
      var colors = tooltip.labelColors[i]
      var style = 'background:' + colors.backgroundColor
      style += '; border-color:' + colors.borderColor
      style += '; border-width: 2px'
      var span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>'
      innerHtml += '<tr><td>' + span + body + '</td></tr>'
    })
    innerHtml += '</tbody>'
    var tableRoot = tooltipEl.querySelector('table')
    tableRoot.innerHTML = innerHtml
  }
  var position = this._chart.canvas.getBoundingClientRect()
  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1
  tooltipEl.style.left = position.left + tooltip.caretX + 'px'
  tooltipEl.style.top = position.top + tooltip.caretY + 'px'
  tooltipEl.style.fontFamily = tooltip._fontFamily
  tooltipEl.style.fontSize = tooltip.fontSize
  tooltipEl.style.fontStyle = tooltip._fontStyle
  tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px'
};
