
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;
	this.effectFinished = false;

};

BasicGame.Preloader.prototype = {



	createPreloadEffect: function() {

		var bg = this.add.sprite(this.world.centerX, this.world.centerY, "preloader", "loadingBackground");
		bg.anchor.set(0.5,0.5);
		bg.scale.set(0.4,0.4);
		bg.alpha = 0;

		this.add.tween(bg).to({alpha: 1}, 250, Phaser.Easing.Linear.None, true);
		this.add.tween(bg.scale).to({x: 1, y: 1}, 250, Phaser.Easing.Linear.None, true);

		var txt = this.add.sprite(this.world.centerX, this.world.centerY-30, "preloader", "loadingText");
		txt.anchor.set(0.5,0.5);
		txt.scale.set(0.4,0.4);
		txt.alpha = 0;

		this.add.tween(txt).to({alpha: 1}, 250, Phaser.Easing.Linear.None, true, 250);
		this.add.tween(txt.scale).to({x: 1, y: 1}, 250, Phaser.Easing.Linear.None, true, 250).onComplete.add(function() {

			this.preloadEmpty.alpha = 1;
			this.preloadBar.alpha = 1;

			this.effectFinished = true;

		}, this);

		this.preloadEmpty = this.add.sprite(this.world.centerX-175, this.world.centerY, "preloader", 'preloaderBarEmpty');
		this.preloadEmpty.alpha = 0;

		this.preloadBar = this.add.sprite(this.world.centerX-175, this.world.centerY, "preloader", 'preloaderBarFull');
		this.preloadBar.alpha = 0;

		this.load.setPreloadSprite(this.preloadBar);
	},

	getPoints: function() {

		BasicGame.Pontuacao = null;

		if(!BasicGame.isOnline) {
			BasicGame.Pontuacao = {moedas: 0, xp: 0};
			return;			
		}

		
        BasicGame.OnlineAPI.obterPremiacao(
        	BasicGame.InitialLevel,
            function(resposta) { // sucesso

                BasicGame.Pontuacao = resposta;
                console.log("Pontuacao", resposta);

            }, function(erro) { // erro
                console.log( erro );
            }
        );

	},

	preload: function () {

		this.createPreloadEffect();
		
		this.getPoints();

		// HUD
		this.load.atlas('hud', 'GLOBAL/images/hud.png', 'GLOBAL/images/hud.json');

		// HUD Buttons
		this.load.atlas('hudVitoria', 			'GLOBAL/images/hud_vitoria.png', 		'GLOBAL/images/hud_vitoria.json');

		// ---- ANIMATIONS ----
		this.load.atlas('textoVitoria1', 'GLOBAL/images/textoVitoria1.png', 'GLOBAL/images/textoVitoria1.json');
		this.load.atlas('textoVitoria2', 'GLOBAL/images/textoVitoria2.png', 'GLOBAL/images/textoVitoria2.json');
		this.load.atlas('textoVitoria3', 'GLOBAL/images/textoVitoria3.png', 'GLOBAL/images/textoVitoria3.json');
		this.load.atlas('textoVitoria4', 'GLOBAL/images/textoVitoria4.png', 'GLOBAL/images/textoVitoria4.json');
		this.load.atlas('textoVitoria5', 'GLOBAL/images/textoVitoria5.png', 'GLOBAL/images/textoVitoria5.json');

		this.load.atlas('bumbaWin', 	'GLOBAL/images/bumba_win.png', 	'GLOBAL/images/bumba_win.json');
		this.load.atlas('fredWin', 		'GLOBAL/images/fred_win.png', 	'GLOBAL/images/fred_win.json');
		this.load.atlas('polyWin', 		'GLOBAL/images/poly_win.png', 	'GLOBAL/images/poly_win.json');
		this.load.atlas('juniorWin', 	'GLOBAL/images/junior_win.png', 'GLOBAL/images/junior_win.json');

		//this.load.atlas('kim', 			'../../../../GLOBAL/images/kim2.png', 		'../../../../GLOBAL/images/kim2.json');
		this.load.atlas('kim',          'GLOBAL/images/kim2.png',       'GLOBAL/images/kim2.json');




		// END GAME
		this.load.image('backgroundWin', 'GLOBAL/images/background_win.png');



		this.load.image('resumoText', 'images/resumoText.png');

		this.load.image('tutorialText1', 'images/tutorial_texto1.png');
		this.load.image('tutorialText2', 'images/tutorial_texto2.png');
		this.load.image('tutorialText3', 'images/tutorial_texto3.png');

		this.load.image('initialText', 'images/initialText.png');
		this.load.image('arrow', 'images/arrow.png');

		this.load.atlas('clickAnimation', 'images/click_animation.png', 'images/click_animation.json');
		
		this.load.atlas('sprites', 'images/JC-UV1AV1UD1OA02-Por-sprites.png', 'images/JC-UV1AV1UD1OA02-Por-sprites.json');

		this.load.atlas('bumba', 'images/JC-UV1AV1UD1OA02-Por-bumba.png', 'images/JC-UV1AV1UD1OA02-Por-bumba.json');
		this.load.atlas('fred', 'images/JC-UV1AV1UD1OA02-Por-fred.png', 'images/JC-UV1AV1UD1OA02-Por-fred.json');
		this.load.atlas('poly', 'images/JC-UV1AV1UD1OA02-Por-poly.png', 'images/JC-UV1AV1UD1OA02-Por-poly.json');
		this.load.atlas('walter_jr', 'images/JC-UV1AV1UD1OA02-Por-walter_jr.png', 'images/JC-UV1AV1UD1OA02-Por-walter_jr.json');

		// FONTS
		//this.load.bitmapFont('JandaManateeSolid', 'font/font.png', "font/font.fnt");
		this.load.bitmapFont('JandaManateeSolid', 'GLOBAL/font/font.png', "GLOBAL/font/font.fnt");
		
		this.load.audio('soundP1', ['sound/UV1AV1UD1OA2-P1.ogg']);
		this.load.audio('soundP2', ['sound/UV1AV1UD1OA2-P2.ogg']);
		this.load.audio('soundP3', ['sound/UV1AV1UD1OA2-P3.ogg']);
		this.load.audio('soundP4', ['sound/UV1AV1UD1OA2-P4.ogg']);


		this.load.audio('soundDica', ['sound/UV1AV1UD1OA2-DICA.ogg']);
		this.load.audio('soundFinal', ['sound/UV1AV1UD1OA2-FINAL.ogg']);
		this.load.audio('soundResumo', ['sound/UV1AV1UD1OA2-RESUMO.ogg']);
		this.load.audio('soundIntro', ['sound/UV1AV1UD1OA2-INTRO.ogg']);

		//this.load.audio('soundVitoria2', ['../../../../GLOBAL/sound/vitoria_muito_bom.mp3']);
		this.load.audio('hitErro', 		 ['GLOBAL/sound/Hit_Erro.ogg']);
		this.load.audio('hitAcerto', 	 ['GLOBAL/sound/Hit_Acerto.ogg']);
		this.load.audio('soundVitoria1', ['GLOBAL/sound/vitoria_demais.ogg']);
		this.load.audio('soundVitoria2', ['GLOBAL/sound/vitoria_muito_bem.ogg']);
		this.load.audio('soundVitoria3', ['GLOBAL/sound/parabens_conecturma.ogg']);
		this.load.audio('soundVitoria4', ['GLOBAL/sound/vitoria_uau.ogg']);
		this.load.audio('soundVitoria5', ['GLOBAL/sound/vitoria_vamos_em_frente.ogg']);
		this.load.audio('soundParabens', ['GLOBAL/sound/vitoria_isso_ai.ogg']);

		this.load.audio('backgroundMusic', ['GLOBAL/sound/looping_jogo.ogg']);
	},

	onLoseFocus: function() {
        if(this.game.paused) {
            return;
        }
        
        if(BasicGame.music) {
        	BasicGame.music.stop();
        	BasicGame.music = null;
        }

        this.sound.pauseAll();

        this.tweens.pauseAll();
        this.game.paused = true;

        this.pauseGroup = this.add.group();

        var bmp = this.add.bitmapData(this.game.width, this.game.height);
        bmp.rect(0,0,this.game.width, this.game.height, "rgba(0,0,0,0.5)");
        var img = this.add.image(0,0,bmp, 0, this.pauseGroup);

        var spr = this.add.sprite(this.world.centerX, this.world.centerY, "preloader", "buttonResumeGame", this.pauseGroup);
        spr.anchor.set(0.5,0.5);

        this.game.input.onDown.addOnce(this.resumeGame, this);
    },

    resumeGame: function() {
        if(this.game.paused) {
            this.pauseGroup.destroy(true);
            this.game.paused = false;
            this.sound.resumeAll();
            this.tweens.resumeAll();

            BasicGame.music = this.sound.play('backgroundMusic', 0.75, true);
        }
    },


	create: function () {
		this.preloadBar.cropEnabled = true;
	},

	update: function () {
		if (this.cache.isSoundDecoded('soundIntro') && this.ready == false && this.effectFinished && BasicGame.Pontuacao != null)
		{
			this.initGame();
		}
	},
	initGame: function() {
		this.ready = true;
		this.state.start('Game');
		this.game.onBlur.add(this.onLoseFocus, this);
	}

};
