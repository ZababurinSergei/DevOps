#ifndef TYPE_0_H
#define TYPE_0_H

#include "delay.h"
#include "filter.h"
#include "midside.h"
#include "lfo_sine.h"

class TYPE_0
{
	WORLD_STATE* ws; 
	WORLD_FUNCTIONS* wf;
	WORLD_CALC* wc;

public:
    TYPE_0();
    ~TYPE_0();

	DELAY* delay;
	FILTER* filter;
	MIDSIDE* midside;
	LFO_SINE* lfo_sine;

	double r[10]; //result

	void initialize(WORLD_STATE* _ws, WORLD_FUNCTIONS* _wf, WORLD_CALC* _wc);
	void create(double* out_l, double* out_r, double _in, unsigned int _control_delay, double _control_width, double _control_filter);
};

#endif