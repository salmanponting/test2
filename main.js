function calculator() {
  return {
    usedKeyboard: false,
    formula: '',
    updateTotal(nextInput) {
      if (this.startsWithOperator(nextInput)) return
      if (this.hasDoubleOperators(nextInput)) return

      if (nextInput === 'BS') {
        // Baackspace
        this.formula = this.formula.slice(0, -1)
      } else if (nextInput === '') {
        // Clear
        this.formula = ''
      } else {
        this.formula = this.formula + nextInput
      }

    },
    get total() {
      let total = 0
      let temp
      temp = this.formula.match(/[+\-]*(\.\d+|\d+(\.\d+)?)/g) || []
      while (temp.length) {
        total += parseFloat(temp.shift())
      }
      return total
    },
    hasDoubleOperators(nextInput) {
      return ['+', '-'].includes(nextInput.slice(-1)) && ['+', '-'].includes(this.formula.slice(-1))
    },
    startsWithOperator(nextInput) {
      return ['+', '-'].includes(nextInput) && !this.formula.length
    }
  }
}