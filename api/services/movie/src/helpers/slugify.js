import slugify from 'slugify'

export default string =>
  slugify(string, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
    replacement: '-'
  })
