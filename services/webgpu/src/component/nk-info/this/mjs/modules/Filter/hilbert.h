#ifndef HILBERT_H
#define HILBERT_H

#include "world_state.h"
#include "world_functions.h"
#include "world_calc.h"

#include "delay.h"
#include "ap.h"


class HILBERT{

public:
    HILBERT();
    ~HILBERT();

	WORLD_STATE* ws;
	WORLD_FUNCTIONS* wf;
	WORLD_CALC* wc;

	DELAY* delay;
	AP* ap;

	double coeff[2][8];
	double sin_0[8+1];
	double cos_0[8];
	double sin_1[8+1];
	double cos_1[8];

	void initialize(WORLD_STATE* _ws, WORLD_FUNCTIONS* _wf, WORLD_CALC* _wc);
	void create(double* _out1, double* _out2, double _in1, double _in2, double knob);
};

#endif