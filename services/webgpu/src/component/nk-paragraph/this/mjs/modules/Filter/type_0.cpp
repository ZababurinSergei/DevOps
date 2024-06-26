#include "type_0.h"

TYPE_0::TYPE_0()
{};

void TYPE_0::initialize(WORLD_STATE* _ws, WORLD_FUNCTIONS* _wf, WORLD_CALC* _wc){

	ws = _ws;
	wf = _wf;
	wc = _wc;

	delay = new DELAY;
	delay->initialize(ws, wf, wc);

	filter = new FILTER[3];
	for(int i = 0; i < 3; i++)
		filter[i].initialize();

	midside = new MIDSIDE;
	
	for(int i = 0; i < 10; i++)
		r[i] = 0;

	lfo_sine = new LFO_SINE[4];
	for(int i = 0; i < 4; i++)
		lfo_sine[i].initialize(ws, wf, wc);
};

TYPE_0::~TYPE_0(){
	delete delay;
	delete midside;
	delete[] filter;
	delete[] lfo_sine;
};

void TYPE_0::create(double* out_l, double* out_r, double _in, unsigned int _control_delay, double _control_width, double _control_filter){

	//создаём задержку канала
	delay->create_delay(&r[0], _in, _control_delay, 0,0,0);	
	//переход mid-side
	r[1] = r[0] * _control_width;
	r[2] = _in * (1 - _control_width);
	//фильтруем HP
	r[3] = filter[0].create(r[1], _control_filter, 1);
	r[4] = filter[1].create(r[2], _control_filter, 1);
	//фильтруем LP
	r[5] = filter[2].create(_in,  _control_filter, 0);

	midside->decode(&r[6], &r[7], r[3]*2, r[4]*2, 0);

	*out_l = (r[6]*-1 + r[5])*0.5;
	*out_r = (r[7]    + r[5])*0.5;
};



		

	