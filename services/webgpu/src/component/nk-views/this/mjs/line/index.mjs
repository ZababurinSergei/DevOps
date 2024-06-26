class Limit {
    constructor(nSamplesPerSec) {
        this.win_line = (nSamplesPerSec * 9) / 50 / 20;

        this.wave_in = Array(8).fill(0);

        this.line_t = {
            tr_00: 0,
            tr_01: 0,
            tr_p_f: -1,
            k_first: -5,
            tr_true: 0,
            lim_k_tr: 0,
            tr_p: 0
        };

        this.line_ph = {
            phase: Array(4).fill(0),
            sys: Array(4).fill(0)
        };

        this.line_te = {
            temp_phase: 0
        };

        this.line_l = {
            lim_k_d: 0
        };

        this.line_c = {
            k_co: 0,
            z_c_00: 0,
            z_c_01: 1,
            z_c_i: 0,
            z_c_k: 0,
            i_d_del: 0,
            i_c_temp: 0,
            zero: Array(5).fill(0),
            phase_c: 0,
            i_c: Array(2).fill(-1),
            ph_c: Array(2).fill(-5),
            min_max: Array(2).fill(-10000),
            i_d: 0,
            j_d: 0,
            k_d: 0
        };

        this.line_p = {
            pos_00: 0,
            neg_00: 0,
            win: this.win_line,
            data_i: [], // Initialize later
            data_k: [], // Initialize later
            line_00: [], // Initialize later
            line_01: [], // Initialize later
            tr_p_i: [], // Initialize later
            tr_p_k: [], // Initialize later
            line_k: [], // Initialize later
            i_det: [] // Initialize later
        };

        this.line_c_in = {
            sys: Array(4).fill(0),
            i_l: Array(8).fill(-1),
            c_l: Array(8).fill(-1)
        };

        this.line_f = {
            out_d: 0,
            in_01: 0,
            k_start: 0,
            all_z_s_00: 0,
            k_fuul: 0,
            zero_temp: 0,
            z_s_00: 0,
            out_true_peack: 0
        };

        this.line_out = {
            cos_phase: 0,
            sin_phase: 0,
            dry: 0,
            wet: 0,
            write: Array(12).fill(0),
            out: Array(12).fill(0)
        };

        console.log("int Line::Initialize(void* params)");
    }

// Additional methods can be added here...
    count(input) {
        for (let i = 0; i < 4; i++) {
            input.i_l[(4 * 1) + i]++;

            if (input.i_l[(4 * 1) + i] > 3) {
                input.i_l[(4 * 1) + i] = 0;
            }

            if (input.i_l[(4 * 1) + i] < 0) {
                input.i_l[(4 * 0) + i] = 0;
            } else {
                input.i_l[(4 * 0) + i] = input.i_l[(4 * 1) + i];
            }

            if (input.i_l[(4 * 1) + i] === 0) {
                input.c_l[i]++;
            }
        }
        return input;
    }

    delay_one(input) {
        this.line_f.out_d = this.line_f.in_01;
        this.line_f.in_01 = input;
        return this.line_f.out_d;
    }


    zero_sample_count(zero, input) {
        if (this.line_f.k_start === -5) {
            this.line_f.all_z_s_00 = this.line_f.all_z_s_00;
        } else {
            if (zero === 0 && this.line_c.i_d <= this.line_p.win * 0.5) {
                this.line_f.k_fuul = -1;
            } else if (zero > 0 && this.line_c.i_d < this.line_p.win * 0.5) {
                this.line_f.k_fuul = 1;
            } else {
                this.line_f.k_fuul = 0;
            }

            if (this.line_f.zero_temp !== zero) {
                this.line_f.all_z_s_00 = this.line_f.all_z_s_00 + this.line_f.z_s_00;
                this.line_f.z_s_00 = 1;
            } else if (this.line_f.zero_temp === zero) {
                this.line_f.z_s_00++;
            }

            this.line_f.zero_temp = zero;

            if (input === -5) {
                this.line_f.z_s_00 = 0;
            }

            if (zero > 0 && this.line_c.i_d >= (this.line_p.win * 0.4) && this.line_c.i_d <= (this.line_p.win * 0.5)) {
                this.line_f.k_start = 10;

                if (this.line_f.k_start === 10) {
                    this.line_f.all_z_s_00 = this.line_f.all_z_s_00 + this.line_f.z_s_00;
                }
                this.line_f.k_start = -5;
                return 1;
            } else if (zero === 0 && this.line_c.i_d === (this.line_p.win * 0.5)) {
                this.line_f.k_start = 10;
                if (this.line_f.k_start === 10) {
                    this.line_f.all_z_s_00 = (this.line_p.win * 0.5) + 1;
                }
                this.line_f.k_start = -5;
                return 1;
            }
        }

        return -5;
// show_01(i_d, k_d, j_d, zero, all_z_s_00, k_start, -5, -5, -5, -5, in);
    }

    true_peack(phase_num) {
        if (this.line_f.out_true_peack === phase_num) {
            return 0;
        } else if (this.line_f.out_true_peack !== phase_num) {
            this.line_f.out_true_peack = phase_num;
            return 1;
        }
    }

    first_tr_p_k(input) {
        if (input === -5) {
            return -1;
        } else if (input === 1) {
            this.line_m.tr_p_k[this.line_c.k_d] = 1;
            this.line_m.data_k[4 * this.line_p.win + this.line_c.k_d] = 2;

            return 1;
        } else {
            return -1;
        }
    }

    core_line(input) {
        debugger
        this.line_c_in = this.count(this.line_c_in);

        this.line_c_in.sys[this.line_c_in.i_l[0]] = input;

        this.wave_in[0] = this.line_c_in.sys[this.line_c_in.i_l[0]];
        this.wave_in[1] = this.line_c_in.sys[this.line_c_in.i_l[1]];
        this.wave_in[2] = this.line_c_in.sys[this.line_c_in.i_l[2]];
        this.wave_in[3] = this.line_c_in.sys[this.line_c_in.i_l[3]];

        for (let i = 0; i < 5; i++){
            if (this.line_c_in.c_l[i] == -1){
                this.wave_in[i] = -5;
            }
        }

        if (this.line_c_in.c_l[2] === -1) {
            this.line_c.i_d = 0;
        } else {
            this.line_c.i_d++;
        }

        if (this.line_c.i_d >= this.line_p.win) {
            this.line_c.i_d = 0;
        }

        if (this.line_c.i_d === 0) {
            this.line_c.i_c[1]++;
        }

        if (this.line_c.i_d === this.line_p.win / 2) {
            this.line_c.i_c[0]++;
        }


        if (this.line_c.i_c[0] === -1){
            this.line_c.ph_c[0] = 0;
            this.line_c.ph_c[1] = 0;
        } else {
            this.line_c.ph_c[0] = this.line_c.i_c[1] - this.line_c.i_c[0];
            this.line_c.ph_c[1] = this.line_c.i_c[1] - (this.line_c.i_c[0] + 1);
        }

        this.line_c.i_c_temp = this.line_c.i_c[1] - 1;

        if (this.line_c.i_c_temp === -1) {
            this.line_c.i_c_temp = 0;
        }

        if (this.line_c.ph_c[1] === 0) {
            this.line_c.ph_c[1] = 2;
        }

        if (this.line_c.i_c[0] === -1) {
            this.line_c.ph_c[1] = -5;
        }

        if (this.line_c.ph_c[0] === 0) {
            this.line_c.j_d = 0;
        } else if (this.line_c.ph_c[0] === 1){
            this.line_c.j_d = this.line_c.i_d - (this.line_p.win / 2);
        } else {
            this.line_c.j_d = this.line_c.i_d + (this.line_p.win / 2);
        }

        //this.line_c.i_d_del
        object = delay_one(this.line_c.i_d, this);

        if (this.wave_in[0 * 4 + 1] === 0) {
            this.line_c.zero[0] = 9;
        } else {
            this.line_c.zero[0] = 0;
        }

        if (this.wave_in[0 * 4 + 1] >= 0) {
            this.line_c.zero[0 * 2 + 1] = 1;
        } else {
            this.line_c.zero[1] = 4;
        }


        if (this.wave_in[0 * 4 + 1] === 0 && this.wave_in[0 * 4 + 2] < 0) {
            this.line_c.zero[1] = 4;
        }


        if (this.wave_in[0 * 4 + 0] >= 0) {
            this.line_c.zero[2] = 1;
        } else {
            this.line_c.zero[2] = 4;
        }

        if (this.wave_in[0 * 4 + 0] == 0 && this.wave_in[0 * 4 + 1] < 0) {
            this.line_c.zero[2] = 4;
        }


        if (this.wave_in[0 * 4 + 0] > 0 && this.wave_in[0 * 4 + 1] < 0 || this.wave_in[0 * 4 + 0] < 0 && this.wave_in[0 * 4 + 1]>0) {
            this.line_c.zero[3] = 1;
        } else {
            this.line_c.zero[3] = 0;
        }

        if (this.wave_in[0 * 4 + 1] > 0 && this.wave_in[0 * 4 + 2] < 0 || this.wave_in[0 * 4 + 1] < 0 && this.wave_in[0 * 4 + 2]>0) {
            this.line_c.zero[4] = 2;
        } else {
            this.line_c.zero[4] = 0;
        }

        if (this.line_c.zero[0] == 9 && this.line_c.zero[1] === this.line_c.zero[2]){
            this.line_c.zero[3] = 0;
            this.line_c.zero[4] = 0;
        } else if (this.line_c.zero[0 * 2 + 0] == 9 && this.line_c.zero[1] > this.line_c.zero[2] || this.line_c.zero[0] == 9 && this.line_c.zero[1] < this.line_c.zero[2]) {
            this.line_c.zero[3] = 1;
            this.line_c.zero[4] = 2;
        }


        if (this.line_c_in.c_l[0 * 4 + 1] === -1) {
            this.line_c.i_d = 0;
            this.line_c.j_d = 0;
            this.line_c.k_d = 0;
            this.line_c.ph_c[0] = -5;
            this.line_c.ph_c[1] = -5;
            this.wave_in[0 * 4 + 1] = -5;
            this.line_c.zero[0] = -5;
            this.line_c.zero[1] = -5;
            this.line_c.zero[2] = -5;
            this.line_c.zero[3] = -5;
            this.line_c.zero[4] = -5;
        }

        if (this.line_c.zero[0] === 9 && this.line_c.zero[1] === 1 && this.line_c.zero[2] === 4 || this.line_c.zero[0] === 9 && this.line_c.zero[1] === 4 && this.line_c.zero[2] == 1 || this.line_c.zero[0] != 9 && this.line_c.zero[4] == 2) {
            this.line_c.z_c_00++;
            this.line_c.z_c_01++;
        }

        if (this.line_c.z_c_00 >= this.line_p.win) {
            this.line_c.z_c_00 = 0;
        }

        if (this.line_c.z_c_01 >= this.line_p.win) {
            this.line_c.z_c_01 = 0;
        }

        if (this.line_t.k_first === -5) {

            //this.line_t.k_first
            object = zero_sample_count(this.line_c.z_c_00, this.wave_in[1], this);
            this.line_c.k_d = 0;
        } else if (this.line_t.k_first === 1){
            this.line_c.k_d++;
        } else {
            console.log('!!!!!!!!!!!!!!!!!!!!!!! Не обрабатывается в коде !!!!!!!!!!!!!!!!!!!!!!!')
        }

        if (this.line_c.k_d >= this.line_p.win) {
            this.line_c.k_d = 0;
        }

        if (this.wave_in[0 * 4 + 1] === -5) {
            this.line_p.min_max[0] = 10000;
            this.line_p.min_max[1] = -10000;
        } else if (this.line_c.zero[0] === 9 && this.line_c.zero[1] === 1 && this.line_c.zero[2] === 4 && this.line_c.zero[3] === 1 && this.line_c.zero[4] === 2) {
            this.line_p.min_max[0 * 2 + 0] = 10000;
        } else if (this.line_c.zero[0] === 9 && this.line_c.zero[1] === 4 && this.line_c.zero[2] === 1 && this.line_c.zero[3] === 1 && this.line_c.zero[4] === 2) {
            this.line_p.min_max[0 * 2 + 1] = -10000;
        } else if (this.line_c.zero[1] === 4 && this.line_c.zero[2] === 1 && this.line_c.zero[3] === 1 && this.line_c.zero[4] === 2) {
            this.line_p.min_max[0 * 2 + 0] = 10000;
        } else if (this.line_c.zero[1] === 1 && this.line_c.zero[2] === 4 && this.line_c.zero[3] === 1 && this.line_c.zero[4] === 2) {
            this.line_p.min_max[0 * 2 + 1] = -10000;
        } else if (this.line_c.zero[1] === 4 && this.line_c.zero[2] === 4 && this.line_c.zero[3] === 0 && this.line_c.zero[4] === 2) {
            this.line_p.min_max[0 * 2 + 0] = 10000;
        } else if (this.line_c.zero[1] === 1 && this.line_c.zero[2] === 1 && this.line_c.zero[3] === 0 && this.line_c.zero[4] === 2) {
            this.line_p.min_max[0 * 2 + 1] = -10000;
        }

        if (this.line_p.min_max[0 * 2 + 0] > this.wave_in[0 * 4 + 1]) {
            this.line_p.min_max[0 * 2 + 0] = this.wave_in[0 * 4 + 1];

            if (this.line_p.min_max[0 * 2 + 0] === -5 && this.wave_in[0 * 4 + 1] === -5) {
                this.line_p.min_max[0 * 2 + 0] = 10000;
            }
        }

        if (this.line_p.min_max[0 * 2 + 1] < this.wave_in[0 * 4 + 1]) {
            this.line_p.min_max[0 * 2 + 1] = this.wave_in[0 * 4 + 1];
        }

        if (this.wave_in[0 * 4 + 1] > 0) {
            this.line_p.pos_00 = this.line_p.min_max[0 * 2 + 1];
            this.line_p.neg_00 = 0;
        }

        if (this.wave_in[0 * 4 + 1] < 0) {
            this.line_p.pos_00 = 0;
            this.line_p.neg_00 = this.line_p.min_max[0 * 2 + 0];
        }

        this.line_m.data_i[0 * this.line_p.win + this.line_c.i_d] = this.line_c.zero[0];
        this.line_m.data_i[1 * this.line_p.win + this.line_c.i_d] = this.line_c.zero[1];
        this.line_m.data_i[2 * this.line_p.win + this.line_c.i_d] = this.line_c.zero[2];
        this.line_m.data_i[3 * this.line_p.win + this.line_c.i_d] = this.line_c.zero[3];
        this.line_m.data_i[4 * this.line_p.win + this.line_c.i_d] = this.line_c.zero[4];
        this.line_m.data_i[5 * this.line_p.win + this.line_c.i_d] = this.wave_in[0];
        this.line_m.data_i[6 * this.line_p.win + this.line_c.i_d] = this.wave_in[1];
        this.line_m.data_i[7 * this.line_p.win + this.line_c.i_d] = this.wave_in[2];
        this.line_m.data_i[8 * this.line_p.win + this.line_c.i_d] = this.line_p.neg_00;
        this.line_m.data_i[9 * this.line_p.win + this.line_c.i_d] = this.line_p.pos_00;
        this.line_m.data_i[10 * this.line_p.win + this.line_c.i_d] = this.line_c.z_c_00;
        this.line_m.data_i[11 * this.line_p.win + this.line_c.i_d] = this.line_c.z_c_01;


        if (this.line_p.neg_00 === 0) {
            this.line_t.tr_00 = 0;
        } else {
            this.line_t.tr_00 = 1;
        }

        if (this.line_p.pos_00 === 0) {
            this.line_t.tr_01 = 0;
        } else {
            this.line_t.tr_01 = 1;
        }

        if ((this.line_t.tr_00 + this.line_t.tr_01) === 1) {
            this.line_t.tr_true = 1;
        } else {
            this.line_t.tr_true = 0;
        }

        this.line_m.line_00[0 * this.line_p.win + this.line_c.i_d] = this.line_m.data_i[8 * this.line_p.win + this.line_c.i_d] + this.line_m.data_i[9 * this.line_p.win + this.line_c.i_d];

        if (this.line_t.k_first === -5) {
            this.line_m.line_01[0 * this.line_p.win + this.line_c.k_d] = 0;
        } else {
            this.line_m.line_01[0 * this.line_p.win + this.line_c.k_d] = this.line_m.line_00[0 * this.line_p.win + this.line_c.k_d];
        }



        for (let i = 0; i < 12; i++){
            if (this.line_t.k_first === -5) {
                this.line_m.data_k[i * this.line_p.win + this.line_c.k_d] = -5;// �������� �����
            } else {
                this.line_m.data_k[i * this.line_p.win + this.line_c.k_d] = this.line_m.data_i[i * this.line_p.win + this.line_c.k_d];
            }
        }

        if (this.line_l.lim_k_d > this.line_m.data_i[10 * this.line_p.win + this.line_c.i_d]) {
            this.line_l.lim_k_d = this.line_m.data_i[11 * this.line_p.win + this.line_c.k_d];
            this.line_t.lim_k_tr = 1;
        } else if (this.line_l.lim_k_d === this.line_m.data_i[10 * this.line_p.win + this.line_c.i_d]) {
            this.line_l.lim_k_d = this.line_m.data_k[11 * this.line_p.win + this.line_c.k_d - 1];
            this.line_t.lim_k_tr = 2;
        } else {
            this.line_l.lim_k_d = this.line_m.data_k[11 * this.line_p.win + this.line_c.k_d];
            this.line_t.lim_k_tr = 0;
        }

        if (this.line_t.k_first === -5) {
            this.line_c.k_co = 0;
        } else if(this.line_c.k_d === 0) {
            this.line_c.k_co++;
        }

        object = true_peack(this.line_c.z_c_00, this);

        this.line_m.tr_p_i[this.line_c.i_d] = this.line_t.tr_p;
        this.line_m.tr_p_k[this.line_c.k_d] = this.line_m.tr_p_i[this.line_c.k_d];


        if (this.line_t.tr_p === 1 && this.line_m.data_i[0 * this.line_p.win + this.line_c.i_d] === 9 && this.line_m.data_i[1 * this.line_p.win + this.line_c.i_d] === 4 && this.line_m.data_i[2 * this.line_p.win + this.line_c.i_d] === 1) {
            this.line_m.i_det[0 * this.line_p.win + this.line_c.z_c_00] = this.line_m.data_i[8 * this.line_p.win + this.line_c.i_d - 0];
        } else if (this.line_t.tr_p === 1 && this.line_m.data_i[0 * this.line_p.win + this.line_c.i_d] === 9 && this.line_m.data_i[1 * this.line_p.win + this.line_c.i_d] === 1 && this.line_m.data_i[2 * this.line_p.win + this.line_c.i_d] === 4) {
            this.line_m.i_det[0 * this.line_p.win + this.line_c.z_c_00] = this.line_m.data_i[9 * this.line_p.win + this.line_c.i_d - 0];
        } else if (this.line_t.tr_p === 1 && this.line_m.data_i[0 * this.line_p.win + this.line_c.i_d] === 0 && this.line_m.data_i[1 * this.line_p.win + this.line_c.i_d] === 4 && this.line_m.data_i[2 * this.line_p.win + this.line_c.i_d] === 4 && this.line_m.data_i[4 * this.line_p.win + this.line_c.i_d] === 2) {
            this.line_m.i_det[0 * this.line_p.win + this.line_c.z_c_00] = this.line_m.line_00[0 * this.line_p.win + this.line_c.i_d_del];
        } else if (this.line_t.tr_p === 1 && this.line_m.data_i[0 * this.line_p.win + this.line_c.i_d] === 0 && this.line_m.data_i[1 * this.line_p.win + this.line_c.i_d] === 1 && this.line_m.data_i[2 * this.line_p.win + this.line_c.i_d] === 1 && this.line_m.data_i[4 * this.line_p.win + this.line_c.i_d] === 2) {
            this.line_m.i_det[0 * this.line_p.win + this.line_c.z_c_00] = this.line_m.line_00[0 * this.line_p.win + this.line_c.i_d_del];
        } else if (this.line_t.tr_p === 1 && this.line_m.data_i[0 * this.line_p.win + this.line_c.i_d] === 0 && this.line_m.data_i[1 * this.line_p.win + this.line_c.i_d] === 1 && this.line_m.data_i[2 * this.line_p.win + this.line_c.i_d] == 4 && this.line_m.data_i[3 * this.line_p.win + this.line_c.i_d] === 1 && this.line_m.data_i[4 * this.line_p.win + this.line_c.i_d] === 2) {
            this.line_m.i_det[0 * this.line_p.win + this.line_c.z_c_00] = this.line_m.line_00[0 * this.line_p.win + this.line_c.i_d_del];
        } else if (this.line_t.tr_p === 1 && this.line_m.data_i[0 * this.line_p.win + this.line_c.i_d] === 0 && this.line_m.data_i[1 * this.line_p.win + this.line_c.i_d] === 4 && this.line_m.data_i[2 * this.line_p.win + this.line_c.i_d] === 1 && this.line_m.data_i[3 * this.line_p.win + this.line_c.i_d] === 1 && this.line_m.data_i[4 * this.line_p.win + this.line_c.i_d] === 2) {
            this.line_m.i_det[0 * this.line_p.win + this.line_c.z_c_00] = this.line_m.line_00[0 * this.line_p.win + this.line_c.i_d_del];
        }

        if (this.line_m.data_k[11 * this.line_p.win + this.line_c.k_d] === -5) {
            this.line_m.line_k[0 * this.line_p.win + this.line_c.k_d] = 0;
        } else {
            this.line_m.line_k[0 * this.line_p.win + this.line_c.k_d] = this.line_m.i_det[0 * this.line_p.win + this.line_l.lim_k_d];
        }

        if (this.line_m.tr_p_i[this.line_c.i_d] === 1 && this.line_c.z_c_00 === 0) {
            this.line_c.z_c_i++;
        }

        if (this.line_m.tr_p_k[this.line_c.k_d] === 1 && this.line_m.data_k[11 * this.line_p.win + this.line_c.k_d] === 1) {
            this.line_c.z_c_k++;
        }

        if (this.line_t.k_first === -5) {
            this.line_m.data_k[11 * this.line_p.win + this.line_c.k_d] = 0;
            this.line_m.data_k[6 * this.line_p.win + this.line_c.k_d] = 0;
            this.line_m.data_k[0 * this.line_p.win + this.line_c.k_d] = 0;
            this.line_m.data_k[4 * this.line_p.win + this.line_c.k_d] = 0;
        }

        if (this.line_t.tr_p_f === -1) {
            object = first_tr_p_k(this.line_t.k_first, this);
        }


        // if (line_t.tr_true == 0){
        //  std::cout << "��������� ���������" << std::endl;
        //  	getchar();
        // }

        //����� ������� ����� ���� ���� ����� ����� ����������
        /**/
        this.line_te.temp_phase = this.line_m.line_01[0 * this.line_p.win + this.line_c.k_d];

        if (this.line_m.data_k[0 * this.line_p.win + this.line_c.k_d] === 9) {
            this.line_m.line_01[0 * this.line_p.win + this.line_c.k_d] = this.line_m.line_01[0 * this.line_p.win + this.line_c.k_d] * -1; //��� �������� ������� � ������� ����� ��������� � ��������� ������� ������ �� �������� ���������
            this.line_te.temp_phase = this.line_te.temp_phase *-2; // �� �� ����� ������ ������ ����� �� �����
        }


        if (this.line_m.line_k[0 * this.line_p.win + this.line_c.k_d] > 0 && this.line_m.line_01[0 * this.line_p.win + this.line_c.k_d] < 0) {
            this.line_m.line_01[0 * this.line_p.win + this.line_c.k_d] = this.line_m.line_01[0 * this.line_p.win + this.line_c.k_d] * -1;
            this.line_te.temp_phase = this.line_te.temp_phase *-1; // ��������� �� �� �����
        }

        if (this.line_m.line_k[0 * this.line_p.win + this.line_c.k_d] < 0 && this.line_m.line_01[0 * this.line_p.win + this.line_c.k_d] > 0) {
            this.line_m.line_01[0 * this.line_p.win + this.line_c.k_d] = this.line_m.line_01[0 * this.line_p.win + this.line_c.k_d] * -1;
            this.line_te.temp_phase = this.line_te.temp_phase *-1;
        }

        if (this.line_m.line_k[0 * this.line_p.win + this.line_c.k_d] == this.line_te.temp_phase) {
            this.line_c.phase_c = 2;
        } else {
            this.line_c.phase_c = 1;
        }

        this.line_out.out[0] = this.line_m.data_k[0 * this.line_p.win + this.line_c.k_d];
        this.line_out.out[1] = this.line_m.data_k[1 * this.line_p.win + this.line_c.k_d];
        this.line_out.out[2] = this.line_m.data_k[2 * this.line_p.win + this.line_c.k_d];
        this.line_out.out[3] = this.line_m.data_k[3 * this.line_p.win + this.line_c.k_d];
        this.line_out.out[4] = this.line_m.data_k[4 * this.line_p.win + this.line_c.k_d];
        this.line_out.out[5] = this.line_m.line_k[0 * this.line_p.win + this.line_c.k_d];
        this.line_out.out[6] = this.line_m.line_01[0 * this.line_p.win + this.line_c.k_d];
        this.line_out.out[7] = this.line_m.data_k[6 * this.line_p.win + this.line_c.k_d];
        this.line_out.out[8] = this.line_te.temp_phase;
        this.line_out.out[9] = 0;
        this.line_out.out[10] = 0;
        this.line_out.out[11] = 0;
        this.line_out.out[12] = 0;


        this.line_out.write[0] = this.line_m.data_k[6 * this.line_p.win + this.line_c.k_d];
        this.line_out.write[1] = this.line_m.line_k[0 * this.line_p.win + this.line_c.k_d];
        this.line_out.write[2] = this.line_m.line_01[0 * this.line_p.win + this.line_c.k_d];
        this.line_out.write[3] = this.line_m.line_k[0 * this.line_p.win + this.line_c.k_d];
        this.line_out.write[4] = this.line_m.data_i[5 * this.line_p.win + this.line_c.k_d];
        this.line_out.write[5] = this.line_m.data_k[4 * this.line_p.win + this.line_c.k_d];
        this.line_out.write[6] = this.line_m.data_k[0 * this.line_p.win + this.line_c.k_d];
        this.line_out.write[7] = 0;

        if (this.line_m.data_k[0 * this.line_p.win + this.line_c.k_d] == 0 && this.line_m.data_k[1 * this.line_p.win + this.line_c.k_d] === 1 && this.line_m.data_k[2 * this.line_p.win + this.line_c.k_d] === 1 && this.line_m.data_k[3 * this.line_p.win + this.line_c.k_d] === 0 && this.line_m.data_i[4 * this.line_p.win + this.line_c.k_d] === 0 && this.line_c.phase_c === 2) {
            this.line_ph.phase[0] = 0;
            this.line_ph.phase[1] = 2;
            this.line_ph.phase[2] = 0;
            this.line_ph.phase[3] = 3;
        } else if (this.line_m.data_k[0 * this.line_p.win + this.line_c.k_d] === 0 && this.line_m.data_k[1 * this.line_p.win + this.line_c.k_d] === 1 && this.line_m.data_k[2 * this.line_p.win + this.line_c.k_d] === 1 && this.line_m.data_k[3 * this.line_p.win + this.line_c.k_d] === 0 && this.line_m.data_i[4 * this.line_p.win + this.line_c.k_d] === 2 && this.line_c.phase_c === 2) {
            this.line_ph.phase[0] = 1;
            this.line_ph.phase[1] = 0;
            this.line_ph.phase[2] = 2;
            this.line_ph.phase[3] = 0;
        } else if (this.line_m.data_k[0 * this.line_p.win + this.line_c.k_d] === 0 && this.line_m.data_k[1 * this.line_p.win + this.line_c.k_d] == 1 && this.line_m.data_k[2 * this.line_p.win + this.line_c.k_d] === 4 && this.line_m.data_k[3 * this.line_p.win + this.line_c.k_d] === 1 && this.line_m.data_i[4 * this.line_p.win + this.line_c.k_d] === 0 && this.line_c.phase_c === 2) {
            this.line_ph.phase[0] = 0;
            this.line_ph.phase[1] = 2;
            this.line_ph.phase[2] = 0;
            this.line_ph.phase[3] = 3;
        } else if (this.line_m.data_k[0 * this.line_p.win + this.line_c.k_d] === 9 && this.line_m.data_k[1 * this.line_p.win + this.line_c.k_d] === 1 && this.line_m.data_k[2 * this.line_p.win + this.line_c.k_d] === 4 && this.line_m.data_k[3 * this.line_p.win + this.line_c.k_d] === 1 && this.line_m.data_i[4 * this.line_p.win + this.line_c.k_d] === 2 && this.line_c.phase_c === 1) {
            this.line_ph.phase[0] = 3;
            this.line_ph.phase[1] = 0;
            this.line_ph.phase[2] = 4;
            this.line_ph.phase[3] = 0;
        } else if (this.line_m.data_k[0 * this.line_p.win + this.line_c.k_d] === 0 && this.line_m.data_k[1 * this.line_p.win + this.line_c.k_d] === 4 && this.line_m.data_k[2 * this.line_p.win + this.line_c.k_d] === 4 && this.line_m.data_k[3 * this.line_p.win + this.line_c.k_d] === 0 && this.line_m.data_i[4 * this.line_p.win + this.line_c.k_d] === 0 && this.line_c.phase_c === 1) {
            this.line_ph.phase[0] = 3;
            this.line_ph.phase[1] = 0;
            this.line_ph.phase[2] = 4;
            this.line_ph.phase[3] = 0;
        } else if (this.line_m.data_k[0 * this.line_p.win + this.line_c.k_d] === 0 && this.line_m.data_k[1 * this.line_p.win + this.line_c.k_d] === 4 && this.line_m.data_k[2 * this.line_p.win + this.line_c.k_d] === 4 && this.line_m.data_k[3 * this.line_p.win + this.line_c.k_d] === 0 && this.line_m.data_i[4 * this.line_p.win + this.line_c.k_d] === 2 && this.line_c.phase_c === 1) {
            this.line_ph.phase[0] = 3;
            this.line_ph.phase[1] = 0;
            this.line_ph.phase[2] = 4;
            this.line_ph.phase[3] = 0;
        } else if (this.line_m.data_k[0 * this.line_p.win + this.line_c.k_d] === 0 && this.line_m.data_k[1 * this.line_p.win + this.line_c.k_d] === 4 && this.line_m.data_k[2 * this.line_p.win + this.line_c.k_d] === 4 && this.line_m.data_k[3 * this.line_p.win + this.line_c.k_d] === 0 && this.line_m.data_i[4 * this.line_p.win + this.line_c.k_d] === 2 && this.line_c.phase_c === 2) {
            this.line_ph.phase[0] = 3;
            this.line_ph.phase[1] = 0;
            this.line_ph.phase[2] = 4;
            this.line_ph.phase[3] = 0;
        } else if (this.line_m.data_k[0 * this.line_p.win + this.line_c.k_d] === 0 && this.line_m.data_k[1 * this.line_p.win + this.line_c.k_d] === 4 && this.line_m.data_k[2 * this.line_p.win + this.line_c.k_d] === 4 && this.line_m.data_k[3 * this.line_p.win + this.line_c.k_d] === 0 && this.line_m.data_i[4 * this.line_p.win + this.line_c.k_d] === 0 && this.line_c.phase_c === 2) {
            this.line_ph.phase[0] = 0;
            this.line_ph.phase[1] = 4;
            this.line_ph.phase[2] = 0;
            this.line_ph.phase[3] = 1;
        } else if (this.line_m.data_k[0 * this.line_p.win + this.line_c.k_d] === 0 && this.line_m.data_k[1 * this.line_p.win + this.line_c.k_d] === 4 && this.line_m.data_k[2 * this.line_p.win + this.line_c.k_d] === 1 && this.line_m.data_k[3 * this.line_p.win + this.line_c.k_d] === 1 && this.line_m.data_i[4 * this.line_p.win + this.line_c.k_d] === 0 && this.line_c.phase_c === 2) {
            this.line_ph.phase[0] = 0;
            this.line_ph.phase[1] = 4;
            this.line_ph.phase[2] = 0;
            this.line_ph.phase[3] = 1;
        } else if (this.line_m.data_k[0 * this.line_p.win + this.line_c.k_d] === 0 && this.line_m.data_k[1 * this.line_p.win + this.line_c.k_d] === 4 && this.line_m.data_k[2 * this.line_p.win + line_c.k_d] === 1 && this.line_m.data_k[3 * this.line_p.win + this.line_c.k_d] === 1 && this.line_m.data_i[4 * this.line_p.win + this.line_c.k_d] === 2 && this.line_c.phase_c === 2) {
            this.line_ph.phase[0] = 3;
            this.line_ph.phase[1] = 4;
            this.line_ph.phase[2] = 4;
            this.line_ph.phase[3] = 1;
        } else if (this.line_m.data_k[0 * this.line_p.win + this.line_c.k_d] === 9 && this.line_m.data_k[1 * this.line_p.win + this.line_c.k_d] === 4 && this.line_m.data_k[2 * line_p.win + line_c.k_d] === 1 && this.line_m.data_k[3 * this.line_p.win + this.line_c.k_d] === 1 && this.line_m.data_i[4 * this.line_p.win + this.line_c.k_d] === 2 && this.line_c.phase_c === 1) {
            this.line_ph.phase[0] = 1;
            this.line_ph.phase[1] = 0;
            this.line_ph.phase[2] = 2;
            this.line_ph.phase[3] = 0;
        } else if (this.line_m.data_k[0 * this.line_p.win + this.line_c.k_d] === 0 && this.line_m.data_k[1 * this.line_p.win + this.line_c.k_d] === 1 && this.line_m.data_k[2 * this.line_p.win + this.line_c.k_d] === 1 && this.line_m.data_k[3 * this.line_p.win + this.line_c.k_d] === 0 && this.line_m.data_i[4 * this.line_p.win + this.line_c.k_d] === 0 && this.line_c.phase_c === 1) {
            this.line_ph.phase[0] = 1;
            this.line_ph.phase[1] = 0;
            this.line_ph.phase[2] = 2;
            this.line_ph.phase[3] = 0;
        } else if (this.line_m.data_k[0 * this.line_p.win + this.line_c.k_d] === 0 && this.line_m.data_k[1 * this.line_p.win + this.line_c.k_d] === 1 && this.line_m.data_k[2 * this.line_p.win + this.line_c.k_d] === 1 && this.line_m.data_k[3 * this.line_p.win + this.line_c.k_d] === 0 && this.line_m.data_i[4 * this.line_p.win + this.line_c.k_d] === 2 && this.line_c.phase_c === 1) {
            this.line_ph.phase[0] = 1;
            this.line_ph.phase[1] = 0;
            this.line_ph.phase[2] = 2;
            this.line_ph.phase[3] = 0;
        } else if (this.line_m.data_k[0 * this.line_p.win + this.line_c.k_d] === 0 && this.line_m.data_k[1 * this.line_p.win + this.line_c.k_d] === 1 && this.line_m.data_k[2 * this.line_p.win + this.line_c.k_d] === 4 && this.line_m.data_k[3 * this.line_p.win + this.line_c.k_d] === 1 && this.line_m.data_i[4 * this.line_p.win + this.line_c.k_d] === 2 && this.line_c.phase_c === 2) {
            this.line_ph.phase[0] = 1;
            this.line_ph.phase[1] = 2;
            this.line_ph.phase[2] = 2;
            this.line_ph.phase[3] = 3;
        } else {
            this.line_ph.phase[0] = 0;
            this.line_ph.phase[1] = 0;
            this.line_ph.phase[2] = 0;
            this.line_ph.phase[3] = 0;
        }

        this.line_out.sin_phase = this.line_m.line_k[0 * this.line_p.win + this.line_c.k_d];
        this.line_out.dry = this.line_m.data_k[6 * this.line_p.win + this.line_c.k_d];

        if (this.line_ph.phase[2] === 0 && this.line_ph.phase[3] === 3){
            this.line_out.cos_phase = this.line_m.line_k[0 * this.line_p.win + this.line_c.k_d] * -1;
        } else if (this.line_ph.phase[2] === 2 && this.line_ph.phase[3] === 0) {
            this.line_out.cos_phase = this.line_m.line_k[0 * this.line_p.win + this.line_c.k_d];
        } else if (this.line_ph.phase[2] === 0 && this.line_ph.phase[3] === 1) {
            this.line_out.cos_phase = this.line_m.line_k[0 * this.line_p.win + this.line_c.k_d] * -1;
        } else if (this.line_ph.phase[2] === 2 && this.line_ph.phase[3] === 3){
            this.line_out.cos_phase = this.line_m.line_k[0 * this.line_p.win + this.line_c.k_d] * -1;
        } else if (this.line_ph.phase[2] === 4 && this.line_ph.phase[3] === 1) {
            this.line_out.cos_phase = this.line_m.line_k[0 * this.line_p.win + this.line_c.k_d] * -1;
        }

        return this
        // console.log('🧡this🧡', this)
    }
    // core_line(input) {
    //     this.line_c_in = this.count(this.line_c_in);
    //     console.log('ddddddddddddddd',input, this.line_c_in.sys)
    //     debugger
    //     this.line_c_in.sys[this.line_c_in.i_l[0]] = input
    //
    //     this.wave_in[0] = this.line_c_in.sys[this.line_c_in.i_l[0]];
    //     this.wave_in[1] = this.line_c_in.sys[this.line_c_in.i_l[1]];
    //     this.wave_in[2] = this.line_c_in.sys[this.line_c_in.i_l[2]];
    //     this.wave_in[3] = this.line_c_in.sys[this.line_c_in.i_l[3]];
    //
    //     for (let i = 0; i < 5; ++i){
    //         if (this.line_c_in.c_l[i] == -1){
    //             this.wave_in[i] = -5;
    //         }
    //     }
    //
    //     if (this.line_c_in.c_l[2] == -1) {
    //         this.line_c.i_d = 0;
    //     } else {
    //         this.line_c.i_d++;
    //     }
    //
    //     if (this.line_c.i_d >= this.line_p.win) {
    //         this.line_c.i_d = 0;
    //     }
    //
    //     if (this.line_c.i_d == 0) {
    //         this.line_c.i_c[1]++;
    //     }
    //
    //     debugger
    // }
}


export const Line = async (self, obj) => {
    const limit = new Limit(44100); // Sample rate

    return {
        init: async (self) => {
            // this = init()
        },
        tick: async (input) => {
            await  limit.core_line(input)
            console.log('---------------------------------', limit)
            console.log('(((((((((((((((((((( ------- LINE ------- ))))))))))))))))))))))))', input)
            // console.log('🖤 process 🖤', this.line_c_in.i_l, this.line_c_in.c_l, this.line_c_in.sys)
            // await Process()
        },
        end: (self) => {
                // RootCount = 0
        }
    }
}