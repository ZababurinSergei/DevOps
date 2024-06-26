
#include "osc.h"


OSC::OSC()
{
}

OSC::~OSC()
{
}
int OSC::Initialize(void* params)
{
	return 1;
}

void OSC::Terminate()
{

}

void OSC::osc_core(int init, int change_phase, int third){

	if (init == 1)
		osc_cb.first_param = 1;
	else
		osc_cb.first_param = 0;

	if (change_phase == 1)
		osc_cb.change_phase = 1;
	else
		osc_cb.change_phase = 0;

	if (third == 1)
		osc_cb.third = 1;
	else
		osc_cb.third = 0;


	osc_relation();
	osc_property();

	//parent->common.show_00(osc_lp[0].i_ph, osc_lp[0].i_c, osc_lp[0].i_s, osc_lp[1].i_ph, osc_lp[1].i_c, osc_lp[1].i_s, osc_lp[2].i_ph, osc_lp[2].i_c, osc_lp[2].i_s, 0, 0, 0, 0, 0, 0, 10, 0);

};

void OSC::osc_relation(){


	if (osc_cb.first_param == 1){

		for (int i = 0; i < 8; i++){

			osc_lp[i].in = osc_p[i].lenght * osc_substrate_s.quarter[i] + osc_substrate_s.step_phase[i];//вводимые параметры

			osc_lp[i].in_pos = osc_lp[i].in;

			if (osc_lp[i].in_pos < 0)
				osc_lp[i].in_pos = osc_lp[i].in_pos * -1;
		}

		for (int i = 0; i < 8; i++){
			osc_lp[i].i_ph = ((osc_lp[i].in_pos / osc_p[i].lenght) - (((osc_lp[i].in_pos / osc_p[i].lenght) / 4)) * 4) + 1;
			osc_lp[i].i_c = osc_lp[i].in_pos - ((int)(osc_lp[i].in_pos / osc_p[i].lenght)*osc_p[i].lenght);
			osc_lp[i] = first_step(osc_lp[i], osc_p[i].lenght);
		}
		osc_cb.first_param = 0;
	}
	else{

		for (int i = 0; i < 8; i++){

			if (osc_lp[i].in >= 0){
				osc_lp[i] = up(osc_lp[i], osc_p[i].lenght);
				osc_lp[i] = state(osc_lp[i], osc_p[i].lenght);
			}
			else if (osc_lp[i].in < 0){
				osc_lp[i] = down(osc_lp[i], osc_p[i].lenght);
				osc_lp[i] = state(osc_lp[i], osc_p[i].lenght);
			}
		}
	}
};


void OSC::osc_property(){


	for (int i = 0; i < 8; i++){
		osc_out[i].line = osc_lp[i].i_s * osc_substrate_s.step[i] * osc_p[i].norm;
		osc_out[i].line_sin = square_sin(osc_out[i].line, osc_lp[i].i_ph, osc_p[i].up_lim*osc_p[i].norm);
		osc_out[i].sin_cos = sin(osc_lp[i].i_s * osc_sp01[i].rad) * osc_sp01[i].norm_sin_cos;
	}

	////////////////////////////////////////////
	osc_sp01[0].t++;
	if (osc_sp01[0].t >(osc_sp01[0].T - 1)){
		osc_sp01[0].t = 0;
	}

	osc_out[0].sin = 1 * sin(osc_sp01[0].w_0 * osc_sp01[0].t + 0.0);
	osc_out[1].sin = 1 * cos(osc_sp01[1].w_0 * osc_sp01[0].t + 0.25);
	osc_out[2].sin = 1 * sin(osc_sp01[2].w_0 * osc_sp01[0].t + 0.5);
	osc_out[3].sin = 1 * cos(osc_sp01[3].w_0 * osc_sp01[0].t + 1.25);

	///////////////////////
	

	osc_sp02[0].t++;
	for (int i = 0; i<8; i++){
	
		if (osc_sp02[0].t >(osc_substrate_s.deg[i] - 1)){
			osc_sp02[0].t = 0;
		}
	}

	osc_out[0].sin_deg = 1 * sin(osc_sp02[0].rad * osc_sp02[0].t);
	osc_out[1].cos_deg = 1 * cos(osc_sp02[0].rad * osc_sp02[0].t);

};



void OSC::init(){


	osc_cb.first_param = 1;
	osc_sp01[0].t = -1;
	osc_sp02[0].t = -1;

	int l = 0;

	for (int i = 0; i < 8; i++)
	{
	
		while (osc_p[i].up_lim <= 1 - osc_substrate_s.step[i])
		{
			osc_p[i].up_lim = osc_substrate_s.step[i] * l;
			l++;
			osc_p[i].lenght = l;
		}

		osc_p[i].norm = 1 / osc_p[i].up_lim;
	
	}

	for (int i = 0; i < 8; i++)
	{
		osc_out[i].line = 0;
		osc_out[i].line_sin = 0;
		osc_out[i].sin_cos = 0;
		osc_out[i].sin = 0;
		osc_out[i].cos = 0;
		osc_out[i].sin_deg = 0;
		osc_out[i].cos_deg = 0;
	}
};


void OSC::osc_init_00(){

	for (int i = 0; i < 8; i++){
	
		osc_sp01[i].freq = 44100 / osc_p[i].lenght * 4;
		osc_sp01[i].T = ((osc_p[i].lenght - 1) * 4);
		osc_sp01[i].w_0 = 2 * PI / osc_sp01[i].T;
		///////////////////////////////////
		osc_sp01[i].deg = 90 / (osc_p[i].lenght - 1);
		osc_sp01[i].rad = osc_sp01[i].deg * PI / 180;
		osc_sp01[i].norm_sin_cos = 1 / sin((osc_p[i].lenght - 1)* osc_sp01[i].rad);

	}

	//	return in;
};

void OSC::osc_init_01(){

	for (int i = 0; i < 8; i++){

		osc_sp02[i].step = 360 / osc_substrate_s.deg[i];
		osc_sp02[i].rad = osc_sp02[i].step * PI / 180;
	}
};


o_line_param OSC::first_step(o_line_param in, int lenght){

	if (in.in == 0){

		in.i_ph = 4;
		in.i_s = 0;
	}
	else if (in.in > 0 && in.i_ph == 1 && in.i_c == 0){

		in.i_s = lenght - 1;
	}
	else if (in.in > 0 && in.i_ph == 2 && in.i_c == 0){

		in.i_s = 0;
	}
	else if (in.in > 0 && in.i_ph == 3 && in.i_c == 0){

		in.i_s = (lenght - 1)*-1;
	}
	else if (in.in > 0 && in.i_ph == 4 && in.i_c == 0){

		in.i_s = 0;
	}

	else if (in.in < 0 && in.i_ph == 1 && in.i_c == 0){

		in.i_s = 1;
	}
	else if (in.in < 0 && in.i_ph == 2 && in.i_c == 0){

		in.i_s = (lenght - 2);
	}
	else if (in.in < 0 && in.i_ph == 3 && in.i_c == 0){

		in.i_s = -1;
	}
	else if (in.in < 0 && in.i_ph == 4 && in.i_c == 0){

		in.i_s = (lenght - 2)*-1;
	}

	else if (in.i_ph == 1){

		in.i_s = in.i_c;
	}
	else if (in.i_ph == 2){

		in.i_s = (lenght - 1) - in.i_c;
	}
	else if (in.i_ph == 3){

		in.i_s = in.i_c * -1;
	}
	else if (in.i_ph == 4){

		in.i_s = ((lenght - 1) - in.i_c)*-1;
	}
	return in;
};


o_line_param OSC::up(o_line_param in, int lenght_in){

	if (osc_cb.change_phase == 1){


	}
	in.i_c++;

	if (in.i_c >= lenght_in)
		in.i_c = 1;

	if (in.i_c == 1)
		in.i_ph++;

	if (in.i_ph > 4)
		in.i_ph = 1;

	return in;
};
o_line_param OSC::down(o_line_param in, int lenght_in){

	in.i_c--;

	if (in.i_c <= 0)
		in.i_c = lenght_in - 1;

	if (in.i_c == (lenght_in - 1))
		in.i_ph--;

	if (in.i_ph <= 0)
		in.i_ph = 4;

	return in;
};

o_line_param OSC::state(o_line_param in, int lenght_in){

	if (in.i_ph == 1){
		in.i_s = in.i_c;
	}
	else if (in.i_ph == 2){
		in.i_s = (in.i_c * -1) + (lenght_in - 1);
	}
	else if (in.i_ph == 3){
		in.i_s = in.i_c * -1;
	}
	else if (in.i_ph == 4){
		in.i_s = in.i_c + ((lenght_in * -1) + 1);
	}

	else if (in.in == 0){

		if (in.i_ph == 1){
			in.i_s = in.i_c;
		}
		else if (in.i_ph == 2){
			in.i_s = (in.i_c * -1) + (lenght_in - 1);
		}
		else if (in.i_ph == 3){
			in.i_s = in.i_c * -1;
		}
		else if (in.i_ph == 4){
			in.i_s = in.i_c + ((lenght_in * -1) + 1);
		}
	}

	return in;
};


double OSC::square_sin(double dry, int phase, double up_lim){
	dry = pow(dry, 2);
	up_lim = pow(up_lim, 2);

	if (phase == 2 || phase == 3){
		dry = (up_lim - dry) * -1;
	}
	else{
		dry = up_lim - dry;
	}
	return dry;
};
/*
o_line_param OSC::change_phase(o_line_param in, int lenght_in){

	for (int i = 0; i < 8; i++){
		osc_lp[i].i_ph = ((osc_lp[i].in_pos / osc_p.lenght) - (((osc_lp[i].in_pos / osc_p.lenght) / 4)) * 4) + 1;
		osc_lp[i].i_c = osc_lp[i].in_pos - ((int)(osc_lp[i].in_pos / osc_p.lenght)*osc_p.lenght);
	}


	return in;
}
*/


double	OSC::Bus_in_master()
{
	return 0;
}
double	OSC::Bus_in_1()
{
	return 0;
}
double	OSC::Bus_in_2()
{
	return 0;
}
double	OSC::Bus_in_3()
{
	return 0;
}
double	OSC::Bus_in_4()
{
	return 0;
}
double	OSC::Bus_in_5()
{
	return 0;
}
double	OSC::Bus_in_6()
{
	return 0;
}
double	OSC::Bus_in_7()
{
	return 0;
}
double	OSC::Bus_in_8()
{
	return 0;
}

//
double	OSC::Bus_out_master()
{
	return 0;
}
double	OSC::Bus_out_1()
{
	return 0;
}
double	OSC::Bus_out_2()
{
	return 0;
}
double	OSC::Bus_out_3()
{
	return 0;
}
double	OSC::Bus_out_4()
{
	return 0;
}
double	OSC::Bus_out_5()
{
	return 0;
}
double	OSC::Bus_out_6()
{
	return 0;
}
double	OSC::Bus_out_7()
{
	return 0;
}
double	OSC::Bus_out_8()
{
	return 0;
}