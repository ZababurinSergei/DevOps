#include "core.h"

#include <cmath>

CORE::CORE()
{};

void CORE::initialize(WORLD_STATE* _ws, WORLD_FUNCTIONS* _wf, WORLD_CALC* _wc){
	ws = _ws;
	wc = _wc;
	wf = _wf;

	algoritm_0 = new ALGORITM_0;
	algoritm_0->initialize(ws, wf, wc);

	a0_control = new A0_CONTROL;
	a0_control->s0_off_on = &ws->s0_offon;
	a0_control->s0_in_type = &ws->s0_in_type;
	a0_control->s0_invert = &ws->s0_invert;
	a0_control->s0_volume = &ws->s0_volume;
	a0_control->s0_pan = &ws->s0_pan;
	
	a0_control->s1_d1 = &ws->s1_d1;
	a0_control->s1_d2 = &ws->s1_d2;
	a0_control->s1_width = &ws->s1_width;
	a0_control->s1_filter = &ws->s1_filter;
	a0_control->s1_speed = &ws->s1_speed;


	//input
	buffer_out_l = new double[ws->core.buff_size];
	buffer_out_r = new double[ws->core.buff_size];
	wf->clear_array(buffer_out_l, ws->core.buff_size, 0);
	wf->clear_array(buffer_out_r, ws->core.buff_size, 0);
	//stage 0
	stage_0_l = new double[ws->core.buff_size];
	stage_0_r = new double[ws->core.buff_size];
	wf->clear_array(stage_0_l, ws->core.buff_size, 0);
	wf->clear_array(stage_0_r, ws->core.buff_size, 0);
	//stage 1
	stage_1_l = new double[ws->core.buff_size];
	stage_1_r = new double[ws->core.buff_size];
	wf->clear_array(stage_1_l, ws->core.buff_size, 0);
	wf->clear_array(stage_1_r, ws->core.buff_size, 0);
};

CORE::~CORE()
{
	delete[] stage_0_l;
	delete[] stage_0_r;
	delete[] stage_1_l;
	delete[] stage_1_r;
	delete[] buffer_out_l;
	delete[] buffer_out_r;

	delete algoritm_0;
	delete a0_control;
};

void CORE::io(double* in_l, double* in_r, double* out_l, double* out_r, unsigned int size){

	for(unsigned int i = 0; i < size; i++){

		algoritm_0->create(&buffer_out_l[i], &buffer_out_r[i], in_l[i], in_r[i], a0_control);

		//выход
		//buffer_out_l[i] = lfo->create(0.5, ws->s0_delay1, 1);
		//buffer_out_r[i] = buffer_out_l[i];

		out_l[i] = buffer_out_l[i];
		out_r[i] = buffer_out_r[i];
	};

	wf->clear_array(stage_0_l, size, 0);
	wf->clear_array(stage_0_r, size, 0);
	wf->clear_array(stage_1_l, size, 0);
	wf->clear_array(stage_1_r, size, 0);
	wf->clear_array(buffer_out_l, size, 0);
	wf->clear_array(buffer_out_r, size, 0);
};