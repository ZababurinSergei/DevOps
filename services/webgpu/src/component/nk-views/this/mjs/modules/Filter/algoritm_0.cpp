#include "algoritm_0.h"

ALGORITM_0::ALGORITM_0()
{};

void ALGORITM_0::initialize(WORLD_STATE* _ws, WORLD_FUNCTIONS* _wf, WORLD_CALC* _wc){
	ws = _ws;
	wc = _wc;
	wf = _wf;

	wf->clear_array(apr, 256, 0);

	ap = new AP[256];
	for(int i = 0; i < 256; i++)
		ap[i].initialize(2);

	midside = new MIDSIDE;
	hilbert = new HILBERT[4];
	for(int i = 0; i < 4; i++)
		hilbert[i].initialize(ws, wf, wc);

	filter = new FILTER[6];
	for(int i = 0; i < 6; i++)
		filter[i].initialize();
	delay = new DELAY[10];
	for(int i = 0; i < 10; i++)
		delay[i].initialize(ws, wf, wc);

	lfo_sine = new LFO_SINE[10];
	for(int i = 0; i < 10; i++)
		lfo_sine[i].initialize(ws, wf, wc);

	lfo_triangle = new LFO_TRIANGLE[10];
	for(int i = 0; i < 10; i++)
		lfo_triangle[i].initialize(ws, wf, wc);


	for(int i = 0; i < 10; i++)
		stage0[i] = stage1[i] = {0};

	count = 0;

	pi = atan(1)*4.0;

	type_0 = new TYPE_0[2];
	for(int i = 0; i < 2; i++)
		type_0[i].initialize(ws, wf, wc);

	type_1 = new TYPE_1[2];
	for(int i = 0; i < 2; i++)
		type_1[i].initialize(ws, wf, wc);

	for(int i = 0; i < 6; i++)
		s1[i] = 0;

	//srand ( (unsigned int)time(0));
};

ALGORITM_0::~ALGORITM_0(){
	delete[] ap;
	delete midside;
	delete hilbert;
	delete[] filter;
	delete[] delay;
	delete[] lfo_sine;
	delete[] lfo_triangle;
	delete[] type_0;
	delete[] type_1;
};

void ALGORITM_0::create(double* _out_l, double* _out_r, double _in_l, double _in_r, A0_CONTROL* _control){

	//INPUT

	//off on
	if(*_control->s0_off_on == 1)	{
		//input type
		if(*_control->s0_in_type == 0){
			stage0[0].l = _in_l;
			stage0[0].r = _in_r;
		}else if(*_control->s0_in_type == 1){
			stage0[0].l = _in_l;
			stage0[0].r = _in_l;
		}else if(*_control->s0_in_type == 2){
			stage0[0].l = _in_r;
			stage0[0].r = _in_r;
		}else if(*_control->s0_in_type == 3){
			stage0[0].l = _in_l + _in_r;
			stage0[0].r = stage0[0].l;
		};

		//invert
		//lr
		if(*_control->s0_invert == 0){
			stage0[1].l = stage0[0].l;
			stage0[1].r = stage0[0].r;
		//ilr
		}else if(*_control->s0_invert == 1){
			stage0[1].l = stage0[0].l*-1;
			stage0[1].r = stage0[0].r;
		//lir
		}else if(*_control->s0_invert == 2){
			stage0[1].l = stage0[0].l;
			stage0[1].r = stage0[0].r*-1;
		//rl
		}else if(*_control->s0_invert == 3){
			stage0[1].l = stage0[0].r;
			stage0[1].r = stage0[0].l;
		//irl
		}else if(*_control->s0_invert == 4){
			stage0[1].l = stage0[0].r*-1;
			stage0[1].r = stage0[0].l;
		//ril
		}else if(*_control->s0_invert == 5){
			stage0[1].l = stage0[0].r;
			stage0[1].r = stage0[0].l*-1;
		};

		//volume
		if(ws->s0_volume != 0){
			stage0[1].l *= wc->db_to_sample(ws->s0_volume);
			stage0[1].r *= wc->db_to_sample(ws->s0_volume);
		};

		//pan
		if(*_control->s0_pan < 0)
			stage0[1].l *= (1 + *_control->s0_pan);
		else if(*_control->s0_pan > 0)
			stage0[1].r *= (1 - *_control->s0_pan);

	//ТИП ФАЗЫ

		//спираль

		if(ws->s1_type == 0){

			type_0[0].create(&s1[0], &s1[1], stage0[1].l, *_control->s1_d1, *_control->s1_width, *_control->s1_filter);
			type_0[1].create(&s1[2], &s1[3], stage0[1].r, *_control->s1_d1, *_control->s1_width, *_control->s1_filter);
			stage1[1].l = s1[0] + s1[2];
			stage1[1].r = s1[1] + s1[3];
			//оригинальный side
			if(ws->s1_side_onoff == 1){
				midside->knob(&s1[4], &s1[5], stage0[1].l, stage0[1].r, 0 );
				stage1[1].l += s1[4] * wc->db_to_sample(ws->s1_side_volume);
				stage1[1].r += s1[5] * wc->db_to_sample(ws->s1_side_volume);
			};

		}else if(ws->s1_type == 1){

			type_1[0].create(&s1[0], &s1[1], stage0[1].l, *_control->s1_speed, *_control->s1_d1, *_control->s1_d2, *_control->s1_filter, *_control->s1_width);
			type_1[1].create(&s1[2], &s1[3], stage0[1].r, *_control->s1_speed, *_control->s1_d1, *_control->s1_d2, *_control->s1_filter, *_control->s1_width);
			stage1[1].l = s1[0] + s1[2];
			stage1[1].r = s1[1] + s1[3];
			//оригинальный side
			if(ws->s1_side_onoff == 1){
				midside->knob(&s1[4], &s1[5], stage0[1].l, stage0[1].r, 0 );
				stage1[1].l += s1[4] * wc->db_to_sample(ws->s1_side_volume);
				stage1[1].r += s1[5] * wc->db_to_sample(ws->s1_side_volume);
			};

		};
	

		/*
		//КРУГ ДЛЯ 1го канала
		//lfo
		double lfo00[8];

		//режим lfo колесо
		//lfo00[0] = lfo_sine[0].create(44100.0, 1, *_control->s1_speed, 0,     0,0);
		//lfo00[1] = lfo_sine[1].create(44100.0, 1, *_control->s1_speed, 90,    0,0);
		//lfo00[2] = lfo_sine[2].create(44100.0, 1, *_control->s1_speed, 180,   0,0);
		//lfo00[3] = lfo_sine[3].create(44100.0, 1, *_control->s1_speed, 270,   0,0);
		//режим статичный
		//lfo00[0] = sin(*_control->s1_width*pi + 0           )*0.5 + 0.5;
		//lfo00[1] = sin(*_control->s1_width*pi + 3.141592*0.5)*0.5 + 0.5;
		//lfo00[2] = sin(*_control->s1_width*pi + 3.141592    )*0.5 + 0.5;
		//lfo00[3] = sin(*_control->s1_width*pi + 3.141592*1.5)*0.5 + 0.5;
		//режим маятника
		double lfo_cycl = lfo_sine[0].create(44100.0, 1, *_control->s1_speed, 0,  0,1);
		lfo_cycl = lfo_cycl   *  *_control->s1_width + (*_control->s2_width - *_control->s1_width/2);
		lfo00[0] = sin(lfo_cycl*pi + 0           )*0.5 + 0.5;
		lfo00[1] = sin(lfo_cycl*pi + 3.141592*0.5)*0.5 + 0.5;
		lfo00[2] = sin(lfo_cycl*pi + 3.141592    )*0.5 + 0.5;
		lfo00[3] = sin(lfo_cycl*pi + 3.141592*1.5)*0.5 + 0.5;

		lfo00[4] = lfo00[0]*-1;
		lfo00[5] = lfo00[1]*-1;
		lfo00[6] = lfo00[2]*-1;
		lfo00[7] = lfo00[3]*-1;
			
		//задержка
		double d1;
		delay[2].create_delay(&d1, stage0[1].r, *_control->s1_d1,   0,0,0);	

		//фильтруем 2 потока LP HP
		double f[4];
		f[0] = filter[0].create(d1, *_control->s1_filter, 0);
		f[1] = filter[1].create(d1, *_control->s1_filter, 0);
		f[2] = filter[2].create(d1, *_control->s1_filter, 1);
		f[3] = filter[3].create(stage0[1].r, *_control->s1_filter, 1);

		double l[4];
		l[0] = f[0];
		l[1] = f[1];
		//колесо по часовой
		//l[2] = f[2]*lfo00[0] + f[3]*lfo00[1] + f[2]*-1*lfo00[2] + f[3]*-1*lfo00[3];
		//l[3] = f[2]*lfo00[1] + f[3]*lfo00[2] + f[2]*-1*lfo00[3] + f[3]*-1*lfo00[0];
		//колесо против часовой
		l[2] = f[2]*lfo00[0] + f[3]*lfo00[1] + f[2]*-1*lfo00[2] + f[3]*-1*lfo00[3];
		l[3] = f[2]*lfo00[5] + f[3]*lfo00[6] + f[2]*-1*lfo00[7] + f[3]*-1*lfo00[4];

		hilbert[0].create(&l[0], &l[1], l[0], l[1], 1);
		midside->decode(&l[0], &l[1], l[0], l[1], 0);
		hilbert[1].create(&l[0], &l[1], l[0], l[1], 1);

		hilbert[2].create(&l[2], &l[3], l[2], l[3], 1);
		midside->decode(&l[2], &l[3], l[2], l[3], 0);
		hilbert[3].create(&l[2], &l[3], l[2], l[3], 1);

		//режим lfo
		//stage1[1].l = l[0] + l[2]*0.75;
		//stage1[1].r = l[1] + l[3]*0.75;
		//режим статичный
		//режим маятника
		stage1[1].l = l[0] + l[2];
		stage1[1].r = l[1] + l[3];
		*/


		*_out_l = stage1[1].l;
		*_out_r = stage1[1].r;

		count++;
	};
};

