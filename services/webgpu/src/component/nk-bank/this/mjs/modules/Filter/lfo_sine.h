#ifndef LFO_SINE_H
#define LFO_SINE_H

#include "world_state.h"
#include "world_functions.h"
#include "world_calc.h"

class LFO_SINE{

	WORLD_STATE* ws;
	WORLD_FUNCTIONS*  wf;
	WORLD_CALC*  wc;

public:
    LFO_SINE();
    ~LFO_SINE();

	double pi;

	double phase;
	double output;
	double phase_increment;
	double sum;

	void initialize(WORLD_STATE* _ws, WORLD_FUNCTIONS* _wf, WORLD_CALC* _wc);
	double create(double _sr, double _amp, double _hz, double _phase, bool _synch, short _positive);
	inline void reset();
};

#endif