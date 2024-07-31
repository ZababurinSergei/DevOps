#ifndef DELAY_H
#define DELAY_H

#include "world_state.h"
#include "world_functions.h"
#include "world_calc.h"

class DELAY
{
	WORLD_STATE* ws;
	WORLD_FUNCTIONS*  wf;
	WORLD_CALC*  wc;
public:

	DELAY::DELAY();
	DELAY::~DELAY();

	unsigned int count;
	unsigned int delay;
	double* buffer;
	double  old;

	void initialize(WORLD_STATE* _ws, WORLD_FUNCTIONS* _wf, WORLD_CALC* _wc);
	void create_delay(double* _out, double _in, unsigned int _delay, double feed, bool add, bool _invert);
};

#endif
