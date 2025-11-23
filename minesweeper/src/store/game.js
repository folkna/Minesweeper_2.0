import { defineStore } from 'pinia';
import { Howl, Howler } from 'howler';

export const useGameStore = defineStore('game', {
    state: () => ({
        stage: 1,
        finalstage: 3,
        score: 0,
        flag: 0,
        size: 12,
        timer: 0,
        checker: 3,
        board: [],
        isshow_board: [],
        isshow_flag: [],
        color: [],

        face: {
            idle: "../../img/Idle_Smile_Face.gif",
            speaking: "../../img/Speaking_Smile_Face.gif",
            winning: "../../img/Winning_Smile_Face.gif",
        },

        face_gameover: {
            gameover_1: "../../img/Death_Smile_Face_1.gif",
            gameover_2: "../../img/Death_Smile_Face_2.gif",
            gameover_3: "../../img/Death_Smile_Face_3.gif",
        },

        current_face: null,
        current_sound_text: "",

        sound_checker1NB:
            [
                [new Howl({ src: ['../sounds/Check1_Sound1NB.mp3'], volume: 1.0 }), "Click safe now."],
                [new Howl({ src: ['../sounds/Check1_Sound2NB.mp3'], volume: 1.0 }), "Trust this one."],
                [new Howl({ src: ['../sounds/Check1_Sound3NB.mp3'], volume: 1.0 }), "No boom here."],
                [new Howl({ src: ['../sounds/Check1_Sound6NB.mp3'], volume: 1.0 }), "Board smiles now."]
            ],
        sound_checker1B:
            [
                [new Howl({ src: ['../sounds/Check1_Sound4B.mp3'], volume: 1.0 }), "Bomb."],
                [new Howl({ src: ['../sounds/Check1_Sound5B.mp3'], volume: 1.0 }), "Don't press it."],
            ],

        sound_checker2NB:
            [
                [new Howl({ src: ['../sounds/Check2_Sound1.mp3'], volume: 1.0 }), "Seems okay."],
                [new Howl({ src: ['../sounds/Check2_Sound2.mp3'], volume: 1.0 }), "Looks safe."],
                [new Howl({ src: ['../sounds/Check2_Sound3.mp3'], volume: 1.0 }), "Should be fine."],
            ],

        sound_checker2B:
            [
                [new Howl({ src: ['../sounds/Check2_Sound4.mp3'], volume: 1.0 }), "Maybe not..."],
                [new Howl({ src: ['../sounds/Check2_Sound5.mp3'], volume: 1.0 }), "Kinda scary."],
                [new Howl({ src: ['../sounds/Check2_Sound6.mp3'], volume: 1.0 }), "Don't trust it."],
            ],

        sound_checker3NB:
            [
                [new Howl({ src: ['../sounds/Check3_Sound1.mp3'], volume: 1.0 }), "Think it's safe."],
                [new Howl({ src: ['../sounds/Check3_Sound2.mp3'], volume: 1.0 }), "Should be okay."],
                [new Howl({ src: ['../sounds/Check3_Sound3.mp3'], volume: 1.0 }), "You can try."],
            ],

        sound_checker3B:
            [
                [new Howl({ src: ['../sounds/Check3_Sound4.mp3'], volume: 1.0 }), "Bad vibe..."],
                [new Howl({ src: ['../sounds/Check3_Sound5.mp3'], volume: 1.0 }), "Feels weird."],
                [new Howl({ src: ['../sounds/Check3_Sound6.mp3'], volume: 1.0 }), "Don't risk it."],
            ],

        sound_idle:
            [
                [new Howl({ src: ['../sounds/Idle_Sound1.mp3'], volume: 0.8 }), "Press something."],
                [new Howl({ src: ['../sounds/Idle_Sound2.mp3'], volume: 0.8 }), "Weak hand bro?"],
                [new Howl({ src: ['../sounds/Idle_Sound3.mp3'], volume: 0.8 }), "Still thinking?"],
                [new Howl({ src: ['../sounds/Idle_Sound4.mp3'], volume: 0.8 }), "Big brain? No?."],
                [new Howl({ src: ['../sounds/Idle_Sound5.mp3'], volume: 0.8 }), "Click faster dude."],
                [new Howl({ src: ['../sounds/Idle_Sound6.mp3'], volume: 0.8 }), "Scared of squares?"],
                [new Howl({ src: ['../sounds/Idle_Sound7.mp3'], volume: 0.8 }), "Wow... so slow."],
                [new Howl({ src: ['../sounds/Idle_Sound8.mp3'], volume: 0.8 }), "Need a tutor?"],
                [new Howl({ src: ['../sounds/Idle_Sound9.mp3'], volume: 0.8 }), "Bruh just click"],
                [new Howl({ src: ['../sounds/Idle_Sound10.mp3'], volume: 0.8 }), "Skill issue bro."],
            ],

        sound_background: {
            stage1_loop: new Howl({ src: ['../sounds/background/stage1_loop.wav'], volume: 0.3, loop: true }),
            stage1_checkmode: new Howl({ src: ['../sounds/background/stage1_checkmode.wav'], volume: 0.7, loop: true }),
            stage2_loop: new Howl({ src: ['../sounds/background/stage2_loop.wav'], volume: 0.3, loop: true }),
            stage2_checkmode: new Howl({ src: ['../sounds/background/stage2_checkmode.wav'], volume: 0.7, loop: true }),
            stage3_loop: new Howl({ src: ['../sounds/background/stage3_loop.wav'], volume: 0.3, loop: true }),
            stage3_checkmode: new Howl({ src: ['../sounds/background/stage3_checkmode.wav'], volume: 0.7, loop: true }),
            stage_win: new Howl({ src: ['../sounds/background/stage_win.mp3'], volume: 0.5, }),
            menu: new Howl({ src: ['../sounds/background/menu.mp3'], volume: 0.7, loop: true }),
            gameover: new Howl({ src: ['../sounds/background/game_over.mp3'], volume: 0.5 })
        },

        isstart: false,
        isgameover: false,
        iswinstage: false,
        checkmode: false,
        showstageinfo: false,
        intervalId: null,
    }),

    actions: {
        startGame() {
            this.showstageinfo = true;
            setTimeout(() => {
                this.isstart = true
                this.timer = 0
                this.intervalId = setInterval(() => { this.timer++; this.randomSound() }, 1000)
                this.current_face = this.face.idle;
                this.setBoard();
                this.showstageinfo = false;
                this.sound_background[`stage${this.stage}_loop`].play();
            }, 5000)
        },

        stopGame() {
            Howler.stop();
            clearInterval(this.intervalId);
            this.current_sound_text = "";
            this.isgameover = true;
            this.sound_background.gameover.play();
            const keys = Object.keys(this.face_gameover);
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            this.current_face = this.face_gameover[randomKey];

            this.sound_background.gameover.once("end", () => {
                this.isstart = false;
            })
        },

        setupGame() {
            let bomb = (this.size + 5) + ((this.stage - 1) * 5);
            this.flag = bomb;
            while (bomb > 0) {
                let row = Math.floor(Math.random() * this.size);
                let column = Math.floor(Math.random() * this.size);
                if (this.board[row][column] === 0) {
                    this.board[row][column] = 'B';
                    bomb--
                }
            }
            const directions = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1], [0, 1],
                [1, -1], [1, 0], [1, 1]
            ];
            
            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                    if (this.board[i][j] === 'B') {
                        directions.forEach(([dx, dy]) => {
                            let ni = i + dx;
                            let nj = j + dy;
                            if (ni >= 0 && ni < this.size && nj >= 0 && nj < this.size) {
                                if (this.board[ni][nj] !== 'B') {
                                    this.board[ni][nj]++;
                                }
                            }
                        });
                    }
                }
            }

            console.log(this.board)
        },

        setBoard() {
            this.board = Array.from({ length: this.size }, () => Array(this.size).fill(0));
            this.isshow_board = Array.from({ length: this.size }, () => Array(this.size).fill(false));
            this.isshow_flag = Array.from({ length: this.size }, () => Array(this.size).fill(false));
            this.color = Array.from({ length: this.size }, () => Array(this.size).fill(null))
            this.setupGame();
        },

        checkBomb(row, col) {
            if (this.isgameover || this.iswinstage) return;
            const directions = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1], [0, 1],
                [1, -1], [1, 0], [1, 1]
            ];

            const floodfill = (r, c) => {
                if (r < 0 || r >= this.size || c < 0 || c >= this.size) return;
                if (this.isshow_board[r][c] || this.isshow_flag[r][c]) return;

                const cell = this.board[r][c];

                if (cell === 'B') return;

                this.isshow_board[r][c] = true;

                if (cell === 0) {
                    directions.forEach(([dx, dy]) => floodfill(r + dx, c + dy));
                }
            };

            const clickedCell = this.board[row][col];
            if (clickedCell === 'B' && !this.isshow_flag[row][col]) {
                this.showBomb();
                return;
            }

            floodfill(row, col);
            this.checkEndStage();

        },

        setFlag(row, col) {
            if (this.isshow_board[row][col]) {
                return;
            }
            if (!this.isshow_flag[row][col] && this.flag > 0) {
                this.isshow_flag[row][col] = true;
                this.flag--;
            } else if (this.isshow_flag[row][col]) {
                this.isshow_flag[row][col] = false;
                this.flag++;
            }
        },

        setCheckMode() {
            if (this.iswinstage || this.isgameover) return;

            this.checkmode = !this.checkmode;

            const stages = Array.from({ length: this.finalstage }, (_, i) => i + 1);
            stages.forEach(s => {
                this.sound_background[`stage${s}_checkmode`]?.stop();
                this.sound_background[`stage${s}_loop`]?.stop();
            });

            if (this.checkmode) {
                this.sound_background[`stage${this.stage}_checkmode`]?.play();
            } else {
                this.sound_background[`stage${this.stage}_loop`]?.play();
            }
        },

        useChecker(row, col) {
            const positionCheck = this.board[row][col];

            if (this.checker <= 0 || !this.checkmode) return;

            let soundList = [];
            const prob_correct = [0.7, 0.8, 1];
            const prob = Math.random();

            if (((positionCheck === 'B') && (prob < prob_correct[this.checker - 1])) || ((positionCheck !== 'B') && (prob > prob_correct[this.checker - 1]))) {
                switch (this.checker) {
                    case 3: soundList = this.sound_checker1B; break;
                    case 2: soundList = this.sound_checker2B; break;
                    case 1: soundList = this.sound_checker3B; break;
                }
                this.color[row][col] = 'R';
            } else {
                switch (this.checker) {
                    case 3: soundList = this.sound_checker1NB; break;
                    case 2: soundList = this.sound_checker2NB; break;
                    case 1: soundList = this.sound_checker3NB; break;
                }
                this.color[row][col] = 'G';
            }

            Howler.stop();

            const [soundObj, message] = soundList[Math.floor(Math.random() * soundList.length)];

            this.current_face = this.face.speaking;
            this.current_sound_text = message;

            soundObj.play();
            this.sound_background[`stage${this.stage}_loop`].play();

            soundObj.once("end", () => {
                this.current_face = this.face.idle;
                this.current_sound_text = "";
            });
            this.checker--;
            this.checkmode = false;
        },

        showBomb() {
            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                    if (this.board[i][j] === 'B') {
                        this.isshow_board[i][j] = true
                    }
                }
            }
            this.stopGame();
        },

        checkEndStage() {
            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                    if (this.board[i][j] !== 'B' && !this.isshow_board[i][j]) {
                        return;
                    }
                }
            }
            this.iswinstage = true;
            this.score += 1000
            clearInterval(this.intervalId);

            this.sound_background[`stage${this.stage}_loop`].stop();
            this.current_face = this.face.winning;

            this.sound_background.stage_win.play();
            this.sound_background.stage_win.once("end", () => {
                this.decreaseScore(this.timer);
            })
        },

        decreaseScore(amount, duration = 800) {
            const startScore = this.score;
            const targetScore = Math.floor(Math.max(startScore - (amount * 0.5 * this.stage), 0));
            const diff = startScore - targetScore;
            const startTime = performance.now();

            const animate = (time) => {
                const elapsed = time - startTime;
                const progress = Math.min(elapsed / duration, 1);

                this.score = Math.floor(startScore - diff * progress);

                this.timer = Math.floor(diff * (1 - progress));

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
                else {
                    this.score = targetScore;
                    setTimeout(() => { this.nextStage() }, 500);
                }
            }

            requestAnimationFrame(animate);
        },

        nextStage() {
            if (!this.iswinstage) return;
            if (this.stage >= 3) {
                this.stopGame();
                return;
            }
            this.stage++;
            this.checker = 3;
            this.iswinstage = false;
            this.startGame();
        },

        playSoundMenu() {
            if (this.isstart || this.showstageinfo || this.isgameover) {
                this.sound_background.menu.stop();
                return;
            }
            if (this.sound_background.menu.playing()) {
                return;
            }
            this.sound_background.menu.play();
        },

        restartGame() {
            this.stage = 1;
            this.flag = 0;
            this.isgameover = false;
            this.start = false;
            this.timer = 0;
            this.score = 0;
            this.checker = 3;
            this.startGame();
        },

        randomSound() {
            if (this.current_sound_text === "" && !this.isgameover && this.isstart) {
                const prob = Math.random();

                if (prob <= 0.05 && this.sound_idle.length > 0) {

                    const [soundObj, message] = this.sound_idle[Math.floor(Math.random() * this.sound_idle.length)];

                    soundObj.play();
                    this.current_sound_text = message;
                    this.current_face = this.face.speaking;

                    soundObj.once("end", () => {
                        this.current_face = this.face.idle
                        this.current_sound_text = "";
                    });
                }
            }
        }

    },
})