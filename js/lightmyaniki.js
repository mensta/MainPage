    var w_x;
    var w_y;
   function sk() {
    sz=!sz;$
    if(sz) {
        for(var i=0; i<Game.entities.length; i++) {
            console.log('in');
            Game.entities[i].radius+=15;
        }
    } else {
        for(var i=0; i<Game.entities.length; i++) {
            console.log('in');
            Game.entities[i].radius-=15;
        }
    }

   }
    var Game = function() {
        var $this = this;
        document.onmousemove = function(evt) {
            w_x = evt.clientX;
            w_y = evt.clientY-105;
        }
        ;
        $this.canvas = document.getElementById('demo-canvas');
        $this.context = $this.canvas.getContext('2d');
        $this.entities = [];
        $this.drawInterval = 15;
        $this.canvas.width = window.innerWidth;
        $this.canvas.height = window.innerHeight;
        $this.canvas.addEventListener('click', function() { 
            console.log('hi');
            $('html,body').animate({
            scrollTop: $("#services").offset().top},
            'slow');    
        }, false);
        runOnce = true;
        thumbPics = [];
        sz = false;
        var randz = 0;
        Game.prototype.draw = function() {
            $this.canvas.width = window.innerWidth;
            $this.canvas.height = window.innerHeight;
            $this.context.fillStyle = 'rgb(51, 53, 60)';
            $this.context.strokeStyle = 'rgba(128,128,128,0.2)';
            for (var x = 0.5; x < $this.canvas.width; x += 80) {
                $this.context.moveTo(x, 0);
                $this.context.lineTo(x, $this.canvas.height);
            }
            for (var y = 0.5; y < $this.canvas.height; y += 80) {
                $this.context.moveTo(0, y);
                $this.context.lineTo($this.canvas.width, y);
            }
            $this.context.moveTo(0, 0);
            $this.context.stroke();
            if(runOnce) {
                for(var i=0; i<this.entities.length; i++) {
                    var thumbImg = document.createElement('img');
                    thumbImg.src = '';
                    thumbPics.push(thumbImg);
                }
                randz = rand(0,thumbPics.length-1);
                runOnce = false;
            }
                for (var i in $this.entities) {
                var entity = $this.entities[i]
                  , border = Math.ceil((entity.radius /10) > 2 ? (entity.radius /5) : 2);
                $this.context.beginPath();
                $this.context.arc(entity.x, entity.y, entity.radius + Math.floor(border / 2), 0, 2 * Math.PI);
                $this.context.fillStyle = entity.color;
                if($this.entities[i].owner ==1) {
                     $this.context.globalAlpha = 1;
                } else {
                    $this.context.globalAlpha = 1;
                }

                var thumbImg = document.createElement('img');
                thumbImg.src = '';

                $this.context.fill();
                $this.context.beginPath();
                $this.context.arc(entity.x, entity.y, entity.radius, 0, 2 * Math.PI);
                $this.context.lineWidth = border;
                if($this.entities[i].owner ==0) {
                    if(sz) {
                        $this.context.save();
                        $this.context.beginPath();
                        $this.context.arc($this.entities[i].x, $this.entities[i].y, $this.entities[i].radius, 0, 2 * Math.PI);
                        $this.context.closePath();
                        $this.context.clip();
                        $this.context.drawImage(thumbPics[i], $this.entities[i].x-($this.entities[i].radius/Math.PI)*3.45, $this.entities[i].y-($this.entities[i].radius/Math.PI)*3.5, ($this.entities[i].radius/Math.PI)*6.8,($this.entities[i].radius/Math.PI)*6.8);
                        $this.context.beginPath();
                        $this.context.arc($this.entities[i].x, $this.entities[i].y, $this.entities[i].radius, 0, 2 * Math.PI);
                        $this.context.clip();
                        $this.context.closePath();
                        $this.context.restore();
                    }
                    $this.context.strokeStyle = 'rgba(0, 0, 0, 0.5' + ')';
                }  else {
                    if(sz) {
                        $this.context.drawImage(thumbPics[randz], $this.entities[i].x-($this.entities[i].radius/Math.PI)*3.45, $this.entities[i].y-($this.entities[i].radius/Math.PI)*3.5, ($this.entities[i].radius/Math.PI)*6.8,($this.entities[i].radius/Math.PI)*6.8);
                    }
                    $this.context.strokeStyle = 'rgba(0, 0, 0, 0.5' + ')';
                }
                $this.context.stroke();
            }
        }
        ;
        var ents = 17;
        var ownerIndex = rand(0,ents-1); // 0 to 17
        for (var i = 0; i < ents; i++)
            $this.entities.push(new Entity($this));
            $this.entities[ents-1].owner = 1;
            console.log($this.entities[ents-1].owner);
        setInterval(function() {
            for (var i = 0; i < $this.entities.length; i++) {
                $this.entities[i].move();
            }
            $this.draw();
        }, $this.drawInterval);
        return $this;
    }
    ;
    var Entity = function($game) {
        var $this = this
          , preferX = rand(0, 1)
          , preferY = rand(0, 1)
          , bw = rand(0, 10)
          , path = []
          , colors = ['#07FF1A', '#3107FF', '#8E07FF', '#FF07F9', '#0768FF', '#FFB607', '#FF8207', '#FFB700', '#F300FF', '#00CFFF'];
        $this.respawn = function() {
            if (rand(0, 1)) {
                $this.x = 0 - 100;
                if (rand(0, 1))
                    $this.x = $game.canvas.width + 100;
                $this.y = rand(-100, $game.canvas.height + 100);
            } else {
                $this.y = 0 - 100;
                if (rand(0, 1))
                    $this.y = $game.canvas.height + 100;
                $this.x = rand(-100, $game.canvas.width + 100);
            }
        }

        $this.spawnSame = function() {
            var temp_arr = [];
            var turnOwnerOnce = 0;
            for (var i = 0; i < $game.entities.length; i++) {
                temp_arr.push($game.entities[i]);
            }
            var len = temp_arr.length;
            for(var j=0; j<len; j++) {
               //temp_arr[j].x+=100;
                if(temp_arr[j].owner ==1 && turnOwnerOnce ==0) {
                    temp_arr[j].owner == 0;
                    turnOwnerOnce=1;
                    temp_arr[j].size/2;
                    temp_arr[j].radius/2;
                    console.log(temp_arr[j].radius);
                }
                console.log('temp_arr');
                temp_arr.push(temp_arr[j]);
            }
          

        }
        $this.respawn2 = function(cell) {
            if($this != cell) {
                if (rand(0, 1)) {
                    $this.x = 0 - 100;
                    if (rand(0, 1))
                        $this.x = $game.canvas.width + 100;
                    $this.y = rand(-100, $game.canvas.height + 100);
                } else {
                    $this.y = 0 - 100;
                    if (rand(0, 1))
                        $this.y = $game.canvas.height + 100;
                    $this.x = rand(-100, $game.canvas.width + 100);
                }
            }
        }
        ;
        $this.respawn();
        $this.size = rand(5, 7);  //15 20 large
        $this.owner = 0;
        //$this.size = getSelection
        $this.radius = $this.size * Math.PI;
        $this.direction = rand(0, 360);
        $this.speed = rand(5, 15);
        //Get selection
        $this.color = colors[bw];
        $this.path = function() {}
        ;
        $this.alpha = 0;
        if($this.size<15) {
           $this.speed = 1 * (10 - $this.size);
        } else {
            $this.speed = 1 * ($this.size - this.size+2);
        }
        if($this.radius>100) {
            $this.speed = 1 * ($this.size - this.size+1)-0.5;
        }
        var splitted = false;
        $this.move = function() {
            var predictX = $this.x;
            var predictY = $this.y;
            if (predictX > screen.width + $this.radius)
                predictX = -100;
            $this.must_break = false;
            for (var i = 0; i < $game.entities.length; i++) {
                if($game.entities[i] !== $this && this.owner ==1) {
                            if((Math.abs(($this.x + $this.radius/Math.PI) - ($game.entities[i].x + $game.entities[i].radius/Math.PI)))<=$this.radius || Math.abs((($this.x + $this.radius/Math.PI) - ($game.entities[i].x + $game.entities[i].radius/Math.PI)))<=$this.radius) {
                                if((Math.abs(($this.y + $this.radius/Math.PI) - ($game.entities[i].y + $game.entities[i].radius/Math.PI)))<=$this.radius || Math.abs((($this.y + $this.radius/Math.PI) - ($game.entities[i].y + $game.entities[i].radius/Math.PI)))<=$this.radius) {
                                     $game.entities[i].respawn();
                                     if($this.radius<91) {
                                         $this.radius+=$game.entities[i].radius/20; //increase owner size
                                    } else if($this.radius>90) {
                                            $this.radius+=$game.entities[i].radius/35;
                                            $this.speed = 1 * ($this.size - this.size+1)-0.3;
                                        }
                                    }
                            }
                            if($this.radius>200) {
                                $this.respawn();
                                $this.radius-=$this.radius;
                                $this.radius=$this.size*Math.PI;
                        }
                }
                if ($game.entities[i] !== $this && ($this.size <= $game.entities[i].size) && (Math.abs(predictX - $game.entities[i].x) + Math.abs(predictY - $game.entities[i].y)) < 30) {
            
                    if($game.entities[i] !== $this){ //&& ($this.size>$game.entities[i].size)) {
                       if($this.size>=$game.entities[i].size) {
                        if($this.owner != 1) {
                            $this.respawn();
                        } else {
                            if((Math.abs(($this.x + $this.radius/Math.PI) - ($game.entities[i].x + $game.entities[i].radius/Math.PI)))<=$this.radius || Math.abs((($this.x + $this.radius/Math.PI) - ($game.entities[i].x + $game.entities[i].radius/Math.PI)))<=$this.radius) {
                                if((Math.abs(($this.y + $this.radius/Math.PI) - ($game.entities[i].y + $game.entities[i].radius/Math.PI)))<=$this.radius || Math.abs((($this.y + $this.radius/Math.PI) - ($game.entities[i].y + $game.entities[i].radius/Math.PI)))<=$this.radius) {
                                     $game.entities[i].respawn();
                                     $this.radius+=$game.entities[i].radius/6; //increase owner size
                                        if($this.radius>90) {
                                            $this.speed = 1 * ($this.size - this.size+1)-0.3;
                                        }
                                    }
                            }
                            if(Math.abs(($this.x + $this.size) - ($game.entities[i].x + $game.entities[i].size)) <30 && Math.abs(($this.y + this.size) - ($game.entities[i].y + $game.entities[i].size) <30)) {
                            var cellSize = $this.size;//diameter in x, and diameter in y + 

                            }
                           
                            if($this.radius>20 && splitted == false) {
                                splitted = true;
                            }
                            if($this.radius>150) {
                                $this.respawn();
                                $this.radius-=$this.radius;
                                if(!sz) {
                                    $this.radius=$this.size*Math.PI;
                                } else {
                                    $this.radius=$this.size*Math.PI*5;
                                }
                            }
                        }
                        }
                     }
                }
            }
            if (undefined !== w_x && undefined !== w_y) {
                if (!$this.must_break) {
                    var x_f = predictX < w_x ? 1 : -1;
                    var y_f = predictY < w_y ? 1 : -1;
                    var d_x = predictX > w_x ? (predictX - w_x) : (w_x - predictX);
                    var d_y = predictY > w_y ? (predictY - w_y) : (w_y - predictY);
                    $this.d_h2 = (d_x * d_x) + (d_y * d_y);
                    if ($this.d_h2 < 500) {
                       // $this.respawn();
                    } else {
                        var angle = Math.atan(d_y / d_x);
                        $this.x = predictX + (Math.cos(angle) * x_f * $this.speed);
                        $this.y = predictY + (Math.sin(angle) * y_f * $this.speed);
                    }
                }
            }
        }
        $this.split= function() {
            for (var i = 0; i < $game.entities.length; i++) {
            }
        }
        ;
        return $this;
    }
    ;
    function rand(a, b) {
        var c = arguments.length;
        if (c === 0) {
            a = 0;
            b = 2147483647
        } else if (c === 1) {
            throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
        }
        return Math.floor(Math.random() * (b - a + 1)) + a
    }
    ;window.onload = function() {
        window.Game = new Game();
    }
    ;