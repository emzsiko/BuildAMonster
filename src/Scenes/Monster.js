class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 400;
        this.bodyY = 350;
        this.legRightX = 450;
        this.legLeftX = 350;
        this.legY = 450;
        this.armRightX = 480;
        this.armLeftX = 320;
        this.armY = 390;
        this.eyeY = 330;
        this.mouthY = 390;
        this.hornY = 280;

        this.my.sprite = {};
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.

        // legs
        my.sprite.legRight = this.add.sprite(this.legRightX, this.legY, "monsterParts", "leg_redC.png");
        my.sprite.legLeft = this.add.sprite(this.legLeftX, this.legY, "monsterParts", "leg_redC.png");
        my.sprite.legLeft.flipX = true;

        // body
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_redD.png");

        // arms
        my.sprite.armRight = this.add.sprite(this.armRightX, this.armY, "monsterParts", "arm_redB.png");
        my.sprite.armLeft = this.add.sprite(this.armLeftX, this.armY, "monsterParts", "arm_redB.png");
        my.sprite.armLeft.flipX = true;

        // eye
        my.sprite.eye = this.add.sprite(this.bodyX, this.eyeY, "monsterParts", "eye_yellow.png");

        // mouths
        my.sprite.closedMouth = this.add.sprite(this.bodyX, this.mouthY, "monsterParts", "mouth_closed_happy.png");
        my.sprite.fangs = this.add.sprite(this.bodyX, this.mouthY, "monsterParts", "mouthB.png");
        my.sprite.fangs.visible = false;

        // horns
        my.sprite.hornRight = this.add.sprite(this.legRightX, this.hornY, "monsterParts", "detail_yellow_horn_small.png");
        my.sprite.hornLeft = this.add.sprite(this.legLeftX, this.hornY, "monsterParts", "detail_yellow_horn_small.png");
        my.sprite.hornLeft.flipX = true;

        // event input
        this.input.keyboard.on('keydown', (action) => {
            // event input: closed smile
            if (action.keyCode === Phaser.Input.Keyboard.KeyCodes.S) {
                my.sprite.fangs.visible = false;
                my.sprite.closedMouth.visible = true;
            }
            // event input: fang smile
            if (action.keyCode === Phaser.Input.Keyboard.KeyCodes.F) {
                my.sprite.closedMouth.visible = false;
                my.sprite.fangs.visible = true;
            }
        });

        this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

    }


    update() {
        let my = this.my;    // create an alias to this.my for readability

        // polling input: movement
        if(this.DKey.isDown) {
            const spriteKeys = Object.keys(my.sprite);

            for (let part = 0; part < spriteKeys.length; part++) {
                const key = spriteKeys[part];

                my.sprite[key].x += 1;
            }
            }

            if(this.AKey.isDown) {
                const spriteKeys = Object.keys(my.sprite);
    
                for (let part = 0; part < spriteKeys.length; part++) {
                    const key = spriteKeys[part];
    
                    my.sprite[key].x -= 1;
                }
                }

        }

       
    }