animationTick = false;

// const player = {
//     currentXp: false,
//     maxXp: false,
//     init() {
//         console.log('%c player.init','color: pink');

//         this.currentXp = 20;
//         this.maxXp = 100;
//     },
//     gainXp(amount) {
//         console.log('%c player.gainXp','color: pink');

//         this.currentXp+=amount;
//         save();
//         this.render();
//     },
//     render () {
//         console.log('%c player.render','color: pink');

//         if (this.currentXp > 0) {
//             document.getElementById('xp_div').style.width = 100*this.currentXp/this.maxXp + 'vw';
//         } else {
//             document.getElementById('xp_div').style.width = 0 + 'px';
//         }
//     }
// }

runAnimation = () => {
    animationTick = setInterval(animation, 500);
}

stopAnimation = () => {
    clearInterval(animationTick);
    animationTick = false;
}

animation = () => {
}


newGame = () => {
    console.log('%c newGame','color: purple');

    player.init();
}

save = () => {
    localStorage.setItem('playerCurrentXp', player.currentXp);
    // localStorage.setItem('playerRank', JSON.stringify(rankArr));

}

loadSave = () => {
    console.log('%c loadSave','color: purple');

    player.currentXp = parseInt(localStorage.getItem('playerCurrentXp'));
    // player.egg = parseInt(localStorage.getItem('playerEgg'));
}

reset = () => {
    localStorage.clear();
    // window.location.reload();
}

// void function main() {
//     console.log('%c void function main','color: orange');
//     localStorage.length ? loadSave() : newGame();
//     player.render();
// }();