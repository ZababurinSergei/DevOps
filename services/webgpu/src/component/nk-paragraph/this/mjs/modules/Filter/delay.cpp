#include "delay.h"


DELAY::DELAY()
{};

void DELAY::initialize(WORLD_STATE* _ws, WORLD_FUNCTIONS* _wf, WORLD_CALC* _wc){
	ws = _ws;
	wc = _wc;
	wf = _wf;

	count = 0;
	old = 0;

	buffer = new double[ws->core.delay_size];
	wf->clear_array(buffer, ws->core.delay_size, 0);
};

DELAY::~DELAY()
{
};

void DELAY::create_delay(double* _out, double _in, unsigned int _delay, double feed, bool add, bool _invert){

	delay = ws->core.delay_size - _delay;

	//вход
	buffer[count] = _in + old;

	//задержка
	if(count + delay >= ws->core.delay_size)
		if(add == 1)
			*_out += buffer[(count + delay) - ws->core.delay_size];
		else
			*_out = buffer[(count + delay) - ws->core.delay_size];
	else
		if(add == 1)
			*_out += buffer[count + delay];
		else
			*_out = buffer[count + delay];

	//прошлое
	old = *_out * feed;

	//переворот
	if(_invert == 1)
		*_out *= -1;

	//счётчик
	count++;
	if(count >= ws->core.delay_size)
		count = 0;
};