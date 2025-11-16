const aspectRange = 10;

class Node {
    constructor(id, x, y, keyIcon, keyWhat, keyInfo, keySky, keyEarth, keyClose, keyFar, weight) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.keyIcon = keyIcon;
        this.keyWhat = keyWhat;
        this.keyInfo = keyInfo;
        this.keySky = keySky;
        this.keyEarth = keyEarth;
        this.keyClose = keyClose;
        this.keyFar = keyFar;
        this.weight = weight;
    }

    get xCoordinate() {
        return this.keyFar - this.keyClose;
    }

    get yCoordinate() {
        return this.keyEarth - this.keySky;
    }

    get keyWeight() {
        return Math.floor((this.keySky + this.keyEarth + this.keyClose + this.keyFar)/4);
    }
}

var n_empty = new Node (
    false, // id
    false, // x
    false, // y
    false, // keyIcon
    `Empty node`, // keyWhat
    `Info`, // keyInfo
    0, // keySky
    0, // keyEarth
    0, // keyClose
    0, // keyFar
    false, // weight
);

var n0 = new Node (
    false, // id
    false, // x
    false, // y
    false, // keyIcon
    `La porte de l'invisible doit être visible`, // keyWhat
    `Le mont analogue, René Daumal`, // keyInfo
    0, // keySky
    0, // keyEarth
    0, // keyClose
    0, // keyFar
    false, // weight
);

var n1 = new Node (
    false, // id
    false, // x
    false, // y
    false, // keyIcon
    `Vous autres enfants ordinaires, ne pouvez l'entendre, mais si cela vous arrivait jamais, il vous souviendrait alors que vous l'avez déjà entendu`, // keyWhat
    `Peter Pan, James M. Barrie`, // keyInfo
    22, // keySky
    29, // keyEarth
    44, // keyClose
    38, // keyFar
    false, // weight
);

const map = {
    board: [n0, n1],
    nodeCount: 0,
    // wSize: 40,
    // hSize: 70,
    init() {
        console.log('%c map.init','color: green'); 

        let mapPanel = document.getElementById('map_panel');


        // mapPanel.style.height = this.wSize + 'vh';
        // mapPanel.style.height = 'auto';
        // mapPanel.style.paddingTop = this.wSize + 'vw';

        for (let i = 0; i < this.board.length; i++) {
            this.nodeCount++;
            this.display(this.board[i], i);
        }

        this.checkAspect();
        this.render();
    },
    display(nodeToDisplay, index) {
        console.log('%c map.display','color: green');

        // MAP

        var nodeEntry = document.createElement('div');
        nodeEntry.classList = 'nodeEntry';
        nodeEntry.id = "div_" + map.nodeCount.toString();
        nodeToDisplay.id = nodeEntry.id;

        // var keyIcon = document.createElement('div');
        // keyIcon.classList = 'keyIcon';
        // var icon = document.createTextNode(`${nodeToDisplay.keyIcon}`);
        // keyIcon.appendChild(icon);
        // nodeEntry.appendChild(keyIcon);


        var keyWhat = document.createElement('div');
        keyWhat.classList = 'keyWhat';
        var what = document.createTextNode(`${index+1}. ${nodeToDisplay.keyWhat}`);
        keyWhat.appendChild(what);
        nodeEntry.appendChild(keyWhat);

        map_panel.appendChild(nodeEntry);

        let mapPanel = document.getElementById('map_panel').getBoundingClientRect();
        // mapPanel.left;
        // mapPanel.width;
        // mapPanel.top;
        // mapPanel.height;
        
        let nodeDiv = document.getElementById(nodeToDisplay.id).getBoundingClientRect();

        var getXCenter = mapPanel.left+mapPanel.width/2;
        var getYCenter = mapPanel.top+mapPanel.height/2;

        nodeToDisplay.x = nodeToDisplay.xCoordinate;
        nodeToDisplay.y = nodeToDisplay.yCoordinate;

        document.getElementById(nodeToDisplay.id).style.left = -nodeDiv.width/2+getXCenter+(mapPanel.width*(nodeToDisplay.x)/100) + 'px';
        document.getElementById(nodeToDisplay.id).style.top = -nodeDiv.height/2+getYCenter+(mapPanel.height*(nodeToDisplay.y)/100) + 'px';
    
        // INFO

        var nodeInfo = document.createElement('div');
        nodeInfo.classList = 'nodeInfo';

        var infoKeyWhat = document.createElement('div');
        infoKeyWhat.classList = 'infoKeyWhat';
        var what = document.createTextNode(`${nodeToDisplay.keyWhat}.`);
        infoKeyWhat.appendChild(what);

        nodeInfo.appendChild(infoKeyWhat);

        var infoKeyInfo = document.createElement('div');
        infoKeyInfo.classList = 'infoKeyInfo';
        var info = document.createTextNode(`${nodeToDisplay.keyInfo}.`);
        infoKeyInfo.appendChild(info);

        nodeInfo.appendChild(infoKeyInfo);

        nodeEntry.appendChild(nodeInfo);

        // DICTIONARY

        var semanticEntry = document.createElement('div');
        semanticEntry.classList = 'semanticEntry';

        var semanticWhat = document.createElement('div');
        semanticWhat.classList = 'semanticWhat';
        var semantic = document.createTextNode(`${index+1}. ${nodeToDisplay.keyWhat}.`);
        semanticWhat.appendChild(semantic);
        semanticEntry.appendChild(semanticWhat);

        var semanticInfo = document.createElement('div');
        semanticInfo.classList = 'semanticInfo';
        var info = document.createTextNode(`${nodeToDisplay.keyInfo}. Poids: ${nodeToDisplay.keyWeight}.`);
        semanticInfo.appendChild(info);
        semanticEntry.appendChild(semanticInfo);

        dictionary_panel.appendChild(semanticEntry);
    },
    drawRay(tile1, tile2, color) {
        console.log('%c map.getRay','color: pink');
  
        this.nodeCount++;

        var rayEntry = document.createElement('div');
        rayEntry.classList = 'rayEntry';
        rayEntry.id = "div_" + map.nodeCount.toString();
            
        map_panel.appendChild(rayEntry);

        var p1 = document.getElementById(tile1.id).getBoundingClientRect();
        var p2 = document.getElementById(tile2.id).getBoundingClientRect();

        let x1 = p1.left + p1.width/2;
        let x2 = p2.left + p2.width/2;

        let y1 = p1.top + p1.height/2;
        let y2 = p2.top + p2.height/2;

        let distance = Math.sqrt( (x1-x2) ** 2 + (y1-y2) ** 2);

        // if (distance < tile1.width) {
        //     rayEntry.style.backgroundColor = 'red';
        // }

        let xMid = (x1+x2)/2;
        let yMid = (y1+y2)/2;

        let slopeRad = Math.atan2(y1 - y2, x1 - x2);
        let slopeDeg = (slopeRad * 180)/Math.PI;

        rayEntry.style.width = distance+'px';
        rayEntry.style.top = yMid+'px';
        rayEntry.style.left = xMid - (distance/2)+'px';
        rayEntry.style.transform = `rotate(${slopeDeg}deg)`;

        rayEntry.style.backgroundColor = color;

        // rayEntry.animate([
        //     { opacity: '1' },
        //     { opacity: '0' },
        // ], {
        //     duration: 100,
        //     fill: 'forwards'
        // });

        // setTimeout(()=> {
        //     rayEntry.remove();
        // }
        // , 200);
        
    },
    checkRange(nodeOne, nodeTwo, range) {
        console.log('%c map.checkRange','color: pink');

        if (Math.abs(nodeOne.x - nodeTwo.x) < range && Math.abs(nodeOne.y - nodeTwo.y) < range) {
            return true;
        }
    },
    checkAspect() {
        console.log('%c map.checkAspect','color: pink');

        // alert(map.board[0].x + ', ' + map.board[0].y);
        // alert(map.board[1].x + ', ' + map.board[1].y);
        // alert(Math.abs(this.board[0].y - this.board[1].y));

        for (let i = 0; i < this.board.length; i++) {
            
            for (let t = 0; t < this.board.length; t++) {
                if (this.board[t] != this.board[i]) {
                    if (map.checkRange(this.board[t], this.board[i], aspectRange)) {
                        this.drawRay(this.board[t], this.board[i], 'black');
                    }
                    // if (Math.abs(this.board[t].x - this.board[i].x) < 10 && Math.abs(this.board[t].y - this.board[i].y) < 10) {
                    //     this.drawRay(this.board[t], this.board[i], 'black');
                    // }
                    // if (this.board[t].y == this.board[i].y) {
                    //     this.drawRay(this.board[t], this.board[i], 'black');
                    // }
                }
            }

        }
    },
    render() {
        console.log('%c map.render','color: pink');

        $.write('keyClose', `← proche de moi`);
        $.write('keyFar', `→ loin de moi`);
        $.write('keySky', `↑ ciel`);
        $.write('keyEarth', `↓ terre`);

        $.write('map_title', `KZ, carte heuristique de mots prélevés`);
        $.write('process_panel', `Protocole : prélever une phrase lue ou entendue. Contextualiser la phrase et sa situation d'énonciation à partir de critères subjectifs. Discriminer la phrase avec quatre questions "clés" : cette phrase est-elle proche du ciel ? proche de la terre ? proche de moi ? loin de moi ? Pour chacune des clés, répondre en donnant un score de 0 à 50. But : spatialiser les phrases poétiquement et créer des champs sémantiques d'interprétation. Le poids de la phrase correspond à son point d'équilibre, soit à la somme de ses clés. Le centre de la carte est nul et la somme de ses clés équivaut à 0. Les noeuds à moins de ${aspectRange} orbes forment des aspects entre eux. En fonction de leur nombre, les aspects délimitent le champ d'interprétation des noeuds concernés.`);

        // var mapTitle = document.createElement('div');
        // mapTitle.classList = 'mapTitle';
        // var title = document.createTextNode(`KZ : carte heuristique de mots prélevés`);
        // mapTitle.appendChild(title);

        // map_panel.appendChild(mapTitle);
    }
}

diagDist = (y0, x0, y1, x1) => {
    let diagY = y1 - y0;
    let diagX = x1 - x0;
    return Math.max(Math.abs(diagY), Math.abs(diagX));
}

loadSave = () => {
    console.log('%c loadSave','color: green');
}

void function main() {
    console.log('%c void function main','color: orange');

    localStorage.length ? loadSave() : map.init();
}();
