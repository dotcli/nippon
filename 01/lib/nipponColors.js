import colors from 'nippon-colors'
import chroma from 'chroma-js'

const NipponColors = {
  random() {
    return colors[ randI(colors.length) ].value
  },
  // get color groups that are similar
  // get colors that are far
  // return a pair of colors
  /**
   * get color groups that are similar
   * if color supplied, return array of that color + similar color
   * if no color supplied, return array of similar color
   */
  similar(amt, root) {
    if (!root) root = this.random()
    let sortedColors = colors.sort((a, b) => {
      return chroma.deltaE(root, a.value) - chroma.deltaE(root, b.value)
    })
    return sortedColors.slice(0, amt).map(c => c.value)
  },
  /**
   * get colors that are contrasting
   * if color supplied, return a pair of that color + random contrasting color
   * if no color supplied, return a random pair of contrasting colors
   */
  contrast(root) {
    if (!root) root = this.random()
    let sortedColors = colors.sort((a, b) => {
      return chroma.deltaE(root, a.value) - chroma.deltaE(root, b.value)
    })
    return sortedColors.slice(-1).map(c => c.value)[0]
  }
}

function randI(range) {
  return Math.floor(Math.random() * range)
}

export default NipponColors
