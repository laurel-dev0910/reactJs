class Utils {
  public static getToken() {
    return localStorage.getItem('token')
  }
  public static formatCurrency(cur: string | number) {
    if (!cur) return 0
    return new Intl.NumberFormat('en-US').format(+cur)
  }
}

export default Utils
