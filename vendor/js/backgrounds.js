function backgrounds(){ 
  var backImg = ['src/imgs/1.jpg', 'src/imgs/2.jpg', 'src/imgs/3.jpg', 'src/imgs/4.jpg', 'src/imgs/5.jpg', 'src/imgs/6.jpg', 'src/imgs/7.jpg', 'src/imgs/8.jpg', 'src/imgs/9.jpg', 'src/imgs/10.jpg', 'src/imgs/11.jpg', 'src/imgs/12.jpg', 'src/imgs/13.jpg', 'src/imgs/14.jpg', 'src/imgs/15.jpg', 'src/imgs/16.jpg', 'src/imgs/17.jpg', 'src/imgs/18.jpg', 'src/imgs/19.jpg', 'src/imgs/20.jpg', 'src/imgs/21.jpg', 'src/imgs/22.jpg', 'src/imgs/23.jpg'];
  var today = new Date();
  var day = today.getDate();
  document.getElementById("imageBG").style.backgroundImage = 'url('+backImg[day % backImg.length]+')';
}

backgrounds();