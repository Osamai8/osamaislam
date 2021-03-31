const musicContainer = document.getElementById('music-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');

const music = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// song totles
// const songs = ['Smack That', 'Baba Yaga', 'Vroom Vroom']
const songs = [
	{name:'ice cream', title:'Ice Cream - Salena Gomez'},
	{name:'karma', title:'Baba Yaga - Karma'},
	{name:'vroom', title:'Vroom Vroom - Charlie XCX'}
];
// keep travk of song
let songIndex = 2;

let isPlaying = false;

const playMusic = () => {
	isPlaying = true;
	musicContainer.classList.add('play');
	playBtn.querySelector('i.fas').classList.remove('fa-play');
	playBtn.querySelector('i.fas').classList.add('fa-pause');
	music.play();
};
const pauseMusic = () => {
	isPlaying = false;
	music.pause();
	musicContainer.classList.remove('play');
	playBtn.querySelector('i.fas').classList.remove('fa-pause');
	playBtn.querySelector('i.fas').classList.add('fa-play');
};

playBtn.addEventListener('click', () =>{
	// if(isPlaying){
	// 	pauseMusic();
	// } else{
	// 	playMusic();
	// }
	// OR
	isPlaying ? pauseMusic() : playMusic();
});
 
const loadSong = (songs) =>{
 	title.textContent = songs.title;
 	music.src = songs.name + '.mp3';
 	cover.src = songs.name + '.jpg';
};

function prevSong(){
	songIndex--;
	if(songIndex < 0){
		songIndex = songs.length - 1;
	}
	loadSong(songs[songIndex]);
	playMusic();
}
function nextSong(){
	songIndex++;
	if(songIndex > songs.length - 1){
		songIndex = 0;
	}
	loadSong(songs[songIndex]);
	playMusic();
}
// update progress
function updateProgress(e){
	const{duration, currentTime} = e.srcElement;
	// console.log(duration, currentTime);
	const progressPercent = (currentTime / duration) * 100;
	// console.log(progressPercent);
	progress.style.width =  progressPercent + '%';

}
// set progress
function setProgress(e){
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = music.duration;
	music.currentTime = (clickX / width) * duration;
}
// CHANGE TO NEXT AND PREVIOUS SONG
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// PROGRESS BAR UPDATES
music.addEventListener('timeupdate', updateProgress);
// DRAG PROGRESS BAR
progressContainer.addEventListener('click', setProgress);
// song ends
music.addEventListener('ended', nextSong);