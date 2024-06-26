#ifndef ALGORITM_0_H
#define ALGORITM_0_H

#include "world_state.h"
#include "world_functions.h"
#include "world_calc.h"

#include "ap.h"
#include "midside.h"
#include "lfo_triangle.h"
#include "lfo_sine.h"
#include "filter.h"
#include "delay.h"
#include "hilbert.h"

#include "type_0.h"
#include "type_1.h"

#include <iostream>
#include <stdlib.h>    
#include <time.h>      

static struct A0_CONTROL{
	//input
	unsigned short* s0_off_on;	
	unsigned short* s0_in_type;
	unsigned short* s0_invert;
	double*         s0_volume;	
	double*         s0_pan;

	unsigned short* s1_type;
	unsigned short* s1_side_onoff;
	double*         s1_side_volume;	
	unsigned int*   s1_d1;
	unsigned int*   s1_d2;
	double*         s1_width;
	double*         s1_filter;
	double*         s1_speed;
} a0;

static struct LR{
	double l;
	double r;
} lr;

static struct LFO_RANGE{
	double up;
	double down;
	double a;
	double b;
} lfo_range;


class ALGORITM_0{

	WORLD_STATE* ws;
	WORLD_FUNCTIONS*  wf;
	WORLD_CALC*  wc;

	LR stage0[10];
	LR stage1[10];

	AP* ap;
	double apr[256];

	MIDSIDE* midside;
	FILTER* filter;
	DELAY* delay;
	LFO_SINE* lfo_sine;
	LFO_TRIANGLE* lfo_triangle;
	HILBERT* hilbert;

	TYPE_0* type_0;
	TYPE_1* type_1;

	double pi;
	double s1[6];
	unsigned int count;

public:
    ALGORITM_0();
    ~ALGORITM_0();

	void initialize(WORLD_STATE* _ws, WORLD_FUNCTIONS* _wf, WORLD_CALC* _wc);
	void create(double* out_l, double* out_r, double _in_l, double _in_r, A0_CONTROL* _control);
};

#endif