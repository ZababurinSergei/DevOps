import {template} from '../../index.mjs'

let timerId = false
let object = false
let htmlConsoleData_0 = null
let htmlConsoleData_1 = null
let htmlConsoleData_2 = null
let htmlConsoleData_3 = null
let htmlConsoleData_4 = null
let htmlConsoleData_5 = null
let htmlConsoleData_6 = null
let htmlConsoleData_7 = null
let htmlConsoleData_8 = null
let htmlConsoleData_9 = null
let htmlConsoleData_10 = null
let htmlConsoleData_11 = null
let htmlConsoleData_12 = null
let htmlConsoleData_13 = null
let htmlConsoleData_14 = null
let htmlConsoleData_15 = null
let htmlConsoleData_16 = null
let htmlConsoleData_17 = null
let htmlConsoleData_18 = null
let htmlConsoleData_19 = null
let htmlConsoleData_20 = null
let htmlConsoleData_21 = null
let htmlConsoleData_22 = null
let htmlConsoleData_23 = null
let htmlConsoleData_24 = null
let htmlConsoleData_25 = null
let htmlConsoleData_26 = null
let htmlConsoleData_27 = null
let htmlConsoleData_28 = null
let htmlConsoleData_29 = null
let htmlConsoleData_30 = null
let htmlConsoleData_31 = null
let htmlConsoleData_32 = null
let htmlConsoleData_33 = null
let htmlConsoleData_34 = null
let htmlConsoleData_35 = null
let htmlConsoleData_36 = null
let htmlConsoleData_37 = null
let htmlConsoleData_38 = null
let htmlConsoleData_39 = null
let htmlConsoleData_40 = null
let htmlConsoleData_41 = null
let htmlConsoleData_42 = null
let htmlConsoleData_43 = null
let htmlConsoleData_44 = null
let htmlConsoleData_45 = null
let htmlConsoleData_46 = null
let htmlConsoleData_47 = null
let htmlConsoleData_48 = null
let htmlConsoleData_49 = null
let htmlConsoleData_50 = null
let htmlConsoleData_51 = null
let htmlConsoleData_52 = null
let htmlConsoleData_53 = null
let htmlConsoleData_54 = null
let htmlConsoleData_55 = null
let htmlConsoleData_56 = null
let htmlConsoleData_57 = null
let htmlConsoleData_58 = null
let htmlConsoleData_59 = null
let htmlConsoleData_60 = null
export const Line = async (self, obj) => {
    // const osc = await OSC()
    // await osc.init()
    const PI = Math.PI
    const sys = [0,0,0,0]
    const phase = [0,0,0,0]
    const i_l = [0,0,0,0,0,0,0,0]
    const c_l = [0,0,0,0,0,0,0,0]
    const write = [0,0,0,0,0,0,0,0,0,0,0,0]
    const out = [0,0,0,0,0,0,0,0,0,0,0,0]
    const temp_phase = {}
    const nSamplesPerSec = 44100
    const win = {} // a
    const pos_00 = {}
    const neg_00 = {}
    const min_max = [0,0]
    const data_i = {}
    const data_k = {}
    const tr_p_i = {}
    const tr_p_k = {}
    const i_det = {}
    const line_k = {}
    const line_00 = {}
    const line_01 = {}

    let i_d = 0
    let j_d = 0
    let k_d = 0

    let i_d_del = 0
    let i_c_temp = 0

    let i_c = [0,0]
    let ph_c = [0,0]

    let zero = [0,0,0,0,0]

    let z_c_00 = {}
    let z_c_01 = {}

    let k_co = {}
    let z_c_i = {}
    let z_c_k = {}

    let phase_c = {}

    let lim_k_d = {}

    const sin_phase = 0
    const cos_phase = 0
    const dry = {}
    const wet = {}


    let l_count_in = {
        sys: structuredClone(sys),
        i_l: structuredClone(i_l),
        c_l: structuredClone(c_l)
    }

    let l_temp = {
        temp_phase: structuredClone(temp_phase)
    }

    let l_phase = {
        phase: structuredClone(phase)
    }

    let l_triger = {
        k_first: 0,
        tr_00: 0,
        tr_01: 0,
        tr_true: 0,
        lim_k_tr: 0,
        tr_p: 0,
        tr_p_f: 0,
    }

    let l_param = {
        win: structuredClone(win),
        pos_00: structuredClone(pos_00),
        neg_00: structuredClone(neg_00),
        min_max: structuredClone(min_max),
    }

    // let l_memory = {
    //   double * data_i;
    //   double * data_k;
    //   double * tr_p_i;
    //   double * tr_p_k;
    //   double * i_det;
    //   double * line_k;
    //   double * line_00;
    //   double * line_01;
    // }

    let l_memory = {
        data_i: structuredClone(data_i),
        data_k: structuredClone(data_k),
        tr_p_i: structuredClone(tr_p_i),
        tr_p_k: structuredClone(tr_p_k),
        i_det: structuredClone(i_det),
        line_k: structuredClone(line_k),
        line_00: structuredClone(line_00),
        line_01: structuredClone(line_01),
    }

    let l_count = {
        i_d: structuredClone(i_d),
        j_d: structuredClone(j_d),
        k_d: structuredClone(k_d),

        i_d_del: structuredClone(i_d_del),
        i_c_temp: structuredClone(i_c_temp),

        i_c: structuredClone(i_c),
        ph_c: structuredClone(ph_c),

        zero: structuredClone(zero),

        z_c_00: structuredClone(z_c_00),
        z_c_01: structuredClone(z_c_01),

        k_co: structuredClone(k_co),
        z_c_i: structuredClone(z_c_i),
        z_c_k: structuredClone(z_c_k),

        phase_c: structuredClone(phase_c),
    }

    let l_limit = {
        lim_k_d: structuredClone(lim_k_d),
    }

    let line_out = {
        write: structuredClone(write),
        out: structuredClone(out),
        sin_phase: structuredClone(sin_phase),
        cos_phase: structuredClone(cos_phase),
        dry: structuredClone(dry),
        wet: structuredClone(wet),
    }

    let l_in_func = {
        out_d: 0,
        in_01: 0,
        k_start: 0,
        all_z_s_00: 0,
        k_fuul: 0,
        zero_temp: 0,
        z_s_00: 0,
        out_true_peack: 0,
    }


    const Line = (nSamplesPerSec = 44100, props) => {
        // props.win_line = parseInt(((nSamplesPerSec * 9) / 50) / 20,10);
        props.win_line = parseInt(90,10);

        for (let i = 0; i < 8; i++) {
            props.wave_in[i] = 0;
        }

        props.line_t.tr_00 = 0;
        props.line_t.tr_01 = 0;
        props.line_t.tr_p_f = -1;
        props.line_t.k_first = -5;
        props.line_t.tr_true = 0;
        props.line_t.lim_k_tr = 0;
        props.line_t.tr_p = 0;

        for (let i = 0; i < 4; i++) {
            props.line_ph.phase[i] = 0;
            props.line_c_in.sys[i] = 0;
        }

        props.line_te.temp_phase = 0;
        props.line_l.lim_k_d = 0;

        props.line_c.k_co = 0;
        props.line_c.z_c_00 = 0;
        props.line_c.z_c_01 = 1;
        props.line_c.z_c_i = 0;
        props.line_c.z_c_k = 0;

        props.line_c.i_d_del = 0;
        props.line_c.i_c_temp = 0;
        for (let i = 0; i < 5; i++) {
            props.line_c.zero[i] = 0;
        }
        props.line_c.phase_c = 0;

        for (let i = 0; i < 2; i++) {
            props.line_c.i_c[i] = -1;
            props.line_c.ph_c[i] = -5;

            if (i == 0) {
                props.line_p.min_max[i] = 10000;
            } else {
                props.line_p.min_max[i] = -10000;
            }
        }

        props.line_c.i_d = 0;
        props.line_c.j_d = 0;
        props.line_c.k_d = 0;

        props.line_p.pos_00 = 0;
        props.line_p.neg_00 = 0;
        props.line_p.win = props.win_line;

        props.line_m.data_i = new Array(parseInt(12 * props.line_p.win, 10) + 0);
        props.line_m.data_k = new Array(parseInt(12 * props.line_p.win, 10) + 0);
        props.line_m.line_00 = new Array(parseInt(12 * props.line_p.win, 10) + 0);
        props.line_m.line_01 = new Array(parseInt(12 * props.line_p.win, 10) + 0);
        props.line_m.tr_p_i = new Array(parseInt(12 * props.line_p.win, 10) + 0);
        props.line_m.tr_p_k = new Array(parseInt(12 * props.line_p.win, 10) + 0);
        props.line_m.line_k = new Array(parseInt(12 * props.line_p.win, 10) + 0);
        props.line_m.i_det = new Array(parseInt(12 * props.line_p.win, 10) + 0);

        for (let i = 0; i < 4; i++) {
            props.line_c_in.i_l[4 + i] = -1 - i;
            props.line_c_in.i_l[i] = 0;
            props.line_c_in.c_l[i] = -1;
        }

        props.line_f.out_d = 0;
        props.line_f.in_01 = 0;
        props.line_f.k_start = 0;
        props.line_f.all_z_s_00 = 0;
        props.line_f.k_fuul = 0;
        props.line_f.zero_temp = 0;
        props.line_f.z_s_00 = 0;
        props.line_f.out_true_peack = 0;

        props.line_out.cos_phase = 0;
        props.line_out.sin_phase = 0;
        props.line_out.dry = 0;
        props.line_out.wet = 0;

        for (let i = 0; i < 12; i++){
            props.line_out.write[i] = 0;
            props.line_out.out[i] = 0;
        }

        return props
    }

    const init = () => {
        let line_l = l_limit;
        let line_te = l_temp;
        let line_c = l_count;
        let line_p = l_param;
        let line_f = l_in_func;
        let line_t = l_triger
        let line_m = l_memory
        let line_ph = l_phase
        let line_c_in = l_count_in
        let wave_in = Array(8).fill(-5)

        object = {
            line_te: line_te,
            line_c: line_c,
            line_p: line_p,
            line_f: line_f,
            line_t: line_t,
            line_m: line_m,
            line_l: line_l,
            line_out: line_out,
            line_ph: line_ph,
            line_c_in: line_c_in,
            wave_in: wave_in,
            win_line: 0
        }

        object = Line(nSamplesPerSec, object);

        return object
    }

    // return l_count_in
    const count = (l_count_input) => {
        for (let i = 0; i < 4; i++) {
            l_count_input.i_l[4 + i]++;

            if (l_count_input.i_l[4 + i] > 3) {
                l_count_input.i_l[4 + i] = 0;
            }

            if(l_count_input.i_l[4 + i] < 0) {
                l_count_input.i_l[i] = 0;
            } else {
                l_count_input.i_l[i] = l_count_input.i_l[4 + i];
            }

            if (l_count_input.i_l[4 + i] == 0) {
                l_count_input.c_l[i] ++;
            }
        }

        return l_count_input
    }

    // return int
    const delay_one = (input, object) => {
        console.log('задержка на 1 сэмпл')
        object.line_f.out_d = object.line_f.in_01;
        object.line_f.in_01 = input;
        object.line_c.i_d_del = object.line_f.out_d
        // console.log('---- Используется для задержки -----', {
        //     out_d: object.line_f.out_d,
        //     in_01: object.line_f.in_01,
        //     i_d_del: object.line_c.i_d_del
        // })
        return object;
    };

    // return int
    const first_tr_p_k = (input, object) => {
        if (input === -5) {
            object.line_t.tr_p_f = -1
            return object;
        } else if (input === 1) {
            object.line_m.tr_p_k[object.line_c.k_d] = 1;
            object.line_m.data_k[4 * object.line_p.win + object.line_c.k_d] = 2;
            object.line_t.tr_p_f = 1
            return object;
        } else {
            object.line_t.tr_p_f = -1
            return object;
        }
    }

    // return int
    const zero_sample_count = (zero, input, object) => {
        if (object.line_f.k_start === -5) {
            object.line_f.all_z_s_00 = object.line_f.all_z_s_00;
        } else {
            if (zero === 0 && object.line_c.i_d <= object.line_p.win * 0.5) {
                object.line_f.k_fuul = -1;
            } else if (zero > 0 && object.line_c.i_d < object.line_p.win * 0.5) {
                object.line_f.k_fuul = 1;
            } else {
                object.line_f.k_fuul = 0;
            }

            if (object.line_f.zero_temp !== zero) {
                object.line_f.all_z_s_00 = object.line_f.all_z_s_00 + object.line_f.z_s_00;
                object.line_f.z_s_00 = 1;
            } else if (object.line_f.zero_temp === zero){
                object.line_f.z_s_00++;
            }

            object.line_f.zero_temp = zero;

            if (input === -5) {
                object.line_f.z_s_00 = 0;
            }

            if (zero > 0 && object.line_c.i_d >= (object.line_p.win * 0.4) && object.line_c.i_d <= (object.line_p.win * 0.5)) {
                object.line_f.k_start = 10;
                if (object.line_f.k_start === 10) {
                    object.line_f.all_z_s_00 = object.line_f.all_z_s_00 + object.line_f.z_s_00;
                }
                object.line_f.k_start = -5;

                object.line_t.k_first = 1
                return object;
            } else if (zero == 0 && object.line_c.i_d === (object.line_p.win * 0.5)) {
                object.line_f.k_start = 10;

                if (object.line_f.k_start === 10) {
                    object.line_f.all_z_s_00 = (object.line_p.win * 0.5) + 1;
                }

                object.line_f.k_start = -5;

                object.line_t.k_first = 1
                return object;
            }
        }

        object.line_t.k_first = -5
        return object;
        //show_01(i_d, k_d, j_d, zero, all_z_s_00, k_start, -5, -5, -5, -5, in);
    }

    //return int
    const true_peack = (phase_num, object) => {
// console.log('33333333333333333333333333', object.line_t.tr_p)
        if (object.line_f.out_true_peack === phase_num) {
            object.line_t.tr_p = 0;
            return object;
        } else if (object.line_f.out_true_peack !== phase_num){
            object.line_f.out_true_peack = phase_num;
            object.line_t.tr_p = 1
            return  object;
        }
    };

    const core_line = (input, object) => {
        // console.log('--- вычисляется count  ---')
        object.line_c_in = count(object.line_c_in);
        // console.log('--- object.line_c_in  ---', object.line_c_in)
        object.line_c_in.sys[object.line_c_in.i_l[0]] = input;

        object.wave_in[0] = object.line_c_in.sys[object.line_c_in.i_l[0]];
        object.wave_in[1] = object.line_c_in.sys[object.line_c_in.i_l[1]];
        object.wave_in[2] = object.line_c_in.sys[object.line_c_in.i_l[2]];
        object.wave_in[3] = object.line_c_in.sys[object.line_c_in.i_l[3]];
        console.log('Записываю в wave_in', object.wave_in)

        for (let i = 0; i < 4; i++) {
            console.log('---- line_c_in.c_l ----',i, object.line_c_in.c_l[i])
            if (object.line_c_in.c_l[i] == -1) {
                object.wave_in[i] = -5;
            }
        }

        htmlConsoleData_0.insertAdjacentHTML('beforeend',`<span class="data line_0">${object.wave_in[0]}</span>`)
        htmlConsoleData_1.insertAdjacentHTML('beforeend',`<span class="data line_0">${object.wave_in[1]}</span>`)
        htmlConsoleData_2.insertAdjacentHTML('beforeend',`<span class="data line_0">${object.wave_in[2]}</span>`)
        htmlConsoleData_3.insertAdjacentHTML('beforeend',`<span class="data line_0">${object.wave_in[3]}</span>`)

        if (object.line_c_in.c_l[2] === -1) {
            object.line_c.i_d = 0;
        } else {
            object.line_c.i_d++;
        }

        console.log('проверяю каунт object.line_c.i_d ', object.line_c.i_d)
        // debugger

        if (object.line_c.i_d >= object.line_p.win) {
            object.line_c.i_d = 0;
        }

        htmlConsoleData_7.insertAdjacentHTML('beforeend',`<span class="data line_2">${object.line_c.i_d}</span>`)

        if (object.line_c.i_d === 0) {
            object.line_c.i_c[1]++;
        }

        if (object.line_c.i_d === object.line_p.win / 2) {
            object.line_c.i_c[0]++;
        }

        htmlConsoleData_8.insertAdjacentHTML('beforeend',`<span class="data line_2">${object.line_c.i_c[0]}</span>`)
        htmlConsoleData_9.insertAdjacentHTML('beforeend',`<span class="data line_2">${object.line_c.i_c[1]}</span>`)

        if (object.line_c.i_c[0] === -1) {
            object.line_c.ph_c[0] = 0;
            object.line_c.ph_c[1] = 0;
        } else {
            object.line_c.ph_c[0] = object.line_c.i_c[1] - object.line_c.i_c[0];
            object.line_c.ph_c[1] = object.line_c.i_c[1] - (object.line_c.i_c[0] + 1);
        }

        object.line_c.i_c_temp = object.line_c.i_c[1] - 1;

        if (object.line_c.i_c_temp === -1) {
            object.line_c.i_c_temp = 0;
        }

        if (object.line_c.ph_c[1] === 0) {
            object.line_c.ph_c[1] = 2;
        }


        if (object.line_c.i_c[0] === -1) {
            object.line_c.ph_c[1] = -5;
        }

        htmlConsoleData_10.insertAdjacentHTML('beforeend',`<span class="data line_2">${object.line_c.ph_c[0]}</span>`)
        htmlConsoleData_11.insertAdjacentHTML('beforeend',`<span class="data line_2">${object.line_c.ph_c[1]}</span>`)

        if (object.line_c.ph_c[0] === 0) {
            object.line_c.j_d = 0;
        } else if (object.line_c.ph_c[0] === 1){
            object.line_c.j_d = object.line_c.i_d - (object.line_p.win / 2);
        } else {
            object.line_c.j_d = object.line_c.i_d + (object.line_p.win / 2);
        }

        htmlConsoleData_12.insertAdjacentHTML('beforeend',`<span class="data line_2">${object.line_c.j_d}</span>`)

        //object.line_c.i_d_del
        object = delay_one(object.line_c.i_d, object);

        if (object.wave_in[1] === 0) {
            object.line_c.zero[0] = 9;
        } else {
            object.line_c.zero[0] = 0;
        }

        if (object.wave_in[1] >= 0) {
            object.line_c.zero[1] = 1;
        } else {
            object.line_c.zero[1] = 4;
        }

        if (object.wave_in[1] === 0
            && object.wave_in[2] < 0) {

            object.line_c.zero[1] = 4;
        }

        if (object.wave_in[0] >= 0) {
            object.line_c.zero[2] = 1;
        } else {
            object.line_c.zero[2] = 4;
        }

        if (object.wave_in[0] === 0 && object.wave_in[1] < 0) {
            object.line_c.zero[2] = 4;
        }

        if (object.wave_in[0] > 0 && object.wave_in[1] < 0 || object.wave_in[0] < 0 && object.wave_in[1] > 0) {
            object.line_c.zero[3] = 1;
        } else {
            object.line_c.zero[3] = 0;
        }

        if (object.wave_in[1] > 0 && object.wave_in[2] < 0 || object.wave_in[1] < 0 && object.wave_in[2] > 0) {
            object.line_c.zero[4] = 2;
        } else {
            object.line_c.zero[4] = 0;
        }

        if (object.line_c.zero[0] === 9 && object.line_c.zero[1] === object.line_c.zero[2]) {
            object.line_c.zero[3] = 0;
            object.line_c.zero[4] = 0;
        } else if (object.line_c.zero[0] === 9 && object.line_c.zero[1] > object.line_c.zero[2] || object.line_c.zero[0] === 9 && object.line_c.zero[1] < object.line_c.zero[2]) {
            object.line_c.zero[3] = 1;
            object.line_c.zero[4] = 2;
        }

        if (object.line_c_in.c_l[1] === -1) {
            object.line_c.i_d = 0;
            object.line_c.j_d = 0;
            object.line_c.k_d = 0;
            object.line_c.ph_c[0] = -5;
            object.line_c.ph_c[1] = -5;
            object.wave_in[1] = -5;
            object.line_c.zero[0] = -5;
            object.line_c.zero[1] = -5;
            object.line_c.zero[2] = -5;
            object.line_c.zero[3] = -5;
            object.line_c.zero[4] = -5;
        }

        if (object.line_c.zero[0] === 9
            && object.line_c.zero[1] === 1
            && object.line_c.zero[2] === 4
            || object.line_c.zero[0] === 9
            && object.line_c.zero[1] === 4
            && object.line_c.zero[2] == 1
            || object.line_c.zero[0] != 9
            && object.line_c.zero[4] == 2) {

            object.line_c.z_c_00++;
            object.line_c.z_c_01++;
        }

        if (object.line_c.z_c_00 >= object.line_p.win) {
            object.line_c.z_c_00 = 0;
        }

        if (object.line_c.z_c_01 >= object.line_p.win) {
            object.line_c.z_c_01 = 0;
        }

        if (object.line_t.k_first === -5) {
            object = zero_sample_count(object.line_c.z_c_00, object.wave_in[1], object);

            object.line_c.k_d = 0;
        } else if (object.line_t.k_first === 1) {
            object.line_c.k_d++;
        } else {
            console.log('!!!!!!!!!!!!!!!!!!!!!!! Не обрабатывается в коде !!!!!!!!!!!!!!!!!!!!!!!')
        }

        if (object.line_c.k_d >= object.line_p.win) {
            object.line_c.k_d = 0;
        }

        // htmlConsoleData_14.insertAdjacentHTML('beforeend',`<span class="data line_6">${object.line_c.z_c_00}</span>`)
        // htmlConsoleData_15.insertAdjacentHTML('beforeend',`<span class="data line_6">${object.line_c.z_c_01}</span>`)

        if (object.wave_in[1] === -5) {

            object.line_p.min_max[0] = 10000;
            object.line_p.min_max[1] = -10000;
            object.line_p.min_max[2] = 10000;
            object.line_p.min_max[3] = -10000;

        } else if (object.line_c.zero[0] === 9
            && object.line_c.zero[1] === 1
            && object.line_c.zero[2] === 4
            && object.line_c.zero[3] === 1
            && object.line_c.zero[4] === 2) {

            object.line_p.min_max[0] = 10000;
            object.line_p.min_max[2] = 10000

        } else if (object.line_c.zero[0] === 9
            && object.line_c.zero[1] === 4
            && object.line_c.zero[2] === 1
            && object.line_c.zero[3] === 1
            && object.line_c.zero[4] === 2) {

            object.line_p.min_max[1] = -10000;
            object.line_p.min_max[3] = -10000;

        } else if (object.line_c.zero[1] === 4
            && object.line_c.zero[2] === 1
            && object.line_c.zero[3] === 1
            && object.line_c.zero[4] === 2) {

            object.line_p.min_max[0] = 10000;
            object.line_p.min_max[2] = 10000

        } else if (object.line_c.zero[1] === 1
            && object.line_c.zero[2] === 4
            && object.line_c.zero[3] === 1
            && object.line_c.zero[4] === 2) {

            object.line_p.min_max[1] = -10000;
            object.line_p.min_max[3] = -10000;

        } else if (object.line_c.zero[1] === 4
            && object.line_c.zero[2] === 4
            && object.line_c.zero[3] === 0
            && object.line_c.zero[4] === 2) {

            object.line_p.min_max[0] = 10000;
            object.line_p.min_max[2] = 10000

        } else if (object.line_c.zero[1] === 1
            && object.line_c.zero[2] === 1
            && object.line_c.zero[3] === 0
            && object.line_c.zero[4] === 2) {

            object.line_p.min_max[1] = -10000;
            object.line_p.min_max[3] = -10000;
        }

        if (object.line_p.min_max[0] > object.wave_in[1]) {
            object.line_p.min_max[0] = object.wave_in[1];

            if (object.line_p.min_max[0] === -5
                && object.wave_in[1] === -5) {
                    object.line_p.min_max[0] = 10000;
            }
        }

        if (object.line_p.min_max[2] > object.wave_in[1] && object.line_c.zero[1] === 1) {
            object.line_p.min_max[2] = object.wave_in[1]

            if (object.line_p.min_max[2] === -5
                && object.wave_in[1] === -5) {
                    object.line_p.min_max[2] = 10000
            }

            object.line_p.min_max[3] = -10000
        } else {
            if(object.line_c.zero[1] === 4) {
                object.line_p.min_max[2] = 10000

                if(object.line_p.min_max[3] < object.wave_in[1]) {
                    object.line_p.min_max[3] = object.wave_in[1]
                }
            }
        }

        if (object.line_p.min_max[1] < object.wave_in[1]) {
            object.line_p.min_max[1] = object.wave_in[1];
        }

        // if (object.line_p.min_max[3] > object.wave_in[1]) {
        //     object.line_p.min_max[3] = object.wave_in[1];
        // }

        if (object.wave_in[1] > 0) {
            object.line_p.pos_00 = object.line_p.min_max[1];
            object.line_p.neg_00 = 0;
        }

        if (object.wave_in[1] < 0) {
            object.line_p.pos_00 = 0;
            object.line_p.neg_00 = object.line_p.min_max[0];
        }


        htmlConsoleData_14.insertAdjacentHTML('beforeend',`<span class="data line_0">${object.line_c.i_d}</span>`)
        htmlConsoleData_15.insertAdjacentHTML('beforeend',`<span class="data line_0">${object.line_c.k_d}</span>`)
        htmlConsoleData_16.insertAdjacentHTML('beforeend',`<span class="data line_0">${object.wave_in[1]}</span>`)
        // htmlConsoleData_17.insertAdjacentHTML('beforeend',`<span class="data line_0">${object.line_p.min_max[0]}</span>`)
        htmlConsoleData_18.insertAdjacentHTML('beforeend',`<span class="data line_0">${object.line_p.min_max[2]}</span>`)
        htmlConsoleData_19.insertAdjacentHTML('beforeend',`<span class="data line_0">${object.line_p.min_max[3]}</span>`)
        htmlConsoleData_20.insertAdjacentHTML('beforeend',`<span class="data line_0">${object.line_c.zero[0]}</span>`)
        htmlConsoleData_21.insertAdjacentHTML('beforeend',`<span class="data line_0">${object.line_c.zero[1]}</span>`)

        // object.line_m.data_k[11 * object.line_p.win + object.line_c.k_d] = 0;
        // htmlConsoleData_20.insertAdjacentHTML('beforeend',`<span class="data line_0">${object.line_p.min_max[3]}</span>`)

        object.line_m.data_i[object.line_c.i_d] = object.line_c.zero[0];
        object.line_m.data_i[1 * object.line_p.win + object.line_c.i_d] = object.line_c.zero[1];
        object.line_m.data_i[2 * object.line_p.win + object.line_c.i_d] = object.line_c.zero[2];
        object.line_m.data_i[3 * object.line_p.win + object.line_c.i_d] = object.line_c.zero[3];
        object.line_m.data_i[4 * object.line_p.win + object.line_c.i_d] = object.line_c.zero[4];
        object.line_m.data_i[5 * object.line_p.win + object.line_c.i_d] = object.wave_in[0];
        object.line_m.data_i[6 * object.line_p.win + object.line_c.i_d] = object.wave_in[1];
        object.line_m.data_i[7 * object.line_p.win + object.line_c.i_d] = object.wave_in[2];
        object.line_m.data_i[8 * object.line_p.win + object.line_c.i_d] = object.line_p.neg_00;
        object.line_m.data_i[9 * object.line_p.win + object.line_c.i_d] = object.line_p.pos_00;
        object.line_m.data_i[10 * object.line_p.win + object.line_c.i_d] = object.line_c.z_c_00;
        object.line_m.data_i[11 * object.line_p.win + object.line_c.i_d] = object.line_c.z_c_01;
        object.line_m.data_i[12 * object.line_p.win + object.line_c.i_d] = object.line_p.min_max[0];
        object.line_m.data_i[13 * object.line_p.win + object.line_c.i_d] = object.line_p.min_max[1];
        object.line_m.data_i[14 * object.line_p.win + object.line_c.i_d] = object.line_p.min_max[2] === 10000 ? object.line_p.min_max[3]: object.line_p.min_max[2];
        // object.line_m.data_i[15 * object.line_p.win + object.line_c.i_d] = object.line_p.min_max[3];

        if (object.line_p.neg_00 === 0) {
            object.line_t.tr_00 = 0;
        } else {
            object.line_t.tr_00 = 1;
        }

        if (object.line_p.pos_00 === 0) {
            object.line_t.tr_01 = 0;
        } else {
            object.line_t.tr_01 = 1;
        }

        if ((object.line_t.tr_00 + object.line_t.tr_01) === 1) {
            object.line_t.tr_true = 1;
        } else {
            object.line_t.tr_true = 0;
        }

        htmlConsoleData_23.insertAdjacentHTML('beforeend',`<span class="data line_7">${object.line_c.zero[0]}</span>`)
        htmlConsoleData_24.insertAdjacentHTML('beforeend',`<span class="data line_7">${object.line_c.zero[1]}</span>`)
        htmlConsoleData_25.insertAdjacentHTML('beforeend',`<span class="data line_7">${object.line_c.zero[2]}</span>`)
        htmlConsoleData_26.insertAdjacentHTML('beforeend',`<span class="data line_7">${object.line_c.zero[3]}</span>`)
        htmlConsoleData_27.insertAdjacentHTML('beforeend',`<span class="data line_7">${object.line_t.tr_00}</span>`)
        htmlConsoleData_28.insertAdjacentHTML('beforeend',`<span class="data line_7">${object.line_t.tr_01}</span>`)
        htmlConsoleData_29.insertAdjacentHTML('beforeend',`<span class="data line_7">${object.line_t.tr_true}</span>`)


        object.line_m.line_00[object.line_c.i_d] = object.line_m.data_i[8 * object.line_p.win + object.line_c.i_d] + object.line_m.data_i[9 * object.line_p.win + object.line_c.i_d];

        if (object.line_t.k_first === -5) {
            object.line_m.line_01[object.line_c.k_d] = 0;
        } else {
            object.line_m.line_01[object.line_c.k_d] = object.line_m.line_00[object.line_c.k_d];
        }

        for (let i = 0; i < 12; i++){
            if (object.line_t.k_first === -5) {
                object.line_m.data_k[i * object.line_p.win + object.line_c.k_d] = -5;
            } else {
                object.line_m.data_k[i * object.line_p.win + object.line_c.k_d] = object.line_m.data_i[i * object.line_p.win + object.line_c.k_d];
            }
        }

        if (object.line_l.lim_k_d > object.line_m.data_i[10 * object.line_p.win + object.line_c.i_d]) {
            object.line_l.lim_k_d = object.line_m.data_i[11 * object.line_p.win + object.line_c.k_d];
            object.line_t.lim_k_tr = 1;
        } else if (object.line_l.lim_k_d === object.line_m.data_i[10 * object.line_p.win + object.line_c.i_d]) {
            object.line_l.lim_k_d = object.line_m.data_k[11 * object.line_p.win + object.line_c.k_d - 1];
            object.line_t.lim_k_tr = 2;
        } else {
            object.line_l.lim_k_d = object.line_m.data_k[11 * object.line_p.win + object.line_c.k_d];
            object.line_t.lim_k_tr = 0;
        }

        if (object.line_t.k_first === -5) {
            object.line_c.k_co = 0;
        } else if(object.line_c.k_d === 0) {
            object.line_c.k_co++;
        }

        // htmlConsoleData_22.insertAdjacentHTML('beforeend',`<span class="data line_8">${object.line_c.k_co}</span>`)
        // htmlConsoleData_23.insertAdjacentHTML('beforeend',`<span class="data line_8">${object.line_t.lim_k_tr}</span>`)

        object = true_peack(object.line_c.z_c_00, object);

        object.line_m.tr_p_i[object.line_c.i_d] = object.line_t.tr_p;
        object.line_m.tr_p_k[object.line_c.k_d] = object.line_m.tr_p_i[object.line_c.k_d];

        if (object.line_t.tr_p === 1
            && object.line_m.data_i[object.line_c.i_d] === 9
            && object.line_m.data_i[1 * object.line_p.win + object.line_c.i_d] === 4
            && object.line_m.data_i[2 * object.line_p.win + object.line_c.i_d] === 1) {

            object.line_m.i_det[object.line_c.z_c_00] = object.line_m.data_i[8 * object.line_p.win + object.line_c.i_d - 0];

        } else if (object.line_t.tr_p === 1
            && object.line_m.data_i[object.line_c.i_d] === 9
            && object.line_m.data_i[1 * object.line_p.win + object.line_c.i_d] === 1
            && object.line_m.data_i[2 * object.line_p.win + object.line_c.i_d] === 4) {

            object.line_m.i_det[object.line_c.z_c_00] = object.line_m.data_i[9 * object.line_p.win + object.line_c.i_d - 0];

        } else if (object.line_t.tr_p === 1
            && object.line_m.data_i[object.line_c.i_d] === 0
            && object.line_m.data_i[1 * object.line_p.win + object.line_c.i_d] === 4
            && object.line_m.data_i[2 * object.line_p.win + object.line_c.i_d] === 4
            && object.line_m.data_i[4 * object.line_p.win + object.line_c.i_d] === 2) {

            object.line_m.i_det[object.line_c.z_c_00] = object.line_m.line_00[object.line_c.i_d_del];

        } else if (object.line_t.tr_p === 1
            && object.line_m.data_i[object.line_c.i_d] === 0
            && object.line_m.data_i[1 * object.line_p.win + object.line_c.i_d] === 1
            && object.line_m.data_i[2 * object.line_p.win + object.line_c.i_d] === 1
            && object.line_m.data_i[4 * object.line_p.win + object.line_c.i_d] === 2) {

            object.line_m.i_det[object.line_c.z_c_00] = object.line_m.line_00[object.line_c.i_d_del];

        } else if (object.line_t.tr_p === 1
            && object.line_m.data_i[object.line_c.i_d] === 0
            && object.line_m.data_i[1 * object.line_p.win + object.line_c.i_d] === 1
            && object.line_m.data_i[2 * object.line_p.win + object.line_c.i_d] === 4
            && object.line_m.data_i[3 * object.line_p.win + object.line_c.i_d] === 1
            && object.line_m.data_i[4 * object.line_p.win + object.line_c.i_d] === 2) {

            object.line_m.i_det[object.line_c.z_c_00] = object.line_m.line_00[object.line_c.i_d_del];

        } else if (object.line_t.tr_p === 1
            && object.line_m.data_i[object.line_c.i_d] === 0
            && object.line_m.data_i[1 * object.line_p.win + object.line_c.i_d] === 4
            && object.line_m.data_i[2 * object.line_p.win + object.line_c.i_d] === 1
            && object.line_m.data_i[3 * object.line_p.win + object.line_c.i_d] === 1
            && object.line_m.data_i[4 * object.line_p.win + object.line_c.i_d] === 2) {

            object.line_m.i_det[object.line_c.z_c_00] = object.line_m.line_00[object.line_c.i_d_del];
        }

        if (object.line_m.data_k[11 * object.line_p.win + object.line_c.k_d] === -5) {
            object.line_m.line_k[object.line_c.k_d] = 0;
        } else {
            // console.log('################## --- ##################', object.line_l.lim_k_d)
            object.line_m.line_k[object.line_c.k_d] = object.line_m.i_det[object.line_l.lim_k_d];
        }

        if (object.line_m.tr_p_i[object.line_c.i_d] === 1 && object.line_c.z_c_00 === 0) {
            object.line_c.z_c_i++;
        }

        if (object.line_m.tr_p_k[object.line_c.k_d] === 1 && object.line_m.data_k[11 * object.line_p.win + object.line_c.k_d] === 1) {
            object.line_c.z_c_k++;
        }

        if (object.line_t.k_first === -5) {
            object.line_m.data_k[11 * object.line_p.win + object.line_c.k_d] = 0;
            object.line_m.data_k[6 * object.line_p.win + object.line_c.k_d] = 0;
            object.line_m.data_k[object.line_c.k_d] = 0;
            object.line_m.data_k[4 * object.line_p.win + object.line_c.k_d] = 0;
        }

        if (object.line_t.tr_p_f === -1) {
            object = first_tr_p_k(object.line_t.k_first, object);
        }

        object.line_te.temp_phase = object.line_m.line_01[object.line_c.k_d];

        if (object.line_m.data_k[object.line_c.k_d] === 9) {
            object.line_m.line_01[object.line_c.k_d] = object.line_m.line_01[object.line_c.k_d] * -1;
            object.line_te.temp_phase = object.line_te.temp_phase *-2;
        }

        if (object.line_m.line_k[object.line_c.k_d] > 0
            && object.line_m.line_01[object.line_c.k_d] < 0) {
            object.line_m.line_01[object.line_c.k_d] = object.line_m.line_01[object.line_c.k_d] * -1;
            object.line_te.temp_phase = object.line_te.temp_phase *-1; // ��������� �� �� �����
        }

        if (object.line_m.line_k[object.line_c.k_d] < 0 && object.line_m.line_01[object.line_c.k_d] > 0) {
            object.line_m.line_01[object.line_c.k_d] = object.line_m.line_01[object.line_c.k_d] * -1;
            object.line_te.temp_phase = object.line_te.temp_phase *-1;
        }

        if (object.line_m.line_k[object.line_c.k_d] == object.line_te.temp_phase) {
            object.line_c.phase_c = 2;
        } else {
            object.line_c.phase_c = 1;
        }

        if(object.line_m.data_k[4 * object.line_p.win + object.line_c.k_d] === 2) {
            let count = object.line_c.k_d
            while (true) {
                count++
                console.log('dddddddddddd', object.line_m.data_k[4 * object.line_p.win + count])
                if(object.line_m.data_k[4 * object.line_p.win + count] === 2) {
                    debugger
                    break
                }
            }
        }

        object.line_out.out[0] = object.line_m.data_k[object.line_c.k_d];
        object.line_out.out[1] = object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d];
        object.line_out.out[2] = object.line_m.data_k[2 * object.line_p.win + object.line_c.k_d];
        object.line_out.out[3] = object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d];
        object.line_out.out[4] = object.line_m.data_k[4 * object.line_p.win + object.line_c.k_d];
        console.log('<<<<<<<<<<<<<< ########################## >>>>>>>>>>>', object.line_m.data_k[4 * object.line_p.win + object.line_c.k_d], object.line_m.data_k[4 * object.line_p.win + object.line_c.k_d + 1])
        object.line_out.out[5] = object.line_m.line_k[object.line_c.k_d];
        object.line_out.out[6] = object.line_m.line_01[object.line_c.k_d];
        object.line_out.out[7] = object.line_m.data_k[6 * object.line_p.win + object.line_c.k_d];
        object.line_out.out[8] = object.line_te.temp_phase;
        object.line_out.out[9] = object.line_m.data_i[12 * object.line_p.win + object.line_c.k_d];
        object.line_out.out[10] = object.line_m.data_i[13 * object.line_p.win + object.line_c.k_d];
        object.line_out.out[11] = object.line_m.data_i[14 * object.line_p.win + object.line_c.k_d];
        object.line_out.out[12] = object.line_m.data_i[15 * object.line_p.win + object.line_c.k_d];

        object.line_out.write[0] = object.line_m.data_k[6 * object.line_p.win + object.line_c.k_d];
        object.line_out.write[1] = object.line_m.line_k[object.line_c.k_d];
        object.line_out.write[2] = object.line_m.line_01[object.line_c.k_d];
        object.line_out.write[3] = object.line_m.line_k[object.line_c.k_d];
        object.line_out.write[4] = object.line_m.data_i[5 * object.line_p.win + object.line_c.k_d];
        object.line_out.write[5] = object.line_m.data_k[4 * object.line_p.win + object.line_c.k_d];
        object.line_out.write[6] = object.line_m.data_k[object.line_c.k_d];
        object.line_out.write[7] = 0;

        htmlConsoleData_34.insertAdjacentHTML('beforeend',`<span class="data line_6">${object.line_c.k_d}</span>`)
        htmlConsoleData_35.insertAdjacentHTML('beforeend',`<span class="data line_6">${object.line_out.write[0]}</span>`)
        htmlConsoleData_36.insertAdjacentHTML('beforeend',`<span class="data line_6">${object.line_out.write[1]}</span>`)
        htmlConsoleData_37.insertAdjacentHTML('beforeend',`<span class="data line_6">${object.line_out.write[2]}</span>`)
        htmlConsoleData_38.insertAdjacentHTML('beforeend',`<span class="data line_6">${object.line_out.write[3]}</span>`)
        htmlConsoleData_39.insertAdjacentHTML('beforeend',`<span class="data line_6">${object.line_out.write[4]}</span>`)
        htmlConsoleData_40.insertAdjacentHTML('beforeend',`<span class="data line_6">${object.line_out.write[5]}</span>`)
        htmlConsoleData_41.insertAdjacentHTML('beforeend',`<span class="data line_6">${object.line_out.write[6]}</span>`)

        htmlConsoleData_45.insertAdjacentHTML('beforeend',`<span class="data line_8">${object.line_out.out[0]}</span>`)
        htmlConsoleData_46.insertAdjacentHTML('beforeend',`<span class="data line_8">${object.line_out.out[1]}</span>`)
        htmlConsoleData_47.insertAdjacentHTML('beforeend',`<span class="data line_8">${object.line_out.out[2]}</span>`)
        htmlConsoleData_48.insertAdjacentHTML('beforeend',`<span class="data line_8">${object.line_out.out[3]}</span>`)
        htmlConsoleData_49.insertAdjacentHTML('beforeend',`<span class="data line_8 select">${object.line_out.out[4]}</span>`)
        htmlConsoleData_50.insertAdjacentHTML('beforeend',`<span class="data line_8">${object.line_out.out[5]}</span>`)
        htmlConsoleData_51.insertAdjacentHTML('beforeend',`<span class="data line_8">${object.line_out.out[6]}</span>`)
        htmlConsoleData_52.insertAdjacentHTML('beforeend',`<span class="data line_8">${object.line_out.out[7]}</span>`)
        htmlConsoleData_53.insertAdjacentHTML('beforeend',`<span class="data line_8">${object.line_out.out[8]}</span>`)
        // console.log('sssssssssssssssssssssssssssssssss',object.line_out.out)
        htmlConsoleData_54.insertAdjacentHTML('beforeend',`<span class="data line_8">${object.line_out.out[9]}</span>`)
        htmlConsoleData_55.insertAdjacentHTML('beforeend',`<span class="data line_8">${object.line_out.out[10]}</span>`)
        htmlConsoleData_56.insertAdjacentHTML('beforeend',`<span class="data line_8">${object.line_out.out[11]}</span>`)

        if (object.line_m.data_k[0 * object.line_p.win + object.line_c.k_d] === 0
            && object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d] === 1
            && object.line_m.data_k[2 * object.line_p.win + object.line_c.k_d] === 1
            && object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d] === 0
            && object.line_m.data_i[4 * object.line_p.win + object.line_c.k_d] === 0
            && object.line_c.phase_c === 2) {

                object.line_ph.phase[0] = 0;
                object.line_ph.phase[1] = 2;
                object.line_ph.phase[2] = 0;
                object.line_ph.phase[3] = 3;

        } else if (object.line_m.data_k[object.line_c.k_d] === 0
            && object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d] === 1
            && object.line_m.data_k[2 * object.line_p.win + object.line_c.k_d] === 1
            && object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d] === 0
            && object.line_m.data_i[4 * object.line_p.win + object.line_c.k_d] === 2
            && object.line_c.phase_c === 2) {

                object.line_ph.phase[0] = 1;
                object.line_ph.phase[1] = 0;
                object.line_ph.phase[2] = 2;
                object.line_ph.phase[3] = 0;

        } else if (object.line_m.data_k[object.line_c.k_d] === 0
            && object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d] === 1
            && object.line_m.data_k[2 * object.line_p.win + object.line_c.k_d] === 4
            && object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d] === 1
            && object.line_m.data_i[4 * object.line_p.win + object.line_c.k_d] === 0
            && object.line_c.phase_c === 2) {

                object.line_ph.phase[0] = 0;
                object.line_ph.phase[1] = 2;
                object.line_ph.phase[2] = 0;
                object.line_ph.phase[3] = 3;

        } else if (object.line_m.data_k[object.line_c.k_d] === 9
            && object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d] === 1
            && object.line_m.data_k[2 * object.line_p.win + object.line_c.k_d] === 4
            && object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d] === 1
            && object.line_m.data_i[4 * object.line_p.win + object.line_c.k_d] === 2
            && object.line_c.phase_c === 1) {

                object.line_ph.phase[0] = 3;
                object.line_ph.phase[1] = 0;
                object.line_ph.phase[2] = 4;
                object.line_ph.phase[3] = 0;

        } else if (object.line_m.data_k[object.line_c.k_d] === 0
            && object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d] === 4
            && object.line_m.data_k[2 * object.line_p.win + object.line_c.k_d] === 4
            && object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d] === 0
            && object.line_m.data_i[4 * object.line_p.win + object.line_c.k_d] === 0
            && object.line_c.phase_c === 1) {

                object.line_ph.phase[0] = 3;
                object.line_ph.phase[1] = 0;
                object.line_ph.phase[2] = 4;
                object.line_ph.phase[3] = 0;

        } else if (object.line_m.data_k[object.line_c.k_d] === 0
            && object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d] === 4
            && object.line_m.data_k[2 * object.line_p.win + object.line_c.k_d] === 4
            && object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d] === 0
            && object.line_m.data_i[4 * object.line_p.win + object.line_c.k_d] === 2
            && object.line_c.phase_c === 1) {

                object.line_ph.phase[0] = 3;
                object.line_ph.phase[1] = 0;
                object.line_ph.phase[2] = 4;
                object.line_ph.phase[3] = 0;

        } else if (object.line_m.data_k[object.line_c.k_d] === 0
            && object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d] === 4
            && object.line_m.data_k[2 * object.line_p.win + object.line_c.k_d] === 4
            && object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d] === 0
            && object.line_m.data_i[4 * object.line_p.win + object.line_c.k_d] === 2
            && object.line_c.phase_c === 2) {

                object.line_ph.phase[0] = 3;
                object.line_ph.phase[1] = 0;
                object.line_ph.phase[2] = 4;
                object.line_ph.phase[3] = 0;

        } else if (object.line_m.data_k[object.line_c.k_d] === 0
            && object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d] === 4
            && object.line_m.data_k[2 * object.line_p.win + object.line_c.k_d] === 4
            && object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d] === 0
            && object.line_m.data_i[4 * object.line_p.win + object.line_c.k_d] === 0
            && object.line_c.phase_c === 2) {

                object.line_ph.phase[0] = 0;
                object.line_ph.phase[1] = 4;
                object.line_ph.phase[2] = 0;
                object.line_ph.phase[3] = 1;

        } else if (object.line_m.data_k[object.line_c.k_d] === 0
            && object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d] === 4
            && object.line_m.data_k[2 * object.line_p.win + object.line_c.k_d] === 1
            && object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d] === 1
            && object.line_m.data_i[4 * object.line_p.win + object.line_c.k_d] === 0
            && object.line_c.phase_c === 2) {

                object.line_ph.phase[0] = 0;
                object.line_ph.phase[1] = 4;
                object.line_ph.phase[2] = 0;
                object.line_ph.phase[3] = 1;

        } else if (object.line_m.data_k[object.line_c.k_d] === 0
            && object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d] === 4
            && object.line_m.data_k[2 * object.line_p.win + object.line_c.k_d] === 1
            && object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d] === 1
            && object.line_m.data_i[4 * object.line_p.win + object.line_c.k_d] === 2
            && object.line_c.phase_c === 2) {

                object.line_ph.phase[0] = 3;
                object.line_ph.phase[1] = 4;
                object.line_ph.phase[2] = 4;
                object.line_ph.phase[3] = 1;

        } else if (object.line_m.data_k[object.line_c.k_d] === 9
            && object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d] === 4
            && object.line_m.data_k[2 * object.line_p.win + object.line_c.k_d] === 1
            && object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d] === 1
            && object.line_m.data_i[4 * object.line_p.win + object.line_c.k_d] === 2
            && object.line_c.phase_c === 1) {

                object.line_ph.phase[0] = 1;
                object.line_ph.phase[1] = 0;
                object.line_ph.phase[2] = 2;
                object.line_ph.phase[3] = 0;

        } else if (object.line_m.data_k[object.line_c.k_d] === 0
            && object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d] === 1
            && object.line_m.data_k[2 * object.line_p.win + object.line_c.k_d] === 1
            && object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d] === 0
            && object.line_m.data_i[4 * object.line_p.win + object.line_c.k_d] === 0
            && object.line_c.phase_c === 1) {

                object.line_ph.phase[0] = 1;
                object.line_ph.phase[1] = 0;
                object.line_ph.phase[2] = 2;
                object.line_ph.phase[3] = 0;

        } else if (object.line_m.data_k[object.line_c.k_d] === 0
            && object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d] === 1
            && object.line_m.data_k[2 * object.line_p.win + object.line_c.k_d] === 1
            && object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d] === 0
            && object.line_m.data_i[4 * object.line_p.win + object.line_c.k_d] === 2
            && object.line_c.phase_c === 1) {

                object.line_ph.phase[0] = 1;
                object.line_ph.phase[1] = 0;
                object.line_ph.phase[2] = 2;
                object.line_ph.phase[3] = 0;

        } else if (object.line_m.data_k[object.line_c.k_d] === 0
            && object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d] === 1
            && object.line_m.data_k[2 * object.line_p.win + object.line_c.k_d] === 4
            && object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d] === 1
            && object.line_m.data_i[4 * object.line_p.win + object.line_c.k_d] === 2
            && object.line_c.phase_c === 2) {

                object.line_ph.phase[0] = 1;
                object.line_ph.phase[1] = 2;
                object.line_ph.phase[2] = 2;
                object.line_ph.phase[3] = 3;

        } else {
            object.line_ph.phase[0] = 0;
            object.line_ph.phase[1] = 0;
            object.line_ph.phase[2] = 0;
            object.line_ph.phase[3] = 0;
        }

        // htmlConsoleData_15.insertAdjacentHTML('beforeend',`<span class="data line_7">${object.line_ph.phase[0]}</span>`)
        // htmlConsoleData_16.insertAdjacentHTML('beforeend',`<span class="data line_7">${object.line_ph.phase[1]}</span>`)
        // htmlConsoleData_17.insertAdjacentHTML('beforeend',`<span class="data line_7">${object.line_ph.phase[2]}</span>`)
        // htmlConsoleData_18.insertAdjacentHTML('beforeend',`<span class="data line_7">${object.line_ph.phase[3]}</span>`)

        object.line_out.sin_phase = object.line_m.line_k[object.line_c.k_d];
        object.line_out.dry = object.line_m.data_k[6 * object.line_p.win + object.line_c.k_d];

        if (object.line_ph.phase[2] === 0 && object.line_ph.phase[3] === 3){
            object.line_out.cos_phase = object.line_m.line_k[object.line_c.k_d] * -1;
        } else if (object.line_ph.phase[2] === 2 && object.line_ph.phase[3] === 0) {
            object.line_out.cos_phase = object.line_m.line_k[object.line_c.k_d];
        } else if (object.line_ph.phase[2] === 0 && object.line_ph.phase[3] === 1) {
            object.line_out.cos_phase = object.line_m.line_k[object.line_c.k_d] * -1;
        } else if (object.line_ph.phase[2] === 2 && object.line_ph.phase[3] === 3){
            object.line_out.cos_phase = object.line_m.line_k[object.line_c.k_d] * -1;
        } else if (object.line_ph.phase[2] === 4 && object.line_ph.phase[3] === 1) {
            object.line_out.cos_phase = object.line_m.line_k[object.line_c.k_d] * -1;
        }

        return object
    }

    const filter = {
        line: {
            core_line: core_line
        }
    }

    let isFirst = 1

    const Process =  async (value) => {
        object = filter.line.core_line(value, object);
        isFirst = 0
    }

    return {
        init: async (self) => {
            object = init()
            htmlConsoleData_0 = self.shadowRoot.querySelector('.data_0')
            htmlConsoleData_1 = self.shadowRoot.querySelector('.data_1')
            htmlConsoleData_2 = self.shadowRoot.querySelector('.data_2')
            htmlConsoleData_3 = self.shadowRoot.querySelector('.data_3')
            htmlConsoleData_4 = self.shadowRoot.querySelector('.data_4')
            htmlConsoleData_5 = self.shadowRoot.querySelector('.data_5')
            htmlConsoleData_6 = self.shadowRoot.querySelector('.data_6')
            htmlConsoleData_7 = self.shadowRoot.querySelector('.data_7')
            htmlConsoleData_8 = self.shadowRoot.querySelector('.data_8')
            htmlConsoleData_9 = self.shadowRoot.querySelector('.data_9')
            htmlConsoleData_10 = self.shadowRoot.querySelector('.data_10')
            htmlConsoleData_11 = self.shadowRoot.querySelector('.data_11')
            htmlConsoleData_12 = self.shadowRoot.querySelector('.data_12')
            htmlConsoleData_13 = self.shadowRoot.querySelector('.data_13')
            htmlConsoleData_14 = self.shadowRoot.querySelector('.data_14')
            htmlConsoleData_15 = self.shadowRoot.querySelector('.data_15')
            htmlConsoleData_16 = self.shadowRoot.querySelector('.data_16')
            htmlConsoleData_17 = self.shadowRoot.querySelector('.data_17')
            htmlConsoleData_18 = self.shadowRoot.querySelector('.data_18')
            htmlConsoleData_19 = self.shadowRoot.querySelector('.data_19')
            htmlConsoleData_20 = self.shadowRoot.querySelector('.data_20')
            htmlConsoleData_21 = self.shadowRoot.querySelector('.data_21')
            htmlConsoleData_22 = self.shadowRoot.querySelector('.data_22')
            htmlConsoleData_23 = self.shadowRoot.querySelector('.data_23')
            htmlConsoleData_24 = self.shadowRoot.querySelector('.data_24')
            htmlConsoleData_25 = self.shadowRoot.querySelector('.data_25')
            htmlConsoleData_26 = self.shadowRoot.querySelector('.data_26')
            htmlConsoleData_27 = self.shadowRoot.querySelector('.data_27')
            htmlConsoleData_28 = self.shadowRoot.querySelector('.data_28')
            htmlConsoleData_29 = self.shadowRoot.querySelector('.data_29')
            htmlConsoleData_30 = self.shadowRoot.querySelector('.data_30')
            htmlConsoleData_31 = self.shadowRoot.querySelector('.data_31')
            htmlConsoleData_32 = self.shadowRoot.querySelector('.data_32')
            htmlConsoleData_33 = self.shadowRoot.querySelector('.data_33')
            htmlConsoleData_34 = self.shadowRoot.querySelector('.data_34')
            htmlConsoleData_35 = self.shadowRoot.querySelector('.data_35')
            htmlConsoleData_36 = self.shadowRoot.querySelector('.data_36')
            htmlConsoleData_37 = self.shadowRoot.querySelector('.data_37')
            htmlConsoleData_38 = self.shadowRoot.querySelector('.data_38')
            htmlConsoleData_39 = self.shadowRoot.querySelector('.data_39')
            htmlConsoleData_40 = self.shadowRoot.querySelector('.data_40')
            htmlConsoleData_41 = self.shadowRoot.querySelector('.data_41')
            htmlConsoleData_42 = self.shadowRoot.querySelector('.data_42')
            htmlConsoleData_43 = self.shadowRoot.querySelector('.data_43')
            htmlConsoleData_44 = self.shadowRoot.querySelector('.data_44')
            htmlConsoleData_45 = self.shadowRoot.querySelector('.data_45')
            htmlConsoleData_46 = self.shadowRoot.querySelector('.data_46')
            htmlConsoleData_47 = self.shadowRoot.querySelector('.data_47')
            htmlConsoleData_48 = self.shadowRoot.querySelector('.data_48')
            htmlConsoleData_49 = self.shadowRoot.querySelector('.data_49')
            htmlConsoleData_50 = self.shadowRoot.querySelector('.data_50')
            htmlConsoleData_51 = self.shadowRoot.querySelector('.data_51')
            htmlConsoleData_52 = self.shadowRoot.querySelector('.data_52')
            htmlConsoleData_53 = self.shadowRoot.querySelector('.data_53')
            htmlConsoleData_54 = self.shadowRoot.querySelector('.data_54')
            htmlConsoleData_55 = self.shadowRoot.querySelector('.data_55')
            htmlConsoleData_56 = self.shadowRoot.querySelector('.data_56')
            htmlConsoleData_57 = self.shadowRoot.querySelector('.data_57')
            htmlConsoleData_58 = self.shadowRoot.querySelector('.data_58')
            htmlConsoleData_59 = self.shadowRoot.querySelector('.data_59')
            htmlConsoleData_60 = self.shadowRoot.querySelector('.data_60')
        },
        tick: async (value) => {
            await Process(value)

            console.log('🖤 process 🖤', object)

            // console.log('dddddddddddddddddddddddddddddddddddddddddddddddd', object)

            // htmlConsoleData_0.insertAdjacentHTML('beforeend',`<span class="data">${object.wave_in[1]}</span>`)
            // htmlConsoleData_1.insertAdjacentHTML('beforeend',`<span class="data">${object.line_t.tr_p}</span>`)
            // htmlConsoleData_2.insertAdjacentHTML('beforeend',`<span class="data">${object.line_c.z_c_00}</span>`)
            // htmlConsoleData_3.insertAdjacentHTML('beforeend',`<span class="data">${object.line_m.i_det[1]}</span>`)
            // htmlConsoleData_4.insertAdjacentHTML('beforeend',`<span class="data">${object.line_f.all_z_s_00}</span>`)
            // htmlConsoleData_5.insertAdjacentHTML('beforeend',`<span class="data">${object.line_c_in.i_l[3]}</span>`)
            // htmlConsoleData_6.insertAdjacentHTML('beforeend',`<span class="data">${object.line_c_in.c_l[3]}</span>`)
            // htmlConsoleData_7.insertAdjacentHTML('beforeend',`<span class="data">${object.line_p.min_max[0]}</span>`)
            // htmlConsoleData_8.insertAdjacentHTML('beforeend',`<span class="data">${object.line_p.min_max[1]}</span>`)
            // htmlConsoleData_9.insertAdjacentHTML('beforeend',`<span class="data">${object.line_c.k_d}</span>`)
            // htmlConsoleData_10.insertAdjacentHTML('beforeend',`<span class="data">${object.line_c.phase_c}</span>`)

            // console.log('dddddddddddddddddddddddddddddddd', object.line_out)
            // console.log('dddddddddddddddddddddddddddddddd', object.line_out.out[6])
            // console.log('dddddddddddddddddddddddddddddddd', object.line_out.out[7])
            // console.log('dddddddddddddddddddddddddddddddd', object.line_out.out[8])

            // htmlConsoleData_11.insertAdjacentHTML('beforeend',`<span class="data">${object.line_ph.phase[0] + object.line_ph.phase[1]}</span>`)
            // htmlConsoleData_12.insertAdjacentHTML('beforeend',`<span class="data">${object.line_ph.phase[2] + object.line_ph.phase[3]}</span>`)
            // htmlConsoleData_13.insertAdjacentHTML('beforeend',`<span class="data">${object.line_ph.phase[2] + object.line_ph.phase[3]}</span>`)
            // htmlConsoleData_14.insertAdjacentHTML('beforeend',`<span class="data">${object.line_ph.phase[3]}</span>`)


            // htmlConsoleData_26.insertAdjacentHTML('beforeend',`<span class="data">${object.line_out.out[5]}</span>`)
            // htmlConsoleData_27.insertAdjacentHTML('beforeend',`<span class="data">${object.line_out.out[6]}</span>`)
            // htmlConsoleData_28.insertAdjacentHTML('beforeend',`<span class="data">${object.line_out.out[7]}</span>`)
            // htmlConsoleData_29.insertAdjacentHTML('beforeend',`<span class="data">${object.line_out.out[8]}</span>`)
            // htmlConsoleData_30.insertAdjacentHTML('beforeend',`<span class="data">${object.line_out.dry}</span>`)

        },
        end: (self) => {

        }
    }
}