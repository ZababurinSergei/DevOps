#ifndef TYPE_1_H
#define TYPE_1_H

#include "delay.h"
#include "filter.h"
#include "midside.h"
#include "lfo_sine.h"


class TYPE_1
{
	WORLD_STATE* ws; 
	WORLD_FUNCTIONS* wf;
	WORLD_CALC* wc;

public:
    TYPE_1();
    ~TYPE_1();

	DELAY* delay;
	FILTER* filter;
	MIDSIDE* midside;
	LFO_SINE* lfo_sine;

	double r[6];
	double f[4];
	double lfo[4];

	void initialize(WORLD_STATE* _ws, WORLD_FUNCTIONS* _wf, WORLD_CALC* _wc);
	void create(double* out_l, double* out_r, double _in, double _lfo_hz, unsigned int _delay1, unsigned int _delay2, double _filter, double _width);
};

#endif