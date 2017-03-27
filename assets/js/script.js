$(function () {
  // console.log('linked')

  function Reeler (prop) {
    this.prop = prop
    this.tunefind_url = 'https://crossorigin.me/https://www.tunefind.com/api/v1/movie'
    this.username = 'ae74be736f4a59ab6b25b012248a1ef9'
    this.password = '699f38f8f30c9a5a6e3c58e5b738ad32'
  }

  Reeler.prototype.nextMovie = function () {
    // get json from tunefind

    $.get({
      url: this.tunefind_url,
      username: this.username,
      password: this.password
    }).done(function (data) {
      console.log(data)
    })
  }

  var reeler = new Reeler()

  var $button = $('button')
  $button.on('click', function () {
    reeler.nextMovie()
  })
})
