let speed = 3, gravity = 0.5;
let bird = document.querySelector('.bird');
let img = document.getElementById('bird-1');

let bird_move = bird.getBoundingClientRect();

let bg = document.querySelector('.bg').getBoundingClientRect();
let score = document.querySelector('.score');
let msg = document.querySelector('.msg');
let score_name = document.querySelector('.score_name');

let game = "Start";
img.style.display = "none";
msg.classList.add('msgS');

document.addEventListener('keydown', (e) => {
    if(e.key == 'Enter' && game != 'Play'){
        document.querySelectorAll('.pipe').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        bird.style.top = '40vh';
        game = 'Play';
        msg.innerHTML = '';
        score_name.innerHTML = "Score : ";
        score.innerHTML = "0";
        msg.classList.remove('msgS');
        play();
    }
});

function play(){
    function move(){
        if(game != 'Play') return;

        let pipes = document.querySelectorAll('.pipe');
        pipes.forEach((pipe) => {
            let pipe_props = pipe.getBoundingClientRect();
            bird_move = bird.getBoundingClientRect();

            if(pipe_props.right <= 0){
                pipe.remove();
            }
            else{
                if(bird_move.left <= pipe_props.left + pipe_props.width && bird_move.left + bird_move.width >= pipe_props.left && bird_move.top <= pipe_props.top + pipe_props.height && bird_move.top + bird_move.height >= pipe_props.top){
                    game = "End";
                    msg.innerHTML = "<span style='color: red;'>Game Over</span><br>Press Enter to Restart";
                    msg.classList.add('msgS');
                    img.style.display = 'none';
                    return;
                }
                else{
                    if(pipe_props.right <= bird_move.left && pipe_props.right + speed >= bird_move.left && pipe.increase_score == '1'){
                        score.innerHTML =+ score.innerHTML + 1;
                    }
                    pipe.style.left = pipe_props.left - speed + 'px';
                }
            }
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let bird_dy = 0;
    function apply_gravity(){
        if(game != 'Play')return;
        bird_dy = bird_dy + gravity;
        document.addEventListener('keydown', (e) => {
            if(e.key == 'ArrowUp' || e.key == " "){
                img.src = './bird.png';
                bird_dy = -6.0;
            }
        });

        if(bird_move.top <= 0 || bird_move.bottom >= bg.bottom){
            game = "End";
            msg.style.left = "28vw";
            window.location.reload();
            msg.classList.remove('msgS');
            return;
        }
        bird.style.top = bird_move.top + bird_dy + 'px';
        bird_move = bird.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let pipe_sep = 0;
    let pipe_gap = 50;

    function create_pipe(){
        if(game != "Play")return;
        if(pipe_sep > 50){
            pipe_sep = 0;
            let pipe_pos = Math.floor(Math.random() * 43) + 8;
            let pipe_sep_inv = document.createElement('div');
            pipe_sep_inv.className = 'pipe';
            pipe_sep_inv.style.top = pipe_pos - 70 + 'vh';
            pipe_sep_inv.style.left = '100vw';

            document.body.appendChild(pipe_sep_inv);
            let pipe_sip = document.createElement('div');
            pipe_sip.className = 'pipe';
            pipe_sip.style.top = pipe_pos + pipe_gap + 'vh';
            pipe_sip.style.left = '100vw';
            pipe_sip.increase_score = '1';

            document.body.appendChild(pipe_sip);
        }
        pipe_sep++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}
