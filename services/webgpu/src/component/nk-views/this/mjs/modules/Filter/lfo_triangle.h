#ifndef LFO_TRIANGLE_H
#define LFO_TRIANGLE_H

#include "world_state.h"
#include "world_functions.h"
#include "world_calc.h"

class LFO_TRIANGLE{

	WORLD_STATE* ws;
	WORLD_FUNCTIONS*  wf;
	WORLD_CALC*  wc;

public:
    LFO_TRIANGLE();
    ~LFO_TRIANGLE();

	double volume_old;
	double hz_old;
	double phase_old;
	double lenght; 
	double step; 
	double sample;
	short up_down;

	void initialize(WORLD_STATE* _ws, WORLD_FUNCTIONS* _wf, WORLD_CALC* _wc);
	double create(double _sr, double _amp, double _hz, double _phase, bool _synch, short _positive);
	inline void calc(double _volume);
	inline void reset();
};

#endif