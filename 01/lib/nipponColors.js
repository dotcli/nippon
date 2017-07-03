import colors from 'nippon-colors'

const NipponColors = {
  random() {
    return colors[ randI(colors.length) ]
  }
}

function randI(range) {
  return Math.floor(Math.random() * range)
}

export default NipponColors
