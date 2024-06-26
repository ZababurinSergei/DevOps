import {template} from '../../index.mjs'
import {OSC} from '../index.mjs'

let timerId = false
let object = false
export const Line = async (self, obj) => {
    const osc = await OSC()
    await osc.init()
    const PI = 3.14159265
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


    const Line = (nSamplesPerSec = 441, props) => {
        props.win_line = ((nSamplesPerSec * 9) / 50) / 20;

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

        for (let i = 0; i < 2; i++){
            props.line_c.i_c[i] = -1;
            props.line_c.ph_c[i] = -5;

            if (i == 0)
                props.line_p.min_max[i] = 10000;
            else
                props.line_p.min_max[i] = -10000;
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

        for (let i = 0; i < 4; i++){
            props.line_c_in.i_l[4 * 1 + i] = -1 - i;
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
        let wave_in = [0,0,0,0,0,0,0,0]

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
            count: (data) => {

            },
            delay_one: (data) => {

            },
            zero_sample_count: (zero, data) => {

            },
            true_peack: (phase_num) => {

            },
            first_tr_p_k: () => {

            },
            win_line: 0
        }

        object = Line(nSamplesPerSec, object);

        return object
    }

    // return l_count_in
    const count = (l_count_input) => {

        for (let i = 0; i < 4; i++){
            l_count_input.i_l[4 * 1 + i]++;

            if (l_count_input.i_l[4 * 1 + i] > 3) {
                l_count_input.i_l[4 * 1 + i] = 0;
            }

            if(l_count_input.i_l[4 * 1 + i] < 0) {
                l_count_input.i_l[4 * 0 + i] = 0;
            } else {
                l_count_input.i_l[4 * 0 + i] = l_count_input.i_l[4 * 1 + i];
            }

            if (l_count_input.i_l[4 * 1 + i] == 0) {
                l_count_input.c_l[i] ++;
            }
        }

        return l_count_input
    }

    // return int
    const delay_one = (input, object) => {
        object.line_f.out_d = object.line_f.in_01;
        object.line_f.in_01 = input;
        object.line_c.i_d_del = object.line_f.out_d
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

        if (object.line_f.out_true_peack === phase_num) {
            object.line_t.tr_p = 0;
            return object;
        }
        else if (object.line_f.out_true_peack !== phase_num){
            object.line_f.out_true_peack = phase_num;
            object.line_t.tr_p = 1
            return  object;
        }
    };

    const core_line = (input, object) => {

        object.line_c_in = count(object.line_c_in);

        object.line_c_in.sys[object.line_c_in.i_l[0]] = input;

        object.wave_in[0] = object.line_c_in.sys[object.line_c_in.i_l[0]];
        object.wave_in[1] = object.line_c_in.sys[object.line_c_in.i_l[1]];
        object.wave_in[2] = object.line_c_in.sys[object.line_c_in.i_l[2]];
        object.wave_in[3] = object.line_c_in.sys[object.line_c_in.i_l[3]];

        for (let i = 0; i < 5; i++){
            if (object.line_c_in.c_l[i] == -1){
                object.wave_in[i] = -5;
            }
        }

        if (object.line_c_in.c_l[2] === -1) {
            object.line_c.i_d = 0;
        } else {
            object.line_c.i_d++;
        }

        if (object.line_c.i_d >= object.line_p.win) {
            object.line_c.i_d = 0;
        }

        if (object.line_c.i_d === 0) {
            object.line_c.i_c[1]++;
        }

        if (object.line_c.i_d === object.line_p.win / 2) {
            object.line_c.i_c[0]++;
        }


        if (object.line_c.i_c[0] === -1){
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

        if (object.line_c.ph_c[0] === 0) {
            object.line_c.j_d = 0;
        } else if (object.line_c.ph_c[0] === 1){
            object.line_c.j_d = object.line_c.i_d - (object.line_p.win / 2);
        } else {
            object.line_c.j_d = object.line_c.i_d + (object.line_p.win / 2);
        }

        //object.line_c.i_d_del
        object = delay_one(object.line_c.i_d, object);

        if (object.wave_in[0 * 4 + 1] === 0) {
            object.line_c.zero[0] = 9;
        } else {
            object.line_c.zero[0] = 0;
        }

        if (object.wave_in[0 * 4 + 1] >= 0) {
            object.line_c.zero[0 * 2 + 1] = 1;
        } else {
            object.line_c.zero[1] = 4;
        }


        if (object.wave_in[0 * 4 + 1] === 0 && object.wave_in[0 * 4 + 2] < 0) {
            object.line_c.zero[1] = 4;
        }


        if (object.wave_in[0 * 4 + 0] >= 0) {
            object.line_c.zero[2] = 1;
        } else {
            object.line_c.zero[2] = 4;
        }

        if (object.wave_in[0 * 4 + 0] == 0 && object.wave_in[0 * 4 + 1] < 0) {
            object.line_c.zero[2] = 4;
        }


        if (object.wave_in[0 * 4 + 0] > 0 && object.wave_in[0 * 4 + 1] < 0 || object.wave_in[0 * 4 + 0] < 0 && object.wave_in[0 * 4 + 1]>0) {
            object.line_c.zero[3] = 1;
        } else {
            object.line_c.zero[3] = 0;
        }

        if (object.wave_in[0 * 4 + 1] > 0 && object.wave_in[0 * 4 + 2] < 0 || object.wave_in[0 * 4 + 1] < 0 && object.wave_in[0 * 4 + 2]>0) {
            object.line_c.zero[4] = 2;
        } else {
            object.line_c.zero[4] = 0;
        }

        if (object.line_c.zero[0] == 9 && object.line_c.zero[1] === object.line_c.zero[2]){
            object.line_c.zero[3] = 0;
            object.line_c.zero[4] = 0;
        } else if (object.line_c.zero[0 * 2 + 0] == 9 && object.line_c.zero[1] > object.line_c.zero[2] || object.line_c.zero[0] == 9 && object.line_c.zero[1] < object.line_c.zero[2]) {
            object.line_c.zero[3] = 1;
            object.line_c.zero[4] = 2;
        }


        if (object.line_c_in.c_l[0 * 4 + 1] === -1) {
            object.line_c.i_d = 0;
            object.line_c.j_d = 0;
            object.line_c.k_d = 0;
            object.line_c.ph_c[0] = -5;
            object.line_c.ph_c[1] = -5;
            object.wave_in[0 * 4 + 1] = -5;
            object.line_c.zero[0] = -5;
            object.line_c.zero[1] = -5;
            object.line_c.zero[2] = -5;
            object.line_c.zero[3] = -5;
            object.line_c.zero[4] = -5;
        }

        if (object.line_c.zero[0] === 9 && object.line_c.zero[1] === 1 && object.line_c.zero[2] === 4 || object.line_c.zero[0] === 9 && object.line_c.zero[1] === 4 && object.line_c.zero[2] == 1 || object.line_c.zero[0] != 9 && object.line_c.zero[4] == 2) {
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

            //object.line_t.k_first
            object = zero_sample_count(object.line_c.z_c_00, object.wave_in[1], object);
            object.line_c.k_d = 0;
        } else if (object.line_t.k_first === 1){
            object.line_c.k_d++;
        } else {
            console.log('!!!!!!!!!!!!!!!!!!!!!!! Не обрабатывается в коде !!!!!!!!!!!!!!!!!!!!!!!')
        }

        if (object.line_c.k_d >= object.line_p.win) {
            object.line_c.k_d = 0;
        }

        if (object.wave_in[0 * 4 + 1] === -5) {
            object.line_p.min_max[0] = 10000;
            object.line_p.min_max[1] = -10000;
        } else if (object.line_c.zero[0] === 9 && object.line_c.zero[1] === 1 && object.line_c.zero[2] === 4 && object.line_c.zero[3] === 1 && object.line_c.zero[4] === 2) {
            object.line_p.min_max[0 * 2 + 0] = 10000;
        } else if (object.line_c.zero[0] === 9 && object.line_c.zero[1] === 4 && object.line_c.zero[2] === 1 && object.line_c.zero[3] === 1 && object.line_c.zero[4] === 2) {
            object.line_p.min_max[0 * 2 + 1] = -10000;
        } else if (object.line_c.zero[1] === 4 && object.line_c.zero[2] === 1 && object.line_c.zero[3] === 1 && object.line_c.zero[4] === 2) {
            object.line_p.min_max[0 * 2 + 0] = 10000;
        } else if (object.line_c.zero[1] === 1 && object.line_c.zero[2] === 4 && object.line_c.zero[3] === 1 && object.line_c.zero[4] === 2) {
            object.line_p.min_max[0 * 2 + 1] = -10000;
        } else if (object.line_c.zero[1] === 4 && object.line_c.zero[2] === 4 && object.line_c.zero[3] === 0 && object.line_c.zero[4] === 2) {
            object.line_p.min_max[0 * 2 + 0] = 10000;
        } else if (object.line_c.zero[1] === 1 && object.line_c.zero[2] === 1 && object.line_c.zero[3] === 0 && object.line_c.zero[4] === 2) {
            object.line_p.min_max[0 * 2 + 1] = -10000;
        }

        if (object.line_p.min_max[0 * 2 + 0] > object.wave_in[0 * 4 + 1]) {
            object.line_p.min_max[0 * 2 + 0] = object.wave_in[0 * 4 + 1];

            if (object.line_p.min_max[0 * 2 + 0] === -5 && object.wave_in[0 * 4 + 1] === -5) {
                object.line_p.min_max[0 * 2 + 0] = 10000;
            }
        }

        if (object.line_p.min_max[0 * 2 + 1] < object.wave_in[0 * 4 + 1]) {
            object.line_p.min_max[0 * 2 + 1] = object.wave_in[0 * 4 + 1];
        }

        if (object.wave_in[0 * 4 + 1] > 0) {
            object.line_p.pos_00 = object.line_p.min_max[0 * 2 + 1];
            object.line_p.neg_00 = 0;
        }

        if (object.wave_in[0 * 4 + 1] < 0) {
            object.line_p.pos_00 = 0;
            object.line_p.neg_00 = object.line_p.min_max[0 * 2 + 0];
        }

        object.line_m.data_i[0 * object.line_p.win + object.line_c.i_d] = object.line_c.zero[0];
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

        object.line_m.line_00[0 * object.line_p.win + object.line_c.i_d] = object.line_m.data_i[8 * object.line_p.win + object.line_c.i_d] + object.line_m.data_i[9 * object.line_p.win + object.line_c.i_d];

        if (object.line_t.k_first === -5) {
            object.line_m.line_01[0 * object.line_p.win + object.line_c.k_d] = 0;
        } else {
            object.line_m.line_01[0 * object.line_p.win + object.line_c.k_d] = object.line_m.line_00[0 * object.line_p.win + object.line_c.k_d];
        }



        for (let i = 0; i < 12; i++){
            if (object.line_t.k_first === -5) {
                object.line_m.data_k[i * object.line_p.win + object.line_c.k_d] = -5;// �������� �����
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

        object = true_peack(object.line_c.z_c_00, object);

        object.line_m.tr_p_i[object.line_c.i_d] = object.line_t.tr_p;
        object.line_m.tr_p_k[object.line_c.k_d] = object.line_m.tr_p_i[object.line_c.k_d];


        if (object.line_t.tr_p === 1 && object.line_m.data_i[0 * object.line_p.win + object.line_c.i_d] === 9 && object.line_m.data_i[1 * object.line_p.win + object.line_c.i_d] === 4 && object.line_m.data_i[2 * object.line_p.win + object.line_c.i_d] === 1) {
            object.line_m.i_det[0 * object.line_p.win + object.line_c.z_c_00] = object.line_m.data_i[8 * object.line_p.win + object.line_c.i_d - 0];
        } else if (object.line_t.tr_p === 1 && object.line_m.data_i[0 * object.line_p.win + object.line_c.i_d] === 9 && object.line_m.data_i[1 * object.line_p.win + object.line_c.i_d] === 1 && object.line_m.data_i[2 * object.line_p.win + object.line_c.i_d] === 4) {
            object.line_m.i_det[0 * object.line_p.win + object.line_c.z_c_00] = object.line_m.data_i[9 * object.line_p.win + object.line_c.i_d - 0];
        } else if (object.line_t.tr_p === 1 && object.line_m.data_i[0 * object.line_p.win + object.line_c.i_d] === 0 && object.line_m.data_i[1 * object.line_p.win + object.line_c.i_d] === 4 && object.line_m.data_i[2 * object.line_p.win + object.line_c.i_d] === 4 && object.line_m.data_i[4 * object.line_p.win + object.line_c.i_d] === 2) {
            object.line_m.i_det[0 * object.line_p.win + object.line_c.z_c_00] = object.line_m.line_00[0 * object.line_p.win + object.line_c.i_d_del];
        } else if (object.line_t.tr_p === 1 && object.line_m.data_i[0 * object.line_p.win + object.line_c.i_d] === 0 && object.line_m.data_i[1 * object.line_p.win + object.line_c.i_d] === 1 && object.line_m.data_i[2 * object.line_p.win + object.line_c.i_d] === 1 && object.line_m.data_i[4 * object.line_p.win + object.line_c.i_d] === 2) {
            object.line_m.i_det[0 * object.line_p.win + object.line_c.z_c_00] = object.line_m.line_00[0 * object.line_p.win + object.line_c.i_d_del];
        } else if (object.line_t.tr_p === 1 && object.line_m.data_i[0 * object.line_p.win + object.line_c.i_d] === 0 && object.line_m.data_i[1 * object.line_p.win + object.line_c.i_d] === 1 && object.line_m.data_i[2 * object.line_p.win + object.line_c.i_d] == 4 && object.line_m.data_i[3 * object.line_p.win + object.line_c.i_d] === 1 && object.line_m.data_i[4 * object.line_p.win + object.line_c.i_d] === 2) {
            object.line_m.i_det[0 * object.line_p.win + object.line_c.z_c_00] = object.line_m.line_00[0 * object.line_p.win + object.line_c.i_d_del];
        } else if (object.line_t.tr_p === 1 && object.line_m.data_i[0 * object.line_p.win + object.line_c.i_d] === 0 && object.line_m.data_i[1 * object.line_p.win + object.line_c.i_d] === 4 && object.line_m.data_i[2 * object.line_p.win + object.line_c.i_d] === 1 && object.line_m.data_i[3 * object.line_p.win + object.line_c.i_d] === 1 && object.line_m.data_i[4 * object.line_p.win + object.line_c.i_d] === 2) {
            object.line_m.i_det[0 * object.line_p.win + object.line_c.z_c_00] = object.line_m.line_00[0 * object.line_p.win + object.line_c.i_d_del];
        }

        if (object.line_m.data_k[11 * object.line_p.win + object.line_c.k_d] === -5) {
            object.line_m.line_k[0 * object.line_p.win + object.line_c.k_d] = 0;
        } else {
            object.line_m.line_k[0 * object.line_p.win + object.line_c.k_d] = object.line_m.i_det[0 * object.line_p.win + object.line_l.lim_k_d];
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
            object.line_m.data_k[0 * object.line_p.win + object.line_c.k_d] = 0;
            object.line_m.data_k[4 * object.line_p.win + object.line_c.k_d] = 0;
        }

        if (object.line_t.tr_p_f === -1) {
            object = first_tr_p_k(object.line_t.k_first, object);
        }


        // if (line_t.tr_true == 0){
        //  std::cout << "��������� ���������" << std::endl;
        //  	getchar();
        // }

        //����� ������� ����� ���� ���� ����� ����� ����������
        /**/
        object.line_te.temp_phase = object.line_m.line_01[0 * object.line_p.win + object.line_c.k_d];

        if (object.line_m.data_k[0 * object.line_p.win + object.line_c.k_d] === 9) {
            object.line_m.line_01[0 * object.line_p.win + object.line_c.k_d] = object.line_m.line_01[0 * object.line_p.win + object.line_c.k_d] * -1; //��� �������� ������� � ������� ����� ��������� � ��������� ������� ������ �� �������� ���������
            object.line_te.temp_phase = object.line_te.temp_phase *-2; // �� �� ����� ������ ������ ����� �� �����
        }


        if (object.line_m.line_k[0 * object.line_p.win + object.line_c.k_d] > 0 && object.line_m.line_01[0 * object.line_p.win + object.line_c.k_d] < 0) {
            object.line_m.line_01[0 * object.line_p.win + object.line_c.k_d] = object.line_m.line_01[0 * object.line_p.win + object.line_c.k_d] * -1;
            object.line_te.temp_phase = object.line_te.temp_phase *-1; // ��������� �� �� �����
        }

        if (object.line_m.line_k[0 * object.line_p.win + object.line_c.k_d] < 0 && object.line_m.line_01[0 * object.line_p.win + object.line_c.k_d] > 0) {
            object.line_m.line_01[0 * object.line_p.win + object.line_c.k_d] = object.line_m.line_01[0 * object.line_p.win + object.line_c.k_d] * -1;
            object.line_te.temp_phase = object.line_te.temp_phase *-1;
        }

        if (object.line_m.line_k[0 * object.line_p.win + object.line_c.k_d] == object.line_te.temp_phase) {
            object.line_c.phase_c = 2;
        } else {
            object.line_c.phase_c = 1;
        }

        object.line_out.out[0] = object.line_m.data_k[0 * object.line_p.win + object.line_c.k_d];
        object.line_out.out[1] = object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d];
        object.line_out.out[2] = object.line_m.data_k[2 * object.line_p.win + object.line_c.k_d];
        object.line_out.out[3] = object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d];
        object.line_out.out[4] = object.line_m.data_k[4 * object.line_p.win + object.line_c.k_d];
        object.line_out.out[5] = object.line_m.line_k[0 * object.line_p.win + object.line_c.k_d];
        object.line_out.out[6] = object.line_m.line_01[0 * object.line_p.win + object.line_c.k_d];
        object.line_out.out[7] = object.line_m.data_k[6 * object.line_p.win + object.line_c.k_d];
        object.line_out.out[8] = object.line_te.temp_phase;
        object.line_out.out[9] = 0;
        object.line_out.out[10] = 0;
        object.line_out.out[11] = 0;
        object.line_out.out[12] = 0;


        object.line_out.write[0] = object.line_m.data_k[6 * object.line_p.win + object.line_c.k_d];
        object.line_out.write[1] = object.line_m.line_k[0 * object.line_p.win + object.line_c.k_d];
        object.line_out.write[2] = object.line_m.line_01[0 * object.line_p.win + object.line_c.k_d];
        object.line_out.write[3] = object.line_m.line_k[0 * object.line_p.win + object.line_c.k_d];
        object.line_out.write[4] = object.line_m.data_i[5 * object.line_p.win + object.line_c.k_d];
        object.line_out.write[5] = object.line_m.data_k[4 * object.line_p.win + object.line_c.k_d];
        object.line_out.write[6] = object.line_m.data_k[0 * object.line_p.win + object.line_c.k_d];
        object.line_out.write[7] = 0;

        if (object.line_m.data_k[0 * object.line_p.win + object.line_c.k_d] == 0 && object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d] === 1 && object.line_m.data_k[2 * object.line_p.win + object.line_c.k_d] === 1 && object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d] === 0 && object.line_m.data_i[4 * object.line_p.win + object.line_c.k_d] === 0 && object.line_c.phase_c === 2) {
            object.line_ph.phase[0] = 0;
            object.line_ph.phase[1] = 2;
            object.line_ph.phase[2] = 0;
            object.line_ph.phase[3] = 3;
        } else if (object.line_m.data_k[0 * object.line_p.win + object.line_c.k_d] === 0 && object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d] === 1 && object.line_m.data_k[2 * object.line_p.win + object.line_c.k_d] === 1 && object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d] === 0 && object.line_m.data_i[4 * object.line_p.win + object.line_c.k_d] === 2 && object.line_c.phase_c === 2) {
            object.line_ph.phase[0] = 1;
            object.line_ph.phase[1] = 0;
            object.line_ph.phase[2] = 2;
            object.line_ph.phase[3] = 0;
        } else if (object.line_m.data_k[0 * object.line_p.win + object.line_c.k_d] === 0 && object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d] == 1 && object.line_m.data_k[2 * object.line_p.win + object.line_c.k_d] === 4 && object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d] === 1 && object.line_m.data_i[4 * object.line_p.win + object.line_c.k_d] === 0 && object.line_c.phase_c === 2) {
            object.line_ph.phase[0] = 0;
            object.line_ph.phase[1] = 2;
            object.line_ph.phase[2] = 0;
            object.line_ph.phase[3] = 3;
        } else if (object.line_m.data_k[0 * object.line_p.win + object.line_c.k_d] === 9 && object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d] === 1 && object.line_m.data_k[2 * object.line_p.win + object.line_c.k_d] === 4 && object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d] === 1 && object.line_m.data_i[4 * object.line_p.win + object.line_c.k_d] === 2 && object.line_c.phase_c === 1) {
            object.line_ph.phase[0] = 3;
            object.line_ph.phase[1] = 0;
            object.line_ph.phase[2] = 4;
            object.line_ph.phase[3] = 0;
        } else if (object.line_m.data_k[0 * object.line_p.win + object.line_c.k_d] === 0 && object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d] === 4 && object.line_m.data_k[2 * object.line_p.win + object.line_c.k_d] === 4 && object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d] === 0 && object.line_m.data_i[4 * object.line_p.win + object.line_c.k_d] === 0 && object.line_c.phase_c === 1) {
            object.line_ph.phase[0] = 3;
            object.line_ph.phase[1] = 0;
            object.line_ph.phase[2] = 4;
            object.line_ph.phase[3] = 0;
        } else if (object.line_m.data_k[0 * object.line_p.win + object.line_c.k_d] === 0 && object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d] === 4 && object.line_m.data_k[2 * object.line_p.win + object.line_c.k_d] === 4 && object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d] === 0 && object.line_m.data_i[4 * object.line_p.win + object.line_c.k_d] === 2 && object.line_c.phase_c === 1) {
            object.line_ph.phase[0] = 3;
            object.line_ph.phase[1] = 0;
            object.line_ph.phase[2] = 4;
            object.line_ph.phase[3] = 0;
        } else if (object.line_m.data_k[0 * object.line_p.win + object.line_c.k_d] === 0 && object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d] === 4 && object.line_m.data_k[2 * object.line_p.win + object.line_c.k_d] === 4 && object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d] === 0 && object.line_m.data_i[4 * object.line_p.win + object.line_c.k_d] === 2 && object.line_c.phase_c === 2) {
            object.line_ph.phase[0] = 3;
            object.line_ph.phase[1] = 0;
            object.line_ph.phase[2] = 4;
            object.line_ph.phase[3] = 0;
        } else if (object.line_m.data_k[0 * object.line_p.win + object.line_c.k_d] === 0 && object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d] === 4 && object.line_m.data_k[2 * object.line_p.win + object.line_c.k_d] === 4 && object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d] === 0 && object.line_m.data_i[4 * object.line_p.win + object.line_c.k_d] === 0 && object.line_c.phase_c === 2) {
            object.line_ph.phase[0] = 0;
            object.line_ph.phase[1] = 4;
            object.line_ph.phase[2] = 0;
            object.line_ph.phase[3] = 1;
        } else if (object.line_m.data_k[0 * object.line_p.win + object.line_c.k_d] === 0 && object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d] === 4 && object.line_m.data_k[2 * object.line_p.win + object.line_c.k_d] === 1 && object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d] === 1 && object.line_m.data_i[4 * object.line_p.win + object.line_c.k_d] === 0 && object.line_c.phase_c === 2) {
            object.line_ph.phase[0] = 0;
            object.line_ph.phase[1] = 4;
            object.line_ph.phase[2] = 0;
            object.line_ph.phase[3] = 1;
        } else if (object.line_m.data_k[0 * object.line_p.win + object.line_c.k_d] === 0 && object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d] === 4 && object.line_m.data_k[2 * object.line_p.win + line_c.k_d] === 1 && object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d] === 1 && object.line_m.data_i[4 * object.line_p.win + object.line_c.k_d] === 2 && object.line_c.phase_c === 2) {
            object.line_ph.phase[0] = 3;
            object.line_ph.phase[1] = 4;
            object.line_ph.phase[2] = 4;
            object.line_ph.phase[3] = 1;
        } else if (object.line_m.data_k[0 * object.line_p.win + object.line_c.k_d] === 9 && object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d] === 4 && object.line_m.data_k[2 * line_p.win + line_c.k_d] === 1 && object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d] === 1 && object.line_m.data_i[4 * object.line_p.win + object.line_c.k_d] === 2 && object.line_c.phase_c === 1) {
            object.line_ph.phase[0] = 1;
            object.line_ph.phase[1] = 0;
            object.line_ph.phase[2] = 2;
            object.line_ph.phase[3] = 0;
        } else if (object.line_m.data_k[0 * object.line_p.win + object.line_c.k_d] === 0 && object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d] === 1 && object.line_m.data_k[2 * object.line_p.win + object.line_c.k_d] === 1 && object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d] === 0 && object.line_m.data_i[4 * object.line_p.win + object.line_c.k_d] === 0 && object.line_c.phase_c === 1) {
            object.line_ph.phase[0] = 1;
            object.line_ph.phase[1] = 0;
            object.line_ph.phase[2] = 2;
            object.line_ph.phase[3] = 0;
        } else if (object.line_m.data_k[0 * object.line_p.win + object.line_c.k_d] === 0 && object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d] === 1 && object.line_m.data_k[2 * object.line_p.win + object.line_c.k_d] === 1 && object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d] === 0 && object.line_m.data_i[4 * object.line_p.win + object.line_c.k_d] === 2 && object.line_c.phase_c === 1) {
            object.line_ph.phase[0] = 1;
            object.line_ph.phase[1] = 0;
            object.line_ph.phase[2] = 2;
            object.line_ph.phase[3] = 0;
        } else if (object.line_m.data_k[0 * object.line_p.win + object.line_c.k_d] === 0 && object.line_m.data_k[1 * object.line_p.win + object.line_c.k_d] === 1 && object.line_m.data_k[2 * object.line_p.win + object.line_c.k_d] === 4 && object.line_m.data_k[3 * object.line_p.win + object.line_c.k_d] === 1 && object.line_m.data_i[4 * object.line_p.win + object.line_c.k_d] === 2 && object.line_c.phase_c === 2) {
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

        object.line_out.sin_phase = object.line_m.line_k[0 * object.line_p.win + object.line_c.k_d];
        object.line_out.dry = object.line_m.data_k[6 * object.line_p.win + object.line_c.k_d];

        if (object.line_ph.phase[2] === 0 && object.line_ph.phase[3] === 3){
            object.line_out.cos_phase = object.line_m.line_k[0 * object.line_p.win + object.line_c.k_d] * -1;
        } else if (object.line_ph.phase[2] === 2 && object.line_ph.phase[3] === 0) {
            object.line_out.cos_phase = object.line_m.line_k[0 * object.line_p.win + object.line_c.k_d];
        } else if (object.line_ph.phase[2] === 0 && object.line_ph.phase[3] === 1) {
            object.line_out.cos_phase = object.line_m.line_k[0 * object.line_p.win + object.line_c.k_d] * -1;
        } else if (object.line_ph.phase[2] === 2 && object.line_ph.phase[3] === 3){
            object.line_out.cos_phase = object.line_m.line_k[0 * object.line_p.win + object.line_c.k_d] * -1;
        } else if (object.line_ph.phase[2] === 4 && object.line_ph.phase[3] === 1) {
            object.line_out.cos_phase = object.line_m.line_k[0 * object.line_p.win + object.line_c.k_d] * -1;
        }

        return object
        // console.log('🧡object🧡', object)
    }


    ////  Set out
    ////	SetOutChanel(line_out.sin_phase, line_out.cos_phase);
    // };



























    // double	Line::Bus_out_master()
    // {
    //   return 0;
    // }
    // double	Line::Bus_out_1()
    // {
    //   return 0;
    // }
    // double	Line::Bus_out_2()
    // {
    //   return 0;
    // }
    // double	Line::Bus_out_3()
    // {
    //   return 0;
    // }
    // double	Line::Bus_out_4()
    // {
    //   return 0;
    // }
    // double	Line::Bus_out_5()
    // {
    //   return 0;
    // }
    // double	Line::Bus_out_6()
    // {
    //   return 0;
    // }
    // double	Line::Bus_out_7()
    // {
    //   return 0;
    // }
    // double	Line::Bus_out_8()
    // {
    //   return 0;
    // }

    //
    // l_count_in  Line::count(l_count_in in){
    //
    // for (int i = 0; i < 4; i++){
    // in.i_l[4 * 1 + i]++;
    //
    //   if (in.i_l[4 * 1 + i] > 3){
    //   in.i_l[4 * 1 + i] = 0;
    //   }
    //
    //   if (in.i_l[4 * 1 + i] < 0){
    //   in.i_l[4 * 0 + i] = 0;
    //   }
    // else{
    //   in.i_l[4 * 0 + i] = in.i_l[4 * 1 + i];
    //   }
    //
    //   if (in.i_l[4 * 1 + i] == 0){
    //
    //   in.c_l[i] ++;
    //   }
    // }
    // return in;
    // }
    //
    //
    //
    //
    //
    //
    //
    //   int Line::first_tr_p_k(int in){
    //
    //   if (in == -5)
    //   {
    //     return -1;
    //   }
    // else if (in == 1){
    //
    //     line_m.tr_p_k[line_c.k_d] = 1;
    //     line_m.data_k[4 * line_p.win + line_c.k_d] = 2;
    //
    //     return 1;
    //   }
    // else
    //   {
    //     return -1;
    //   }
    // }
    //


    const filter = {
        line: {
            core_line: core_line
        }
    }

    let RootCount = 0
    let isFirst = 1
    const Process =  async () => {
        // (filter.osc.osc_out[0].line)
        // WaveFile&		wfile = m_pApplication->m_WaveFile;
        // WaveFormat&		wformat = m_pApplication->m_WaveFormat;
        // WaveBuffer*		wbuf = 0;

        // if (wfile.Open(wformat, name, WAVE_READ))
        // {
        //   std::cout << "nChannels: " << wformat.nChannels << std::endl;
        //   std::cout << "nBlockAlign: " << wformat.nBlockAlign << std::endl;
        //   std::cout << "nSamplePerSec: " << wformat.nSamplePerSec << std::endl;
        //   std::cout << "wBitsPerSample: " << wformat.wBitsPerSample << std::endl;
        //   std::cout << "nAvgBytesPerSec: " << wformat.nAvgBytesPerSec << std::endl;
        //   std::cout << "wFormatTag: " << wformat.wFormatTag << std::endl;
        //   std::cout << std::endl;
        //
        //   wbuf = WaveBuffer::walloc(wformat.nChannels);
        //
        //   if (wfile.Process(wformat, ProcessWaveFile, 512, (void*)wbuf))
        //   std::cout << "Read file success" << std::endl;
        // else
        //   std::cout << "Read file failed" << std::endl;
        //
        //   wfile.Close();
        // }

        // m_pApplication->AllocGraphModules(2);
        //
        // GraphModule** graph = m_pApplication->m_pGraphs;
        //
        // graph[0]->Initialize(m_pApplication);
        // graph[1]->Initialize(m_pApplication);
        //
        // static GLfloat color1[] = { 1.0f, 0.7f, 0.5f, 1.0f };
        // static GLfloat color2[] = { 0.0f, 1.0f, 0.0f, 1.0f };
        //
        // WaveFilters filter;
        //
        // int		delay = 10;
        // int		delay_line = ((wformat.nSamplePerSec * 9) / 50) / 198;
        //
        // filter.delay.init(&filter);
        // filter.delay.init_memory(&filter, delay);
        // filter.line.init(&filter, delay_line);
        //
        // filter.osc.osc_substrate_s.deg[0] = 90;
        // filter.osc.osc_substrate_s.deg[1] = 90;
        // filter.osc.osc_substrate_s.deg[2] = 90;
        // filter.osc.osc_substrate_s.deg[3] = 90;
        // filter.osc.osc_substrate_s.deg[4] = 90;
        // filter.osc.osc_substrate_s.deg[5] = 90;
        // filter.osc.osc_substrate_s.deg[6] = 90;
        // filter.osc.osc_substrate_s.deg[7] = 90;
        //
        // filter.osc.osc_substrate_s.step[0] = 0.25;
        // filter.osc.osc_substrate_s.step[1] = 0.25;
        // filter.osc.osc_substrate_s.step[2] = 0.25;
        // filter.osc.osc_substrate_s.step[3] = 0.25;
        // filter.osc.osc_substrate_s.step[4] = 0.25;
        // filter.osc.osc_substrate_s.step[5] = 0.25;
        // filter.osc.osc_substrate_s.step[6] = 0.25;
        // filter.osc.osc_substrate_s.step[7] = 0.25;
        //
        // filter.osc.osc_substrate_s.quarter[0] = 0;
        // filter.osc.osc_substrate_s.quarter[1] = 0;
        // filter.osc.osc_substrate_s.quarter[2] = 0;
        // filter.osc.osc_substrate_s.quarter[3] = 0;
        // filter.osc.osc_substrate_s.quarter[4] = 0;
        // filter.osc.osc_substrate_s.quarter[5] = 0;
        // filter.osc.osc_substrate_s.quarter[6] = 0;
        // filter.osc.osc_substrate_s.quarter[7] = 0;
        //
        // filter.osc.osc_substrate_s.step_phase[0] = 0;
        // filter.osc.osc_substrate_s.step_phase[1] = 0;
        // filter.osc.osc_substrate_s.step_phase[2] = 0;
        // filter.osc.osc_substrate_s.step_phase[3] = 0;
        // filter.osc.osc_substrate_s.step_phase[4] = 0;
        // filter.osc.osc_substrate_s.step_phase[5] = 0;
        // filter.osc.osc_substrate_s.step_phase[6] = 0;
        // filter.osc.osc_substrate_s.step_phase[7] = 0;
        //
        // filter.osc.osc_substrate_d.dynamic_phase[0] = 3;
        // filter.osc.osc_substrate_d.dynamic_phase[1] = 0;
        // filter.osc.osc_substrate_d.dynamic_phase[2] = 0;
        // filter.osc.osc_substrate_d.dynamic_phase[3] = 0;
        // filter.osc.osc_substrate_d.dynamic_phase[4] = 0;
        // filter.osc.osc_substrate_d.dynamic_phase[5] = 0;
        // filter.osc.osc_substrate_d.dynamic_phase[6] = 0;
        // filter.osc.osc_substrate_d.dynamic_phase[7] = 0;
        //
        // for (int i = 0; i < 8; i++){
        //   quarter_temp[i] = 1000;
        //   step_phase_temp[i] = 1000;
        //   dynamic_phase_temp[i] = 1000;
        //   deg_temp[i] = 1000;
        // }
        ////std::cout << dynamic_phase_temp[0] << std::endl;
        //
        // filter.hilbert.init(&filter);
        // filter.memory((wbuf->wlen + delay + delay_line));
        //
        // int i = 0;
        // int j = 1;
        //
        // int test = 0;

        // while (i < j){
        //
        //   test++;
        //
        //   if (test == 1000/4-4*12)
        //     filter.osc.osc_substrate_s.step_phase[0] = 1;
        //
        //   double dval = wbuf->wbuffers[0][i];
        //   filter.delay.core_delay(dval);
        //
        //   osc_call_back(filter.osc.osc_substrate_s, filter.osc.osc_substrate_d);
        //
        //   if (osc_ini.osc_first_init == 1)
        //   {
        //     filter.osc.init(&filter);
        //     filter.osc.osc_init_00(&filter);
        //   }
        //   if (osc_ini.osc_second_init == 1)
        //   {
        //
        //   }
        //   if (osc_ini.osc_third_init == 1)
        //   {
        //     filter.osc.osc_init_01(&filter);
        //   }
        //
        //   filter.osc.osc_core(osc_ini.osc_first_init, osc_ini.osc_second_init, osc_ini.osc_third_init);
        //
        object = filter.line.core_line(RootCount, object);
        // console.log('🖤 process 🖤', object.line_c_in.i_l, object.line_c_in.c_l, object.line_c_in.sys)

        //   filter.line.core_line(filter.osc.osc_out[0].line);
        //   filter.hilbert.hilbert_core(dval);
        //
        //   filter.graph_00[i] = (float)filter.line.line_out.write[0];
        //   filter.graph_01[i] = (float)filter.line.line_out.sin_phase;
        //
        //   j = (wbuf->wlen /*+ delay*/ + delay_line);
        //   i++;
        // }
        //
        // graph[0]->SetBuffer(filter.graph_00, (wbuf->wlen + delay + delay_line), color1);
        // graph[1]->SetBuffer(filter.graph_01, (wbuf->wlen + delay + delay_line), color2);
        //
        // graph[0]->SetSelection(0, 300);
        // graph[1]->SetSelection(0, 300);
        //
        ////filter.Terminate();
        //
        // wformat.nChannels = 1;
        // wformat.nSamplePerSec = 44100;
        // wformat.wBitsPerSample = 16;
        // wformat.wFormatTag = 1;


        // if (wfile.Open(wformat, "00_01_temp.wav", WAVE_WRITE))
        // {
        //   if (wfile.Write(wformat, &filter.graph_00, (wbuf->wlen + delay + delay_line)))
        //   std::cout << "Write file success" << std::endl;
        // else
        //   std::cout << "Write file failed" << std::endl;
        //   wfile.Close();
        // }
        // if (wfile.Open(wformat, "00_02_temp.wav", WAVE_WRITE))
        // {
        //   if (wfile.Write(wformat, &filter.graph_01, (wbuf->wlen + delay + delay_line)))
        //   std::cout << "Write file success" << std::endl;
        // else
        //   std::cout << "Write file failed" << std::endl;
        //   wfile.Close();
        // }
        //
        await osc.core(isFirst)
        isFirst = 0
        ++RootCount
    }

    return {
        start: async (self) => {
            await osc.init()
            object = init()
            timerId = setInterval(async () => {
                console.log('🖤 process 🖤', object.line_c_in.i_l, object.line_c_in.c_l, object.line_c_in.sys)
                let container = self.shadowRoot.querySelector('.line')
                container.innerHTML = ''
                for(let i of object.line_c_in.i_l) {
                    container.insertAdjacentHTML('beforeend', await template.get('default')[0].render(self, i))
                }
                await Process()
            }, 1000);
        },
        stop: (self) => {
            if(timerId) {
                clearInterval(timerId)
                timerId = false
                RootCount = 0
            }
        }
    }
}