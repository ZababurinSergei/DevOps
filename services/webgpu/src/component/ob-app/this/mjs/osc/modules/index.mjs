function round(value, decimals = 12) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}
export const OSC = async () => {

    const defaultState = {
        init: 1,
        change_phase: 0,
        third: 0,
        osc_cb: {
            first_param: -1,
            change_phase: undefined,
            third: undefined
        },
        osc_sp01:[{
            t: -1,
            deg: 0,
            rad: 0,
            norm_sin_cos: undefined,
            w_0: undefined,
            w_1: undefined,
            T: undefined,
            freq: undefined,
            phase: undefined,
        },{
            t: -1,
            deg: 0,
            rad: 0,
            norm_sin_cos: undefined,
            w_0: undefined,
            w_1: undefined,
            T: undefined,
            freq: undefined,
            phase: undefined,
        },{
            t: -1,
            deg: 0,
            rad: 0,
            norm_sin_cos: undefined,
            w_0: undefined,
            w_1: undefined,
            T: undefined,
            freq: undefined,
            phase: undefined,
        },{
            t: -1,
            deg: 0,
            rad: 0,
            norm_sin_cos: undefined,
            w_0: undefined,
            w_1: undefined,
            T: undefined,
            freq: undefined,
            phase: undefined,
        },{
            t: -1,
            deg: 0,
            rad: 0,
            norm_sin_cos: undefined,
            w_0: undefined,
            w_1: undefined,
            T: undefined,
            freq: undefined,
            phase: undefined,
        },{
            t: -1,
            deg: 0,
            rad: 0,
            norm_sin_cos: undefined,
            w_0: undefined,
            w_1: undefined,
            T: undefined,
            freq: undefined,
            phase: undefined,
        },{
            t: -1,
            deg: 0,
            rad: 0,
            norm_sin_cos: undefined,
            w_0: undefined,
            w_1: undefined,
            T: undefined,
            freq: undefined,
            phase: undefined,
        },{
            t: -1,
            deg: 0,
            rad: 0,
            norm_sin_cos: undefined,
            w_0: undefined,
            w_1: undefined,
            T: undefined,
            freq: undefined,
            phase: undefined,
        }],
        osc_sp02:[{
            t: -1,
            deg: 0,
            rad: 0,
            norm_sin_cos: undefined,
            w_0: undefined,
            w_1: undefined,
            T: undefined,
            freq: undefined,
            phase: undefined,
        },{
            t: -1,
            deg: 0,
            rad: 0,
            norm_sin_cos: undefined,
            w_0: undefined,
            w_1: undefined,
            T: undefined,
            freq: undefined,
            phase: undefined,
        },{
            t: -1,
            deg: 0,
            rad: 0,
            norm_sin_cos: undefined,
            w_0: undefined,
            w_1: undefined,
            T: undefined,
            freq: undefined,
            phase: undefined,
        },{
            t: -1,
            deg: 0,
            rad: 0,
            norm_sin_cos: undefined,
            w_0: undefined,
            w_1: undefined,
            T: undefined,
            freq: undefined,
            phase: undefined,
        },{
            t: -1,
            deg: 0,
            rad: 0,
            norm_sin_cos: undefined,
            w_0: undefined,
            w_1: undefined,
            T: undefined,
            freq: undefined,
            phase: undefined,
        },{
            t: -1,
            deg: 0,
            rad: 0,
            norm_sin_cos: undefined,
            w_0: undefined,
            w_1: undefined,
            T: undefined,
            freq: undefined,
            phase: undefined,
        },{
            t: -1,
            deg: 0,
            rad: 0,
            norm_sin_cos: undefined,
            w_0: undefined,
            w_1: undefined,
            T: undefined,
            freq: undefined,
            phase: undefined,
        },{
            t: -1,
            deg: 0,
            rad: 0,
            norm_sin_cos: undefined,
            w_0: undefined,
            w_1: undefined,
            T: undefined,
            freq: undefined,
            phase: undefined,
        }],
        l: 0,
        osc_lp:[{
            in: undefined,
            in_pos: undefined,
            i_ph: undefined,
            i_c: undefined,
            i_s: undefined,
        },{
            in: undefined,
            in_pos: undefined,
            i_ph: undefined,
            i_c: undefined,
            i_s: undefined,
        },{
            in: undefined,
            in_pos: undefined,
            i_ph: undefined,
            i_c: undefined,
            i_s: undefined,
        },{
            in: undefined,
            in_pos: undefined,
            i_ph: undefined,
            i_c: undefined,
            i_s: undefined,
        },{
            in: undefined,
            in_pos: undefined,
            i_ph: undefined,
            i_c: undefined,
            i_s: undefined,
        },{
            in: undefined,
            in_pos: undefined,
            i_ph: undefined,
            i_c: undefined,
            i_s: undefined,
        },{
            in: undefined,
            in_pos: undefined,
            i_ph: undefined,
            i_c: undefined,
            i_s: undefined,
        },{
            in: undefined,
            in_pos: undefined,
            i_ph: undefined,
            i_c: undefined,
            i_s: undefined,
        }],
        osc_p:[{
            norm: undefined,
            up_lim: 0,
            lenght: undefined
        },{
            norm: undefined,
            up_lim: 0,
            lenght: undefined
        },{
            norm: undefined,
            up_lim: 0,
            lenght: undefined
        },{
            norm: undefined,
            up_lim: 0,
            lenght: undefined
        },{
            norm: undefined,
            up_lim: 0,
            lenght: undefined
        },{
            norm: undefined,
            up_lim: 0,
            lenght: undefined
        },{
            norm: undefined,
            up_lim: 0,
            lenght: undefined
        },{
            norm: undefined,
            up_lim: 0,
            lenght: undefined
        }],
        osc_substrate_s: {
            step: [0.32,0.25,0.25,0.25,0.25,0.25,0.25,0.25],
            quarter: [0,0,0,0,0,0,0,0],
            step_phase: [0,0,0,0,0,0,0,0],
            dynamic_phase: [0,0,0,0,0,0,0,0],
            deg: [90,90,90,90,90,90,90,90]
        },
        osc_out: [{
            line: 0,
            line_sin: 0,
            sin_cos: 0,
            sin: 0,
            cos: 0,
            sin_deg: 0,
            cos_deg: 0
        },{
            line: 0,
            line_sin: 0,
            sin_cos: 0,
            sin: 0,
            cos: 0,
            sin_deg: 0,
            cos_deg: 0
        },{
            line: 0,
            line_sin: 0,
            sin_cos: 0,
            sin: 0,
            cos: 0,
            sin_deg: 0,
            cos_deg: 0
        },{
            line: 0,
            line_sin: 0,
            sin_cos: 0,
            sin: 0,
            cos: 0,
            sin_deg: 0,
            cos_deg: 0
        },{
            line: 0,
            line_sin: 0,
            sin_cos: 0,
            sin: 0,
            cos: 0,
            sin_deg: 0,
            cos_deg: 0
        },{
            line: 0,
            line_sin: 0,
            sin_cos: 0,
            sin: 0,
            cos: 0,
            sin_deg: 0,
            cos_deg: 0
        },{
            line: 0,
            line_sin: 0,
            sin_cos: 0,
            sin: 0,
            cos: 0,
            sin_deg: 0,
            cos_deg: 0
        },{
            line: 0,
            line_sin: 0,
            sin_cos: 0,
            sin: 0,
            cos: 0,
            sin_deg: 0,
            cos_deg: 0
        }]

    }
    let state = structuredClone(defaultState)

    const stateData = (input, lenght_in) => {

        if (input.i_ph == 1){
        input.i_s = input.i_c;
        }
    else if (input.i_ph == 2){
        input.i_s = (input.i_c * -1) + (lenght_in - 1);
        }
    else if (input.i_ph == 3){
        input.i_s = input.i_c * -1;
        }
    else if (input.i_ph == 4){
        input.i_s = input.i_c + ((lenght_in * -1) + 1);
        }

    else if (input.in == 0){

            if (input.i_ph == 1){
            input.i_s = input.i_c;
            }
        else if (input.i_ph == 2){
            input.i_s = (input.i_c * -1) + (lenght_in - 1);
            }
        else if (input.i_ph == 3){
            input.i_s = input.i_c * -1;
            }
        else if (input.i_ph == 4){
            input.i_s = input.i_c + ((lenght_in * -1) + 1);
            }
        }

        return input;
    }
    const first_step = async (input, lenght) => {
            // console.log('==== input.in =====', input.in)
        if (input.in == 0){
            input.i_ph = 4;
            input.i_s = 0;
        } else if (input.in > 0 && input.i_ph == 1 && input.i_c == 0) {
            input.i_s = lenght - 1;
        } else if (input.in > 0 && input.i_ph == 2 && input.i_c == 0) {
            input.i_s = 0;
        } else if (input.in > 0 && input.i_ph == 3 && input.i_c == 0) {
            input.i_s = (lenght - 1)*-1;
        } else if (input.in > 0 && input.i_ph == 4 && input.i_c == 0) {
            input.i_s = 0;
        } else if (input.in < 0 && input.i_ph == 1 && input.i_c == 0) {
            input.i_s = 1;
        } else if (input.in < 0 && input.i_ph == 2 && input.i_c == 0) {
            input.i_s = (lenght - 2);
        } else if (input.in < 0 && input.i_ph == 3 && input.i_c == 0) {
            input.i_s = -1;
        } else if (input.in < 0 && input.i_ph == 4 && input.i_c == 0) {
            input.i_s = (lenght - 2)*-1;
        } else if (input.i_ph == 1) {
            input.i_s = input.i_c;
        } else if (input.i_ph == 2) {
            input.i_s = (lenght - 1) - input.i_c;
        } else if (input.i_ph == 3) {
            input.i_s = input.i_c * -1;
        } else if (input.i_ph == 4) {
            input.i_s = ((lenght - 1) - input.i_c)*-1;
        }

        return input;
    }

    const up = async (input, lenght_in) => {

        if (state.osc_cb.change_phase == 1){


        }

        input.i_c++;

        if (input.i_c >= lenght_in) {
            input.i_c = 1;
        }


        if (input.i_c == 1) {
            input.i_ph++;
        }


        if (input.i_ph > 4) {
            input.i_ph = 1;
        }


        return input;
    }

    const down = async (input, lenght_in) => {
        input.i_c--;

        if (input.i_c <= 0) {
            input.i_c = lenght_in - 1;
        }


        if (input.i_c == (lenght_in - 1)) {
            input.i_ph--;
        }


        if (input.i_ph <= 0) {
            input.i_ph = 4;
        }

        return input;
    }
    const osc_relation = async () => {
        // console.log('state.osc_cb.first_param------------------------', state.osc_cb.first_param)
        if (state.osc_cb.first_param == 1) {

            for (let i = 0; i < 8; i++) {
                // console.log('state.osc_cb.first_param', state.osc_p)
                state.osc_lp[i].in = state.osc_p[i].lenght * state.osc_substrate_s.quarter[i] + state.osc_substrate_s.step_phase[i];

                state.osc_lp[i].in_pos = state.osc_lp[i].in;

                if (state.osc_lp[i].in_pos < 0)
                    state.osc_lp[i].in_pos = state.osc_lp[i].in_pos * -1;
            }

            for (let i = 0; i < 8; i++){
                state.osc_lp[i].i_ph = ((state.osc_lp[i].in_pos / state.osc_p[i].lenght) - (((state.osc_lp[i].in_pos / state.osc_p[i].lenght) / 4)) * 4) + 1;
                state.osc_lp[i].i_c = state.osc_lp[i].in_pos - (parseInt(state.osc_lp[i].in_pos / state.osc_p[i].lenght, 10) * state.osc_p[i].lenght);
                state.osc_lp[i] = await first_step(state.osc_lp[i], state.osc_p[i].lenght);
            }

            state.osc_cb.first_param = 0;
        } else {
            for (let i = 0; i < 8; i++){

                if (state.osc_lp[i].in >= 0){
                    state.osc_lp[i] = await up(state.osc_lp[i], state.osc_p[i].lenght);
                    state.osc_lp[i] = await stateData(state.osc_lp[i], state.osc_p[i].lenght);
                }
                else if (state.osc_lp[i].in < 0){
                    state.osc_lp[i] = await down(state.osc_lp[i], state.osc_p[i].lenght);
                    state.osc_lp[i] = await stateData(state.osc_lp[i], state.osc_p[i].lenght);
                }
            }
        }
    }

    const square_sin = async (dry, phase, up_lim) => {
        dry = Math.pow(dry, 2);
        up_lim = Math.pow(up_lim, 2);

        if (phase == 2 || phase == 3){
            dry = (up_lim - dry) * -1;
        }
        else{
            dry = up_lim - dry;
        }
        return dry;
    }
    const osc_property = async () => {

        for (let i = 0; i < 8; i++) {
            //TODO надо вынести нормализацию в параметр
            // state.osc_out[i].line = round(round(state.osc_lp[i].i_s * state.osc_substrate_s.step[i]) * state.osc_p[i].norm);
            state.osc_out[i].line = round(state.osc_lp[i].i_s * state.osc_substrate_s.step[i]);
            state.osc_out[i].line_sin = await square_sin(state.osc_out[i].line, state.osc_lp[i].i_ph, state.osc_p[i].up_lim * state.osc_p[i].norm);
            state.osc_out[i].sin_cos = Math.sin(state.osc_lp[i].i_s * state.osc_sp01[i].rad) * state.osc_sp01[i].norm_sin_cos;
        }

        ////////////////////////////////////////////
        state.osc_sp01[0].t++;
        if (state.osc_sp01[0].t >(state.osc_sp01[0].T - 1)){
            state.osc_sp01[0].t = 0;
        }

        state.osc_out[0].sin = 1 * Math.sin(state.osc_sp01[0].w_0 * state.osc_sp01[0].t + 0.0);
        state.osc_out[1].sin = 1 * Math.cos(state.osc_sp01[1].w_0 * state.osc_sp01[0].t + 0.25);
        state.osc_out[2].sin = 1 * Math.sin(state.osc_sp01[2].w_0 * state.osc_sp01[0].t + 0.5);
        state.osc_out[3].sin = 1 * Math.cos(state.osc_sp01[3].w_0 * state.osc_sp01[0].t + 1.25);

        ///////////////////////


        state.osc_sp02[0].t++;
        for (let i = 0; i<8; i++){

            if (state.osc_sp02[0].t >(state.osc_substrate_s.deg[i] - 1)){
                state.osc_sp02[0].t = 0;
            }
        }

        state.osc_out[0].sin_deg = 1 * Math.sin(state.osc_sp02[0].rad * state.osc_sp02[0].t);
        state.osc_out[1].cos_deg = 1 * Math.cos(state.osc_sp02[0].rad * state.osc_sp02[0].t);

    }

    const init = () => {
        state.osc_cb.first_param = 1;
        state.osc_sp01[0].t = -1;
        state.osc_sp02[0].t = -1;


        for (let i = 0; i < 8; ++i) {
            state.osc_sp01[i].freq = 44100 / state.osc_p[i].lenght * 4;
            state.osc_sp01[i].T = ((state.osc_p[i].lenght - 1) * 4);
            state.osc_sp01[i].w_0 = 2 * Math.PI / state.osc_sp01[i].T;
            // console.log('state.osc_sp01[i].T', state.osc_sp01[i].T)
            ///////////////////////////////////
            state.osc_sp01[i].deg = 90 / (state.osc_p[i].lenght - 1);
            state.osc_sp01[i].rad = state.osc_sp01[i].deg * state.PI / 180;
            state.osc_sp01[i].norm_sin_cos = 1 / Math.sin((state.osc_p[i].lenght - 1) * state.osc_sp01[i].rad);
        }

        for (let i = 0; i < 8; i++) {
            let l = 0
            while (state.osc_p[i].up_lim <= 1 - state.osc_substrate_s.step[i]) {
                state.osc_p[i].up_lim = round(state.osc_substrate_s.step[i] * l, 12);
                l++;
                state.osc_p[i].lenght = l;
            }

            state.osc_p[i].norm = round(1 / state.osc_p[i].up_lim, 12);
        }

        for (let i = 0; i < 8; i++) {
            state.osc_out[i].line = 0;
            state.osc_out[i].line_sin = 0;
            state.osc_out[i].sin_cos = 0;
            state.osc_out[i].sin = 0;
            state.osc_out[i].cos = 0;
            state.osc_out[i].sin_deg = 0;
            state.osc_out[i].cos_deg = 0;
        }

        for (let i = 0; i < 8; ++i) {
            state.osc_sp01[i].T = ((state.osc_p[i].lenght - 1) * 4);
            state.osc_sp01[i].w_0 = round(2 * Math.PI / state.osc_sp01[i].T);
            state.osc_sp01[i].deg = round(90 / (state.osc_p[i].lenght - 1));
            state.osc_sp01[i].rad = round(state.osc_sp01[i].deg * (Math.PI / 180));
            state.osc_sp01[i].norm_sin_cos = round(round(1 / Math.sin((state.osc_p[i].lenght - 1)))  * state.osc_sp01[i].rad);
        }
    }

    // const osc_core = async (init = 1, change_phase = 0, third = 0) => {
    const osc_core = async (init = 1, change_phase = 0, third = 0) => {
        if (state.init == 1) {
            state.osc_cb.first_param = 1;
            state.init = 0
        } else {
            state.osc_cb.first_param = 0;
        }


        if (state.change_phase == 1) {
            state.osc_cb.change_phase = 1;
        } else {
            state.osc_cb.change_phase = 0;
        }

        if (state.third == 1) {
            state.osc_cb.third = 1;
        } else {
            state.osc_cb.third = 0;
        }

        // console.log('------------------------- state -------------------------', state.osc_out[0].line)
        
       await osc_relation();
       await osc_property();

       return state
    }

    return {
        init: init,
        core: osc_core,
        getState (path = false) {
            return  path ? structuredClone(state[`${path}`]): structuredClone(state);
        },
        getLink (path) {
            return  state[`${path}`];
        },
        setState (path, value) {
            if (!state.hasOwnProperty(path)) {
                alert(`надо определить свойство ${path} в стейте`);
                console.assert(false, `надо определить свойство ${path} в стейте`, {
                    state: state
                });

            } else {
                const oldVlue = state[path];
                if (value === 'undefined') {
                    state[path] = undefined;
                    return undefined;
                } else {
                    if (state[path] !== value || state[path] === false) {
                        state[`${path}`] = value;
                        return value;
                    }
                }
            }
        },
        cleanState (path, exclude = []) {
            if(path === 'all') {
                for(let key in state) {
                    if(!exclude.some(item => item === key)) {
                        state[key] = structuredClone(defaultState[key])
                    }
                }
            } else {
                if (!state.hasOwnProperty(path)) {
                    alert(`Свойтсва ${path} нет в стейте`);
                    console.assert(false, `надо определить свойство ${path} в стейте`, {
                        state: state
                    });
                } else {
                    state[path] = structuredClone(defaultState[path]);
                }
            }
        }
    }
}