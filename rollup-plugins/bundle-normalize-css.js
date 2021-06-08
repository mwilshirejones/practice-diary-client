import concat from 'concat-files'

export default function bundleNormalizeCss({ target }) {
  return {
    name: 'bundle-normalize-css',
    buildEnd: function() {
      if (!target) {
        console.log('Error: Please provide a `target` file.')
        throw new Error('Please provide a `target` file.')
      }

      const normalizeCss = __dirname + '/node_modules/normalize-css/normalize.css'
      const destination = __dirname + '/' + target

      concat(
        [ normalizeCss, destination ],
        destination,
        function(err) { 
          if (err) {
            console.log('Error:', err)
            throw Error 
          }
        },
      )
    },
  }
}
