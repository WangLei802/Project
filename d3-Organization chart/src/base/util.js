class Util {
  static appendFront0 (numStr) {
    if (numStr.length !== 2) {
      return '0' + numStr
    } else {
      return numStr
    }
  }
  // 第二个canvas画布的每个节点的随机色函数
  static randomColor () {
    let letters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }
  // 从画布获取颜色
  static getColorStrFromCanvas (context, xIndex, yIndex) {
    let pixelData = context.getImageData(xIndex, yIndex, 1, 1).data
    return '#' + Util.appendFront0(pixelData[0].toString(16)) +
      Util.appendFront0(pixelData[1].toString(16)) +
      Util.appendFront0(pixelData[2].toString(16))
  }
  // 字体大小
  static text (ctx, text, x, y, fontSize, fontColor) {
    ctx.font = '14px Arial'
    ctx.fillStyle = fontColor
    ctx.fillText(text, x, y)
  }

  static wrapText (context, text, x, y, maxWidth, lineHeight, fontColor) {
    context.fillStyle = fontColor
    let words = text.split(' ')
    let line = ''
    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' '
      let metrics = context.measureText(testLine)
      let testWidth = metrics.width
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y)
        line = words[n] + ' '
        y += lineHeight
      } else {
        line = testLine
      }
    }
    context.fillText(line, x, y)
  }
  // 父子节点之间的连线
  static roundRect (context, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === 'undefined') {
      stroke = true
    }
    if (typeof radius === 'undefined') {
      radius = 5
    }
    if (typeof radius === 'number') {
      radius = {tl: radius, tr: radius, br: radius, bl: radius}
    } else {
      let defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0}
      for (let side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side]
      }
    }
    context.beginPath()
    context.moveTo(x + radius.tl, y)
    context.lineTo(x + width - radius.tr, y)
    context.quadraticCurveTo(x + width, y, x + width, y + radius.tr)
    context.lineTo(x + width, y + height - radius.br)
    context.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height)
    context.lineTo(x + radius.bl, y + height)
    context.quadraticCurveTo(x, y + height, x, y + height - radius.bl)
    context.lineTo(x, y + radius.tl)
    context.quadraticCurveTo(x, y, x + radius.tl, y)
    context.closePath()
    if (fill) {
      context.fill()
    }
    if (stroke) {
      context.stroke()
    }
  }
}

export default Util
