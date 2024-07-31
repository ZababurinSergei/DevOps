#include "type_1.h"

TYPE_1::TYPE_1()
{};

void TYPE_1::initialize(WORLD_STATE* _ws, WORLD_FUNCTIONS* _wf, WORLD_CALC* _wc){

	ws = _ws;
	wf = _wf;
	wc = _wc;

	midside = new MIDSIDE;

	delay = new DELAY[2];
	for(int i = 0; i < 2; i++)
		delay[i].initialize(ws, wf, wc);

	filter = new FILTER[4];
	for(int i = 0; i < 4; i++)
		filter[i].initialize();

	lfo_sine = new LFO_SINE[4];
	for(int i = 0; i < 4; i++)
		lfo_sine[i].initialize(ws, wf, wc);

	for(int i = 0; i < 10; i++)
		r[i] = 0;
};

TYPE_1::~TYPE_1(){
	delete midside;
	delete[] delay;
	delete[] filter;
	delete[] lfo_sine;
};

void TYPE_1::create(double* out_l, double* out_r, double _in, double _lfo_hz, unsigned int _delay1, unsigned int _delay2, double _filter, double _width){

	//180
	//режим lfo
	lfo[0] = lfo_sine[0].create(44100.0, 1, _lfo_hz, 0,     1,1);
	lfo[1] = lfo_sine[1].create(44100.0, 1, _lfo_hz, 90,    1,1);
	lfo[2] = lfo_sine[2].create(44100.0, 1, _lfo_hz, 180,   1,1);
	lfo[3] = lfo_sine[3].create(44100.0, 1, _lfo_hz, 270,   1,1);
	//режим статичный
	//lfo00[0] = sin(*_control->s1_width2*pi + 0           )*0.5 + 0.5;
	//lfo00[1] = sin(*_control->s1_width2*pi + 3.141592*0.5)*0.5 + 0.5;
	//lfo00[2] = sin(*_control->s1_width2*pi + 3.141592    )*0.5 + 0.5;
	//lfo00[3] = sin(*_control->s1_width2*pi + 3.141592*1.5)*0.5 + 0.5;

	delay[0].create_delay(&r[0], _in, _delay1, 0,0,0);	
	delay[1].create_delay(&r[1], _in, _delay2, 0,0,0);	

	//фильтруем 2 потока LP HP
	f[0] = filter[0].create(r[0], _filter, 1);
	f[1] = filter[1].create(r[1], _filter, 1);
	f[2] = filter[2].create(_in, _filter, 1);
	//2 оригинальных сигнала
	f[3] = filter[3].create(_in, _filter, 0);

	r[2] = f[0]*-1*lfo[0] + f[1]*-1*lfo[1] + f[0]*lfo[2] + f[1]*lfo[3];
	r[3] = f[2];
	r[4] = f[3]*0.5;
	r[5] = f[3]*0.5;

	midside->decode(&r[2], &r[3], r[2], r[3], 0);
	midside->knob(&r[2], &r[3], r[2], r[3], _width*0.5);
	r[2] *= -1;

	*out_l = (r[2] + r[4])*(1 - _width*0.5);
	*out_r = (r[3] + r[5])*(1 - _width*0.5);
};