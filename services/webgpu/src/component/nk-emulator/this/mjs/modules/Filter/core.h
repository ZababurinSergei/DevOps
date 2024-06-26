#ifndef AUDIO_CORE_H
#define AUDIO_CORE_H

#include "world_state.h"
#include "world_functions.h"
#include "world_calc.h"

#include "algoritm_0.h"


class CORE
{
public:
	CORE::CORE();
	CORE::~CORE();

	WORLD_STATE*     ws;
	WORLD_FUNCTIONS* wf;
	WORLD_CALC*      wc;

	ALGORITM_0* algoritm_0;
	A0_CONTROL* a0_control;

	double* stage_0_l;
	double* stage_0_r;
	double* stage_1_l;
	double* stage_1_r;
	double* buffer_out_l;
	double* buffer_out_r;

	void initialize(WORLD_STATE* _ws, WORLD_FUNCTIONS* _wf, WORLD_CALC* _wc);
	void io(double* in_l, double* in_r, double* out_l, double* out_r, unsigned int size);
};

#endif
