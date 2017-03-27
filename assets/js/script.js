$(function () {
  // console.log('linked')

  // HELPER
  Array.prototype.shuffle = function (arr) {
    for (var i = this.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1))
      var temp = this[i]
      this[i] = this[j]
      this[j] = temp
    }
    return this
  }

  String.prototype.substringUntil = function (limit) {
    var limitIndex = this.indexOf(limit)
    return this.substring(0, limitIndex)
  }

  function itemShuffle (arr) {
    var randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex]
  }

  function updateBackground (imgSrc) {
    $('body').css({
      'background-image': 'url("' + imgSrc + '")',
      'background-size': 'cover'
    })
  }

  function updateMusic (audioSrc) {
    // $('audio')[0].stop()

    $('audio').attr({
      'src': audioSrc
    })

    $('audio')[0].play()
  }

  // CONSTRUCTOR
  function Reeler (prop) {
    this.prop = prop
    this.tunefindURL = 'https://www.tunefind.com/api/v1/movie'
    this.username = 'ae74be736f4a59ab6b25b012248a1ef9'
    this.password = '699f38f8f30c9a5a6e3c58e5b738ad32'
    this.movieLimit = 100
    this.$body = $('body')
    this.movies = null
    this.currMovie = null
  }

  Reeler.prototype.init = function () {
    $.get({
      jsonp: 'callback',
      dataType: 'jsonp',
      url: this.tunefindURL + '?limit=' + this.movieLimit,
      headers: {
        'Authorization': 'Basic ' + (this.username + ':' + this.password)
      }
    }).done(function (data) {
      this.movies = data.movies.shuffle()
      this.currMovie = itemShuffle(this.movies)
      var bgMovie = this.currMovie.thumb_url.substringUntil('?')
      updateBackground(bgMovie)
      $.get({
        jsonp: 'callback',
        dataType: 'jsonp',
        url: this.tunefindURL + '/' + this.currMovie.id,
        headers: {
          'Authorization': 'Basic ' + (this.username + ':' + this.password)
        }
      }).done(function (data) {
        if (data.songs) {
          var randomSong = itemShuffle(data.songs)
          updateMusic(randomSong.preview_url)
        } else {
          alert('movie dont have songs lol')
        }
      })
    }.bind(this))
  }

  Reeler.prototype.nextMovie = function () {
    this.currMovie = itemShuffle(this.movies)
    var bgMovie = this.currMovie.thumb_url.substringUntil('?')
    console.log(this.currMovie.id)
    updateBackground(bgMovie)

    $.get({
      jsonp: 'callback',
      dataType: 'jsonp',
      url: this.tunefindURL + '/' + this.currMovie.id,
      headers: {
        'Authorization': 'Basic ' + (this.username + ':' + this.password)
      }
    }).done(function (data) {
      if (data.songs) {
        var randomSong = itemShuffle(data.songs)
        updateMusic(randomSong.preview_url)
      } else {
        alert('movie dont have songs lol')
      }
    })
  }

  var reeler = new Reeler()
  reeler.init()

  var $button = $('button')

  // setInterval(reeler.nextMovie.bind(reeler), 10000)
  $button.on('click', function () {
    reeler.nextMovie()
  })
})
