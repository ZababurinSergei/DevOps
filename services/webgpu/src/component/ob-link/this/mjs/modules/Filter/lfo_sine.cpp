#include "lfo_sine.h"

LFO_SINE::LFO_SINE()
{};

void LFO_SINE::initialize(WORLD_STATE* _ws, WORLD_FUNCTIONS* _wf, WORLD_CALC* _wc){
	ws = _ws;
	wc = _wc;
	wf = _wf;

	pi = atan(1)*4.0;

	output = 0;
	phase_increment = 0;
	sum = 0;
};

LFO_SINE::~LFO_SINE(){
};

double LFO_SINE::create(double _sr, double _amp, double _hz, double _phase, bool _synch, short _positive){
	
	if(_phase != phase)
		phase = pi*2 / (360.0 / _phase);

	//положительные
	if(_positive == 0)
		output = _amp * cos(sum + phase);
	else
		output = _amp * (cos(sum + phase)*0.5+0.5);

	phase_increment = 2 * pi * _hz / _sr;
	sum = sum + phase_increment;

	return output;
};

void LFO_SINE::reset(){
	output = 0;
	phase_increment = 0;
	sum = 0;
};