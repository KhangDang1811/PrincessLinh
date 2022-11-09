const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const logo = $('.logo')
const download = $('.download')
const btnPlayPause = $('.playPause')
const btnPlay = $('.play')
const h = ":sptth"
const l = "87ituP"
const trungMusic = l + "/moc.koobecaf//" + h
const audio = $('.audio')
const reload = $('.reload')
const left = $('.left')
const right = $('.right')

const app = {
  songStart: 0,
  textData: {
    logo: "Ông chã của Khánh Linh",
    fb: "https://www.facebook.com/dangchauhoangkhang/",
  },
  music: [
    {
      name: "Từ thích em thành yêu em (ver1)",
      singer: "Ông chã chứ ai",
      img: "./access/imgs/1.jpg",
      link: "./access/music/ver1.mp4"
    }, {
      name: 'Từ thích em thành yêu em (ver2)',
      singer: 'Chồng của em chứ ai',
      img: './access/imgs/2.jpg',
      link: './access/music/ver2.mp4'
    },
    {
      name: 'Suýt nữa thì',
      singer: 'Anh iuu chứ ai',
      img: './access/imgs/3.jpg',
      link: './access/music/SNT.mp4'
    },
    {
      name: 'Đường một chiều của anh',
      singer: 'Lại là anh chứ ai',
      img: './access/imgs/4.jpg',
      link: './access/music/DMC.mp4'
    },
    {
      name: 'Đường một chiều của em',
      singer: 'Em iuu hát chứ ai ',
      img: './access/imgs/5.jpg',
      link: './access/music/EM.mp4'
    },
    {
      name: 'Một cú lừa',
      singer: 'Lại là anh chứ ai',
      img: './access/imgs/6.jpg',
      link: './access/music/MCL.mp4'
    },
    {
      name: 'Đừng lo anh đợi mà',
      singer: 'anh x7 chứ ai',
      img: './access/imgs/7.jpg',
      link: './access/music/BLMD.mp4'
    },
    {
      name: 'Cánh hồng phai',
      singer: 'anh x8 chứ ai',
      img: './access/imgs/9.jpg',
      link: './access/music/CHP.mp4'
    }
  ],
  view: function () {
    const _this = this
    // -------text Logo--------
    const logoContent = `${_this.textData.logo}`
    const UpperCase = logoContent.split(" ").map(item => item[0].toLocaleUpperCase() + item.slice(1))
    logo.textContent = UpperCase.join("")
  },
  btnPlay: function () {
    const _this = this
    btnPlayPause.style.display = "none"
    reload.onclick = () => {
      audio.load()
    }


    btnPlay.onclick = () => {
      btnPlayPause.style.display = "block"
      btnPlay.style.display = "none"
      audio.pause()
    }


    btnPlayPause.onclick = () => {
      btnPlayPause.style.display = "none"
      btnPlay.style.display = "block"
      audio.play()
    }

    right.onclick = function () {
      _this.nextSong()
      audio.play()
      _this.download()
      btnPlayPause.style.display = "none"
      btnPlay.style.display = "block"
    }
    left.onclick = function () {
      _this.backSong()
      audio.play()
      _this.download()
      btnPlayPause.style.display = "none"
      btnPlay.style.display = "block"
    }
  },
  download: function () {
    const _this = this
    download.onclick = () => {
      const link = _this.music[_this.songStart].link
      download.innerHTML += `<a href="${link}" style="display:none;" class="clickDownload"></a>`
      $('.clickDownload').click()
    }
  }
  ,
  startMusic: function () {
    const _this = this
    $(".audio").setAttribute("src", `${_this.music[_this.songStart].link}`)

  },
  nextSong: function () {
    const _this = this
    _this.songStart++
    if (_this.songStart >= _this.music.length) {
      _this.songStart = 0
      _this.startMusic()
    }

    audio.onended = function () {
      right.click()
    }
    _this.startMusic()
    _this.viewListSong()

  },
  backSong: function () {
    const _this = this
    _this.songStart--
    if (_this.songStart <= 0) {
      _this.songStart = _this.music.length - 1
      _this.startMusic()
    }
    _this.startMusic()
    _this.viewListSong()

  },
  btnMenu: function () {
    const faXmark = $('.fa-xmark')
    const faBars = $('.fa-bars')
    const menu = $('.menu')


    faBars.onclick = () => {
      menu.classList.remove("close")
    }
    faXmark.onclick = () => {
      menu.classList.add("close")
    }

  },
  viewListSong: function () {
    const _this = this
    const listSong = $('.listSong__list')
    const trung = trungMusic
    const trungdz = trung.split("").reverse().join("")
    const html = _this.music.map((trung, index) => {
      return `
      <div class="listSong__list--Card ${index === _this.songStart ? 'active' : ''} " data-trung="${index}">
        <div class="Card--left">
          <img src="${trung.img}" alt="" class="avatar">
        </div>
        <div class="Card--content">
          <p class="name">${trung.name}</p>
          <p class="singer">${trung.singer}</p>
        </div>
        <div class="Card--right">
          <i class="fa-solid fa-play class="playPause"></i>
          <i class="fa-solid fa-pause" class="play"></i>
        </div>
      </div>
      `
    })
    
    listSong.innerHTML = html.join('')
    const listCard = document.querySelector('.listSong__list')
    listCard.onclick = function (e) {
      const songNode = e.target.closest('.listSong__list--Card:not(.active)')
      if (songNode) {
        const runing = _this.music[_this.songStart]
        //chuyển đổi qua Number nếu ko nó sẽ ko có active nhé . Xi đa vlin
        _this.songStart = Number(songNode.dataset.trung)
        _this.startMusic()
        _this.viewListSong()
        audio.play()
      }
    }
  },

  start: function () {
    const _this = this
    _this.songStar
    _this.startMusic()
    _this.download()
    _this.view()
    _this.btnMenu()
    _this.viewListSong()
    _this.btnPlay()
  }
}

app.start()
